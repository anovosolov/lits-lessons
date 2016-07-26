var calculator = {
  OPERATORS: ["+", "-", "/", "*", "^", "!"], // with UPPERCASE we mark constants

  calc: function (expr) {
    var a, b, result, i, operator, index;

    for (i = 0; i < this.OPERATORS.length; i++) {
      operator = this.OPERATORS[i];
      index = expr.indexOf(operator);

      if (index > 0) {
        a = +expr.substr(0, index).trim();
        b = +expr.substr(index + 1).trim();
        break;
      }
    }

    if (isNaN(a) || isNaN(b)) {
      alert("Wrong numbers! Try again!");
      return false;
    }

    switch (operator) {
      case "+":
        result = this.add(a, b);
        break;
      case "-":
        result = this.minus(a, b);
        break;
      case "*":
        result = this.multiply(a, b);
        break;
      case "/":
        result = this.divide(a, b);
        break;
      case "^":
        result = this.sqrt(a);
        break;
      case "!":
        result = this.factorial(a);
        break;
    }

    return result;
  },

  add: function (a, b) {
    return a + b;
  },

  minus: function (a, b) {
    return a - b;
  },

  multiply: function (a, b) {
    return a * b;
  },

  divide: function (a, b) {
    return a / b;
  },

  sqrt: function (a) {
    return Math.sqrt(a);
  },

  factorial: function (a) {
    return (a !== 1) ? a * this.factorial(a - 1) : 1;
  }
};
