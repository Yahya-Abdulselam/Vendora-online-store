-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Buyer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "full_name" TEXT DEFAULT '',
    "address_line" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "zip_code" TEXT DEFAULT '',
    "phone_number" TEXT DEFAULT ''
);
INSERT INTO "new_Buyer" ("address_line", "balance", "city", "full_name", "id", "password", "phone_number", "username", "zip_code") SELECT "address_line", "balance", "city", "full_name", "id", "password", "phone_number", "username", "zip_code" FROM "Buyer";
DROP TABLE "Buyer";
ALTER TABLE "new_Buyer" RENAME TO "Buyer";
CREATE UNIQUE INDEX "Buyer_username_key" ON "Buyer"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
