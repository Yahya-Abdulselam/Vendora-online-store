import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const buyersPath = path.join(process.cwd(), "app/data/buyers.json");
const categoriesPath = path.join(process.cwd(), "app/data/categories.json");
const productsPath = path.join(process.cwd(), "app/data/products.json");
const sellersPath = path.join(process.cwd(), "app/data/sellers.json");
const transactionsPath = path.join(process.cwd(), "app/data/transactions.json");

async function main() {
  try {
    const buyers = JSON.parse(await fs.readFile(buyersPath));
    const categories = JSON.parse(await fs.readFile(categoriesPath));
    const products = JSON.parse(await fs.readFile(productsPath));
    const sellers = JSON.parse(await fs.readFile(sellersPath));
    const transactions = JSON.parse(await fs.readFile(transactionsPath));

    for (const buyer of buyers) await prisma.buyer.create({ data: buyer });
    for (const seller of sellers) await prisma.seller.create({ data: seller });
    for (const category of categories)
      await prisma.category.create({ data: category });
    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    for (const transaction of transactions)
      await prisma.transaction.create({ data: transaction });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
