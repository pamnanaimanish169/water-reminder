let userId;
let accessToken;
let waterAdded;
const errorElement = document.getElementById("errors");
const waterRemaining = document.getElementById("water-remaining");
let waterRemainingValue;

const getTodayEntries = (data) => {
  // start time
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // end time
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Get all the entries between this range
  // 1692297000000 - 1692383399999
  const todaysEntries = {};

  for (const key in data) {
    if (data.hasOwnProperty(key) && (data[key]?.timestamp >= startOfDay.getTime() && data[key]?.timestamp <= endOfDay.getTime()) ) {
      todaysEntries[key] = data[key];
    }
  }

  return todaysEntries;
};

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
    console.log(user);
    console.log(user.currentUser)
    userId = user?.uid;
    
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

    let token = await firebase.auth().currentUser.getIdToken();
    console.log(token);

    fetch(
      `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${auth}`,
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

const getWater = async () => {
  let options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let token = await firebase.auth().currentUser.getIdToken();
  console.log(token);

  fetch(
    `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
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
        const todaysEntries = getTodayEntries(data);
        waterAdded = Object.values(todaysEntries).length * 200;
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
  firebase
    .auth()
    .signOut()
    .then((res) => {
      chrome.storage.local.set({ isAuthenticated: false });
      window.location.href = "../login/login.html";
    })
    .catch((error) => {
      console.error("Error in signing out the user: ", error);
    });
});
