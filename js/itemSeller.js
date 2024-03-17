document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products") ?? "[]");
  let seller = JSON.parse(localStorage.getItem("seller") ?? "[]"); //when the user log in we store his data(current seller)
  const renderProduct = (product) => {
    const productDiv = document.createElement("div");
    const image = document.createElement("img");
    const table = document.createElement("table");
    const row1 = document.createElement("tr");
    const name = document.createElement("td");

    const row2 = document.createElement("tr");
    const price = document.createElement("td");

    const row3 = document.createElement("tr");
    const status = document.createElement("table");

    productDiv.appendChild(image);
    productDiv.appendChild(table);
    table.appendChild(row1);
    table.appendChild(row2);
    table.appendChild(row3);
    row1.appendChild(name);
    row2.appendChild(price);
    row3.appendChild(price);

    image.src = URL.createObjectURL(product.image);
    name.textContent = product.name;
    price.textContent = product.price;
    status.textContent =
      product.quantity === 0 ? "sold out" : `${quantity} left`;
  };
  const renderProducts = () => {
    const productsDiv = document.querySelector("#list-of-sold");

    productsDiv.replaceChildren();
    const productsForSeller = products.filter(
      (item = item.sellerId === seller.id)
    );
    productsForSeller.forEach((item) =>
      productsDiv.appendChild(renderProduct(item))
    );
    const sectionSale = document.querySelector("#items-on-sale");
    if (productsForSeller.length) {
      sectionSale.style.visibility = "visible";
    } else {
      sectionSale.style.visibility = "hidden";
    }

    localStorage.setItem("products", JSON.stringify(products));
  };
});
