// function User(){}

var User = function(name, age){
  var self = this;

  var role = "user"; // private property
  var status = false; // private property

  this.name = name; // public property
  this.age = age; // public property

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

  /**
   * Setter for online/offline status
   * @param newStatus
   */
  this.setStatus = function(newStatus){
    status = newStatus;
    onStatusChange();
  };

  /**
   * Getter for user status
   */
  this.getStatus = function(){
    return status;
  };


  /**
   * Getter for user role
   */
  this.getRole = function(){
    return role;
  };

  /**
   * Simple public method (or privileged)
   * In public method we use this to get object properties
   */
  this.sayHello = function(){
    console.log("Hello! My name is " + this.name + "!");
  }
};
