import prisma from "@/repos/prisma";

export async function get(id) {
  try {
    if (id) {
      return await prisma.buyer.findUnique({
        where: { id },
        include: { transactions: true },
      });
    }
    return await prisma.buyer.findMany({ include: { transactions: true } });
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
    return await prisma.buyer.create({
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
