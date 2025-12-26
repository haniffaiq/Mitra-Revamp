import { sql } from "drizzle-orm";
import { boolean, index, integer, numeric, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const merchants = pgTable(
  "merchants",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull(),
    type: text("type").notNull(),
    logoUrl: text("logo_url").notNull(),
    bepMonths: integer("bep_months").notNull(),
    priceMin: integer("price_min").notNull(),
    priceMax: integer("price_max"),
    rating: numeric("rating", { precision: 2, scale: 1 }),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: index("merchants_slug_idx").on(table.slug),
    categoryIdx: index("merchants_category_idx").on(table.category),
    typeIdx: index("merchants_type_idx").on(table.type),
    priceMinIdx: index("merchants_price_min_idx").on(table.priceMin),
  })
);

export const insertMerchantSchema = createInsertSchema(merchants).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMerchant = z.infer<typeof insertMerchantSchema>;
export type Merchant = typeof merchants.$inferSelect;
