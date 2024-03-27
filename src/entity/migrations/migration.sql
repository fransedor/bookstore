CREATE TYPE "tags" AS ENUM (
  'fiction',
  'non-fiction',
  'science',
  'essay'
);

CREATE TABLE "book_user" (
  "user_id" integer,
  "book_id" integer,
  "created_at" timestamp
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "point" number,
  "created_at" timestamp
);

CREATE TABLE "books" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "writer" varchar,
  "cover_image" varchar,
  "point" number,
  "tag" tags,
  "created_at" timestamp
);

ALTER TABLE "book_user" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "book_user" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");
