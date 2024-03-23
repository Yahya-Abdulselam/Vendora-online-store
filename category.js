document.addEventListener("DOMContentLoaded", () => {
  const clothingButton = document.querySelector("#clothing");
  const techButton = document.querySelector("#tech");
  const bookButton = document.querySelector("#book");
  const furnitureButton = document.querySelector("#furniture");
  console.log(2);

  clothingButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "clothing");
    window.location.href = "/listItem.html";
  });

  techButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "tech");
    window.location.href = "/listItem.html";
  });

  bookButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "book");
    window.location.href = "/listItem.html";
  });

  furnitureButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "furniture");
    window.location.href = "/listItem.html";
  });
});
