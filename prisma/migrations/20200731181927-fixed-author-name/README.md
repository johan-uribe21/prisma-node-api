# Migration `20200731181927-fixed-author-name`

This migration has been generated at 7/31/2020, 6:19:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_autherId_fkey"

ALTER TABLE "public"."Post" DROP COLUMN "autherId",
ADD COLUMN "authorId" integer  NOT NULL ;

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200731181519-user-profiles-and-posts..20200731181927-fixed-author-name
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
@@ -36,7 +36,7 @@
 model Post {
   id         Int      @id @default(autoincrement())
   title      String
   published  Boolean  @default(false)
-  author     User @relation(fields: [autherId], references: [id])
-  autherId     Int
+  author     User @relation(fields: [authorId], references: [id])
+  authorId     Int
 }
```


