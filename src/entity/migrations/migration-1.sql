CREATE TYPE "roles" AS ENUM (
  'admin',
  'public'
);

ALTER TABLE users ADD password VARCHAR;
ALTER TABLE users ADD role roles;