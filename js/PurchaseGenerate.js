document.addEventListener("DOMContentLoaded", () => {
  let purchasedProducts = JSON.parse(
    localStorage.getItem("purchasedProducts") ?? "[]"
  );
  let buyer = JSON.parse(localStorage.getItem("loggeduser") ?? "{}"); //when the user log in we store his data(current seller)

  const renderProductPurchased = (product) => {
    const productLi = document.createElement("ul");
    productLi.classList.add("product-item");

    const image = document.createElement("img");
    image.classList.add("prod-image");
    const li1 = document.createElement("li");
    li1.appendChild(image);

    const prodName = document.createElement("li");

    prodName.classList.add("prod-name");

    const prodPrice = document.createElement("li");

    prodPrice.classList.add("prod-price");

    const prodQty = document.createElement("li");

    prodQty.classList.add("prod-quantity");

    const prodDate = document.createElement("li");

    prodDate.classList.add("prod-date");

    image.src = product.image;
    prodName.textContent = product.name;
    prodPrice.textContent = product.price;
    prodQty.textContent = product.quantity;
    prodDate.textContent=product.date;

    li1.appendChild(image);
    productLi.appendChild(li1);
    productLi.appendChild(prodName);
    productLi.appendChild(prodPrice);
    productLi.appendChild(prodQty);
    productLi.appendChild(prodDate);



    return productLi;
  };
  const renderProductsPurchased = () => {
    const productLi = document.querySelector("#list-items");

    productLi.replaceChildren();

    purchasedProducts
      .filter((p) => {
       
  return      p.buyer.id === buyer.id;
      })
      .forEach((p) => productLi.appendChild(renderProductPurchased(p)));
  };
  renderProductsPurchased();
});