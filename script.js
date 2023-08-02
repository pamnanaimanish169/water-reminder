console.log("Hello World!");

// Set the value for total water needed
const waterDailyGoal = 3700;

// Allow user to enter only number instead of text
const checkInput = (input) => {
  input.value = input.value.replace(/\D/g, "").substring(0, 2);
};
