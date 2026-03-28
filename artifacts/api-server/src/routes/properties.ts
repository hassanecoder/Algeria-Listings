import { Router, type IRouter } from "express";
import { db, propertiesTable } from "@workspace/db";
import { eq, and, gte, lte, ilike, or, SQL } from "drizzle-orm";
import {
  ListPropertiesQueryParams,
  GetPropertyParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

// GET /api/properties
router.get("/", async (req, res) => {
  try {
    const query = ListPropertiesQueryParams.parse(req.query);
    const conditions: SQL[] = [];

    if (query.type) {
      conditions.push(eq(propertiesTable.type, query.type));
    }
    if (query.category) {
      conditions.push(eq(propertiesTable.category, query.category));
    }
    if (query.wilaya) {
      conditions.push(eq(propertiesTable.wilaya, query.wilaya));
    }
    if (query.minPrice !== undefined) {
      conditions.push(gte(propertiesTable.price, query.minPrice));
    }
    if (query.maxPrice !== undefined) {
      conditions.push(lte(propertiesTable.price, query.maxPrice));
    }
    if (query.minArea !== undefined) {
      conditions.push(gte(propertiesTable.area, query.minArea));
    }
    if (query.maxArea !== undefined) {
      conditions.push(lte(propertiesTable.area, query.maxArea));
    }
    if (query.rooms !== undefined) {
      conditions.push(eq(propertiesTable.rooms, query.rooms));
    }
    if (query.featured !== undefined) {
      conditions.push(eq(propertiesTable.featured, query.featured));
    }
    if (query.search) {
      conditions.push(
        or(
          ilike(propertiesTable.title, `%${query.search}%`),
          ilike(propertiesTable.wilaya, `%${query.search}%`),
          ilike(propertiesTable.commune, `%${query.search}%`)
        ) as SQL
      );
    }

    conditions.push(eq(propertiesTable.available, true));

    const limit = query.limit ?? 12;
    const offset = query.offset ?? 0;

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const properties = await db.query.propertiesTable.findMany({
      where: whereClause,
      with: {
        agent: {
          columns: {
            id: true,
            name: true,
            phone: true,
            photo: true,
            agency: true,
            wilaya: true,
            rating: true,
            reviewCount: true,
            listingCount: true,
            verified: true,
          },
        },
      },
      limit,
      offset,
    } as any);

    const allProperties = await db.query.propertiesTable.findMany({
      where: whereClause,
      columns: { id: true },
    } as any);

    res.json({
      properties,
      total: allProperties.length,
      limit,
      offset,
    });
  } catch (err) {
    req.log.error({ err }, "Error listing properties");
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

// GET /api/properties/featured - must be before /:id
router.get("/featured", async (req, res) => {
  try {
    const properties = await db.query.propertiesTable.findMany({
      where: and(eq(propertiesTable.featured, true), eq(propertiesTable.available, true)),
      with: {
        agent: {
          columns: {
            id: true,
            name: true,
            phone: true,
            photo: true,
            agency: true,
            wilaya: true,
            rating: true,
            reviewCount: true,
            listingCount: true,
            verified: true,
          },
        },
      },
      limit: 8,
    } as any);

    res.json({
      properties,
      total: properties.length,
      limit: 8,
      offset: 0,
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching featured properties");
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = GetPropertyParams.parse({ id: Number(req.params.id) });

    const property = await db.query.propertiesTable.findFirst({
      where: eq(propertiesTable.id, id),
      with: {
        agent: true,
      },
    } as any);

    if (!property) {
      res.status(404).json({ error: "not_found", message: "Property not found" });
      return;
    }

    res.json(property);
  } catch (err) {
    req.log.error({ err }, "Error fetching property");
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

export default router;
