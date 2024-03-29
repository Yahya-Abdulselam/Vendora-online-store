document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let purchasedProducts = JSON.parse(
    localStorage.getItem("purchasedProducts") ?? "[]"
  );
  let seller = JSON.parse(localStorage.getItem("loggedseller")); //when the user log in we store his data(current seller)

  const renderProductSale = (product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("itemssale");
    const image = document.createElement("img");
    const table = document.createElement("table");
    const row1 = document.createElement("tr");
    const name = document.createElement("td");
    name.classList.add("item-name");

    const row2 = document.createElement("tr");
    const price = document.createElement("td");
    price.classList.add("price");

    const row3 = document.createElement("tr");
    const status = document.createElement("td");
    status.classList.add("status");

    productDiv.appendChild(image);
    table.appendChild(row1);
    table.appendChild(row2);
    table.appendChild(row3);
    row1.appendChild(name);
    row2.appendChild(price);
    row3.appendChild(status);
    productDiv.appendChild(table);

    image.src = product.picture;

    console.log("Image source: ", product.picture);
    console.log("Product", product);
    name.textContent = product.name;
    price.textContent = product.price;
    status.textContent =
      product.quantity === 0 || !product.quantity
        ? "sold out"
        : `${product.quantity} left`;
    return productDiv;
  };
  // const productsForSeller = products.filter((item) => {
  //   return item.sellerId === seller.id;
  // });

  const renderProductsSale = () => {
    const productsDiv = document.querySelector("#list-of-sale");

    productsDiv.replaceChildren();

      seller.products.forEach((item) =>
        productsDiv.appendChild(renderProductSale(item))
      );
      const sectionSale = document.querySelector("#items-on-sale");
      if (seller.products.length) {
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

    closeimage.appendChild(closeimgDark);
    closeimage.appendChild(closeImg);
    const quantityPurchasedLi = document.createElement("li");
    quantityPurchasedLi.classList.add("quantity-purchased");

    list.appendChild(closeButton);
    list.appendChild(buyerLi);
    list.appendChild(priceLi);
    list.appendChild(quantityPurchasedLi);
    list.appendChild(quantitySoldLi);
    list.appendChild(quantityLeftLi);
    dialog.appendChild(list);

    productDiv.appendChild(image);
    productDiv.appendChild(name);
    productDiv.appendChild(dialog);

    name.textContent = product.name;
    buyerLi.textContent = product.buyer.username;
    quantityPurchasedLi.textContent = product.quantityPurchased;
    priceLi.textContent = product.price;
    quantityLeftLi.textContent = product.quantity;
    image.src = product.image;
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
      productsDiv.appendChild(renderProductHistory(item))
    );
    const soldHistory = document.querySelector("#sold-history");
    if (seller.products.length) {
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
  renderProductsSale();
  renderProductsHistory();
});

document.addEventListener("DOMContentLoaded", () => {
  let prvPos = window.scrollY;

  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navv");
    let afterPos = window.scrollY;

    if (afterPos !== 0) {
      if (afterPos > prvPos) {
        nav.classList.add("hide");
      } else {
        nav.classList.add("oScroll");
        nav.classList.remove("hide");
      }
      prvPos = afterPos;
    } else {
      nav.classList.remove("oScroll");
    }
  });
});

function handleUpload() {
  if (!localStorage.getItem("loggedseller")) {
    localStorage.setItem("uploadDestination", "../upload-product.html");
    window.location.href = "../sellerlogin.html";
  } else {
    window.location.href = "../upload-product.html";
  }
}

if (localStorage.getItem("loggedseller")) {
  var hidden = document.getElementById("hidden");

  hidden.classList.remove("dropdown-menu");
  hidden.classList.add("hidden");
}
