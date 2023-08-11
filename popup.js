document.addEventListener('DOMContentLoaded', function () {
    const intervalInput = document.getElementById('remind-time');

    chrome?.storage?.local
        ?.get('interval')
        .then(function (data) {
            if (data && data.interval) {
                intervalInput.value = data.interval;
            }
        })
        .catch(function (error) {
            console.error(error);
        });

    document
        .getElementById('submit-button')
        .addEventListener('click', function () {
            const interval = parseInt(intervalInput.value);
            chrome.storage.local
                .set({ interval: interval })
                .then(() => alert('interval saved'))
                .catch((error) =>
                    console.error('Error in saving interval:', error)
                );
        });
});
