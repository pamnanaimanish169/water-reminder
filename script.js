const element = document.getElementById("login-signup-button");
element.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href='/signup/signup.html';
});

chrome.runtime.sendMessage('getAuthStatus', (data) => {
  console.log('data received from background.js' ,data);

  if(data === true) {
    // redirect to dashboard.html
    window.location.href = './dashboard/dashboard.html';
  } else {
    //redirec to login.html
    window.location.href = './login/login.html';
  }
});

