import * as sellers from "@/repos/sellers";
import * as products from "@/repos/products";

export async function DELETE(request, { params }) {
  try {
    const { seller, product } = params;

    const removedProduct = await products.remove(seller, product);

    if ("error" in removedProduct) {
      return Response.json(removedProduct.error.message, {
        status: removedProduct.error.status,
      });
    } else {
      return Response.json(removedProduct, { Status: 200 });
    }
  } catch (e) {
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  let data;
  try {
    data = await request.json();

    const { seller, product } = params;

    const Card = await products.update(seller, product, data);

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
