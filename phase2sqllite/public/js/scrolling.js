let prvPos = window.scrollY;
let original = window.scrollY;

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navv"); //get the nav bar
  let afterPos = window.scrollY;

  if (afterPos !== 0) {
    if (afterPos > prvPos) {
      nav.classList.add("hide"); //hide it if its scrolled down
    } else {
      nav.classList.add("oScroll"); // show it if its not
      nav.classList.remove("hide");
    }
    prvPos = afterPos;
  } else {
    nav.classList.remove("oScroll"); // if the nav on top show it
  }
});
