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
  const topProducts = await prisma.transaction.groupBy({
    by: ["productId"],
    _sum: {
      quantityBought: true,
      amountPaid: true,
    },
    orderBy: [
      {
        _sum: {
          quantityBought: "desc",
        },
      },
      {
        _sum: {
          amountPaid: "desc",
        },
      },
    ],
    take: 3,
  });

  return topProducts;
}

export async function getSellerTop() {
  try {
    const result = await prisma.$queryRaw`
  SELECT s.id, s.username, SUM(t.amountPaid) AS totalRevenue, SUM(t.quantityBought) As totalQuantity
  FROM Seller s, Product p, "Transaction" t
  where p.id = t.productId and  s.id = p.sellerId 
  GROUP BY s.id
  ORDER BY totalQuantity DESC,totalRevenue DESC 
  LIMIT 1;
`;

    return result;
  } catch (e) {
    return {
      error: {
        message: e.message,
        status: 404,
      },
    };
  }
}
export async function getBuyerTop() {
  try {
    const sellersWithRevenue = await prisma.transaction.groupBy({
      by: ["buyerId"],
      _sum: {
        amountPaid: true,
        quantityBought: true,
      },
      orderBy: [
        {
          _sum: {
            amountPaid: "desc",
          },
        },
        {
          _sum: { quantityBought: "desc" },
        },
      ],
      take: 1,
    });return sellersWithRevenue;
  } catch {}
}
