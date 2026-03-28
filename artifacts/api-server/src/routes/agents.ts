import { Router, type IRouter } from "express";
import { db, agentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetAgentParams } from "@workspace/api-zod";

const router: IRouter = Router();

// GET /api/agents
router.get("/", async (_req, res) => {
  try {
    const agents = await db.select().from(agentsTable);
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

// GET /api/agents/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = GetAgentParams.parse({ id: Number(req.params.id) });
    const [agent] = await db.select().from(agentsTable).where(eq(agentsTable.id, id));

    if (!agent) {
      res.status(404).json({ error: "not_found", message: "Agent not found" });
      return;
    }

    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: "internal_error", message: "Internal server error" });
  }
});

export default router;
