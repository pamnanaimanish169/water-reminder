const element = document.getElementById("login-signup-button");
element.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href='/signup/signup.html';
});


chrome.storage.local.get("user", (data) => {
  console.log('user', data);
  if(data?.user) {
    window.location.href = './dashboard/dashboard.html';
  } else {
    window.location.href = './login/login.html';
  }
});