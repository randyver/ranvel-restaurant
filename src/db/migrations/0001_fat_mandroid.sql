CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_food" ON "carts" USING btree ("user_id","food_id");