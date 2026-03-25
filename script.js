let currentInput = "0";
let previousInput = "";
let operator = null;

const currentDisplay = document.getElementById("current-operand");
const previousDisplay = document.getElementById("previous-operand");

function updateDisplay() {
  currentDisplay.textContent = currentInput;
  previousDisplay.textContent = operator ? `${previousInput} ${operator}` : "";
}

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") calculate();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  updateDisplay();
}

function deleteNumber() {
  currentInput = currentInput.toString().slice(0, -1);
  if (currentInput === "") currentInput = "0";
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "÷":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay();
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(".");
  if (e.key === "=" || e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clearDisplay();
  if (e.key === "+") appendOperator("+");
  if (e.key === "-") appendOperator("-");
  if (e.key === "*") appendOperator("x");
  if (e.key === "/") appendOperator("÷");
});
