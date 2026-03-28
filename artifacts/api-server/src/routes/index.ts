import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import propertiesRouter from "./properties.js";
import agentsRouter from "./agents.js";
import wilayasRouter from "./wilayas.js";
import { db, propertiesTable, agentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateInquiryBody } from "@workspace/api-zod";
import { inquiriesTable } from "@workspace/db";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/properties", propertiesRouter);
router.use("/agents", agentsRouter);
router.use("/wilayas", wilayasRouter);

// POST /api/inquiries
router.post("/inquiries", async (req, res) => {
  try {
    const body = CreateInquiryBody.parse(req.body);
    const [inquiry] = await db.insert(inquiriesTable).values(body).returning();
    res.status(201).json({
      id: inquiry.id,
      success: true,
      message: "Votre demande a bien été envoyée. Un agent vous contactera sous 24h.",
    });
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

// GET /api/stats
router.get("/stats", async (_req, res) => {
  try {
    const allProperties = await db.select().from(propertiesTable).where(eq(propertiesTable.available, true));
    const forSale = allProperties.filter((p) => p.type === "sale");
    const forRent = allProperties.filter((p) => p.type === "rent");
    const commercial = allProperties.filter((p) => p.type === "commercial");
    const agents = await db.select().from(agentsTable);
    const wilayas = [...new Set(allProperties.map((p) => p.wilaya))];

    const avgPriceSale = forSale.length > 0 ? forSale.reduce((sum, p) => sum + p.price, 0) / forSale.length : 0;
    const avgPriceRent = forRent.length > 0 ? forRent.reduce((sum, p) => sum + p.price, 0) / forRent.length : 0;

    res.json({
      totalListings: allProperties.length,
      forSale: forSale.length,
      forRent: forRent.length,
      commercial: commercial.length,
      avgPriceSale: Math.round(avgPriceSale),
      avgPriceRent: Math.round(avgPriceRent),
      totalAgents: agents.length,
      totalWilayas: wilayas.length,
    });
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

export default router;
