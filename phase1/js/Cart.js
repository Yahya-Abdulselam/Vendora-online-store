class Cart {
    #customerId;
    #cartId;
    #itemsInCart;
    #sumCost;

    constructor(customerId){
        this.#customerId = customerId;
        this.#cartId = this.generateid();
        this.#itemsInCart = [];
        this.#sumCost = 0;
    }

    getCustomerId(){
        return this.#customerId;
    }

    getCartId(){
        return this.#cartId;
    }

    getItemsInCart(){
        return this.#itemsInCart;
    }

    getSumCost(){
        return this.#sumCost;
    }

    generateid(){
        return nanoid(10);
    }

    addToSum(price){
        this.#sumCost += price;
    }

    addToCart(product){
        this.#itemsInCart.push(product);
        this.addToSum(product.price);
    }

    toJSON(){
        return {
            customerId: this.#customerId,
            cartId: this.#cartId,
            itemsInCart: this.#itemsInCart,
            sumCost: this.#sumCost,
        };
    }
}