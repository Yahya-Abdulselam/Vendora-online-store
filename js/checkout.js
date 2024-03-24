document.addEventListener("DOMContentLoaded", () =>{
    let productName = document.getElementById("order-name");
    let informationProductPrice = document.getElementById("information-product-price");
    let productAttribute = document.getElementById("product-attribute");

    let customer_name = document.getElementById("customer-name");
    let customer_address = document.getElementById("customer-address");
    let customer_city = document.getElementById("customer-city");

    let customerBalance = document.getElementById("customer-balance");


    let subtotal = document.getElementById("summary-product-price");
    let shipping = document.getElementById("shipping-price");
    let total = document.getElementById("total-price");

    

    const product_name = localStorage.getItem("productName") != null ? JSON.parse(localStorage.getItem("loggeduser")).address.full_name : productName.innerText;
    const product_price = localStorage.getItem("productPrice") != null ? localStorage.getItem("productPrice") : subtotal.innerText;
    const attribute = localStorage.getItem("productAttribute") != null ? localStorage.getItem("productAttribute") : productAttribute.innerText;

    const shipping_full_name = localStorage.getItem("loggeduser") != null ? JSON.parse(localStorage.getItem("loggeduser")).address.full_name : productName.innerText;
    const shipping_address = localStorage.getItem("loggeduser") != null ? JSON.parse(localStorage.getItem("loggeduser")).address.address_line : productName.innerText;

    // for some reason this doesnt work? you can replace it with any other attribute but city refuses to work
    const shipping_city = localStorage.getItem("loggeduser") != null ? JSON.parse(localStorage.getItem("loggeduser")).address.location : productName.innerText; 

    const customer_balance = localStorage.getItem("customerBalance") == null ? JSON.parse(localStorage.getItem("loggeduser")).customer_balance + " QAR" : productName.innerText;
    
    const shipping_price = 10;
    const total_price = product_price + shipping_price;
    

    productName.innerText = product_name;
    informationProductPrice.innerText = product_price;
    productAttribute.innerText = attribute;

    customer_name.innerText = shipping_full_name
    customer_address.innerText = shipping_address
    customer_city.innerText = shipping_city

    customerBalance.innerText = customer_balance;

    subtotal.innerText = product_price;
    shipping.innerText = shipping_price;
    total.innerText = total_price;
})