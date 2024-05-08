document.addEventListener("DOMContentLoaded", () => {
  let buyer = JSON.parse(localStorage.getItem("loggeduser") ?? "{}"); //when the user log in we store his data(current seller)
  console.log(buyer.balance)
  const clothingButton = document.querySelectorAll(".clothing");
  const techButton = document.querySelectorAll(".tech");
  const bookButton = document.querySelectorAll(".book");
  const furnitureButton = document.querySelectorAll(".furniture");
  const balance = document.querySelector("#balance");
  const balanceDiv = document.querySelector("#balance-div");
  const categories = document.querySelectorAll(".categories");

  //select the category the user chose to filter
  categories.forEach((cat) => {
    cat.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  if (buyer?.balance) {
    balance.textContent = buyer.balance;
    console.log(1);
  }

  clothingButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = "/pages/listItem.html/?category=clothing";
    });
  });

  techButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = "/pages/listItem.html/?category=tech";
    });
  });

  bookButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = "/pages/listItem.html/?category=book";
    });
  });

  furnitureButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = "/pages/listItem.html/?category=furniture";
    });
  });
});
