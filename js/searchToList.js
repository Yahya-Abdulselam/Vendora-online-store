document.addEventListener("DOMContentLoaded", () => {
  const searchMainPage = document.querySelector("#sv");
  searchMainPage.value = "";

  //if user search from main redirect him to listing page with search value in url

  searchMainPage.addEventListener("input", () => {
    const searchValue = searchMainPage.value.trim();
    if (searchValue) {
      const p = encodeURIComponent(searchValue);
      window.location.href = `/pages/listItem.html?search=` + p;
    }
  });
});
