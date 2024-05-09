import prisma from "@/repos/prisma";
import products from "@/repos/products";
export async function get(id) {
  try {
    if (id) {
      return await prisma.seller.findUnique({
        where: { id },
        include: { products: true },
      });
    }
    return await prisma.seller.findMany({ include: { products: true } });
  } catch (e) {
    return {
      error: {
        message: e.message,
        status: 500,
      },
    };
  }
}
export async function getLogged(username, password) {
  try {
    if (username&&password) {
      return await prisma.seller.findUnique({
        where: { username, password },
   
      });
    }
  } catch (e) {
    return {
      error: {
        message: e.message,
        status: 500,
      },
    };
  }
}

export async function create(data) {
  try {
    return await prisma.seller.create({
      data,
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

export async function update(id, data) {
  try {
    return await prisma.task.update({
      where: { id },
      data,
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
