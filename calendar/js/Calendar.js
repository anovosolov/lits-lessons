function Calendar(container) {
  var self = this;

  // currently selected day
  this.selectedDay = null;

  // get calendar DOM node
  var calendarElement = document.querySelector(container);

  /**
   * Listener for Calendar body click
   * We check the node which was clicked and see if it is a day
   * If yes, we select it
   *
   * Be careful! this in listener === event.currentTarget, so we can't call this.selectDay()
   * That's why, we store this in local 'self' variable and now at any place in code we have pointer to Calendar object
   * and can call it's methods
   *
   * @param event
   */
  function onDayClick(event){
    var target = event.target;
    while (target != event.currentTarget) {
      if (isDay(target) && !isDaySelected(target)) {
        self.selectDay(target);
        return;
      }

      target = target.parentNode;
    }
  }


  /**
   * Private method
   * We don't need it outside, so we made it private
   */
  function isDay(element){
    return element.classList.contains("calendar__day");
  }


  /**
   * Private method
   * We don't need it outside, so we made it private
   */
  function isDaySelected(day){
    return day.classList.contains("calendar__day--selected");
  }


  /**
   * Check if we have previously selected day
   * If yes, remove 'calendar__day--selected' class from it
   * @param day
   */
  this.selectDay = function(day){
    if (this.selectedDay) {
      this.selectedDay.classList.remove("calendar__day--selected");
    }

    day.classList.add("calendar__day--selected");
    this.selectedDay = day;
  };


  /**
   * Public method init will initialize calendar
   * and prepare it for work
   */
  this.init = function () {
    var calendarBody = calendarElement.querySelector(".calendar__body");
    calendarBody.addEventListener("click", onDayClick);
  }
}