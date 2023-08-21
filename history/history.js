let userId;

const todaysDate = document.getElementById("todaysDate");
todaysDate.innerHTML = new Date().toDateString();

// Initialize firebase
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
    userId = user?.uid;
    getWater();
  }
});

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

const createBackButton = () => {
    const backButtonParent = document.createElement('div');

    const element = document.createElement('a');
    element.setAttribute('href', '../dashboard/dashboard.html');
    element.innerText = 'Back to Dashboard';

    // append anchor tag to a div for styling
    backButtonParent.appendChild(element);
    backButtonParent.classList.add("center-align-button");

    document.body.append(backButtonParent);
}

const generateTable = (data) => {
  // Create table element
  const table = document.createElement("table");
  table.id = 'todaysEntries';
  table.classList.add("center-align", "spaced-columns");

  // Create table headers
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Create 'Qty' header
  const qtyHeader = document.createElement("th");
  qtyHeader.textContent = "Qty";
  headerRow.appendChild(qtyHeader);

  // Create 'Time' header
  const timeHeader = document.createElement("th");
  timeHeader.textContent = "Time";
  headerRow.appendChild(timeHeader);

  // Append the header row to the table header
  thead.appendChild(headerRow);

  // Create table body
  const tbody = document.createElement("tbody");

  // Loop through the data to create table rows and cells
  Object.values(data).forEach((item) => {
    const row = document.createElement("tr");

    // Create 'Qty' cell and display as '200 ml'
    const qtyCell = document.createElement("td");
    qtyCell.textContent = item.amount + " ml";
    row.appendChild(qtyCell);

    // Create 'Time' cell and format the timestamp
    const timeCell = document.createElement("td");
    const timestamp = new Date(item.timestamp);
    timeCell.textContent = timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    row.appendChild(timeCell);

    // Append each row to the table body
    tbody.appendChild(row);
  });

  // Append the table header and body to the table element
  table.appendChild(thead);
  table.appendChild(tbody);

  // Append the table to an existing element in the HTML, such as the body
  document.body.appendChild(table);

  createBackButton();
};

const getWater = () => {
  let options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch(
    `https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2F0ZXItcmVtaW5kZXItYjlhYWMiLCJhdWQiOiJ3YXRlci1yZW1pbmRlci1iOWFhYyIsImF1dGhfdGltZSI6MTY5MjU5ODkwNCwidXNlcl9pZCI6Inhib1ZSQXdiUkFQWE9KenJtMmxzdk9IZlo1ZzIiLCJzdWIiOiJ4Ym9WUkF3YlJBUFhPSnpybTJsc3ZPSGZaNWcyIiwiaWF0IjoxNjkyNTk4OTA0LCJleHAiOjE2OTI2MDI1MDQsImVtYWlsIjoibWFuaXNocGFtbmFuaTE2OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWFuaXNocGFtbmFuaTE2OUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.BdtUoFtaoGMbBudXg1lH-lWPhYcyswjRjx9NNn1fNEJkI4j3Z1-PTAmsbTVcQ2K6is4d9RrLNDg1w0-6itQgBUtTdJhC8gWxg0kvndDJqpDJMKxb-afabROiwXox4Sa_GrCFM3mSiVpMVC7YDKX07EsgvGNLua-jb1Auuq4Qxw3k2QFQvGVB0XbzQu1xMR4wOPHTdkAXkb4QMGxXj6S6Gi4DXBppl7KG-pyETxT70AqQ25Hy6_7VfBoX8l-_aWHi-GvrrKyzhMRqQmae7MqCN0xidy4sdi4aKtzb74tnaVOcpV7Cq8YGo4Xw8LdxL-krc12BH9JULpXpGw4Ri1ZCfQ`,
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
        generateTable(todaysEntries);
      } else {
        console.error("Error in getting todays entries: ", data);
      }
    })
    .catch((error) => console.error("Error in fetching data"));
};
