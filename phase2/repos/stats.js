import prisma from "@/repos/prisma";

export async function getAccountMinMax() {
  return {
    min: await prisma.account.findMany({
      orderBy: [{ balance: "asc" }],
      take: 1,
    }),
    max: await prisma.account.findMany({
      orderBy: [{ balance: "desc" }],
      take: 1,
    }),
  };
}
export async function getTransactionTotalByCategory(category) {
  return await prisma.transaction.aggregate({
    _sum: {
      amountPaid: true,
    },
    where: {
      product: {
        catId: category,
      },
    },
  });
}

export async function getTransactionTotal(from, to) {
  return await prisma.transaction.aggregate({
    _sum: {
      amountPaid: true,
    },
    where: {
      date: {
        gte: from,
        lte: to,
      },
    },
  });
}
export async function getTransactionTotalAllTime() {
  return await prisma.transaction.aggregate({
    _sum: {
      amountPaid: true,
    },
  });
}
export async function getTransactionAvg() {
  return await prisma.transaction.aggregate({
    _avg: {
      amountPaid: true,
    },
  });
}
export async function getTransactionsCount() {
  return await prisma.transaction.aggregate({
    _count: {
      id: true,
    },
  });
}

export async function getTransactionAccountTotal(id, from, to) {
  return await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      account: id,
      date: {
        gte: from,
        lte: to,
      },
    },
  });
}
export async function getTopProducts() {
  return await prisma.transaction.groupBy({
    by: ["productId"],
    _sum: {
      quantityBought: true,
      amountPaid: true,
    },
    orderBy: {
      _sum: {
        quantityBought: "desc",
      },
    },

    take: 3,
  });
}

export async function getClientTop() {
  const result = await prisma.account.aggregate({
    by: ["client"],
    _sum: {
      balance: true,
    },
    take: 1,
  });
  return await prisma.client.findUnique({
    id: result.client,
  });
}
