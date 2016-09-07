'use strict';

module.exports = function el(nodeType, classString) {
  var element = document.createElement(nodeType);
  if (typeof classString !== 'undefined') {
    classString.split(' ')
    .forEach(function(str){
      element.classList.add(str);
    });
  }
  return element;
};
