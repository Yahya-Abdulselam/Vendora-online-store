document.addEventListener("DOMContentLoaded", () => {
  const clothingButton = document.querySelector("#clothing");
  const techButton = document.querySelector("#tech");
  const bookButton = document.querySelector("#book");
  const furnitureButton = document.querySelector("#furniture");
  console.log(2);

  clothingButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "clothing");
    window.location.href = "https://github.com/Yahya-Abdulselam/Vendora-online-store/blob/274f7693247602d0e1e83679829cefafd7dd665d/pages/seller.html";
  });

  techButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "tech");
    window.location.href = "/listing.html";
  });

  bookButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "book");
    window.location.href = "/listing.html";
  });

  furnitureButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("selectedCategory", "furniture");
    window.location.href = "/listing.html";
  });
});
