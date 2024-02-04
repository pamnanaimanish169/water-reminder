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

let userId;

const notificationSwitch = document.getElementById("switch");

notificationSwitch.addEventListener("change", (event) => {
  console.dir(event.target.checked);

  if (event.target.checked === true) {
    const confirm = window.confirm(
      "Do you want to turn on the periodic reminders?"
    );
    console.log(confirm);

    // If confirm is true then set the notificationsEnabled to true (on the backend);
    if (confirm === true) {
      callApi(true);
    }
  } else {
    const confirmOffAlarm = window.confirm(
      "Do you want to turn off the periodic reminders?"
    );
    console.log(confirmOffAlarm);

    // If confirm is true then set the notificationsEnabled to false (on the backend)
    if (confirmOffAlarm === true) {
      console.log("confirmOffAlarm", confirmOffAlarm);
      callApi(false);
    }
  }
});

const callApi = async (notificationEnabled) => {
  console.log("callApi", userId, notificationEnabled);

  if (userId) {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationEnabled: notificationEnabled }),
    };

    let token = await firebase.auth().currentUser.getIdToken();
    console.log(token, "token");

    fetch(
      `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
      options
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((error) => console.error("Error in fetching data", error));
  }
};

// Get the user id for calling API
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userId = user?.uid;
  }
});

// Get the initial Value for notificationEnable value
const getInitialValue = async () => {
  let options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let token = await firebase.auth().currentUser.getIdToken();
  console.log(token);

  console.log("callApi", userId);

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
      console.log(data, "data");
    })
    .catch((error) => console.error("Error in fetching data"));
};

// TODO: Find a gracious solution for this
setTimeout(() => {
  getInitialValue();
}, 500);
