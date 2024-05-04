/**
 * when the page is loaded, it takes the user's information and sets up the information in the input fields, and the user can change it if they wish. If the user presses the button to save
 * it would move on to check out and saves any changed to the data thats been given.
 */

export default async function fetchUserData() {
    return await fetch("../../app/api/buyapi/[buyer]/route.js")
}

export default async function fetchCartProduct() {
    return await fetch("../../app/api/buyapi/[cart]/route.js")
}

document.addEventListener("DOMContentLoaded", () =>{
    const customerName = document.getElementById("full_name");
    const customerAddressLine = document.getElementById("address-line");
    const customerCity = document.getElementById("city");
    const customerZipCode = document.getElementById("zip-code");
    const customerMobile = document.getElementById("mobile");
    const quantityInput = document.querySelector(".quantityInput");

    const shipping_full_name = JSON.parse(localStorage.getItem("loggeduser")).address.full_name;
    const shipping_address = JSON.parse(localStorage.getItem("loggeduser")).address.address_line;
    const shipping_city = JSON.parse(localStorage.getItem("loggeduser")).address.city;
    const shipping_zipcode = JSON.parse(localStorage.getItem("loggeduser")).address.zip_code;
    const shipping_mobile = JSON.parse(localStorage.getItem("loggeduser")).address.phone_number;
    const itemQuantity = JSON.parse(localStorage.getItem("itemInCart")).quantity;

    customerName.value = shipping_full_name;
    customerAddressLine.value = shipping_address;
    customerCity.value = shipping_city;
    customerZipCode.value = shipping_zipcode;
    customerMobile.value = shipping_mobile;
    quantityInput.value = itemQuantity

    document.querySelector(".save-address").addEventListener("click", () => {
        const newAddress = {
            "full_name": customerName.value,
            "zip_code": customerZipCode.value,
            "address_line": customerAddressLine.value,
            "phone_number": customerMobile.value,
            "city": customerCity.value
        }

        let user = fetchUserData()
        user.address = newAddress
        let itemProduct = fetchCartProduct().product
        itemProduct.quantity = quantityInput.value
        localStorage.setItem("loggeduser", JSON.stringify(user))
        localStorage.setItem("itemInCart", JSON.stringify(itemProduct))
    })
})