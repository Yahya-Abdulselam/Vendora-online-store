let prvPos = window.scrollY;
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navv");
  let afterPos = window.scrollY;
  if (afterPos > prvPos) {
    nav.classList.remove("oScroll");
    nav.classList.add('hide');

  } else {
    nav.classList.add("oScroll");
    nav.classList.remove('hide');
  }
  prvPos = afterPos;
});
