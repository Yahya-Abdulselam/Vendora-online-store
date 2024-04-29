import User from "./user.js";
import { purchasedProduct } from "./PurchasedProduct.js";

export class Buyer extends User {
  #_purchasedProducts;
  balance;
  cart;
  address;

  constructor(
    username,
    password,
    id,
    purchasedProducts = null,
    cart = null,
    address = null
  ) {
    super(username, password, id);
    this.purchasedProducts = purchasedProducts ?? [];
    cart = cart || [];
    address = address ?? "";
  }

  get purchasedProducts() {
    return this.#_purchasedProducts;
  }
  set purchasedProducts(ps) {
    this.#_purchasedProducts = ps;
  }
  get balance() {
    this.balance;
  }

  set balance(balance) {
    this.balance = balance;
  }
  addProduct(product, quantity) {
    this.#_purchasedProducts.push(product);
    product.quantity = quantity;

    product.buyer = this.id;
  }
  addToCart(product) {
    this.cart.find((p) => p.name === product.name)
      ? product.increment()
      : this.cart.push;
  }
  removeFromCart(product) {
    const index = this.products.findIndex((p) => p.name === product.name);
    this.products.splice(index, 1);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      balance: this.balance,
      cart: this.cart,
      address: this.address,
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
