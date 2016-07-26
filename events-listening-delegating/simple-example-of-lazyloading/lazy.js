/**
 * Load image
 */
function loadImage(elem) {
  var img = new Image(),
    src = elem.getAttribute('data-src');

  img.onload = function () {
    elem.src = src;
    elem.removeAttribute('data-src');
  };

  img.src = src;
}

/**
 * Wait for DOM
 */
function ready() {
  var images = document.querySelectorAll('img');
  for (var i = 0; i < images.length; i++) {
    loadImage(images[i]);
  }
}

document.addEventListener("DOMContentLoaded", ready);

