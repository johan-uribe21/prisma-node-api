# Migration `20200803150611-community-with-user-and-post-m2m-relations`

This migration has been generated at 8/3/2020, 3:06:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Community" (
"id" SERIAL,
"name" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."_CommunityToUser" (
"A" integer  NOT NULL ,
"B" integer  NOT NULL )

CREATE TABLE "public"."_CommunityToPost" (
"A" integer  NOT NULL ,
"B" integer  NOT NULL )

ALTER TABLE "public"."Post" DROP COLUMN "title",
DROP COLUMN "published",
ADD COLUMN "business" text  NOT NULL ,
ADD COLUMN "rating" Decimal(65,30)  NOT NULL ,
ADD COLUMN "review" text   ,
ADD COLUMN "imageURI" text   ,
ADD COLUMN "likes" integer  NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX "_CommunityToUser_AB_unique" ON "public"."_CommunityToUser"("A","B")

CREATE  INDEX "_CommunityToUser_B_index" ON "public"."_CommunityToUser"("B")

CREATE UNIQUE INDEX "_CommunityToPost_AB_unique" ON "public"."_CommunityToPost"("A","B")

CREATE  INDEX "_CommunityToPost_B_index" ON "public"."_CommunityToPost"("B")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."_CommunityToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_CommunityToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_CommunityToPost" ADD FOREIGN KEY ("A")REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_CommunityToPost" ADD FOREIGN KEY ("B")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200801212527-google-compatible-user-email..20200803150611-community-with-user-and-post-m2m-relations
--- datamodel.dml
+++ datamodel.dml
@@ -3,49 +3,61 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model gigs {
-  id            Int       @default(autoincrement()) @id
+  id            Int      @default(autoincrement()) @id
   title         String
   technologies  String
   budget        String
   description   String?
-  contact_email String  @unique
+  contact_email String   @unique
   createdAt     DateTime @default(now())
   updatedAt     DateTime @updatedAt
 }
 model User {
-  id       Int       @id @default(autoincrement())
-  familyName     String
-  givenName     String
-  googleId  String @unique
-  photo     String?    
-  email     String?
-  posts     Post[]
-  profile   Profile?
-  createdAt     DateTime @default(now())
-  updatedAt     DateTime @updatedAt
+  id         Int      @id @default(autoincrement())
+  familyName String
+  givenName  String
+  googleId   String   @unique
+  photo      String?
+  email      String?  @unique
+  posts      Post[]
+  profile    Profile?
+  communities Community[] @relation(references: [id]) 
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt
 }
 model Profile {
-  id      Int    @id @default(autoincrement())
-  bio     String?
-  user    User   @relation(fields: [userId], references: [id])
-  userId  Int
-  createdAt     DateTime @default(now())
-  updatedAt     DateTime @updatedAt
+  id        Int      @id @default(autoincrement())
+  bio       String?
+  user      User     @relation(fields: [userId], references: [id])
+  userId    Int
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
 model Post {
-  id         Int      @id @default(autoincrement())
-  title      String
-  published  Boolean  @default(false)
-  author     User     @relation(fields: [authorId], references: [id])
-  authorId   Int
-  createdAt  DateTime @default(now())
-  updatedAt  DateTime @updatedAt
-}
+  id          Int         @id @default(autoincrement())
+  business    String
+  rating      Float
+  review      String?
+  imageURI    String?
+  communities Community[] @relation(references: [id])
+  likes       Int         @default(0)
+  author      User        @relation(fields: [authorId], references: [id])
+  authorId    Int
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @updatedAt
+}
+
+model Community {
+  id    Int    @id @default(autoincrement())
+  name  String
+  posts Post[] @relation(references: [id])
+  users User[] @relation(references: [id])
+}
```


