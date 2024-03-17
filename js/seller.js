import User from "./user.js"

class Seller extends User {
    constructor(username, password, userId, address, offeredItem){
        super(username, password, userId)
        this.address = address
        this.cart = cart
        this.paymentMethods = paymentMethods
        this.offeredItem = offeredItem
    }
}