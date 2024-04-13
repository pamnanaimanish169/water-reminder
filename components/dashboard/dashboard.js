// constants/variables
let userId = '';
let isLoading = true;
let token = '';

let waterAdded;
let waterRemainingValue;

const errorElement = document.getElementById("errors");
const waterRemaining = document.getElementById("water-remaining");
const addButton = document.getElementById("add-button");
const logout = document.getElementById("logout");

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
  getWater();
});


// function handlers
/**
 * @description Filter the water entries for today
 * @param {*} data 
 * @returns {Promise<void>}
 */
const filterEntriesForToday = (data) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todaysEntries = {};

  for (const key in data) {
    if (
      data.hasOwnProperty(key) &&
      data[key]?.timestamp >= startOfDay.getTime() &&
      data[key]?.timestamp <= endOfDay.getTime()
    ) {
      todaysEntries[key] = data[key];
    }
  }

  return todaysEntries;
};

/**
 * @description This function is used to add water to the user's account
 * @returns {Promise<void>}
 */
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

    console.log(token, 'token');
    console.log(userId, 'userId');

    // let token = await firebase.auth().currentUser.getIdToken();

    fetch(
      `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${token}`,
      options
    )
      .then((res) => {
        if (res.status === 200) {
          getWater();
          return res.json();
        }
      })
      .catch((error) => console.error("Error in fetching data", error));
  }
};

/**
 * @description This function is used to get the water remaining for the user
 * @returns {Promise<void>}
 */
const getWater = async () => {
  let options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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
    .then((data) => {
      if (data) {
        //   3700 ml is staandard for now
        const todaysEntries = filterEntriesForToday(data);
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

// Event listeners

// Logout
logout.addEventListener("click", () => {
  chrome.runtime.sendMessage({ message: "signOut" }, function (response) {
    if (response) {
      window.location.href = "../login/login.html";
    }
  });
});

// Add water
addButton.addEventListener("click", (event) => {
  if (waterRemainingValue <= 0) {
    errorElement.innerHTML =
      "You have reached the full limit for today. Come back tomorrow for more.";
  } else {
    addWater();
    errorElement.innerHTML = "";
  }
});
