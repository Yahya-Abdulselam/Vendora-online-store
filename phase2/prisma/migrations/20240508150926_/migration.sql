-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "catId" TEXT NOT NULL,
    "buyerId" TEXT,
    CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category" ("category") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("catId", "description", "id", "name", "picture", "price", "quantity", "sellerId") SELECT "catId", "description", "id", "name", "picture", "price", "quantity", "sellerId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_sellerId_key" ON "Product"("name", "sellerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
