import User from "./user.js"

class Customer extends User {
    constructor(username, password, userId, address, cart, 
        paymentMethods){
        super(username, password, userId)
        this.address = address
        this.cart = cart
        this.paymentMethods = paymentMethods
    }
}