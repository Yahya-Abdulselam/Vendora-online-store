document.addEventListener("DOMContentLoaded", () => {
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
});

function handleUpload() {
  if (!localStorage.getItem("loggedseller")) {
    localStorage.setItem("uploadDestination", "../upload-product.html");
    window.location.href = "../sellerlogin.html";
  } else {
    window.location.href = "../upload-product.html";
  }
}
