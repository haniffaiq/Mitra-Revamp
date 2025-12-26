CREATE TABLE "merchants" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"type" text NOT NULL,
	"logo_url" text NOT NULL,
	"bep_months" integer NOT NULL,
	"price_min" integer NOT NULL,
	"price_max" integer,
	"rating" numeric(2, 1),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "merchants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX "merchants_slug_idx" ON "merchants" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "merchants_category_idx" ON "merchants" USING btree ("category");--> statement-breakpoint
CREATE INDEX "merchants_type_idx" ON "merchants" USING btree ("type");--> statement-breakpoint
CREATE INDEX "merchants_price_min_idx" ON "merchants" USING btree ("price_min");