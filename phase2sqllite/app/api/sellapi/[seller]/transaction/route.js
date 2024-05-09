import * as transactions from "@/repos/transactions";
export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const pId = searchParams.get("product-id");
    const sum = searchParams.get("sum");
    const { seller } = params;

    let results;
    if (pId) {
      results = await transactions.getForSeller(seller, pId);
    } else if (sum === "true") {
      results = await transactions.getTransactionTotalForSeller(seller);
    } else {
      results = await transactions.getForSeller(seller);
    }

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
