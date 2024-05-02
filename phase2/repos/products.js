import prisma from "@/repos/prisma";
import * as sellers from "@/repos/sellers";
export async function create(seller, data) {
  try {
    // const verification = await sellers.get(seller);

    const { category, ...restData } = data;

    const product = await prisma.product.create({
      data: {
        ...restData,
        seller: {
          connect: { id: seller },
        },
        category: {
          connect: { category: category },
        },
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: error.message,
        status: 404,
      },
    };
  }
}
export async function filterByCat(cat) {
  try {
    return await prisma.product.findMany({
      where: { catId: cat },
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
export async function filterByName(seller, name) {
  try {
    return await prisma.product.findFirstOrThrow({
      where: { sellerId: seller, name: name },
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
export async function get(seller, id) {
  let verification = null;
  try {
    if (id) {
      verification = await sellers.get(seller);

      if (seller) {
        return await prisma.product.findUnique({
          where: { id, sellerId: verification.id },
        });
      } else {
        return await prisma.product.findUnique({
          where: { id },
        });
      }
    }
    verification = await sellers.get(seller);
    if (seller) {
      return await prisma.product.findMany({
        where: { sellerId: verification.id },
      });
    } else {
      return await prisma.product.findMany();
    }
  } catch (e) {
    return {
      error: {
        message: e.message,
        status: 404,
      },
    };
  }
}
export async function getForTransaction(id) {
  try {
    if (id) {
      return await prisma.product.findUnique({
        where: { id },
      });
    }
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

export async function getTransactions(seller, id) {
  try {
    return await prisma.product.findMany({
      where: { id, sellerId: seller.id },
      select: { transactions: true },
    });
  } catch (e) {
    return {
      error: {
        message: e.message,
        status: 500,
      },
    };
  }
}
