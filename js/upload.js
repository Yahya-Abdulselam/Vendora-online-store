
document.addEventListener("DOMContentLoaded", () => {

  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let seller = JSON.parse(localStorage.getItem("seller") ?? "[]"); //when the user log in we store his data
  const uploadButton = document.querySelector("#upload-item");
  uploadButton.addEventListener("click", () => {
    const pName = document.querySelector("#prod-name");
    const pPrice = document.querySelector("prod-price");
    const pDetails = document.querySelector(".product-description");
    const pImage = document.querySelector("prod-image");
    const pQuantity = document.querySelector("prod-quantity");
    const pCategory = document.querySelector("prod-category");
    const product = new product(
      pName,
      pPrice,
      pQuantity,
      pImage,
      pDetails,
      pQuantity
    );
    products.push(product);
    seller.addProduct(product, pQuantity);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("seller", JSON.stringify(seller));
    if (product) {
      window.location.href = "pages/seller.html"; //when finish uploading go back to seller page
    }
  });
});
