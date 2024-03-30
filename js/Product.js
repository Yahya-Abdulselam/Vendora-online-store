export default class Product {
  #_name;
  #_price;
  #_quantity;
  #_picture;
  #_details;
  #_category;
  #_sellerId;

  constructor(name, price, quantity, picture, details, category) {
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
    this.picture = picture;
    this.details = details;
    this.category = category;

  }



  get name() {
    return this.#_name;
  }
  set name(n) {
    this.#_name = n;
  }

  get price() {
    return this.#_price;
  }
  set price(p) {
    let priceValue = Number(p);
    if (priceValue >= 0) {
      this.#_price = priceValue;
    }
  }

  get quantity() {
    return this.#_quantity;
  }
  set quantity(q) {
    let quantityValue = Number(q);
    if (quantityValue > 0) {
      this.#_quantity = quantityValue;
    }
  }

  get picture() {
    return this.#_picture;
  }
  set picture(p) {
    this.#_picture = p;
  }

  get details() {
    return this.#_details;
  }
  set details(d) {
    this.#_details = d;
  }

  get category() {
    return this.#_category;
  }
  set category(c) {
    this.#_category = c;
  }

  addQuantity(q) {
    this.#_quantity += Number(q);
  }

  increment() {
    this.#_quantity++;
  }

  decrement() {
    if (this.#_quantity > 0) {
      this.#_quantity--;
    }
  }
  decrementQ(q) {
    if (this.#_quantity-q>= 0) {
      this.#_quantity -= q;
    }
  }

  toJSON() {
    return {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      picture: this.picture,
      details: this.details,
      category: this.category,

    };
  }

  static fromJSON(object) {
    const product = new Product(
      object.name,
      object.price,
      object.quantity,
      object.picture,
      object.details,
      object.category
    );

    return product;
  }
}
