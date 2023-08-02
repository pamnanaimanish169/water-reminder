chrome.storage.local.get('interval', function (data) {
    const interval = data && data.interval ? data.interval : 1;
  
    chrome.alarms.create('recurringAlarm', {
      delayInMinutes: interval,
      periodInMinutes: interval
    });
  });
  
  chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === 'recurringAlarm') {
      const options = {
        type: 'basic',
        iconUrl: 'glass-of-water.jpg',
        title: 'My Notification',
        message: 'This is a recurring notification.'
      };
  
      chrome.notifications.create(options);
    }
  });