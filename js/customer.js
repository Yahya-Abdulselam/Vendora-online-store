import User from "./user.js";

export default class Customer extends User {
  cart = [];
  address;
  paymentMethods;
  purchaseHistory = [];

  constructor(username, password) {
    super(username, password);

    this.balance = 1000;
  }
  set address(address) {
    this.address = address;
  }
  get address() {
    return this.address;
  }

  get balance() {
    this.balance;
  }
  get paymentMethods() {
    this.paymentMethods;
  }
  set paymentMethods(pm) {
    this.paymentMethods = pm;
  }
  addPurchase(product) {
    this.purchaseHistory.push;
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
  static fromJSON(object) {
    return new Customer(object.username,object.password);
    
  }
  toJSON() {
    return {
      ...super.toJSON(),
      balance: this.balance,
      cart: this.cart,
      address: this.address,
      paymentMethods: this.paymentMethods,
      purchaseHistory: this.purchaseHistory,
    };
  }
}
