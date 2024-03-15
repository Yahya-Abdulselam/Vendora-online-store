let prvPos = window.scrollY;
let original = window.scrollY;

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navv");
  let afterPos = window.scrollY;

  if (afterPos !== 0) {
    if (afterPos > prvPos) {
      nav.classList.add("hide");
    } else {
      nav.classList.add("oScroll");
      nav.classList.remove("hide");
    }
    prvPos = afterPos;
  } else {
    nav.classList.remove("oScroll");
  }
});
const popup = document.querySelector(".pop-up");
const open_popup = document.querySelector(".open-popup");
const close_popup = document.querySelector(".close-popup");
open_popup.addEventListener("click", () => {
  popup.showModal();
});
close_popup.addEventListener("click", () => {
  popup.close();
});
