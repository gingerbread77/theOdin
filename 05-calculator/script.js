const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const display = document.getElementById("display");
const clear = document.getElementById("reset");
const equal = document.getElementById("equal");

let num1 = "";
let num2 = "";
let operator = "";
let result = "";
let isOperatorSelected = "";
let isError = false;

function displayResult(number) {
  // prevent multiple decimal points
  // check num1 if operator is not selected
  // check num2 if operator is selected
  if(number === '.' && (!isOperatorSelected? num1.includes("."):num2.includes("."))){
    return;
  }
  if (isError) {
    return;
  }
  if (!isOperatorSelected) {
    num1 += number;
    display.value = num1;
  } else {
    num2 += number;
    display.value = num2;
  }
}

function clearResult() {
  num1 = "";
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  display.value = "";
  result = "";
  isError = false;
}

function calculate() {
  num1 = Number(num1);
  num2 = Number(num2);

  if (operator === "/" && num2 === 0) {
    result = "ERROR";
    isError = true;
  } else {
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
    }
  }
  display.value = result;
  num1 = result;
  num2 = "";
  isOperatorSelected = false;
}

digits.forEach((digit) => {
  digit.addEventListener("click", function () {
    displayResult(digit.textContent);
  });
});

operators.forEach((op) => {
  op.addEventListener("click", function () {
    if (num1 && !isError) {
      operator = op.textContent;
      isOperatorSelected = true;
    }
  });
});

clear.addEventListener("click", clearResult);
equal.addEventListener("click", () => {
  if (num1 && num2 && operator && !isError) {
    calculate();
  }
});