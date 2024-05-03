-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Cart_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Buyer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
