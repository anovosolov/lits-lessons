function Reader(name, age){
  User.call(this, name, age);
  this.role = "reader"; // перевизначили властивість
}

// два способи задати прототип
// Object.create працює всюди на відміну від __proto__ (IE<8)

//Reader.prototype.__proto__ = User.prototype;
Reader.prototype = Object.create(User.prototype);
Reader.prototype.constructor = Reader; // щоб не загубити конструктор

// розширили клас Reader методом sayGoodbye
Reader.prototype.sayGoodbye = function(){
  console.log("Good bye from " + this.name + "!")
};

// перевизначили метод, як приклад поліморфізму
Reader.prototype.sayHello = function(){
  console.log("Hello! I am a reader and my name is " + this.name + "!")
};

// перевизначили метод
Reader.prototype.setStatus = function(newStatus){
  //User.prototype.setStatus.apply(this, arguments);
  User.prototype.setStatus.call(this, newStatus);
  console.log("I am a reader and my name is " + this.name + "! My status now is " + this.status);
};
