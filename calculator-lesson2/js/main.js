var calculatorDisplay = document.querySelector(".calculator__display"),
    calculatorBody = document.querySelector(".calculator__body"),
    calculatorClearBtn = document.querySelector(".js-clear"),
    isCalculated = false;

// with addEventListener we can add as many listeners to event as we want
// they will be fired one after another
calculatorClearBtn.addEventListener("click", onClearBtnClick);

// catch all click events inside of calculator body
calculatorBody.addEventListener("click", onCalculatorBtnClick);


/**
 * Use only one event listener for parent element
 * Check which button was pressed and perform action
 * @param event
 */
function onCalculatorBtnClick(event){
  var target = event.target, // what element was clicked
      targetValue = target.getAttribute("data-value"); // get value od pressed button

  if (target.tagName !== 'BUTTON') return;

  // yay, we pressed "="!
  // lets calculate our expression
  if (targetValue === "="){
    calculate();
  }
  else{
    calculatorDisplay.value = isCalculated ? targetValue : calculatorDisplay.value + targetValue;
    isCalculated = false; // we started new expression
  }
}


/**
 * We use here eval method
 * eval() function evaluates JavaScript code represented as a string
 * if the string represents an expression, eval() evaluates the expression
 *
 * Set isCalculated flag to true, so that we can clear input value next time any button is pressed
 */
function calculate() {
  calculatorDisplay.value = eval(calculatorDisplay.value);
  isCalculated = true; // next time any button is pressed we can clear input
}


/**
 * Clear button was cliked
 */
function onClearBtnClick(){
  clear();
}


/**
 * Clear input value and result field
 */
function clear() {
  calculatorDisplay.value = "";
}

