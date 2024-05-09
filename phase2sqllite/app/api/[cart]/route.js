import * as cart from "@/repos/cart";
export async function GET(request, { params }) {
  try {
    const { buyer } = params;
    const results = await cart.get(buyer);

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

export async function DELETE(request, { params }) {
  try {
    const { buyer } = params;
    const results = await cart.get(buyer);

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

