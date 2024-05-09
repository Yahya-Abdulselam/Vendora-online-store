import * as products from "@/repos/products";
export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const pName = searchParams.get("product-name");
    const { seller } = params;
    let results;
    if (pName) {
      results = await products.filterByName(seller, pName);
    } else {
      results = await products.get(seller);
    }

    if ("error" in results) {
      return Response.json(results.error.message, {
        status: results.error.status,
      });
    } else {
      return Response.json(results, { Status: 200 });
    }
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
