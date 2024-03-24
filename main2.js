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

  document.getElementById("cart-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") != null) {
      window.location.href = "/pages/checkout/checkout.html"
    } else {
      window.location.href = "./login.html"
    }
  })

  document.getElementById("account-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") != null) {
      window.location.href = "/pages/checkout/checkout.html"
    } else {
      window.location.href = "./login.html"
    }
  })
});
