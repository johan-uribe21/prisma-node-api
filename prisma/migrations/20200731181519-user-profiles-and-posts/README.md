# Migration `20200731181519-user-profiles-and-posts`

This migration has been generated at 7/31/2020, 6:15:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text  NOT NULL ,
"email" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Profile" (
"id" SERIAL,
"bio" text   ,
"userId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Post" (
"id" SERIAL,
"title" text  NOT NULL ,
"published" boolean  NOT NULL DEFAULT false,
"autherId" integer  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."gigs" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "technologies" SET NOT NULL,
ALTER COLUMN "budget" SET NOT NULL,
ALTER COLUMN "contact_email" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Profile_userId" ON "public"."Profile"("userId")

CREATE UNIQUE INDEX "gigs.contact_email" ON "public"."gigs"("contact_email")

ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("autherId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200731181519-user-profiles-and-posts
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,42 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model gigs {
+  id            Int       @default(autoincrement()) @id
+  title         String
+  technologies  String
+  budget        String
+  description   String?
+  contact_email String  @unique
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @default(now())
+}
+
+model User {
+  id       Int       @id @default(autoincrement())
+  name     String
+  email    String    @unique
+  posts    Post[]
+  profile  Profile?
+}
+
+model Profile {
+  id      Int    @id @default(autoincrement())
+  bio     String?
+  user    User   @relation(fields: [userId], references: [id])
+  userId  Int
+}
+
+model Post {
+  id         Int      @id @default(autoincrement())
+  title      String
+  published  Boolean  @default(false)
+  author     User @relation(fields: [autherId], references: [id])
+  autherId     Int
+}
```


