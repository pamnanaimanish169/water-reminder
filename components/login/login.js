console.log('login.js');

const element = document.getElementById("login-register-button");
element.addEventListener("click", () => {
  event.preventDefault();
  loginUser();
});

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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    chrome.storage.local.set({ isAuthenticated: true });
  } else {
    chrome.storage.local.set({ isAuthenticated: false });
  }
});

const error = document.getElementById("errors");
const loginUser = () => {
  const email = document.getElementById("email")?.value || "";
  const password = document.getElementById("password")?.value || "";

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      chrome.storage.local.set({ user: userCredential });
      error.innerHTML = "";
      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((e) => {
      error.innerHTML = e?.message;
    });
};

const loginButton = document.getElementById("login-register-button");
loginButton.addEventListener("click", (event) => {
  loginUser();
});

// loginUser