/**
 * when the page is loaded, it takes the user's information and sets up the information in the input fields, and the user can change it if they wish. If the user presses the button to save
 * it would move on to check out and saves any changed to the data thats been given.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const customerName = document.getElementById("full_name");
  const customerAddressLine = document.getElementById("address-line");
  const customerCity = document.getElementById("city");
  const customerZipCode = document.getElementById("zip-code");
  const customerMobile = document.getElementById("mobile");
  const quantityInput = document.querySelector(".quantityInput");

  const shipping_full_name = JSON.parse(
    localStorage.getItem("loggeduser")
  ).full_name;
  const shipping_address = JSON.parse(
    localStorage.getItem("loggeduser")
  ).address_line;
  const shipping_city = JSON.parse(localStorage.getItem("loggeduser")).city;
  const shipping_zipcode = JSON.parse(
    localStorage.getItem("loggeduser")
  ).zip_code;
  const shipping_mobile = JSON.parse(
    localStorage.getItem("loggeduser")
  ).phone_number;
  const itemQuantity = JSON.parse(localStorage.getItem("itemInCart")).quantity;

  document
    .querySelector(".save-address")
    .addEventListener("click", async () => {

      customerName.value = shipping_full_name;
      customerAddressLine.value = shipping_address;
      customerCity.value = shipping_city;
      customerZipCode.value = shipping_zipcode;
      customerMobile.value = shipping_mobile;
      quantityInput.value = itemQuantity;

      let user = JSON.parse(localStorage.getItem("loggeduser"));
      user.full_name = customerName.value;
      user.zip_code = customerZipCode.value;
      user.address_line = customerAddressLine.value;
      user.phone_number = customerMobile.value;
      user.city = customerCity.value;

      let itemProduct = JSON.parse(localStorage.getItem("itemInCart"));

      itemProduct.quantity = quantityInput.value;
      localStorage.setItem("itemInCart", JSON.stringify(itemProduct));
  
      const res = await fetch(`/api/buyapi/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          user
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        console.log(updated);
      }
    });
});
