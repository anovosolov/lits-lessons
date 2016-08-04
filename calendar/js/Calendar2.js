function Calendar(container) {
  var self = this;

  this.weekArray = 'Пн,Вт,Ср,Чт,Пт,Сб,Нд'.split(',');
  this.monthArray = "Січень, Лютий, Березень, Квітень, Травень, Червень, Липень, Серпень, Вересень ,Жовтень, Листопад, Грудень ".split(',');

  // currently selected day
  this.selectedDay = new Date();
  this.year = this.selectedDay.getFullYear();
  this.month = this.selectedDay.getMonth();

  // get calendar DOM node
  this.element = document.querySelector(container);

  this.goToPrevMonth = function(){
    self.setMonth(self.month - 1);
  };

  this.goToNextMonth = function(){
    self.setMonth(self.month + 1);
  };

  this.setMonth = function(monthNumber){
    // we reached first month and should open previous year from last month
    if (monthNumber < 0) {
      this.month = 11;
      this.year -= 1;
    }
    // we reached last month and should open next year from first month
    else if (monthNumber > 11) {
      this.month = 0;
      this.year += 1;
    }
    else {
      this.month = monthNumber; // we are in current year, no changes
    }

    var monthTitle = this.element.querySelector(".calendar__header h1"),
      calendarBody = this.element.querySelector(".calendar__body");

    monthTitle.innerHTML = this.monthArray[this.month] + ", " + this.year;
    calendarBody.innerHTML = generateMonthBody();
  };

  /**
   * Private method will actually draw calendar
   * and prepare it for work
   */
  function drawCalendar(){
    self.element.classList.add("calendar"); // don't override existed class names, just add 'calendar'
    self.element.appendChild(drawMonthHeader());
    self.element.appendChild(drawMonthBody(self.month));
    self.element.appendChild(drawMonthFooter());
  }

  function drawMonthHeader(){
    var header = document.createElement('header'),
        prevMonthBtn = document.createElement("button"),
        nextMonthBtn = document.createElement("button"),
        currentMonthTitle = document.createElement("h1");

    header.className = "calendar__header";

    prevMonthBtn.className = "calendar__btn js-prev-month";
    prevMonthBtn.innerHTML = "&lt;";
    prevMonthBtn.addEventListener('click', self.goToPrevMonth);

    nextMonthBtn.className = "calendar__btn js-next-month";
    nextMonthBtn.innerHTML = "&gt;";
    nextMonthBtn.addEventListener('click',self.goToNextMonth);

    currentMonthTitle.innerHTML = self.monthArray[self.month] + ", " + self.year;

    header.appendChild(prevMonthBtn);
    header.appendChild(currentMonthTitle);
    header.appendChild(nextMonthBtn);

    return header;
  }

  function drawMonthFooter(){
    var footer = document.createElement('footer');

    footer.className = "calendar__footer";
    footer.innerHTML = "<div class='calendar__day'>" + self.weekArray.join("</div><div class='calendar__day'>") + "</div>";

    return footer;
  }

  function drawMonthBody(){
    var monthBody = document.createElement("div");
    monthBody.className = "calendar__body";
    monthBody.innerHTML = generateMonthBody(); // create body and fill with days

    monthBody.addEventListener("click", onDayClick); // listen for all clicks over calendar body
    return monthBody;
  }

  function generateMonthBody(){
    var month = new Date(self.year, self.month, 1),
      monthFirstDay = (month.getDay() || 7), // starts from 0 = Sunday
      monthLength = (new Date(self.year, self.month + 1, 0)).getDate(), // hack to get last day in a month
      prevMonthLength = (new Date(self.year, self.month, 0)).getDate(),

      monthStr = "",
      i;

    // how much days should be add before month first day?
    for (i = 0; i < monthFirstDay - 1; i++){ // monthFirstDay starts from 0
      monthStr = "<div class='calendar__day calendar__day--disabled'><span>" +
                  (prevMonthLength - i) +
                  "</span></div>" + monthStr;
    }

    // create all days in month
    for (i = 0; i < monthLength; i++){ // 7 days * 6 weeks = 42
      monthStr += "<div class='calendar__day'><span>" + (i + 1) + "</span></div>";
    }

    // how much days should be add to fill 42 cells?
    // right! 42 - month.length - (firstDay position-1)
    for (i = 0; i < (42 - (monthFirstDay - 1) - monthLength); i++){ // monthFirstDay starts from 0
      monthStr += "<div class='calendar__day calendar__day--disabled'><span>" + (i + 1) + "</span></div>";
    }

    return monthStr;
  }


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
        selectDay(target);
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
  function selectDay(day){
    var currentlySelectedDay = self.element.querySelector(".calendar__day--selected");
    if (currentlySelectedDay) currentlySelectedDay.classList.remove("calendar__day--selected");

    day.classList.add("calendar__day--selected");
    self.selectedDay = new Date(self.year, self.month, day.children[0].innerHTML);
  }

  // Yes! Draw calendar, please!
  drawCalendar();
}

//Calendar.prototype
