const element = document.getElementById("login-register-button");
element.addEventListener("click", () => {
  console.log("submit button");
  event.preventDefault();

  loginUser();
});

const loginUser = async () => {
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  const body = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    returnSecureToken: true
  };

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHHQcYGtLJylGcyaoLkc8YMEzNE_tVNN4";
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  fetch(url, options)
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.json()}`);
      // }
      console.log(response)
      return response.json();
    })
    .then((data) => {
      console.log("Sign up successful:", data);
      // Handle the successful response
    })
    .catch((error) => {
      console.error("Error in signing up the user:", error);
      // Extract error information from the response
      if (error instanceof Error && error.response) {
        const { error: errorMessage, message } = error.response;
        console.log("Error details:", errorMessage);
        console.log("Error message:", message);
        // Handle the error or show an error message to the user
      }
    });
};
