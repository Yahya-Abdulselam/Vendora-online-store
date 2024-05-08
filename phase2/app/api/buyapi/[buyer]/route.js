import * as buyers from "@/repos/buyers";
export async function GET(request, { params }) {
  try {
    const { buyer } = params;
    const results = await buyers.get(buyer);

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
export async function PATCH(request, { params }) {
  let data;
  try {
    data = await request.json();

    const { buyer } = params;

    const Card = await buyers.update(buyer, data);

    if ("error" in Card) {
      return Response.json(Card.error.message, {
        status: Card.error.status,
      });
    } else {
      return Response.json(Card, { Status: 200 });
    }
  } catch (e) {
    if (data) {
      return Response.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    } else {
      return Response.json(
        { message: "product's data is missing" },
        { status: 500 }
      );
    }
  }
}
