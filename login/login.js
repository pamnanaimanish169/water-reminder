const element = document.getElementById("login-register-button");
element.addEventListener("click", () => {
  event.preventDefault();
  loginUser();
});

// const loginUser = async () => {
//   const body = {
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//     returnSecureToken: true,
//   };

//   const url =
//     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHHQcYGtLJylGcyaoLkc8YMEzNE_tVNN4";
//   const options = {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: { "Content-Type": "application/json" },
//   };

//   fetch(url, options)
//     .then((response) => {
//       // if (!response.ok) {
//       //   throw new Error(`HTTP error! Status: ${response.json()}`);
//       // }
//       return response.json();
//     })
//     .then((data) => {
//       const error = document.getElementById("errors");
//       // Handle the successful response
//       if (data.error) {
//         error.innerHTML = data.error.message;
//       } else {
//         error.innerHTML = "";
//         window.location.href = "../dashboard/dashboard.html";
//         localStorage.setItem("user", JSON.stringify(data));
//       }
//     })
//     .catch((error) => {
//       // Extract error information from the response
//       if (error instanceof Error && error.response) {
//         const { error: errorMessage, message } = error.response;
//         // Handle the error or show an error message to the user
//       }
//     });
// };

const firebaseConfig = {
  apiKey: "AIzaSyCQLG34McSyK32qYsLAUYhYD9_BUK0QLao",
  authDomain: "water-reminder-b9aac.firebaseapp.com",
  databaseURL:
    "https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "water-reminder-b9aac",
  storageBucket: "water-reminder-b9aac.appspot.com",
  messagingSenderId: "628031196131",
  appId: "1:628031196131:web:5009a8342f96ce10882ed6",
  measurementId: "G-E8SHRJ9ZEB",
};

firebase.initializeApp(firebaseConfig);
const authState = document.getElementById("auth-state");

chrome.storage.local.get("isAuthenticated", (result) => {
  const isAuthenticated = result?.isAuthenticated;
  console.log("isAuthenticated", isAuthenticated);

  authState.innerHTML =
    isAuthenticated === true ? "Logged In" : "Not logged In";
});

const error = document.getElementById("errors");
const loginUser = () => {
  const email = document.getElementById("email")?.value || "";
  const password = document.getElementById("password")?.value || "";

  console.log(email, password);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential);
      error.innerHTML = "";
    //   window.location.href = "../dashboard/dashboard.html";
    })
    .catch((e) => {
      console.log(e);
      error.innerHTML = e?.message;
    });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      chrome.storage.local.set({ isAuthenticated: true });
    } else {
      chrome.storage.local.set({ isAuthenticated: false });
    }
  });

  chrome.storage.local.get("isAuthenticated", (result) => {
    const isAuthenticated = result?.isAuthenticated;
    console.log("isAuthenticated", isAuthenticated);

    authState.innerHTML =
      result?.isAuthenticated === true ? "Logged In" : "Not logged In";
  });
};
