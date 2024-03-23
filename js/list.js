import Product from "../js/Product.js";

document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");

  products.forEach((element) => {
    Product.fromJson(element);
  });

  const renderProduct = (product) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const img = document.createElement("img");
    img.className = "image";
    img.src = product.picture;
    img.alt = product.name;
    itemDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.className = "info";
    itemDiv.appendChild(infoDiv);

    const name = document.createElement("h2");
    name.className = "name";
    name.textContent = product.name;
    infoDiv.appendChild(name);

    const price = document.createElement("h3");
    price.className = "price";
    price.textContent = product.price;
    infoDiv.appendChild(price);

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = product.details;
    infoDiv.appendChild(desc);

    const buyItemDiv = document.createElement("div");
    buyItemDiv.className = "buy-item";
    infoDiv.appendChild(buyItemDiv);

    const cartAddDiv = document.createElement("div");
    cartAddDiv.className = "cart-add";
    buyItemDiv.appendChild(cartAddDiv);

    const minusPicture = document.createElement("picture");
    minusPicture.className = "minus";
    const sourceMinus = document.createElement("source");
    sourceMinus.srcset = "media/icons/darktheme-icons/square-minus(1).svg";
    sourceMinus.media = "(prefers-color-scheme: dark)";
    const imgMinus = document.createElement("img");
    imgMinus.src = "/media/icons/square-minus.svg";
    imgMinus.width = "20";
    minusPicture.appendChild(sourceMinus);
    minusPicture.appendChild(imgMinus);
    cartAddDiv.appendChild(minusPicture);

    const quantityP = document.createElement("p");
    quantityP.className = "quantity";
    quantityP.textContent = "0";
    cartAddDiv.appendChild(quantityP);

    const plusPicture = document.createElement("picture");
    plusPicture.className = "plus";
    const sourcePlus = document.createElement("source");
    sourcePlus.media = "(prefers-color-scheme: dark)";
    const imgPlus = document.createElement("img");
    imgPlus.src = "/media/icons/square-plus.svg";
    imgPlus.width = "20";

    minusPicture.addEventListener("click", () => {
      const q = Number(quantityP.textContent);
      if (q > 0) {
        quantityP.textContent = (q - 1).toString();
      }
    });
    plusPicture.addEventListener("click", () => {
      const q = Number(quantityP.textContent);

      quantityP.textContent = (q + 1).toString();
    });

    plusPicture.appendChild(sourcePlus);
    plusPicture.appendChild(imgPlus);
    cartAddDiv.appendChild(plusPicture);

    const buyButton = document.createElement("button");
    buyButton.className = "buy";
    buyButton.textContent = "Buy now";
    infoDiv.appendChild(buyButton);

    return itemDiv;
  };
  const renderProducts = () => {
    const container = document.querySelector("#list-items");
    container.replaceChildren();
    if (products.length) {
      products
        .filter((p) => p.quantity > 0 && p.category === category)
        .forEach((p) => {
          container.appendChild(renderProduct(p));
        });
    }
  };

  renderProducts();
});
