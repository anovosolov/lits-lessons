/* ---------------------- обєкт __proto__  --------------------------------------------------------------*/
/* Об'єкти в JavaScript можна організувати в ланцюжки так, щоб властивість, не знайдена в одному об'єкті,
   автоматично шукалась б в іншому. Для цього в нас є спеціальна властивість __proto__. Саме через неї реалізується наслідування

   Об'єкт, на який вказує посилання __proto__, називається «прототипом»

   Тобто, прототип - це обєкт, від якого інші обєкти наслідують властивості
*/
/*var obj = {}; // рівносильно new Object(), де Object вбудований контсруктор для обєктів, що має прототип
                // те ж саме з контсрукторами Array, Date і рештою

alert(obj); // чому ми бачимо вивід [object Object]? Object має прототип і в ньому описаний метод toString (obj.__proto__.toString)
console.log(obj.__proto__);
console.log(obj.__proto__.__proto__);

console.dir([1,2,3]); // рівносильно new Array(), що має прототип, в якому є всі методи для роботи з масивами
                      // У об'єкта, який є __proto__, може бути свій __proto__, у того - свій, і так далі.
                      // При цьому властивості будуть шукатися по ланцюжку.
                      // Тому ми будем шукати властивість в прототипах обєктів, рухаючись вгору, поки не опинемось
                      // в прототипі самого Object obj.__proto__
                      // Це останній крок obj.__proto__.__proto__ = null


console.log([1,2,3].push(4));
console.log([1,2,3], [1,2,3].toString());*/


/* ---------------------- прототипне наслідування для об’єктів --------------------------------------------------------------*/
/*var car = {
  wheels: 4,
  drive: function() {
    alert("We drive on our " + this.wheels + " wheels!");
  }
};

var bus = {
  wheels: 8
};

bus.__proto__ = car;
bus.drive();*/


/* ---------------------- прототипне наслідування для функцій --------------------------------------------------------------*/
// Кожна функція має спеціальну властивість prototype. Через неї можна вказати звідки брати прототип для обєкту,
// створеного через цю функцію-конструктор. По замовчуванню, prototype пустий обєкт.


//var car = {
//  wheels: 4,
//  drive: function() {
//    alert("We drive on our " + this.wheels + " wheels!");
//  }
//};

//function Bus() {
//  this.wheels = 8;
//}


//console.log(Bus.prototype); // кожна функція має спеціальну властивість prototype, що спочатку є пустим обєктом
//Bus.prototype = car;
//console.log(Bus.prototype);

//var bus = new Bus();  // коли ми створюємо обєкт через new, __proto__ цього обєкту автоматично вказує на прототип
                      // контструктора Bus.prototype
//bus.drive();

//console.log(bus);
//console.log(bus.__proto__, Bus.prototype);
