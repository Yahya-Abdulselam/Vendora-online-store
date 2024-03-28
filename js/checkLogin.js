document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#cart-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") != null) {
      window.location.href = "/pages/checkout/checkout.html";
    } else {
      window.location.href = "./login.html";
    }
  });

  document.querySelector("#account-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") != null) {
      window.location.href = "/pages/checkout/checkout.html";
    } else {
      window.location.href = "./login.html";
    }
  });
});
