import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  parentId: integer("parent_id"), // For nesting: Category -> Subcategory -> Type
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  originalPrice: numeric("original_price"),
  image: text("image").notNull(),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  isNew: boolean("is_new").default(false),
  isTrending: boolean("is_trending").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type ProductResponse = Product & { category?: Category };
