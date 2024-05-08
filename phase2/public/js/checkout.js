/**
 * This sets up both the product's information and the user's information in the checkout, and then afterwards if the buy button is pressed, then it will save the bought product to the user's
 * purchase history, it will update the seller's product's quantity, and it will update the product in the list of all products accordingly.
 */

async function fetchProducts() {
  const response = await fetch(`/api/products`, {
    method: "GET",
  });
  const data = await response.json()
  return data
}

document.addEventListener("DOMContentLoaded", () => {
  let purchasedProducts = JSON.parse(
    localStorage.getItem("purchasedProducts") ?? "[]"
  );
  const productInCart = JSON.parse(localStorage.getItem("itemInCart"))
  let productName = document.getElementById("order-name");
  let informationProductPrice = document.getElementById(
    "information-product-price"
  );
  let productAttribute = document.getElementById("product-attribute");

  let customer_name = document.getElementById("customer-name");
  let customer_address = document.getElementById("customer-address");
  let customer_city = document.getElementById("customer-city");
  let product_quantity = document.querySelector("#product-quantity");

  let customerBalance = document.getElementById("customer-balance");

  let subtotal = document.getElementById("summary-product-price");
  let shipping = document.getElementById("shipping-price");
  let total = document.getElementById("total-price");

  let imageElement = document.querySelector("#order-product-image");

  const product_name =
    productInCart != null ? productInCart.name : productName.innerText;
  const product_price =
    productInCart != null
      ? productInCart.price * productInCart.quantity
      : subtotal.innerText;
  const attribute =
    productInCart != null ? productInCart.catId : productAttribute.innerText;

  const shipping_full_name =
    localStorage.getItem("loggeduser") != null
      ? JSON.parse(localStorage.getItem("loggeduser")).full_name
      : productName.innerText;
  const shipping_address =
    localStorage.getItem("loggeduser") != null
      ? JSON.parse(localStorage.getItem("loggeduser")).address_line
      : productName.innerText;

  const product_quantity_amount = Number(
    JSON.parse(localStorage.getItem("itemInCart")).quantity
  );

  const shipping_city =
    localStorage.getItem("loggeduser") != null
      ? JSON.parse(localStorage.getItem("loggeduser")).city
      : productName.innerText;

  const customer_balance =
    localStorage.getItem("customerBalance") == null
      ? JSON.parse(localStorage.getItem("loggeduser")).balance + " QAR"
      : productName.innerText;

  product_quantity.innerText = product_quantity_amount + " Pieces";

  imageElement.src = productInCart.picture;

  const shipping_price = 10;
  const total_price = product_price + shipping_price;

  productName.innerText = product_name;
  informationProductPrice.innerText = "Price: " + product_price;
  productAttribute.innerText = "Category: " + attribute;

  customer_name.innerText = shipping_full_name;
  customer_address.innerText = shipping_address;
  customer_city.innerText = shipping_city;

  customerBalance.innerText = customer_balance;

  subtotal.innerText = product_price;
  shipping.innerText = shipping_price;
  total.innerText = total_price;

  // let product;
  // let index;
  // let products

  // (async () => {
  //   products = await fetchProducts()
    
  //   for (let i = 0; i < products.length; i++) {
  //     if (
  //       productInCart.name + productInCart.sellerID ===
  //       products[i].name + products[i].sellerID
  //     ) {
  //       product = products[i];
  //       console.log(product)
  //       index = i;
  //       const itemQuantityText = document.querySelector("#in-stock");
  //       itemQuantityText.textContent =
  //         products[i].quantity > 0
  //           ? products[i].quantity + " left in the stock"
  //           : "Out of stock";

  //       break;
  //     }
  //   }
  // })();
  

  document.querySelector(".confirmButton").addEventListener("click", async () => {
    /**
     * First, grab the information and turn it into a transaction and turn it into a transaction and use PUT.
     * Second, use PATCH to update the quantity of the items.
     */
    let user = JSON.parse(localStorage.getItem("loggeduser"));
    if (
      user.balance >= total_price &&
      product.quantity >= productInCart.quantity
    ) {
      console.log("buying!")
      user.customer_balance = user.customer_balance - total_price;

      localStorage.setItem("loggeduser", JSON.stringify(user));
      const currentDateLocale = new Date().toLocaleString();
      const purchased = {
        name: product_name,
        price: product_price,
        quantity: productInCart.quantity,
        picture: productInCart.picture,
        details: productInCart.details,
        category: productInCart.category,

        date: currentDateLocale,
        buyer: user,
        productId: productInCart.id,
      };

      const transaction = {
        amountPaid: product_price,
        quantityBought: productInCart.quantity,
        buyerId: user.id,
        productId: product.id
      }

      products[index].quantity = product.quantity - productInCart.quantity;
      localStorage.setItem("products", products);
      const loggedSeller = JSON.parse(localStorage.getItem("loggedseller"));
      if (loggedSeller && loggedSeller.products) {
        loggedSeller.products.forEach((sellerProduct) => {
          const globalProduct = products.find(
            (p) =>
              p.name === sellerProduct.name && p.sellerId === loggedSeller.id
          );
          if (globalProduct) {
            sellerProduct.quantity = globalProduct.quantity;
          }
        });
        localStorage.setItem("loggedseller", JSON.stringify(loggedSeller));
      }
      purchasedProducts.push(purchased);

      // update 
      const resUser = await fetch(
        `/api/buyapi/${user.id}`,
        {
          method: "PATCH",
          body: localStorage.getItem("loggeduser")
        }
      );

      const resTrans = await fetch(
        `/api/buyapi/${user.id}/transaction`,
        {
          method: "POST",
          body: JSON.stringify(transaction),
        }
      );
      

      localStorage.removeItem("itemInCart");
      const popUpWindow = document.querySelector("#model");
      popUpWindow.classList.add("open");
      const okButton = document.querySelector("#okButton");

      okButton.addEventListener("click", () => {
        location.replace("/pages/main.html");


      });
    } else if (product.quantity - productInCart.quantity < 0) {
      document.querySelector("#prod-quantity-error").textContent =
        "There's not enough items in stock.";
    } else {
      document.querySelector("#prod-balance-error").textContent =
        "Insufficient balance";
    }
  });
});
