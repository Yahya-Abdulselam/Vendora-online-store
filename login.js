function handleLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  fetch("/users.json")
    .then((response) => response.json())
    .then((data) => {
      var user = data.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        window.location.href = "main.html";
      } else {
        alert("Invalid username or password. Please try again.");
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
