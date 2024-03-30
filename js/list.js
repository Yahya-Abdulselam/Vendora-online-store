document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("loggeduser")) {
    var hidden1 = document.getElementById("hidden1");
    var hidden2 = document.getElementById("hidden2");

    hidden1.classList.add("hidden");
    hidden2.classList.remove("hidden");
  }

  //when leaving the listing page clear category preference
  const clearCategoryOnNavigation = () => {
    console.log("asa");
    const path = window.location.pathname;
    if (path === "/pages/listItem.html") {
      localStorage.removeItem("selectedCategory");
    }
  };
  window.addEventListener("beforeunload", clearCategoryOnNavigation);
  window.addEventListener("popstate", clearCategoryOnNavigation);


  let search = document.querySelector("#sv");
  search.value = "";
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search")?.toLowerCase() || "";

  let searchProds = []; //the filtered list we will use to show items

  search.value = searchQuery;
  if (search) {
    search.focus();
  }

  //if the page load with search value then filter
  if (search.value) {
    searchProds = products.filter((p) => {
      return (
        (p.quantity > 0 && p.name.toLowerCase().includes(search.value)) ||
        p.category.toLowerCase().includes(search.value) ||
        p.details.toLowerCase().includes(search.value)
      );
    });
    console.log(searchProds);
  } else {
    searchProds = [...products];
  }

  const category = localStorage.getItem("selectedCategory") ?? "any";

  const renderProduct = (product) => {
    const maxQ = product.quantity;
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
    sourceMinus.srcset = "/media/icons/darktheme-icons/square-minus(1).svg";
    sourceMinus.media = "(prefers-color-scheme: dark)";
    const imgMinus = document.createElement("img");
    imgMinus.src = "/media/icons/square-minus.svg";
    imgMinus.width = "20";
    minusPicture.appendChild(sourceMinus);
    minusPicture.appendChild(imgMinus);
    cartAddDiv.appendChild(minusPicture);

    const quantityP = document.createElement("p");
    quantityP.className = "quantity";
    quantityP.textContent = "1";
    cartAddDiv.appendChild(quantityP);

    const plusPicture = document.createElement("picture");
    plusPicture.className = "plus";
    const sourcePlus = document.createElement("source");
    sourcePlus.srcset = "/media/icons/darktheme-icons/square-plus(1).svg";
    sourcePlus.media = "(prefers-color-scheme: dark)";
    const imgPlus = document.createElement("img");
    imgPlus.src = "/media/icons/square-plus.svg";
    imgPlus.width = "20";

    minusPicture.addEventListener("click", () => {
      const q = Number(quantityP.textContent);
      if (q > 1) {
        quantityP.textContent = (q - 1).toString();
      }
    });
    plusPicture.addEventListener("click", () => {
      const q = Number(quantityP.textContent);
      if (q < maxQ) {
        quantityP.textContent = (q + 1).toString();
      }
    });

    plusPicture.appendChild(sourcePlus);
    plusPicture.appendChild(imgPlus);
    cartAddDiv.appendChild(plusPicture);

    // sets up buy button for the product cards
    const buyButton = document.createElement("button");
    buyButton.setAttribute("class", "buy buyButton");
    buyButton.setAttribute("value", product.name + product.sellerId);
    buyButton.textContent = "Buy now";
    buyButton.addEventListener("click", () => {
      handleBuy(buyButton, quantityP);
    });
    infoDiv.appendChild(buyButton);

    return itemDiv;
  };

  const renderProducts = () => {
    const container = document.querySelector("#list-items");
    container.replaceChildren();
    if (products.length && category !== "any") {
      if (search?.value) {
        searchProds
          .filter((p) => p.quantity > 0 && p.category === category) //if category not any filter it
          .forEach((p) => {
            container.appendChild(renderProduct(p));
          });
      } else {
        products
          .filter((p) => p.quantity > 0 && p.category === category)
          .forEach((p) => {
            container.appendChild(renderProduct(p));
          });
      }
    } else {
      searchProds.forEach((p) => {
        container.appendChild(renderProduct(p));
      });
    }
  };
  search.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  search.addEventListener("input", () => {
    //if there is a search filter an item based on category name and details
    const value = search.value.trim().toLowerCase();
    if (value) {
      if (searchProds.length) {
        searchProds = products.filter((p) => {
          return (
            (p.quantity > 0 && p.name.toLowerCase().includes(value)) ||
            p.category.toLowerCase().includes(value) ||
            p.details.toLowerCase().includes(value)
          );
        });
      }
    } else {
      searchProds = [...products];
    }

    renderProducts();
  });

  renderProducts();

  function handleBuy(buyButton, quantityP) {
    // check if user is logged in
    if (localStorage.getItem("loggeduser") != null) {
      const product = JSON.parse(localStorage.getItem("products")).find(
        (product) => product.name + product.sellerId === buyButton.value
      );

      // put product in cart and then move to the checkout.
      if (product) {
        product.quantity = quantityP.textContent;

        localStorage.setItem("itemInCart", JSON.stringify(product));
        window.location.href = "/pages/checkout-address.html";
      } else {
        alert("Product doesn't exist!");
      }
    } else {
      const product = JSON.parse(localStorage.getItem("products")).find(
        (product) => product.name + product.sellerId === buyButton.value
      );

      // save product in cart, and move to login
      product.quantity = quantityP.textContent;
      localStorage.setItem("itemInCart", JSON.stringify(product));
      window.location.href = "/pages/checkout-address.html";
      localStorage.setItem("destinationAfterLogin", "/pages/checkout.html");
      window.location.href = "/pages/login.html";
    }
  }
});

// if (localStorage.getItem("loggeduser")) {
//   var hidden1 = document.getElementById("hidden1");
//   var hidden2 = document.getElementById("hidden2");

//   hidden1.classList.add("hidden");
//   hidden2.classList.remove("hidden");
// }
