function handleLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var form = document.querySelector("form");
  var u = document.getElementById("username");

  fetch("/users.json")
    .then((response) => response.json())
    .then((data) => {
      var user = data.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        localStorage.setItem("loggeduser", JSON.stringify(user));
        window.location.href = "main.html";
      } else {
        alert("Invalid username or password. Please try again.");
        form.reset();
        u.focus();
      }
    })
    .catch((error) => console.error("Error:", error));
}

document.querySelector(".button").addEventListener("click", handleLogin);

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

function toggleIcon() {
  let password = document.getElementById("password");
  let eyeicon = document.getElementById("eye-icon");

  if (password.type === "password") {
    password.type = "text";
    eyeicon.src = "media/icons/eye-open.jpg";
    eyeicon.alt = "eye-open";
  } else {
    password.type = "password";
    eyeicon.src = "media/icons/eye-close.jpg";
    eyeicon.alt = "eye-close";
  }
}
