var User = function (name){
  this.sayHello = function(){
    console.log("Hello, " + name);
  }
};

console.log("User module is here");


/*
exports.User = User;
exports.welcome = function(){
  console.log("Welcome!");
};*/
