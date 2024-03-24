import User from "./user.js";
import { purchasedProduct } from "./PurchasedProduct.js";

export class Buyer extends User {
  #_purchasedProducts;

  constructor(username, password) {
    super(username, password);
    this.purchasedProducts = [];
  }

  get purchasedProducts() {
    return this.#_purchasedProducts;
  }
  set purchasedProducts(ps) {
    this.#_purchasedProducts = ps;
  }

  addProduct(product, quantity) {
    this.#_purchasedProducts.push(product);
    product.quantity = quantity;

    product.buyer = this.id;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      purchasedProducts: this.purchasedProducts.map((product) =>
        product.toJSON()
      ),
    };
  }

  static fromJSON(object) {
    const buyer = new Buyer(object.username, object.password);
    if (Array.isArray(object.purchasedProducts)) {
      buyer.purchasedProducts = object.purchasedProducts.map((prod) =>
        purchasedProduct.fromJSON(prod)
      );
    }
    return buyer;
  }
}
