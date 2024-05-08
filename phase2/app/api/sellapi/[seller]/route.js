import * as products from "@/repos/products";
import * as sellers from "@/repos/sellers";
export async function GET(request, { params }) {
  try {
    const { seller } = params;
    const results = await sellers.get(seller);

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
    const { seller } = params;

    const data = await request.json();

    const product = await products.create(seller, data);

    if ("error" in product) {
      return Response.json(product.error.message, {
        status: product.error.status,
      });
    } else {
      return Response.json(product, { Status: 201 });
    }
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
