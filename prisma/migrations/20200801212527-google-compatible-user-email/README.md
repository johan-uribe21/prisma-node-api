# Migration `20200801212527-google-compatible-user-email`

This migration has been generated at 8/1/2020, 9:25:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.email"

ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN "familyName" text  NOT NULL ,
ADD COLUMN "givenName" text  NOT NULL ,
ADD COLUMN "googleId" text  NOT NULL ,
ADD COLUMN "photo" text   ,
ALTER COLUMN "email" DROP NOT NULL;

CREATE UNIQUE INDEX "User.googleId" ON "public"."User"("googleId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200801212515..20200801212527-google-compatible-user-email
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
@@ -22,11 +22,12 @@
   id       Int       @id @default(autoincrement())
   familyName     String
   givenName     String
   googleId  String @unique
-  photo    String?    
-  posts    Post[]
-  profile  Profile?
+  photo     String?    
+  email     String?
+  posts     Post[]
+  profile   Profile?
   createdAt     DateTime @default(now())
   updatedAt     DateTime @updatedAt
 }
```


