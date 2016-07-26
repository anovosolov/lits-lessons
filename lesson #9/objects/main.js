/* ---------------------- Створення обєкту, конструктор --------------------------------------------------------------*/
/*
// Найпростіший спосіб створити об'єкт - використати {}
var user_a = {
  id: Date.now(),
  name: "Benedict",
  last_name: "Cumberbatch",
  date_of_birth: new Date("07-19-1976"),
  hometown: "London, UK",

  // обєкт складається з властивостей та їх значень
  // властивість: значення
  // функція, що є властивістю обєкта, називається методом
  getFullName: function(){
    return this.name + " " + this.last_name;
    // що як нам треба отримати доступ до властивостей обєкта з середини методу?
    // для цього в нас є this - вказівник на обєкт
    // this ще називають контекстом виклику, яким буде this визначається лише під час виконання програми
  }
};

console.log(user_a.getFullName()); // доступ до методу здійснюється так само як і до решти властивостей


// Альтернатива - використати оператор new
var user_b = new Object();

user_b.id = Date.now();
user_b.name = "Zachary";
user_b.last_name = "Quinto";
user_b.date_of_birth = new Date("06-02-1977");
user_b.hometown = "Pittsburgh, Pennsylvania, USA";
user_b.getFullName = function(){
  return this.name + " " + this.last_name;
};

console.log(user_b.getFullName());

// Явна проблема в тому, що цими двома способами ми можемо створити лише по одному екземпляру об’єкта
// Конструктори об'єктів - це засіб для створення об'єктів, які можна використовувати неодноразово.
// це, по суті, звичайна функція, викликана через оператор new
// this тепер вказує на новостворений обєкт і ми можемо в середині контсруктора заповнити його властивості
function User(){
  this.id = Date.now();
  this.name = "Zoe";
  this.last_name = "Saldana";
  this.date_of_birth = new Date("05-11-1978");
  this.hometown = "Passaic, New Jersey, USA";
  this.getFullName = function(){
    return this.name + " " + this.last_name;
  }
}

var user = new User();
console.log(user.getFullName());

// тепер наш обєкт user має специфічний визначений нами тип User
console.log(user instanceof User);
*/


/* ---------------------- Iніціалізація обєкта через параметри --------------------------------------------------------*/
// В конструктор можна передавати дані і будувати обєкт на основі них
// Саме так можна побудувати як завгодно багато різних обєктів одного типу
/*
function User(name, lastName){
  this.id = Date.now();
  this.name = name;
  this.last_name = lastName;
  this.date_of_birth = new Date("05-11-1978");
  this.hometown = "Passaic, New Jersey, USA";
  this.getFullName = function(){
    return this.name + " " + this.last_name;
  }
}

var user = new User("Zoe", "Saldana");
console.log(user.getFullName());*/

// Чи передати туди обєкт з даними для ініціалізації

/*
 function User(userData){
   this.id = Date.now();
   this.name = userData.name;
   this.last_name = userData.lastName;
   this.date_of_birth = new Date(userData.dateOfBirth);
   this.hometown = userData.hometown;
   this.getFullName = function(){
    return this.name + " " + this.last_name;
   }
 }

 var user = new User({
   name: "Benedict",
   last_name: "Cumberbatch",
   date_of_birth: new Date("07-19-1976"),
   hometown: "London, UK"
 });*/


/* ---------------------- Статичні, публічні, приватні методи --------------------------------------------------------*/
// console.log(user.getFullName()); // публічний метод, доступний до виклику зовні
// User.totalAmount = 0; // статична змінна, не привязана до конкретного обєкту
// User.ROLE = "actor"; // статична змінна-константа

// getDateOfBirth - приклад приватного (внутрішнього) методу, він недоступний зовні

/*
function User(userData){
  User.totalAmount++;

  this.date_of_birth = getDateOfBirth(userData.dateOfBirth);

  function getDateOfBirth(date){
    return new Date(this.date_of_birth);
  }

  this.getFullName = function(){
    return this.name + " " + this.last_name;
  }
}*/


/* ---------------------- Ключеве слово this -------------------------------------------------------------------------*/

// this не залежить від конткретного обєкту, воно залежить від контексту виклику і саме в момент виклику ми можем
// визначити на який елемент вказуватиме this, не раніше

// Можливі 4 варіанти:
//
// 1. Якщо функція викликається через new як конструктор об'єкта, то this вказуватиме на створений об'єкт:
function User(name, lastName){
  this.name = name;
  this.last_name = lastName;
  console.log(this, this.name);
}

var user = new User("Benedict", "Cumberbatch");


// 2. Якщо функція є методом об'єкта, то this буде посиланням на цей об'єкт:
var userA = {
  name: "Zoe",
  dateOfBirth: "02-17-1978"
};

var userB = {
  name: "Mark",
  dateOfBirth: "02-17-1978"
};

var getName = function (){
  console.log(this, this.name);
};

userA.getName = getName;
userB.getName = getName;

userA.getName();
userB.getName();

//getName(); // this тут вказуватиме на window так як функція виконується в глобальному скоупі


// 3. Явно задати this через call/apply
getName.call(userA); // перший параметер call - це явно вказаний обєкт, який має служити як this для нашої функції

var getInfo = function(firstPart, secondPart){
  console.log("This is " + this[firstPart] + " and she/he was born on " + this[secondPart]);
};

getInfo.call(userA, "name", "dateOfBirth"); // решта параметрів - це назви властивостей обєкту, які будуть викорстані у функції

// приклад з життя
// найчастіше call викликається для того, щоб 'позичити' метод
// наприклад, ми знаємо, що getElementsByTagName поверне нам не класичний масив і тому, нарпиклад, дуже зручний метод
// перебору елементів масиву forEach не працюватиме. Давайте позичимо цей метод в Array для нашого результату виклику getElementsByTagName

var elements = document.getElementsByTagName("div");
/*elements.forEach(function(element){
  console.log(element);
});*/

/*[].forEach.call(elements, function(element){
  console.log(element);
});*/


//[].slice.call(arguments);
//[].slice.apply(arguments, [param1, param2]);
// getInfo.call(userA, ["name", "dateOfBirth"]); // apply працює ідентично до call, лише тепер ми можем контролювати
// кількість переданих параметрів

