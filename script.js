console.log('Hello World!');

// Set the value for total water needed
const waterDailyGoal = 3700;

const element = document.getElementById('remaining');
element.innerHTML = waterDailyGoal;

// Calculate the remaining amount of water needed
const RemainingWaterNeeded = () => {

}

// Allow user to enter only number instead of text
const checkInput = (input) => {
    input.value = input.value.replace(/\D/g, '').substring(0, 2);
}