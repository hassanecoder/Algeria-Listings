import { relations } from "drizzle-orm";
import { propertiesTable } from "./properties";
import { agentsTable } from "./agents";
import { inquiriesTable } from "./inquiries";

export const propertiesRelations = relations(propertiesTable, ({ one }) => ({
  agent: one(agentsTable, {
    fields: [propertiesTable.agentId],
    references: [agentsTable.id],
  }),
}));

export const agentsRelations = relations(agentsTable, ({ many }) => ({
  properties: many(propertiesTable),
}));

export const inquiriesRelations = relations(inquiriesTable, ({ one }) => ({
  property: one(propertiesTable, {
    fields: [inquiriesTable.propertyId],
    references: [propertiesTable.id],
  }),
}));
