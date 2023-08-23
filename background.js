let isAuthenticated;

chrome.storage.local.get("isAuthenticated", (data) => {
  isAuthenticated = data?.isAuthenticated;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getAuthStatus") {
    sendResponse(isAuthenticated)
  }
});

chrome?.storage?.local?.get("interval", function (data) {
  const interval = data && data.interval;

  chrome.alarms.create("recurringAlarm", {
    delayInMinutes: interval,
    periodInMinutes: interval,
  });
});

chrome?.alarms?.onAlarm.addListener(function (alarm) {
  if (alarm.name === "recurringAlarm") {
    const options = {
      type: "basic",
      iconUrl: "./glass-of-water.jpg",
      title: "Water reminder",
      message: "Don't forget to drink a glass of water!",
    };

    chrome?.notifications?.create(options);
  }
});
