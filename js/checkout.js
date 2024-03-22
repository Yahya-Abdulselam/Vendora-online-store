document.addEventListener("DOMContentLoaded", () =>{
    let productName = document.getElementById("order-name");
    let informationProductPrice = document.getElementById("information-product-price");
    let productAttribute = document.getElementById("product-attribute");
    let customerBalance = document.getElementById("customer-balance");
    let subtotal = document.getElementById("summary-product-price");
    let shipping = document.getElementById("shipping-price");
    let total = document.getElementById("total-price");

    const name = localStorage.getItem("productName") != null ? localStorage.getItem("productName") : productName.innerText;
    const product_price = localStorage.getItem("productPrice") != null ? localStorage.getItem("productPrice") : productName.innerText;
    const attribute = localStorage.getItem("productAttribute") != null ? localStorage.getItem("productAttribute") : productName.innerText;
    const customer_balance = localStorage.getItem("customerBalance") != null ? localStorage.getItem("customerBalance") : productName.innerText;
    const shipping_price = 10;
    const total_price = product_price + shipping_price;
    

    productName.innerText = name;
    informationProductPrice.innerText = product_price;
    productAttribute.innerText = attribute;
    customerBalance.innerText = customer_balance;
    subtotal.innerText = product_price;
    shipping.innerText = shipping_price;
    total.innerText = total_price;
})