import { Product } from "./Product.js";
import { Buyer } from "./buyer.js";
export default class PurchasedProduct extends Product {
  _buyer;
  _time;
  _date;

  constructor(
    name,
    price,
    quantity,
    picture,
    details,
    category,
    sellerId,
    date,
    time,
    buyer
  ) {
    super(name, price, quantity, picture, details, category);
    this.sellerId = sellerId;
    this.date = date;
    this.buyer = buyer;
  }

  set sellerId(id) {
    this.sellerId = id;
  }
  get buyer() {
    return this.buyer;
  }

  set buyer(buyer) {
    if (!(buyer instanceof Buyer)) {
      throw new Error("buyer must be an instance of Buyer");
    }
    this._buyer = buyer;
  }

  get time() {
    return this.time;
  }

  set time(time) {
    return this.time;
  }
  get date() {
    return this.date;
  }

  set date(d) {
    this.date = d;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      buyer: this.buyer,
      date: this.date,
      time: this.time,
    };
  }
  static fromJSON(object) {
    return new product(
      name,
      price,
      quantity,
      picture,
      details,
      category,
      sellerId,
      date,
      time,
      buyer
    );
  }
}
