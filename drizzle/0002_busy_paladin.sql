ALTER TABLE "vehicles" ALTER COLUMN "vehicle_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."vehicle_type";--> statement-breakpoint
CREATE TYPE "public"."vehicle_type" AS ENUM('bike', 'rickshaw', 'car');--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "vehicle_type" SET DATA TYPE "public"."vehicle_type" USING "vehicle_type"::"public"."vehicle_type";--> statement-breakpoint
DROP INDEX "captains_socked_id_idx";--> statement-breakpoint
DROP INDEX "users_socked_id_idx";--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "lat" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "lng" SET DATA TYPE double precision;--> statement-breakpoint
CREATE INDEX "captains_socket_id_idx" ON "captains" USING btree ("socket_id");--> statement-breakpoint
CREATE INDEX "users_socket_id_idx" ON "users" USING btree ("socket_id");