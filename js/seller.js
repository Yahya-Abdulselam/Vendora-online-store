import User from "./user.js";
import Product from "./Product.js";

export default class Seller extends User {
  #_products;

  constructor(username, password) {
    super(username, password);
    this.products = [];
  }

  get products() {
    return this.#_products;
  }
  set products(ps) {
    this.#_products = ps;
  }

  addProduct(product, quantity) {
    const existingProduct = this.#_products.find(
      (p) => p.name === product.name
    );
    if (existingProduct) {
      existingProduct.addQuantity(quantity);
    } else {
      this.#_products.push(product);
      product.quantity = quantity;
    }
    product.sellerId = this.id;
  }

  removeProduct(product) {
    const index = this.#_products.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      this.#_products.splice(index, 1);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      products: this.products.map((product) => product.toJSON()),
    };
  }

  static fromJSON(object) {
    const seller = new Seller(object.username, object.password);
    if (Array.isArray(object.products)) {
      seller.products = object.products.map((prod) => Product.fromJSON(prod));
    }
    return seller;
  }
}
