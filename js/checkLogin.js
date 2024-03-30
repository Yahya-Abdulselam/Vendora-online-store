document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#cart-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") != null) {
      window.location.href = "checkout.html";
    } else {
      window.location.href = "login.html";
    }
  });

  document.querySelector("#account-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") != null) {
      window.location.href = "checkout.html";
    } else {
      window.location.href = "login.html";
    }
  });

  if (localStorage.getItem("loggeduser") != null) {
    let balanceAccount = document.createElement("div");
    balanceAccount.setAttribute("id", "balance-div");
    balanceAccount.innerHTML = `
    <img src="/media/icons/wallet.svg" alt="wallet">
    <p id="balance">${
      JSON.parse(localStorage.getItem("loggeduser")).customer_balance
    }</p>
    `;

    let purchaseHistoryLink = document.createElement("a");
    purchaseHistoryLink.setAttribute("href", "purchased.html");
    purchaseHistoryLink.innerHTML = `Purchase History`;
    document.querySelector("#account-dropdown").append(balanceAccount);
    document.querySelector("#account-dropdown").append(purchaseHistoryLink);
  } else {
    let loginLink = document.createElement("a");
    loginLink.setAttribute("href", "login.html");
    loginLink.innerHTML = `Login`;
    document.querySelector("#account-dropdown").append(loginLink);
  }

  if (localStorage.getItem("loggedseller") != null) {
    let accountDetailsLink = document.createElement("a");
    accountDetailsLink.setAttribute("href", "main.html");
    accountDetailsLink.innerHTML = `Account Details`;
    document.querySelector("#account-dropdown").append(accountDetailsLink);
  }
});
