// constants/variables
const element = document.getElementById("login-register-button");
const error = document.getElementById("errors");

// Event Handlers
/**
 * @description This function is used to signup the user
 * @returns {Promise<void>}
 */
const signup = () => {
  const email = document.getElementById("email")?.value || "";
  const password = document.getElementById("password")?.value || "";

  chrome.runtime.sendMessage({ message: "signup", email, password }, function (response) {
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

// Signup button click
element.addEventListener("click", () => {
  event.preventDefault();
  signup();
});