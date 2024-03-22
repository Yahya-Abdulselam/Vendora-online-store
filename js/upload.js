import { Product } from "./Product.js";
import { Seller } from "./seller.js";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#prod-name").value = "";
  document.querySelector("#prod-price").value = "";
  document.querySelector("#prod-desc").value = "";
  document.querySelector("#prod-quantity").value = "";
  document.querySelector("#prod-category").selectedIndex = 0;
  document.querySelector("#prod-image").value = "";
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let sellerParsed = JSON.parse(localStorage.getItem("seller")); //when the user log in we store his data
  let seller = Seller.fromJson(sellerParsed);

  const uploadButton = document.querySelector("#upload-item");
  const imageChoice = document.querySelector("#prod-image");
  const imgShowed = document.querySelector("#show-prod");
  const form = document.querySelector("form");
  imageChoice.addEventListener("change", () => {
    let img = imageChoice.files[0];
    imgShowed.src = URL.createObjectURL(img);
    imgShowed.style.width = "40%";
  });
  uploadButton.addEventListener("click", () => {
    const pName = document.querySelector("#prod-name").value.trim();
    const pPrice = document.querySelector("#prod-price").value.trim();
    const pDetails = document.querySelector("#prod-desc").value.trim();
    const imgShowed = document.querySelector("#show-prod");
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
      const product = new Product(
        pName,
        pPrice,
        pQuantity,
        imgShowed.src,
        pDetails
      );

      products.push(product);
      seller.addProduct(product, pQuantity);
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("seller", JSON.stringify(seller));
      if (product) {
        form.reset();
        document.querySelector("#prod-image").value = "";
        window.location.href = "pages/seller.html"; //when finish uploading go back to seller page
      }
    }
  });
});
