import * as sellers from "@/repos/sellers";
import * as products from "@/repos/products";

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
   
    const category = searchParams.get("category");
    
    let results = null;
    if (category) {
      results = await products.filterByCat(category);
    } else {
      results = await products.get();
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
