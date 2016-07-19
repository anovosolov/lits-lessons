var calculatorDisplay = document.querySelector(".calculator__display"),
    calculatorResult = document.querySelector(".calculator__result"),
    calculatorRunBtn = document.querySelector(".js-calculate"),
    calculatorClearBtn = document.querySelector(".js-clear");

// with addEventListener we can add as many listeners to event as we want
// they will be fired one after another
// here we add two listeners for keyup event
calculatorDisplay.addEventListener("keyup", validate);
calculatorDisplay.addEventListener("keyup", calculateOnEnter);

calculatorRunBtn.addEventListener("click", calculate);
calculatorClearBtn.addEventListener("click", clear);

/**
 * Here we check if input has any value.
 * To do this, we get it's value and check if it's not empty.
 * trim() will remove empty whitespaces from string
 */
function validate(){
  if (calculatorDisplay.value.trim() === ""){
    calculatorRunBtn.setAttribute("disabled", true); // set attribute
  }
  else{
    calculatorRunBtn.removeAttribute("disabled"); // remove attribute
  }
}

/**
 * We can insert any string (including HTML string) into element using innerHTML property.
 * It's very powerful, be careful with it: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
 *
 * You can create HTML content with it like here http://codepen.io/Khrystyna/pen/VjQNLd,
 * but it is measured that creating content via innerHTML is much slower than with createElement()
 */
function calculate(){
  calculatorResult.innerHTML = calculator.calc(calculatorDisplay.value);
}

/**
 * addEventListener first argument (in our case we named it "event")  represents event we are listening for.
 * Event has lots of parameters which describe it.
 * One of them is a keyCode which represents code of pressed key on keyboard.
 * You may check all codes here http://keycode.info
 *
 * So, we just check key code and see if it is 13 - Enter button. If yes, we call calculation.
 *
 * @param event
 */
function calculateOnEnter(event){
  if (event.keyCode === 13){
    calculate();
  }
}

/**
 * Clear input value and result field
 */
function clear(){
  calculatorResult.innerHTML = "";
  calculatorDisplay.value = "";
}

