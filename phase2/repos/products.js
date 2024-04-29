import prisma from "@/repos/prisma";
import * as sellers from "@/repos/sellers";
export async function create(seller, data) {
  try {
    const verification = await sellers.get(seller);

    const { category, ...restData } = data;

    const product = await prisma.product.create({
      data: {
        ...restData,
        seller: {
          connect: { id: verification.id },
        },
        category: {
          connect: { category: category },
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
