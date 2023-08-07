// import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log("dashboard works");

document.addEventListener("DOMContentLoaded", () => {
  const addWaterButton = document.querySelector(".add-button");
  addWaterButton.addEventListener("click", onAddWater);
});

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

// get the user_id

const getUserId = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        resolve(user.uid);
      } else {
        console.log("User is signed out");
        reject("User is signed out");
      }
    });
  });
};

const onAddWater = async () => {
  try {
    let uid = await getUserId();
    const firebaseDB = firebase.database().ref("/users/" + uid);

    let users = firebaseDB.push();

    firebaseDB.on("value", (snapshot) => {
      const entries = snapshot.val();
      const waterAdded = Object.values(entries).length * 200;
      const waterRemaining = document.getElementById("water-remaining");

      if (waterAdded >= 3700) {
        console.error("You have already reached maximum quota of daily water!");
        waterRemaining.innerHTML = 3700;
      } else {
        users.set({
          amount: 200, // in ml
          timestamp: Date.now(),
        });
        waterRemaining.innerHTML = 3700 - waterRemaining;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// make the entry in the /users collection
