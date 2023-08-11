document.addEventListener('DOMContentLoaded', function () {
    const intervalInput = document.getElementById('remind-time');
    console.log(intervalInput);
    
    chrome?.storage?.local?.get('interval')
      .then(function (data) {
        console.log(data);
        if (data && data.interval) {
          intervalInput.value = data.interval;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  
    document.getElementById('submit-button').addEventListener('click', function () {
      console.log('submit-button')
      const interval = parseInt(intervalInput.value);
      console.log(interval);
      console.log(chrome);

      chrome?.storage?.local?.set({ interval: interval })
        .then(function () {
          alert('Interval saved!');
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });