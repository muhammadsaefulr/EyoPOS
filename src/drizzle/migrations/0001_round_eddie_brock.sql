ALTER TABLE "user" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "username";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "last_name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "avatar";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");