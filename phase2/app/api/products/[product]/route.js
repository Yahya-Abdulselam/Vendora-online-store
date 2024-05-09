import * as products from "@/repos/products";

export async function GET(request, { params }) {
  try {
    const { product } = params;

    const results = await products.get(null, product);

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
