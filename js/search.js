document.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(localStorage.getItem("products" ?? "[]"));


  const search = document.querySelector("#sv");
  search.addEventListener("input", () => {
    const value = search.value.trim().toLowerCase();
    const filteredProducts=products.filter((p) => {
 return     p.name.toLowerCase().includes(value)||  p.category.toLowerCase().includes(value)|| p.details.toLowerCase().includes(value) ;
    });
  });
});
