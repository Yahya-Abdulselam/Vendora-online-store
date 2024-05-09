document.addEventListener("DOMContentLoaded", () => {
  console.log(localStorage.getItem("loggedseller"));
  console.log(window.location.href);

  // If doesnt work. else if works
  if (localStorage.getItem("loggedseller") !== null && window.location.href.includes("/pages/seller.html")) {
    let accountDetailsLink = document.createElement("a");
    accountDetailsLink.setAttribute("href", "/pages/main.html");
    accountDetailsLink.innerHTML = `Account Details`;
    document.querySelector("#account-dropdown").append(accountDetailsLink);
    let logoutLink = document.createElement("a");
    logoutLink.setAttribute("href", "/pages/sellerlogin.html");
    logoutLink.innerHTML = `Logout`;
    document.querySelector("#account-dropdown").append(logoutLink);
  } else if (localStorage.getItem("loggedseller") === null && window.location.href.includes("/pages/seller.html")){
    let loginLink = document.createElement("a");
    loginLink.setAttribute("href", "/pages/sellerlogin.html");
    loginLink.innerHTML = `Login`;
    document.querySelector("#account-dropdown").append(loginLink);
  }
  
  /**
   * Checks if user is logged in, if they are, and the item has a cart, it takes them to checkout. Otherwise it just takes them to login if the cart is pressed.
   */
  document.querySelector("#cart-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") !== null) {
      if (localStorage.getItem("itemInCart") !== null){
        window.location.href = "checkout.html";
      }
    } else {
      window.location.href = "/pages/login.html";
    }
  });


  /**
   * Checks if user is logged in, if they are, takes them to purchase history if the account icon is pressed.
   */
  document.querySelector("#account-button").addEventListener("click", () => {
    if (localStorage.getItem("loggeduser") !== null) {
      window.location.href = "/pages/purchased.html";
    } else {
      window.location.href = "/pages/login.html";
    }
  });

  

  // if user is logged in as either seller or customer, it sets up the drop down for the user icon.
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
    purchaseHistoryLink.setAttribute("href", "/pages/purchased.html");
    purchaseHistoryLink.innerHTML = `Purchase History`;
    document.querySelector("#account-dropdown").append(balanceAccount);
    document.querySelector("#account-dropdown").append(purchaseHistoryLink);
    
  } else if (localStorage.getItem("loggeduser") == null && window.location.href.includes("/pages/main.html")) {
    let loginLink = document.createElement("a");
    loginLink.setAttribute("href", "/pages/login.html");
    loginLink.innerHTML = `Login`;
    document.querySelector("#account-dropdown").append(loginLink);
  }



  if (localStorage.getItem("loggeduser") != null && window.location.href.includes("/pages/main.html")) {
    let logoutLink = document.createElement("a");
    logoutLink.setAttribute("href", "/pages/login.html");
    logoutLink.innerHTML = `Logout`;
    document.querySelector("#account-dropdown").append(logoutLink);
  }

  
});
