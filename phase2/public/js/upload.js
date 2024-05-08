import Product from "./Product.js";
import Seller from "./seller.js";

async function fetchSellerData() {
  const seller = JSON.parse(localStorage.getItem("loggedseller"))
  const response = await fetch(`/api/sellapi/${seller.id}`, {
    method: "GET",
  });
  const data = await response.json()
  return data
}

(async () => {
  const sellerData = await fetchSellerData()
  console.log(JSON.stringify(sellerData))
})

/**
 * this gets the information about the product and then does a validity check. If its not valid, it resets everything. Otherwise, it saves the product's information, pushing it to the seller's
 * products and to the available products on the site.
 */
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#prod-name").value = "";
  document.querySelector("#prod-price").value = "";
  document.querySelector("#prod-desc").value = "";
  document.querySelector("#prod-quantity").value = "";
  document.querySelector("#prod-category").selectedIndex = 0;
  document.querySelector("#prod-image").value = "";

  //prepare all vallues needed from storage
  // let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let sellerParsed = fetchSellerData() //when the user log in we store his data
  let seller = Seller.fromJSON(sellerParsed, sellerParsed.id);

  const sizeLimit = 2 * 1024 * 1024; // max size local storage can handle

  const uploadButton = document.querySelector("#upload-item");
  const imageChoice = document.querySelector("#prod-image");
  const imgShowed = document.querySelector("#show-prod");
  const form = document.querySelector("form");
  imageChoice.addEventListener("change", () => {
    let img = imageChoice.files[0];
    if (!img) {
      return; // No file selected, exit the function
    }

    if (img.size > sizeLimit) {
      document.querySelector("#prod-image-error").textContent =
        "Image size must not exceed 2 MB.";

      return;
    } else {
      document.querySelector("#prod-image-error").textContent = "";

      const imgShowed = document.querySelector("#show-prod");
      imgShowed.src = URL.createObjectURL(img);
      imgShowed.style.width = "40%";
    }
  });

  uploadButton.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      const pName = document.querySelector("#prod-name").value.trim();
      const pPrice = document.querySelector("#prod-price").value.trim();
      const pDetails = document.querySelector("#prod-desc").value.trim();

      const pQuantity = document.querySelector("#prod-quantity").value.trim();
      const pCategory = document.querySelector("#prod-category").value.trim();
      /*get values of form*/
      let isValid = true;

      /*validate the values */
      if (!pName) {
        document.querySelector("#prod-name-error").textContent =
          "Please enter a product name.";
        isValid = false;
      } else {
        document.querySelector("#prod-name-error").textContent = "";
      }
      if (!pPrice || isNaN(pPrice) || parseFloat(pPrice) <= 0) {
        document.querySelector("#prod-price-error").textContent =
          "Please enter a valid price.";
        isValid = false;
      } else {
        document.querySelector("#prod-price-error").textContent = "";
      }
      if (!pDetails) {
        document.querySelector("#prod-desc-error").textContent =
          "Please enter a product description.";
        isValid = false;
      } else {
        document.querySelector("#prod-desc-error").textContent = "";
      }
      if (!pQuantity || isNaN(pQuantity) || parseInt(pQuantity, 10) <= 0) {
        document.querySelector("#prod-quantity-error").textContent =
          "Please enter a valid quantity a number>0.";
        isValid = false;
      } else {
        document.querySelector("#prod-quantity-error").textContent = "";
      }
      if (!pCategory) {
        document.querySelector("#prod-category-error").textContent =
          "Please select a category.";
        isValid = false;
      } else {
        document.querySelector("#prod-category-error").textContent = "";
      }
      if (imageChoice.files.length === 0) {
        document.querySelector("#prod-image-error").textContent =
          "Please upload an image.";
        isValid = false;
      } else {
        document.querySelector("#prod-image-error").textContent = "";
      }
      if (isValid) {
        /*change image to base 64 so it can be stored in local storage*/
        const img = await toBase64(imageChoice.files[0]);

        const p = {
          name: pName,
          price: parseFloat(pPrice),
          quantity: parseInt(pQuantity),
          picture: img,
          description: pDetails,

          category: pCategory,
        };

        // const found = prods.find((p) => p.name === pName);
        let existingProduct = {};
        const res = await fetch(
          `/api/sellapi/${seller.id}/?product-name=${p.name}`
        );
        if (res.ok) {
          existingProduct = await res.json();
        }
        console.log(existingProduct?.name);
        console.log(existingProduct === true);
        if (existingProduct?.id) {
          // found.quantity += 1; /*if found only increase the quantity*/
          console.log(existingProduct === true);
          const res = await fetch(
            `/api/sellapi/${seller.id}/${existingProduct.id}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                quantity: existingProduct.quantity + p.quantity,
              }),
            }
          );
          if (res.ok) {
            await res.json();
          }
          if (!res.ok) {
        
          }
        } else {
        
          const res = await fetch(`/api/sellapi/${seller.id}`, {
            method: "POST",
            body: JSON.stringify(p),
          });
          if (res.ok) {
            await res.json();
          }
          if (!res.ok) {
         
          }
        }
        form.reset();
        // sellerParsed.products.push(product);
        // seller.addProduct(p, pQuantity); /*make sure seller has the product*/
        // localStorage.setItem("products", JSON.stringify(products));

        // localStorage.setItem("loggedseller", JSON.stringify(seller));

        if (p) {
          form.reset();
          document.querySelector("#prod-image").value = "";
          window.location.href = "/pages/seller.html"; //when finish uploading go back to seller page
        }

        //toBase method was taken from geekforgeeks.org

        function toBase64(image) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      console.log(error);
    }
  });
});
