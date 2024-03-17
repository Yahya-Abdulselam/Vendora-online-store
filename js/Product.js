class product {
  sellerId;
  constructor(name, price, quantity, picture, details, category) {
    this.name = name;
    price(price);
    quantity(quantity);
    this.picture = picture;
    this.details = details;
    this.category = category;
  }
  get sellerId() {
    return this.sellerId;
  }

  set sellerId(id) {
    this.sellerId = id;
  }

  get name() {
    return this.name;
  }

  get price() {
    return this.price;
  }
  get quantity() {
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
  set quantity(q) {
    if (this.q > 0) {
      this.quantity = this.quantity;
    }
  }

  addQuantity(q) {
    this.quantity += q;
  }
  increment() {
    this.quantity++;
  }
  decrement() {
    this.quantity--;
  }
  static fromJSON(object) {
    return new product();
  }
  toJSON() {
    return {
      picture: this.picture,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      details: this.details,
      category: this.category,
      sellerId: this.sellerId,
    };
  }
  static fromJSON(object) {
    return new product();
  }
}
