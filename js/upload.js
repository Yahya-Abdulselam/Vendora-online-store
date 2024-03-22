
document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let seller = JSON.parse(localStorage.getItem("seller") ?? "{}"); //when the user log in we store his data

  seller.addProduct = (product, quantity) => {
    product.sellerId(this.id);
  };
  const uploadButton = document.querySelector("#upload-item");
  const imageChoice = document.querySelector("#prod-image");
  const imgShowed = document.querySelector("#show-prod");
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
      window.location.href = "pages/seller.html"; //when finish uploading go back to seller page
    }
  });
});
