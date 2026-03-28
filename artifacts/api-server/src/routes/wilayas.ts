import { Router, type IRouter } from "express";
import { db, propertiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { WILAYAS_DATA } from "../data/wilayas.js";

const router: IRouter = Router();

// GET /api/wilayas
router.get("/", async (_req, res) => {
  try {
    const properties = await db.select({ wilaya: propertiesTable.wilaya }).from(propertiesTable).where(eq(propertiesTable.available, true));

    const countByWilaya: Record<string, number> = {};
    for (const p of properties) {
      countByWilaya[p.wilaya] = (countByWilaya[p.wilaya] ?? 0) + 1;
    }

    const wilayas = WILAYAS_DATA.map((w) => ({
      ...w,
      propertyCount: countByWilaya[w.name] ?? 0,
    }));

    res.json(wilayas);
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

export default router;
