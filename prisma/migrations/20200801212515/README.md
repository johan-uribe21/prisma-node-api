# Migration `20200801212515`

This migration has been generated at 8/1/2020, 9:25:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.email"

ALTER TABLE "public"."User" DROP COLUMN "name",
DROP COLUMN "email",
ADD COLUMN "familyName" text  NOT NULL ,
ADD COLUMN "givenName" text  NOT NULL ,
ADD COLUMN "googleId" text  NOT NULL ,
ADD COLUMN "photo" text   ;

CREATE UNIQUE INDEX "User.googleId" ON "public"."User"("googleId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200731224018-created-and-updated-for-models..20200801212515
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
@@ -19,10 +19,12 @@
 }
 model User {
   id       Int       @id @default(autoincrement())
-  name     String
-  email    String    @unique
+  familyName     String
+  givenName     String
+  googleId  String @unique
+  photo    String?    
   posts    Post[]
   profile  Profile?
   createdAt     DateTime @default(now())
   updatedAt     DateTime @updatedAt
```


