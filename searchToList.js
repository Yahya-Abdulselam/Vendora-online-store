document.addEventListener("DOMContentLoaded", () => {
  const searchMainPage = document.querySelector("#sv");
  searchMainPage.value = "";
  searchMainPage.addEventListener("focus", () => {
    const searchValue = searchMainPage.value.trim();
    if (searchValue) {
      const p = encodeURIComponent(searchValue);
      window.location.href = `/listItem.html?search=` + p;
    }
  });

  searchMainPage.addEventListener("input", () => {
    const searchValue = searchMainPage.value.trim();
    if (searchValue) {
      const p = encodeURIComponent(searchValue);
      window.location.href = `/listItem.html?search=` + p;
    }
  });
});
