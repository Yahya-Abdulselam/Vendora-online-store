import * as sellers from "@/repos/sellers";

export async function GET(request, { params }) {

    try { 
      const results = await sellers.get();

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
    const data = await request.json();
    const seller = await sellers.create(data);

    if ("error" in seller) {
      return Response.json(seller.error.message, {
        status: seller.error.status,
      });
    } else {
      return Response.json(seller, { Status: 201 });
    }
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
