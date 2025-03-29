const screen = document.querySelector(".calculator-screen");
const numButtons = document.querySelectorAll(".btn-num");
const operationButtons = document.querySelectorAll(".btn-operate");
const clearButton = document.querySelector(".btn-clear");
const deleteButton = document.querySelector(".btn-backspace");
const calculateButton = document.querySelector(".btn-equals");

let currentInput = "0";
let resetScreen = false;
let firstNumber = null;
let currentOperation = null;

// Update calculator display with current input
function updateScreen() {
  screen.textContent = currentInput;
}

updateScreen();

// Handle number button clicks (0-9 and decimal)
numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Prevent multiple decimal points
    if (button.textContent === "." && currentInput.includes(".")) return;

    // Limit input length to 14 digits
    if (currentInput.replace(".", "").length >= 14 && !resetScreen) return;

    // Handle new input or append to existing
    if (currentInput === "0" || resetScreen) {
      currentInput = button.textContent === "." ? "0." : button.textContent;
      resetScreen = false;
    } else {
      currentInput += button.textContent;
    }
    updateScreen();
  });
});

// Handle operation button clicks (+, -, ×, ÷)
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Calculate previous operation if exists
    if (currentOperation !== null && !resetScreen) calculate();

    // Store first number and selected operation
    firstNumber = currentInput;
    currentOperation = button.textContent;
    resetScreen = true;
    updateScreen();
  });
});

// Perform calculation based on stored operation
function calculate() {
  // Validate we have operation and numbers
  if (currentOperation === null || firstNumber === null) return;

  let num1 = parseFloat(firstNumber);
  let num2 = parseFloat(currentInput);
  let result;
  switch (currentOperation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        screen.textContent = "Cannot divide by 0";
        currentOperation = null;
        resetScreen = true;
        return;
      }
      result = num1 / num2;
      break;
  }
  // Round results with many decimal places
  if (result.toString().length > 4) {
    result = parseFloat(result.toFixed(1));
  }
  // Update display and reset state
  currentInput = result.toString();
  updateScreen();
  currentOperation = null;
  resetScreen = true;
}

calculateButton.addEventListener("click", calculate);

deleteButton.addEventListener("click", () => {
  if (currentInput.length === 1) {
    currentInput = "";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateScreen();
});

clearButton.addEventListener("click", () => {
  currentInput = "0";
  firstNumber = null;
  currentOperation = null;
  resetScreen = false;
  updateScreen();
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;
  // Numbers
  if (key >= "0" && key <= "9") {
    const digitButton = Array.from(numButtons).find(
      (btn) => btn.textContent === key
    );
    digitButton?.click();
  }

  // Operators
  else if (["+", "-", "*", "/"].includes(key)) {
    let operator = key;
    if (key === "*") operator = "x";

    const opButton = Array.from(operationButtons).find(
      (btn) => btn.textContent === operator
    );
    opButton?.click();
  } else if (key === ".") {
    const decimalButton = document.querySelector(".btn-decimal");
    decimalButton?.click();
  } // Equals
  else if (key === "Enter" || key === "=") {
    calculateButton.click();
  }

  // Delete
  else if (key === "Backspace") {
    deleteButton.click();
  }

  // Clear
  else if (key === "Escape") {
    clearButton.click();
  }

  if (/[\d\.\+\-\*\/=]|Enter|Backspace|Escape/.test(key)) {
    e.preventDefault();
  }
});
