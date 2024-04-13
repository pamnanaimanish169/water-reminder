// constants/variables
let userId = '';
let isLoading = true;
let token = '';

const loader = document.getElementById("loader");
const todaysDate = document.getElementById("todaysDate");
const backButton = document.getElementById("backButton");
const historyContainer = document.getElementById("history-container");

backButton.style.display = "none";
todaysDate.style.display = "none";
todaysDate.innerHTML = new Date().toDateString();

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
  retrieveWaterLogs(token);
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
 * @description Generate a table with the water entries for today
 * @param {*} data 
 */
const renderWaterEntriesTable = (data) => {
  const table = document.createElement("table");
  table.id = 'todaysEntries';
  table.classList.add("center-align", "spaced-columns");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const qtyHeader = document.createElement("th");
  qtyHeader.textContent = "Qty";
  headerRow.appendChild(qtyHeader);

  const timeHeader = document.createElement("th");
  timeHeader.textContent = "Time";
  headerRow.appendChild(timeHeader);

  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");

  // Loop through the data to create table rows and cells
  Object.values(data).forEach((item) => {
    const row = document.createElement("tr");

    const qtyCell = document.createElement("td");
    qtyCell.textContent = item.amount + " ml";
    row.appendChild(qtyCell);

    const timeCell = document.createElement("td");
    const timestamp = new Date(item.timestamp);
    timeCell.textContent = timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    row.appendChild(timeCell);

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  historyContainer.appendChild(table);
};

/**
 * @description Get the water entries for today
 * @param {*} token 
 */
const retrieveWaterLogs = async (token) => {
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
        const todaysEntries = filterEntriesForToday(data);
        renderWaterEntriesTable(todaysEntries);
      } else {
        console.error("Error in getting todays entries: ", data);
      }
    })
    .finally(() => {
      isLoading = false;
      loader.style.display = "none";
      todaysDate.style.display = "flex";
      backButton.style.display = "flex";
    })
    .catch((error) => console.error("Error in fetching data"));
};
