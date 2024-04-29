import * as buyers from "@/repos/buyers";

export async function GET(request, { params }) {

    try { 
      const results = await buyers.get();

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
    const buyer = await buyers.create(data);

    if ("error" in buyer) {
      return Response.json(buyer.error.message, {
        status: buyer.error.status,
      });
    } else {
      return Response.json(buyer, { Status: 201 });
    }
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
