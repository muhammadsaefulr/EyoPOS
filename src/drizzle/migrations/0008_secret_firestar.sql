CREATE TABLE "restocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"quantity" integer NOT NULL,
	"price_per_unit" integer NOT NULL,
	"total_cost" integer NOT NULL,
	"restocked_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"restocked_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" varchar PRIMARY KEY NOT NULL,
	"order_id" varchar NOT NULL,
	"invoice_number" varchar(50) NOT NULL,
	"total_amount" integer NOT NULL,
	"issued_at" timestamp DEFAULT now() NOT NULL,
	"due_date" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'unpaid' NOT NULL,
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
CREATE TABLE "order_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" varchar NOT NULL,
	"status" varchar(50) NOT NULL,
	"changed_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"category_id" varchar(7) NOT NULL,
	"price_per_item" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" varchar PRIMARY KEY NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"total_price" integer NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "restocks" ADD CONSTRAINT "restocks_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restocks" ADD CONSTRAINT "restocks_restocked_by_user_id_fk" FOREIGN KEY ("restocked_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_history" ADD CONSTRAINT "order_history_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_history" ADD CONSTRAINT "order_history_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_category_id_product_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE cascade ON UPDATE no action;