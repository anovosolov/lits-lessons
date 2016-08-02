// function User(){}

var User = function(name, age){
  var self = this;

  this.role = "user"; // public property
  this.status = false; // public property
  this.name = name; // public property
  this.age = age; // public property

  // init properties
  this.birthYear = calculateYearOfBirth(this.age);

  /**
   * Private function
   */
  function calculateYearOfBirth(age){
    return new Date().getFullYear() - age;
  }

  /**
   * Private method, just for our needs, no need to make it public
   * NB! We use self in private methods to get object properties (this here points to window)
   */
  function onStatusChange(){
    if (status) {
      console.log("User " + self.name + " are online!");
    }
    else {
      console.log("User " + self.name + " went offline!");
    }
  }
};


/**
 * Public method
 */
User.prototype.sayHello = function(){
  console.log("Hello! My name is " + this.name + "!");
};

/**
 * Setter for online/offline status
 */
User.prototype.setStatus = function(newStatus){
  this.status = newStatus;

  if (newStatus) {
    console.log("User " + this.name + " are online!");
  }
  else {
    console.log("User " + this.name + " went offline!");
  }
};


/**
 * Getter for user status
 */
User.prototype.getStatus = function(){
  return this.status;
};


/**
 * Getter for user role
 */
User.prototype.getRole = function(){
  return this.role;
};
