// initialisation
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

// constants/variables
let userId;
let isLoading = true;

const notificationSwitch = document.getElementById("notifications");
const element = document.getElementById("settings-container");
const loader = document.getElementById("loader");

// Others
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userId = user?.uid;
  }
});

// function handlers
/**
 * @description This function is used to get the initial value of the notification switch
 * @returns {Promise<void>}
 */
const fetchInitialNotificationSettings = async () => {
  let options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let token = await firebase.auth().currentUser?.getIdToken();

  if (token) {
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
        data && data.notificationEnabled === true ? notificationSwitch.checked = true : notificationSwitch.checked = false;
      })
      .finally(() => {
        isLoading = false;
        element.style.display = "flex";
        element.classList.add("visible");
        loader.style.display = "none";
      })
      .catch((error) => console.error("Error in fetching Initial Notification settings", error));
  }
};

/**
 * @description This function is used to call the API to update the notificationEnabled value
 * @param {*} notificationEnabled 
 * @returns {Promise<void>}
 */
const updateNotificationSettings = async (notificationEnabled) => {
  if (userId) {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationEnabled: notificationEnabled }),
    };

    let token = await firebase.auth().currentUser.getIdToken();

    fetch(
      `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
      options
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((error) => console.error("Error in updating Notification settings", error));
  }
};

// Event Handlers
notificationSwitch.addEventListener("change", (event) => {
  event.preventDefault();

  const confirmation = confirm(
    `Are you sure you want to turn ${event.target.checked ? "on" : "off"
    } notifications?`
  );

  if (confirmation) {
    updateNotificationSettings(event.target.checked);
    notificationSwitch.checked = event.target.checked;
  }

  if (!confirmation) {
    notificationSwitch.checked = !event.target.checked;
  }
});

// TODO: Find a gracious solution for this
setTimeout(() => {
  fetchInitialNotificationSettings();
}, 2000);
