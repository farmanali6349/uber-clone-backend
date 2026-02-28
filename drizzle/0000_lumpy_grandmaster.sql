CREATE TYPE "public"."vehicle_type" AS ENUM('bike', 'rikshaw', 'car');--> statement-breakpoint
CREATE TABLE "captains" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "captains_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50),
	"email" varchar(128) NOT NULL,
	"password" text NOT NULL,
	"socket_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "captains_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "token_blacklist" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "token_blacklist_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"auth_token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50),
	"email" varchar(128) NOT NULL,
	"password" text NOT NULL,
	"socket_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vehicles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"vehicle_type" "vehicle_type" NOT NULL,
	"capacity" integer DEFAULT 1,
	"plate" varchar(10) NOT NULL,
	"color" varchar(20),
	"is_active" boolean DEFAULT false,
	"lat" integer,
	"lng" integer,
	"captain_id" integer NOT NULL,
	CONSTRAINT "vehicles_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_captain_id_captains_id_fk" FOREIGN KEY ("captain_id") REFERENCES "public"."captains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "captains_email_idx" ON "captains" USING btree ("email");--> statement-breakpoint
CREATE INDEX "captains_socked_id_idx" ON "captains" USING btree ("socket_id");--> statement-breakpoint
CREATE INDEX "auth_token_idx" ON "token_blacklist" USING btree ("auth_token");--> statement-breakpoint
CREATE INDEX "auth_token_created_at_idx" ON "token_blacklist" USING btree ("auth_token","created_at");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_socked_id_idx" ON "users" USING btree ("socket_id");--> statement-breakpoint
CREATE INDEX "vehicles_plate_idx" ON "vehicles" USING btree ("plate");--> statement-breakpoint
CREATE INDEX "vehicles_is_active_idx" ON "vehicles" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "vehicles_captain_id_idx" ON "vehicles" USING btree ("captain_id");--> statement-breakpoint
CREATE INDEX "vehicles_location_idx" ON "vehicles" USING btree ("lat","lng");