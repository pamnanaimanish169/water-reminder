import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCQLG34McSyK32qYsLAUYhYD9_BUK0QLao",
    authDomain: "water-reminder-b9aac.firebaseapp.com",
    databaseURL: "https://water-reminder-b9aac-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "water-reminder-b9aac",
    storageBucket: "water-reminder-b9aac.appspot.com",
    messagingSenderId: "628031196131",
    appId: "1:628031196131:web:5009a8342f96ce10882ed6",
    measurementId: "G-E8SHRJ9ZEB"
});

const database = getDatabase(firebaseApp);

set(ref(database), {
    name: 'Priti Pamnani'
}).then((value) => {
    console.log('Value', value)
}).catch((error) => {
    console.error('Error', error);
})