'use strict';

module.exports = function qs(sel, el) {
  if (typeof el !== 'undefined') return el.querySelector(sel);
  return document.querySelector(sel);
};
