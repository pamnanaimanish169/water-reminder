  console.log(chrome);
  console.log(chrome.storage);

  chrome?.storage?.local?.get('interval', function (data) {
    console.log('interval');
    const interval = data && data.interval;
    console.log(interval,'interval')
  
    chrome.alarms.create('recurringAlarm', {
      delayInMinutes: interval,
      periodInMinutes: interval
    });
  });
  console.log(chrome);
  console.log(chrome.alarms);

  chrome?.alarms?.onAlarm.addListener(function (alarm) {
    console.log(alarm);
    if (alarm.name === 'recurringAlarm') {
      console.log(alarm);
      const options = {
        type: 'basic',
        iconUrl: 'glass-of-water.jpg',
        title: 'Water reminder',
        message: "Don't forget to drink a glass of water!"
      };
  
      chrome?.notifications?.create(options);
    }
  });