import { pgTable, serial, text, real, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  description: text("description"),
  descriptionAr: text("description_ar"),
  type: text("type").notNull(), // sale, rent, commercial
  category: text("category").notNull(), // apartment, villa, house, studio, land, commercial, office
  price: real("price").notNull(),
  priceUnit: text("price_unit").notNull().default("DZD"),
  area: real("area").notNull(),
  rooms: integer("rooms"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  wilaya: text("wilaya").notNull(),
  commune: text("commune").notNull(),
  address: text("address"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  images: text("images").array().notNull().default([]),
  amenities: text("amenities").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  available: boolean("available").notNull().default(true),
  yearBuilt: integer("year_built"),
  agentId: integer("agent_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
