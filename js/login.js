// function to handle login of user
function handleLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var form = document.querySelector("form");
  var ufocus = document.getElementById("username");
  var dal = localStorage.getItem("destinationAfterLogin");

  //fetch the users from users.json
  fetch("../data/users.json")
    .then((response) => response.json())
    .then((data) => {
      var user = data.find(
        (user) => user.username === username && user.password === password
      );
      // if found user add him to localstorage under the item loggeduser
      if (user) {
        localStorage.setItem("loggeduser", JSON.stringify(user));
        // if user clicked on buy now on a product without being logged in redirect him to checkout page after successfull login
        if (!dal) {
          window.location.href = "/pages/main.html";
        } else {
          window.location.href = "/pages/checkout-address.html";
        }
      }
      //  if user credentials are incorrect alert him with a message and reset the form
      else {
        alert("Invalid username or password. Please try again.");
        form.reset();
        ufocus.focus();
      }
    })
    .catch((error) => console.error("Error:", error));
}

// adding event listener to button to handle the event of login
document.querySelector(".button").addEventListener("click", handleLogin);

// if user presses enter while on username or password input fields log him in
document
  .getElementById("password")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  });

document
  .getElementById("username")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  });

// function to toggle the icon and hide/show password

function toggleIcon() {
  let password = document.getElementById("password");
  let eyeicon = document.getElementById("eye-icon");

  if (password.type === "password") {
    password.type = "text";
    password.focus();
    eyeicon.src = "/media/icons/eye-open.jpg";
    eyeicon.alt = "eye-open";
  } else {
    password.type = "password";
    password.focus();
    eyeicon.src = "/media/icons/eye-close.jpg";
    eyeicon.alt = "eye-close";
  }
}
