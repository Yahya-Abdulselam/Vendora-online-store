import { Seller } from "./seller";
document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let purchasedProducts = JSON.parse(
    localStorage.getItem("purchasedProducts") ?? "[]"
  );
  let sellerParsed = JSON.parse(localStorage.getItem("seller")); //when the user log in we store his data(current seller)
  let seller = Seller.fromJson(sellerParsed);
  const renderProductSale = (product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("itemsale");
    const image = document.createElement("img");
    const table = document.createElement("table");
    const row1 = document.createElement("tr");
    const name = document.createElement("td");
    name.classList.add("item-name");

    const row2 = document.createElement("tr");
    const price = document.createElement("td");
    price.classList.add("price");

    const row3 = document.createElement("tr");
    const status = document.createElement("table");
    status.classList.add("status");

    productDiv.appendChild(image);
    productDiv.appendChild(table);
    table.appendChild(row1);
    table.appendChild(row2);
    table.appendChild(row3);
    row1.appendChild(name);
    row2.appendChild(price);
    row3.appendChild(status);

    image.src = product.image;
    name.textContent = product.name;
    price.textContent = product.price;
    status.textContent =
      product.quantity === 0 ? "sold out" : `${product.quantity} left`;
    return productDiv;
  };
  const productsForSeller = products.filter((item) => {
    return item.sellerId === seller.id;
  });
  const renderProductsSale = () => {
    const productsDiv = document.querySelector("#list-of-sale");

    productsDiv.replaceChildren();

    productsForSeller.forEach((item) =>
      productsDiv.appendChild(renderProductSale(item))
    );
    const sectionSale = document.querySelector("#items-on-sale");
    if (productsForSeller.length) {
      sectionSale.style.visibility = "visible";
    } else {
      sectionSale.style.visibility = "hidden";
    }

    localStorage.setItem("products", JSON.stringify(products));
  };

  const renderProductHistory = (product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("itemssold");
    const image = document.createElement("img");
    image.classList.add("open-up");

    const name = document.createElement("h3");
    name.classList.add("itemname");

    const popup = document.createElement("dialog");
    popup.classList.add("pop-up");

    const list = document.createElement("ul");
    const closeimage = document.createElement("picture");
    closeimage.classList.add("close-popup");
    const closeimgDark = document.createElement("source");
    closeimgDark.srcset = "media/icons/darktheme-icons/square-rounded-x.svg";
    closeimgDark.media = "(prefers-color-scheme: dark)";
    const closeImg = document.createElement("img");
    closeImg.src = "media/icons/darktheme-icons/square-rounded-x.svg";
    const buyerLi = document.createElement("li");
    buyerLi.classList.add("buyer");
    const priceLi = document.createElement("li");
    priceLi.classList.add("price");
    const quantitySoldLi = document.createElement("li");
    quantitySoldLi.classList.add("quantity-sold");
    const quantityLeftLi = document.createElement("li");
    quantityLeftLi.classList.add("quantity-left");

    closeimage.appendChild(closeImgDark);
    closeimage.appendChild(closeImg);
    const quantityPurchasedLi = document.createElement("li");
    quantityPurchasedLi.classList.add("quantity-purchased");

    ul.appendChild(closeButton);
    ul.appendChild(buyerLi);
    ul.appendChild(priceLi);
    ul.appendChild(quantityPurchasedLi);
    ul.appendChild(quantitySoldLi);
    ul.appendChild(quantityLeftLi);
    dialog.appendChild(ul);

    productDiv.appendChild(image);
    productDiv.appendChild(name);
    productDiv.appendChild(dialog);

    name.textContent = product.name;
    buyerLi.textContent = product.buyer.username;
    quantityPurchasedLi.textContent = product.quantityPurchased;
    priceLi.textContent = product.price;
    quantityLeftLi.textContent = product.quantity;
    quantitySoldLi.textContent = (product) => {
      const tempProducts = purchasedProducts.filter(
        (p) => p.name === product.name
      );
      return tempProducts.length;
    };
    return productDiv;
  };
  const renderProductsHistory = () => {
    const productsDiv = document.querySelector("#list-of-sold");

    productsDiv.replaceChildren();
    const productsHistory = purchasedProducts.filter((item) => {
      item.sellerId === seller.id;
    });
    productsHistory.forEach((item) =>
      productsDiv.appendChild(renderProductsHistory(item))
    );
    const soldHistory = document.querySelector("#sold-history");
    if (productsForSeller.length) {
      soldHistory.style.visibility = "visible";
    } else {
      soldHistory.style.visibility = "hidden";
    }

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem(
      "purchasedProducts",
      JSON.stringify(purchasedProducts)
    );
  };
});
