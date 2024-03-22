import User from "./user.js";

export default class Seller extends User {
  products = [];

  constructor(username, password) {
    super(username, password);
  }

  get products() {
    return this.products;
  }
  addProduct(product, quantity) {
    if (this.products.find((p) => p.name === product.name))
      product.addQuantity(quantity);
    else {
      this.products.push(product);
      product.quantity(quantity);
    }
    product.sellerId(this.id);
  }
  removeProduct(product) {
    const index = this.products.findIndex((p) => p.name === product.name);
    this.products.splice(index, 1);
  }
  toJSON() {
    return { ...super.toJSON(), product: this.products };
  }
  static fromJSON(object) {
    return new Seller();
  }
}
