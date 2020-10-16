# Migration `20201010103602-init`

This migration has been generated by Wahyu Adi Kurniawan at 10/10/2020, 5:36:02 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `Link` (
`id` int  NOT NULL  AUTO_INCREMENT,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`description` varchar(191)  NOT NULL ,
`url` varchar(191)  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201010103602-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Link {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  description String
+  url         String
+}
```

