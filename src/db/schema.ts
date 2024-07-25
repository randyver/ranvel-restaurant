import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  integer,
  pgEnum,
  uuid,
  time,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: uuid("user_id").defaultRandom().primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  saldo: integer("saldo").notNull().default(0),
});

export const foods = pgTable("foods", {
  food_id: uuid("food_id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  image: text("image"),
});

export const carts = pgTable("carts", {
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  food_id: uuid("food_id")
    .notNull()
    .references(() => foods.food_id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
}, (carts) => ({
  uniqueUserFood: uniqueIndex("unique_user_food").on(carts.user_id, carts.food_id)
}));
