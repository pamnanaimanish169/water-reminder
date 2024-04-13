// constants/variables
let userId = '';
let isLoading = true;
let token = '';

const notificationSwitch = document.getElementById("notifications");
const element = document.getElementById("settings-container");
const loader = document.getElementById("loader");

// Others
chrome.runtime.sendMessage({ message: "getAuthStatus" }, function (response) {
  console.log("Response from background script:", response);
  if (response.userId) {
    userId = response.userId;
  }
});

chrome.runtime.sendMessage({ message: "getToken" }, async function (response) {
  console.log("Response from background script:", response);
  token = response;
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
