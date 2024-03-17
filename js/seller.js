import User from "./user.js";

class Seller extends User {
  products = [];

  constructor(username, password) {
    super(username, password);
  }

  get products() {
    return this.products;
  }
  addProduct(product) {
    this.products.find((p) => p.name === product.name)
      ? product.increment()
      : this.products.push;
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
