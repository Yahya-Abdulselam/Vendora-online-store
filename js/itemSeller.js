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
    const addDiv = document.createElement("div");
    const addButton = document.createElement("button");
    addButton.classList.add("add-button");
    addButton.textContent = "ADD";
    const qToAdd = document.createElement("input");
    addDiv.classList.add("addDiv");
    qToAdd.type = "number";
    qToAdd.value = "1";
    qToAdd.min = "1";
    addDiv.appendChild(addButton);
    addDiv.appendChild(qToAdd);
    const row4 = document.createElement("tr");

    const status = document.createElement("td");
    status.classList.add("status");

    addButton.addEventListener("click", () => {
      const qToAddValue = Number(qToAdd.value);
      if (qToAddValue && qToAddValue > 0) {
        updateProd(product, qToAdd.value);
        updateProdInSeller(product, qToAdd.value);
        console.log(qToAddValue);
        console.log(seller);
      }

      renderProductsHistory();
      renderProductsSale();
    });

    productDiv.appendChild(image);
    table.appendChild(row1);
    table.appendChild(row2);
    table.appendChild(row3);
    table.appendChild(row4);
    row1.appendChild(name);
    row2.appendChild(price);
    row3.appendChild(status);
    row4.appendChild(addDiv);

    productDiv.appendChild(table);

    image.src = product.picture;

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

  //render all products on  sale for seller
  const renderProductsSale = () => {
    const productsDiv = document.querySelector("#list-of-sale");

    productsDiv.replaceChildren();

    seller.products.forEach((item) =>
      productsDiv.appendChild(renderProductSale(item))
    );
    const sectionSale = document.querySelector("#items-on-sale");
    if (seller.products.length) {
      sectionSale.style.visibility = "visible"; //set it visible
    } else {
      sectionSale.style.visibility = "hidden";
    }

    localStorage.setItem("products", JSON.stringify(products));
  };

  const renderProductHistory = (product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("itemssold");
    const image = document.createElement("img");
    image.classList.add("open-popup");

    const name = document.createElement("h3");
    name.classList.add("itemname");

    const popup = document.createElement("dialog");
    popup.classList.add("pop-up");

    const list = document.createElement("ul");
    const closeimage = document.createElement("picture");
    closeimage.classList.add("close-popup");
    const closeimgDark = document.createElement("source");
    closeimgDark.srcset = "/media/icons/darktheme-icons/square-rounded-x.svg";
    closeimgDark.media = "(prefers-color-scheme: dark)";
    const closeImg = document.createElement("img");
    closeImg.src = "/media/icons/square-rounded-x.svg";
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

    list.appendChild(closeimage);
    list.appendChild(buyerLi);
    list.appendChild(priceLi);
    list.appendChild(quantityPurchasedLi);
    list.appendChild(quantitySoldLi);
    list.appendChild(quantityLeftLi);
    popup.appendChild(list);
    //controlling pop up for sale history
    image.addEventListener("click", () => {
      if (popup) {
        popup.showModal(); //if image clicked show the pop up
      }
    });
    closeimage.addEventListener("click", () => {
      popup.close(); //if close clicked close it
    });
    productDiv.appendChild(image);
    productDiv.appendChild(name);
    productDiv.appendChild(popup);

    image.src = product.picture;

    const q = purchasedProducts
      .filter((p) => p.name === product.name && seller.id === p.sellerId)
      .reduce((ac, p) => Number(p.quantity) + ac, 0);
    console.log(q);
    const mainProduct = products.find(
      (p) => p.name === product.name && seller.id === p.sellerId
    );
    name.textContent = product.name;
    buyerLi.textContent = product.buyer.username;
    quantityPurchasedLi.textContent = product.quantity;
    priceLi.textContent = product.price;

    quantityLeftLi.textContent = mainProduct.quantity;
    quantitySoldLi.textContent = q;

    return productDiv;
  };
  const renderProductsHistory = () => {
    const productsDiv = document.querySelector("#list-of-sold");

    productsDiv.replaceChildren();
    const productsHistory = purchasedProducts.filter((item) => {
      {
        return item.sellerId === seller.id;
      }
    });
    console.log(productsHistory);
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
  function updateProd(prod, q) {
    const qValue = Number(q);
    const product = products.find(
      (p) => p.name === prod.name && p.sellerId === prod.sellerId
    );

    product.quantity = product.quantity + qValue;
    localStorage.setItem("products", JSON.stringify(products));
  }
  function updateProdInSeller(prod, q) {
    const qValue = Number(q);
    const product = seller.products.find((p) => p.name === prod.name);
    product.quantity = product.quantity + qValue;
    localStorage.setItem("loggedseller", JSON.stringify(seller));
  }
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
    localStorage.setItem("uploadDestination", "upload-product.html");
    window.location.href = "/pages/sellerlogin.html";
  } else {
    window.location.href = "/pages/upload-product.html";
  }
}

if (localStorage.getItem("loggedseller")) {
  var hidden = document.getElementById("hidden");

  hidden.classList.remove("dropdown-menu");
  hidden.classList.add("hidden");
}
