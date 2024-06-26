let userId;
let tokenPromise;

try {
  self.importScripts('./custom_scripts/firebase/firebase-app.js');
  self.importScripts('./custom_scripts/firebase/firebase-auth.js');
  self.importScripts('./custom_scripts/firebase/firebase-database.js');

  // initialisation
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

  /**
   * @description This function is used to get the token of the current user
   * @returns {Promise<string>}
   */
  const getToken = async () => {
    let token = await firebase?.auth().currentUser?.getIdToken();
    console.log(token, 'token');
    return token;
  };

  // Getting userId
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Message from other scripts:", request);
    switch (request.message) {
      case "getAuthStatus":
        sendResponse({ userId });
        break;
      case "getToken":
        tokenPromise.then((token) => {
          sendResponse(token);
        });
        break;
      case "signOut":
        firebase
          .auth()
          .signOut()
          .then((res) => {
            chrome.storage.local.clear((result) => {
              let error = chrome.runtime.lastError;
              if (error) {
                console.error("Error in logging out the user", error);
                sendResponse(false);
              } else {
                // window.location.href = "../login/login.html";
                // return true;
                sendResponse(true);
              }
            });
          })
          .catch((error) => {
            console.error("Error in signing out the user: ", error);
          });
        break;
      case "login":
        const email = request.email;
        const password = request.password;

        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            chrome.storage.local.set({ user: userCredential });
            sendResponse({ status: true, message: '' });
          })
          .catch((e) => {
            console.error("Error in logging in the user: ", e);
            sendResponse({ status: false, message: e?.message });
          });
        break;
      case "signup":
        const userEmail = request.email;
        const userPassword = request.password;

        console.log('signup background', userEmail, userPassword, 'signup background');

        firebase
          .auth()
          .createUserWithEmailAndPassword(userEmail, userPassword)
          .then((userCredential) => {
            chrome.storage.local.set({ user: userCredential });
            sendResponse({ status: true, message: '' });
          })
          .catch((e) => {
            console.error("Error in signing up the user: ", e);
            sendResponse({ status: false, message: e?.message });
          });
        break;
      default:
        console.log('No message found');
        break;
    }
    return true;
  });

  // Getting token
  firebase?.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user, 'user?.uid');
      console.log(user.getIdToken(), 'user?.uid');
      userId = user?.uid;
      tokenPromise = getToken();
    }
  });

  // Signing out the user


} catch (error) {
  console.error('Error in Initilising firebase App', error);
}