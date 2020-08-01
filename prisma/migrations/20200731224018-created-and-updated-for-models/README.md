# Migration `20200731224018-created-and-updated-for-models`

This migration has been generated at 7/31/2020, 10:40:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."Profile" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."User" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;

ALTER TABLE "public"."gigs" ALTER COLUMN "updatedAt" DROP DEFAULT;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200731181927-fixed-author-name..20200731224018-created-and-updated-for-models
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model gigs {
   id            Int       @default(autoincrement()) @id
@@ -14,29 +14,35 @@
   budget        String
   description   String?
   contact_email String  @unique
   createdAt     DateTime @default(now())
-  updatedAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
 }
 model User {
   id       Int       @id @default(autoincrement())
   name     String
   email    String    @unique
   posts    Post[]
   profile  Profile?
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
 }
 model Profile {
   id      Int    @id @default(autoincrement())
   bio     String?
   user    User   @relation(fields: [userId], references: [id])
   userId  Int
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
 }
 model Post {
   id         Int      @id @default(autoincrement())
   title      String
   published  Boolean  @default(false)
-  author     User @relation(fields: [authorId], references: [id])
-  authorId     Int
+  author     User     @relation(fields: [authorId], references: [id])
+  authorId   Int
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt
 }
```


