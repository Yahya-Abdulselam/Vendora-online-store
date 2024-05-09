document.addEventListener("DOMContentLoaded", async () => {
  const search = document.querySelector("#sv");

  let buyer = JSON.parse(localStorage.getItem("loggeduser") ?? "{}"); //when the user log in we store his data(current seller)

  //render each product
  const renderProductPurchased = (transaction) => {
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

    image.src = transaction.product.picture;
    prodName.textContent = transaction.product.name;
    prodPrice.textContent = transaction.amountPaid;
    prodQty.textContent = transaction.quantityBought;
    const date = transaction.date.split("T");
    const time = date[1].replace("Z", "");
    prodDate.textContent = date[0] + "," + time;
    li1.appendChild(image);
    productLi.appendChild(li1);
    productLi.appendChild(prodName);
    productLi.appendChild(prodPrice);
    productLi.appendChild(prodQty);
    productLi.appendChild(prodDate);

    return productLi;
  };
  let transactions = [];
  const res = await fetch(`/api/buyapi/${buyer.id}/transaction`, {
    method: "GET",
  });
  if (res.ok) {
    transactions = await res.json();
  }

  const renderProductsPurchased = () => {
    const productLi = document.querySelector("#list-items");

    productLi.replaceChildren();
    console.log(JSON.stringify(transactions));
    transactions.reverse().forEach((p) =>
      productLi.appendChild(renderProductPurchased(p))
    );
  };

  //filter history based on search
  const renderProductsPurchasedFiltered = (filter) => {
    const productLi = document.querySelector("#list-items");
    productLi.replaceChildren();

    transactions
      .reverse()
      .filter(
        (t) =>
          t.product.name.toLowerCase().includes(filter.toLowerCase()) ||
          t.date?.includes(filter) ||
          t.product.category?.includes(filter)
      )
      .forEach((p) => productLi.appendChild(renderProductPurchased(p)));
  };
  search.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
  search.addEventListener("input", () => {
    const searchText = search.value;
    renderProductsPurchasedFiltered(searchText); //when search call the filter
  });

  renderProductsPurchased();
});
