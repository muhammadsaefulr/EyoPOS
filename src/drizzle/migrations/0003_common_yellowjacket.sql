CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric NOT NULL,
	"dist_price" numeric NOT NULL,
	"category_id" varchar(7) NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"sold" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"added_by" varchar(255) NOT NULL,
	"updated_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_category" (
	"id" varchar(7) PRIMARY KEY NOT NULL,
	"category_name" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE cascade ON UPDATE no action;