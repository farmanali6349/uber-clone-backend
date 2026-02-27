CREATE TABLE "token_blacklist" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "token_blacklist_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"auth_token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "auth_token_idx" ON "token_blacklist" USING btree ("auth_token");--> statement-breakpoint
CREATE INDEX "auth_token_created_at_idx" ON "token_blacklist" USING btree ("auth_token","created_at");