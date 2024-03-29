import Product from "../js/Product.js";
import Seller from "./seller.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#prod-name").value = "";
  document.querySelector("#prod-price").value = "";
  document.querySelector("#prod-desc").value = "";
  document.querySelector("#prod-quantity").value = "";
  document.querySelector("#prod-category").selectedIndex = 0;
  document.querySelector("#prod-image").value = "";
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let sellerParsed = JSON.parse(localStorage.getItem("loggedseller")); //when the user log in we store his data
  let seller = Seller.fromJSON(sellerParsed);

  const sizeLimit = 1.6 * 1024 * 1024;

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
      document.getElementById("prod-image-error").textContent =
        "Image size must not exceed 1.6MB.";

      return;
    } else {
      document.getElementById("prod-image-error").textContent = "";

      const imgShowed = document.querySelector("#show-prod");
      imgShowed.src = URL.createObjectURL(img);
      imgShowed.style.width = "40%";
    }
  });
  uploadButton.addEventListener("click", async () => {
    const pName = document.querySelector("#prod-name").value.trim();
    const pPrice = document.querySelector("#prod-price").value.trim();
    const pDetails = document.querySelector("#prod-desc").value.trim();

    const pQuantity = document.querySelector("#prod-quantity").value.trim();
    const pCategory = document.querySelector("#prod-category").value.trim();
    let isValid = true;

    if (!pName) {
      document.getElementById("prod-name-error").textContent =
        "Please enter a product name.";
      isValid = false;
    } else {
      document.getElementById("prod-name-error").textContent = "";
    }
    if (!pPrice || isNaN(pPrice) || parseFloat(pPrice) <= 0) {
      document.getElementById("prod-price-error").textContent =
        "Please enter a valid price.";
      isValid = false;
    } else {
      document.getElementById("prod-price-error").textContent = "";
    }
    if (!pDetails) {
      document.getElementById("prod-desc-error").textContent =
        "Please enter a product description.";
      isValid = false;
    } else {
      document.getElementById("prod-desc-error").textContent = "";
    }
    if (!pQuantity || isNaN(pQuantity) || parseInt(pQuantity, 10) <= 0) {
      document.getElementById("prod-quantity-error").textContent =
        "Please enter a valid quantity a number>0.";
      isValid = false;
    } else {
      document.getElementById("prod-quantity-error").textContent = "";
    }
    if (!pCategory) {
      document.getElementById("prod-category-error").textContent =
        "Please select a category.";
      isValid = false;
    } else {
      document.getElementById("prod-category-error").textContent = "";
    }
    if (imageChoice.files.length === 0) {
      document.getElementById("prod-image-error").textContent =
        "Please upload an image.";
      isValid = false;
    } else {
      document.getElementById("prod-image-error").textContent = "";
    }
    if (isValid) {
      const img = await toBase64(imageChoice.files[0]);

      const product = new Product(
        pName,
        pPrice,
        pQuantity,
        img,
        pDetails,
        pCategory
      );
      const found = products.find((p) => (p.name ===product.name));
      if (found) {
        found.quantity += 1;
      } else {
        products.push(product);
  
      }
      console.log(products);
   
      // sellerParsed.products.push(product);
      seller.addProduct(product, pQuantity);
      localStorage.setItem("products", JSON.stringify(products));
      console.log(products);

      localStorage.setItem("loggedseller", JSON.stringify(seller));

      if (product) {
        form.reset();
        document.querySelector("#prod-image").value = "";
        window.location.href = "pages/seller.html"; //when finish uploading go back to seller page
      }

      //toBase method was copied from google

      function toBase64(image) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }
    }
  });
});
