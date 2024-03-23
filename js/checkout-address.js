document.addEventListener("DOMContentLoaded", () =>{
    let customerName = document.getElementById("full_name");
    let customerAddressLine = document.getElementById("address-line");
    let customerCity = document.getElementById("city");
    let customerZipCode = document.getElementById("zip-code");
    let customerMobile = document.getElementById("mobile");

    const shipping_full_name = JSON.parse(localStorage.getItem("loggeduser")).address.full_name;
    const shipping_address = JSON.parse(localStorage.getItem("loggeduser")).address.address_line;
    const shipping_city = JSON.parse(localStorage.getItem("loggeduser")).address.location;
    const shipping_zipcode = JSON.parse(localStorage.getItem("loggeduser")).address.zip_code;
    const shipping_mobile = JSON.parse(localStorage.getItem("loggeduser")).address.phone_number;

    customerName.value = shipping_full_name;
    customerAddressLine.value = shipping_address;
    customerCity.value = shipping_city;
    customerZipCode.value = shipping_zipcode;
    customerMobile.value = shipping_mobile;

    document.getElementById("save-address").addEventListener("click", () => {
        const newAddress = {
            "full_name": customerName.value,
            "zip_code": customerZipCode.value,
            "address_line": customerAddressLine.value,
            "phone_number": customerMobile.value,
            "City": customerCity.value
        }

        let user = JSON.parse(localStorage.getItem("loggeduser"))
        user.address = newAddress
        localStorage.setItem("loggeduser", JSON.stringify(user))
    })
})