import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let products = await fs.readFile("./public/products.json");
const seed = async () => {
  products.forEach(
    async (p) =>
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          quantity: p.quantity,
          picture: p.picture,

          seller: {
            connect: { id: p.sellerID },
          },
          category: {
            connect: { category: p.category },
          },
        },
      })
  );
};

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
