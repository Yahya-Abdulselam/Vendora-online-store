/**
 * QUICK EXPLAINATION: for this to work, just give the buy button the class
 * "buyButton" and then give it the same value as the item's id in the json
 * file.
 */

document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buyButton")
    buyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            if (localStorage.getItem("loggeduser") != null) {
                const product = JSON.parse(localStorage.getItem("products")).find(
                    (product) => product.name + product.sellerId == button.value
                );

                if (product) {
                    product.quantity = 1
                    localStorage.setItem("itemInCart", JSON.stringify(product))
                    window.location.href = "../pages/checkout/checkout-address.html"
                } else {
                    alert("product doesn't exist")
                }

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
            } else {
                location.href = "../login.html"
            }
        })
    });
    
})