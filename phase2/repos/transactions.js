import prisma from "@/repos/prisma";
import * as buyers from "@/repos/buyers";
import * as products from "@/repos/products";
export async function create(buyer, prod, data) {
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
        status: error.status,
      },
    };
  }
}

export async function get(buyer, prod, id) {
  try {
    if (id) {
      const verification = await buyers.get(buyer);
      const verification2 = await products.getForTransaction(prod);
      return await prisma.transaction.findUnique({
        where: { id, buyerId: verification.id, productId: verification2.id },
      });
    }
    if (prod && buyer) {
      const verification = await buyers.get(buyer);
      const verification2 = await products.getForTransaction(prod);
      return await prisma.transaction.findMany({
        where: { buyerId: verification.id, productId: verification2.id },
      });
    }
    if (buyer) {
      const verification = await buyers.get(buyer);
      return await prisma.transaction.findMany({ buyerId: verification.id });
    } else {
      return await prisma.transaction.findMany({});
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
export async function getForSeller(seller, prod) {
  try {
    if (prod && seller) {
      const verification2 = await products.get(seller, prod);
      return await prisma.transaction.findUnique({
        where: { sellerId: seller, productId: verification2.id },
      });
    }
    return await prisma.transaction.findMany({
      where: { sellerId: seller },
    });
  } catch (e) {
    return {
      error: {
        message: "no transaction found",
        status: 404,
      },
    };
  }
}
export async function getForBuyer(buyer, id) {
  try {
    if (id) {
      const verification = await buyers.get(buyer);

      return await prisma.transaction.findUnique({
        where: { id, buyerId: verification.id },
      });
    }
    return await prisma.product.findMany({
      where: { buyerId: verification.id },
    });
  } catch (e) {
    return {
      error: {
        message: "no transaction found",
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
