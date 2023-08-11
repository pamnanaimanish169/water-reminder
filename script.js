const element = document.getElementById("login-signup-button");
element.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href='/signup/signup.html';
});