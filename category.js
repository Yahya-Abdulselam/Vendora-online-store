document.addEventListener("DOMContentLoaded", () => {
  let buyer = JSON.parse(localStorage.getItem("loggeduser") ?? "{}"); //when the user log in we store his data(current seller)
  const clothingButton = document.querySelectorAll(".clothing");
  const techButton = document.querySelectorAll(".tech");
  const bookButton = document.querySelectorAll(".book");
  const furnitureButton = document.querySelectorAll(".furniture");
  const balance = document.querySelector("#balance");
  const balanceDiv = document.querySelector("#balance-div");
  const categories = document.querySelectorAll(".categories");
  categories.forEach((cat) => {
    cat.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  if (buyer?.balance) {
    balanceDiv.computedStyleMap.display = "flex";
    balance.textContent = buyer.balance;
    console.log(1);
  }

  clothingButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.setItem("selectedCategory", "clothing");

      window.location.href = "/listItem.html";
    });
  });

  techButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.setItem("selectedCategory", "tech");
      window.location.href = "/listItem.html";
    });
  });

  bookButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.setItem("selectedCategory", "book");
      window.location.href = "/listItem.html";
    });
  });

  furnitureButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.setItem("selectedCategory", "furniture");
      window.location.href = "/listItem.html";
    });
  });
});
