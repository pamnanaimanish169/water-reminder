let userId;
let waterAdded;
const errorElement = document.getElementById("errors");
const waterRemaining = document.getElementById("water-remaining");
let waterRemainingValue;

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

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", (event) => {
  console.log(waterRemainingValue, "waterRemainingValue");

  if (waterRemainingValue <= 0) {
    errorElement.innerHTML =
      "You have reached the full limit for today. Come back tomorrow for more.";
  } else {
    addWater();
    errorElement.innerHTML = "";
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userId = user?.uid;
    console.log(userId);
    getWater();
  }
});

const addWater = async () => {
  if (userId) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 200,
        timestamp: Date.now(),
      }),
    };

    fetch(
      `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
      options
    )
      .then((res) => {
        if (res.status === 200) {
          getWater();
          return res.json();
        }
      })
      .catch((error) => console.error("Error in fetching data"));
  }
};

const getWater = () => {
  let options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch(
    `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
    options
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        //   3700 ml is staandard for now
        console.log(Object.values(data), "getWater  ");
        waterAdded = Object.values(data).length * 200;
        const remainingWater = 3700 - waterAdded;
        waterRemainingValue = remainingWater;

        if (remainingWater < 0) {
          waterRemaining.innerHTML = 0;
        } else {
          waterRemaining.innerHTML = remainingWater;
        }

        if (waterAdded >= 3700) {
          errorElement.innerHTML =
            "You have reached the full limit for today. Come back tomorrow for more.";
        } else {
          errorElement.innerHTML = "";
        }
      } else {
        waterRemaining.innerHTML = 3700;
      }
    })
    .catch((error) => console.error("Error in fetching data"));
};

// Logout functionality
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  console.log("logout");
  firebase
    .auth()
    .signOut()
    .then((res) => {
      console.log("Signed out", res);
      chrome.storage.local.set({ isAuthenticated: false });
      window.location.href = "../login/login.html";
    })
    .catch((error) => {
      console.error("Error in signing out the user: ", error);
    });
});
