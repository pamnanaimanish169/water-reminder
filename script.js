// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import {
//   getDatabase,
//   set,
//   ref,
// } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCQLG34McSyK32qYsLAUYhYD9_BUK0QLao",
  authDomain: "water-reminder-b9aac.firebaseapp.com",
  databaseURL:
    "https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "water-reminder-b9aac",
  storageBucket: "water-reminder-b9aac.appspot.com",
  messagingSenderId: "628031196131",
  appId: "1:628031196131:web:5009a8342f96ce10882ed6",
  measurementId: "G-E8SHRJ9ZEB",
});

const firebaseDB = firebase.database().ref("/");

let saveValue = firebaseDB.push();

saveValue.set({ name: "Sapna Pamnani" });

const element = document.getElementById("login-signup-button");
element.addEventListener("click", (event) => {
  event.preventDefault();
  showLogin();
});

const showLogin = () => {
  // Auth
  // FirebaseUI config.
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        //   Hide the other div to maintain screen visibility
        const remindContainer = document.getElementsByClassName("remind-form");
        remindContainer[0].style.display = "block";

        const loginSignupButton = document.getElementById('login-signup-container');
        loginSignupButton.style.display = 'none';
      },
      signInFailure: (error) => {
        console.error("Error in signing in: ", error);
      },
    },
    signInSuccessUrl: "#",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);

  //   Hide the other div to maintain screen visibility
  const remindContainer = document.getElementsByClassName("remind-form");
  remindContainer[0].style.display = "none";
};
