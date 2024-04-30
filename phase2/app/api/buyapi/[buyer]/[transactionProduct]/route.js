import * as transactions from "@/repos/transactions";
export async function GET(request, { params }) {
  try {
    const { buyer, transactionProduct } = params;
    const results = await transactions.get(buyer, transactionProduct);

    if ("error" in results) {
      return Response.json(results.error.message, {
        status: results.error.status,
      });
    } else {
      return Response.json(results, { Status: 200 });
    }
  } catch (e) {
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { buyer, transactionProduct } = params;

    const data = await request.json();

    const transaction = await transactions.create(
      buyer,
      transactionProduct,
      data
    );

    if ("error" in product) {
      return Response.json(transaction.error.message, {
        status: transaction.error.status,
      });
    } else {
      return Response.json(transaction, { Status: 201 });
    }
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
