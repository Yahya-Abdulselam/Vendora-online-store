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
            "City": customerCity.value
        }

        let user = JSON.parse(localStorage.getItem("loggeduser"))
        user.address = newAddress
        let itemProduct = JSON.parse(localStorage.getItem("itemInCart"))
        itemProduct.quantity = quantityInput.value
        localStorage.setItem("loggeduser", JSON.stringify(user))
        localStorage.setItem("itemInCart", JSON.stringify(itemProduct))
    })
})