/**
 * sets up the user history
 */

export default async function fetchUserData() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search")?.toLowerCase() || "";
  const catQuery = urlParams.get("category")?.toLowerCase() || "";
  const response = await fetch(`/api/buyapi/`, {
    method: "GET",
  });

  const data = await response.json()
  return data
}

document.addEventListener("DOMContentLoaded", () => {
  const user = fetchUserData()
  const listHolder = document.querySelector("#list-items");
  console.log(user.username);
  console.log(user.purchaseHistory);

  if (user.purchaseHistory != null) {
    for (let i = 0; i < Object.keys(user.purchaseHistory).length; i++) {
      product = JSON.parse(user.purchaseHistory[i]);
      const itemHolder = document.createElement("ul");
      itemHolder.setAttribute("class", "product-item");
      itemHolder.innerHTML = `
             <li>
                 <img
                 class="prod-image"
                 src="/media/prod/crystal-collis-w4xdt5o9Fs4-unsplash.jpg"
                 alt=""
                 />
             </li>
             <li class="prod-name">${product.name}</li>
             <li class="prod-price">${product.price}  QAR</li>
             <li class="prod-quantity">${product.quantity}</li>
             <li class="purchase-date">2024-03-24</li>`;
      listHolder.append(itemHolder);
    }
  }
});
