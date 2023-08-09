let userId;
let waterAdded;
const errorElement = document.getElementById("errors");

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", (event) => {
  if (waterAdded >= 3700) {
    errorElement.innerHTML =
      "You have reached the full limit for today. Come back tomorrow for more.";
  } else {
    addWater();
    errorElement.innerHTML = "";
  }
});

try {
  let user = JSON.parse(localStorage.getItem("user"));

  let userOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: user?.idToken }),
  };
  await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAHHQcYGtLJylGcyaoLkc8YMEzNE_tVNN4`,
    userOptions
  )
    .then((res) => res.json())
    .then((data) => {
      userId = data?.users[0]?.localId;
    })
    .catch((error) => console.error("Error in fetching user_id: ", error));
} catch (error) {
  console.error("Error in fetching uid: ", error);
}

const addWater = () => {
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
      const waterRemaining = document.getElementById("water-remaining");

      if (data) {
        //   3700 ml is staandard for now
        waterAdded = Object.values(data).length * 200;
        const remainingWater = 3700 - waterAdded;

        if (remainingWater < 0) {
          waterRemaining.innerHTML = 0;
        } else {
          waterRemaining.innerHTML = remainingWater;
        }
      } else {
        waterRemaining.innerHTML = 3700;
      }
    })
    .catch((error) => console.error("Error in fetching data"));
};

getWater();
