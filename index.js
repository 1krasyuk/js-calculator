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

function updateScreen() {
  screen.textContent = currentInput;
}

updateScreen();

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === '.' && currentInput.includes('.')) return;

    if (currentInput.replace('.', '').length >= 14) return;

    if (currentInput === "0" || resetScreen) {
      currentInput = button.textContent === '.' ? "0." : button.textContent;
      resetScreen = false;
    } else {
      currentInput += button.textContent;
    }
    updateScreen();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperation !== null && !resetScreen) calculate();

    firstNumber = currentInput;
    currentOperation = button.textContent;
    resetScreen = true;
    updateScreen();
  });
});

calculateButton.addEventListener("click", () => {
  calculate();
});

function calculate() {
  if (currentOperation === null || firstNumber === null) return;

  let num1 = parseFloat(firstNumber);
  let num2 = parseFloat(currentInput);
  let result;
  switch (currentOperation) {
    case "+":
      result = num1 + num2;
      currentInput = result.toString();
      updateScreen();
      currentOperation = null;
      resetScreen = true;
      break;
    case "-":
      result = num1 - num2;
      currentInput = result.toString();
      updateScreen();
      currentOperation = null;
      resetScreen = true;
      break;
    case "x":
      result = num1 * num2;
      currentInput = result.toString();
      updateScreen();
      currentOperation = null;
      resetScreen = true;
      break;
    case "/":
      if (num2 === 0) {
        screen.textContent = "Cannot divide by 0";
        currentOperation = null;
        resetScreen = true;
        return;
      }
      result = num1 / num2;
      if (result.toString().length > 4) { 
        result = parseFloat(result.toFixed(1));
      }
      currentInput = result.toString();
      updateScreen();
      currentOperation = null;
      resetScreen = true;
      break;
  }
}

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

document.addEventListener('keydown', (e) => {
  const key = e.key;
  // Map keyboard keys to calculator functions
  if (key >= '0' && key <= '9') {
    // Simulate number button click
  } else if (key === '.') {
    // Decimal
  } else if (key === 'Enter') {
    // Equals
  }
  // etc...
});