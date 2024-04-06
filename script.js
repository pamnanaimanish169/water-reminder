console.log('inside script.js');

chrome.storage.local.get("user", (data) => {
  console.log('user', data);
  if (data?.user) {
    window.location.href = '../components/dashboard/dashboard.html';
  } else {
    window.location.href = '../components/login/login.html';
  }
});