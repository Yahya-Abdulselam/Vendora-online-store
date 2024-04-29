/**
 * QUICK EXPLAINATION: for this to work, just give the buy button the class
 * "buyButton" and then give it the same value as the item's id in the json
 * file.
 */

document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buyButton");
  const quantityText = document.querySelectorAll(".quantity");

  /** it checks up on all of the buttons if they're pressed or not, if they are then it would save the item in cart and take the user to the cart. But if the user isn't logged in when the button
   * is pressed it will save the item, take the user to login to login, and then take them back.
   */
  for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener("click", async () => {
      // check if user is logged in
      if (localStorage.getItem("loggeduser") != null) {
        const product = JSON.parse(localStorage.getItem("products")).find(
          (product) => product.name + product.sellerId === buyButtons[i].value
        );

        // put product in cart and then move to the checkout.
        if (product) {
          product.quantity = quantityText[i].textContent;

          localStorage.setItem("itemInCart", JSON.stringify(product));
          window.location.href = "/pages/checkout-address.html";
        } else {
          alert("Product doesn't exist!");
        }
      } else {
        const product = JSON.parse(localStorage.getItem("products")).find(
          (product) => product.name + product.sellerId === buyButtons[i].value
        );

        // save product in cart, and move to login
        product.quantity = quantityText[i].textContent;
        localStorage.setItem("itemInCart", JSON.stringify(product));
        window.location.href = "/pages/checkout-address.html";
        localStorage.setItem("destinationAfterLogin", "/pages/checkout.html");
        window.location.href = "/pages/login.html";
      }
    });
  }
});
/**
 * DONT DELETE!
 * It does the same as above, but for JSON files. can be used for part 2!
 */
// await fetch("../data/products.json")
// .then((response) => response.json())
// .then((data) => {
//     const product = data.find(
//         (product) => product.id == button.value
//     );

//     if (product) {
//         product.quantity = 1
//         localStorage.setItem("itemInCart", JSON.stringify(product))
//         window.location.href = "../pages/checkout/checkout-address.html"
//     } else {
//         alert("product doesn't exist")
//     }
// })
