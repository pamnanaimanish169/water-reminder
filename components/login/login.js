// constants/variables
const element = document.getElementById("login-register-button");
const error = document.getElementById("errors");

// Function handlers

/**
 * @description This function is used to login the user
 * @returns {Promise<void>}
 */
const login = () => {
  console.log('login');
  const email = document.getElementById("email")?.value || "";
  const password = document.getElementById("password")?.value || "";

  chrome.runtime.sendMessage({ message: "login", email, password }, function (response) {
    console.log("Response from background script:", response);
    if (response.status) {
      error.innerHTML = "";
      window.location.href = "../dashboard/dashboard.html";
    } else {
      error.innerHTML = response.message;
    }
  });
};

// Event listeners

// Login button click
element.addEventListener("click", () => {
  event.preventDefault();
  login();
});