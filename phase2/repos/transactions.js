import prisma from "@/repos/prisma";
import * as buyers from "@/repos/buyers";
export async function create(buyer,prod, data) {
  try {
    const verification = await buyers.get(buyer);



    const product = await prisma.transaction.create({
      data: {
        data,
        buyer: {
          connect: { id: verification.id },
        },
        product: {
          connect: { id: prod },
        },
      },
    });

    return product;
  } catch (error) {
    return {
      error: {
        message: error.message,
        status: 404,
      },
    };
  }
}

export async function get(seller, id) {
  try {
    if (id) {
      const verification = await sellers.get(seller);
      return await prisma.product.findUnique({
        where: { id, sellerId: verification.id },
      });
    }
    return await prisma.product.findMany({
      where: { sellerId: verification.id },
    });
  } catch (e) {
    return {
      error: {
        message: "no product found",
        status: 404,
      },
    };
  }
}

export async function remove(seller, id) {
  try {
    const verification = await sellers.get(seller);

    const result = await prisma.product.delete({
      where: { sellerId: verification.id, id },
    });

    return result;
  } catch (e) {
    return {
      error: {
        message: "product not found",
        status: 404,
      },
    };
  }
}

export async function update(seller, product, data) {
  try {
    const verification = await sellers.get(seller);

    const result = await prisma.product.update({
      where: { sellerId: verification.id, id: product },
      data,
    });

    return result;
  } catch (e) {
    return {
      error: {
        message: "product not found",
        status: 404,
      },
    };
  }
}
