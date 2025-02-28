CREATE TABLE "registred_user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"registred_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "registred_user_email_unique" UNIQUE("email")
);
