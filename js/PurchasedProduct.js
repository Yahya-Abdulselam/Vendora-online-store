class PurchasedProduct {
  sellerId;
  buyer;
  time;
  date;
  quantity;

  constructor(name, price, picture, details, category) {
    this.name = name;
    price(price);

    this.picture = picture;
    this.details = details;
    this.category = category;
  }
  set quantity(q) {
    if (this.q > 0) {
      this.quantity = this.quantity;
    }
  }
  get quantity() {
    return this.price;
  }
  get sellerId() {
    return this.sellerId;
  }

  set sellerId(id) {
    this.sellerId = id;
  }
  get buyer() {
    return this.buyer;
  }

  set buyer(Id) {
    this.buyer = id;
  }

  get name() {
    return this.name;
  }

  get price() {
    return this.price;
  }

  get picture() {
    return this.picture;
  }
  get details() {
    return this.details;
  }
  set price(price) {
    if (this.price >= 0) {
      this.price = this.price;
    }
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
  static fromJSON(object) {
    return new product();
  }
  toJSON() {
    return {
      picture: this.picture,
      name: this.name,
      price: this.price,

      details: this.details,
      category: this.category,
      sellerId: this.sellerId,
      buyer: this.buyer,
    };
  }
  static fromJSON(object) {
    return new product();
  }
}
