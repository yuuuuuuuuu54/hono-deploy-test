import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersSchema = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const todosSchema = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  completed: integer("completed").notNull().default(0),
  userId: integer("user_id").references(() => usersSchema.id),
  deadline: text("deadline"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const memoSchema = sqliteTable("memos", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => usersSchema.id),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});