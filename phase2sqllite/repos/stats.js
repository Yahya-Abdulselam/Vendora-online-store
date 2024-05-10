import prisma from "@/repos/prisma";


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

// Currently Unused
// export async function getTransactionTotal(from, to) {
//   return await prisma.transaction.aggregate({
//     _sum: {
//       amountPaid: true,
//     },
//     where: {
//       date: {
//         gte: from,
//         lte: to,
//       },
//     },
//   });
// }
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

// Currently Unused
// export async function getTransactionAccountTotal(id, from, to) {
//   return await prisma.transaction.aggregate({
//     _sum: {
//       amount: true,
//     },
//     where: {
//       account: id,
//       date: {
//         gte: from,
//         lte: to,
//       },
//     },
//   });
// }

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
    take: 4,
  });

  return topProducts;
}

export async function getSellerTop() {
  try {
    const result = await prisma.$queryRaw`
  SELECT s."id", s."username", SUM(t."amountPaid") AS "totalRevenue", SUM(t."quantityBought") As "totalQuantity"
  FROM "Seller" s, "Product" p, "Transaction" t
  where p."id" = t."productId" and  s."id" = p."sellerId" 
  GROUP BY s."id"
  ORDER BY "totalQuantity" DESC,"totalRevenue" DESC 
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
    });
    return sellersWithRevenue;
  } catch {}
}

export async function getTransactionStandardDeviation() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth(), 0);
  const count = (await getTransactionsCountLastMonth())._count.id;

  const avg = await getAvgLastMonth();
  const varianceTop = await prisma.$queryRaw`
  SELECT SUM(("amountPaid"-${avg})*("amountPaid"-${avg})) AS "squaredDiff"
  FROM "Transaction"
  where date>=${start} AND date<=${end}
`;

  const variance = Number(varianceTop[0].squaredDiff) / Number(count);

  const sd = Math.sqrt(variance);

  return sd;
}
export async function getAvgLastMonth() {
  const count = (await getTransactionsCountLastMonth())._count.id;
  const tranLastMonth = (await getTransactionsLastMonth())._sum.amountPaid;
  const avg = tranLastMonth / count;
  return avg;
}
export async function getTransactionsLastMonth() {
  try {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    const transactions = await prisma.transaction.aggregate({
      _sum: {
        amountPaid: true,
      },
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    return transactions;
  } catch {}
}
export async function getTransactionsCountLastMonth() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth(), 0);
  return await prisma.transaction.aggregate({
    _count: {
      id: true,
    },
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  });
}
