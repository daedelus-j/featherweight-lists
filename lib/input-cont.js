'use strict';

var el = require('./create-element');
var qs = require('./query-selector');
var INPUT_ERROR_TIME = require('./constants').INPUT_ERROR_TIME;


module.exports = function createInputCont(opts) {
  var ENTER = 13;
  var doc = document;
  var cont = createInputForm();

  bindElements(cont);

  return {
    el: cont,
    destroy: unbindElements
  };

  function tmpl() {
    return [
      '<input type="text" class="ls-input" placeholder="'+ opts.placeholder +'" />',
      '<a href="#" class="ls-input-btn">',
        '<i class="ls-input-btn-icon zmdi zmdi-plus"></i>',
        // '<span class="ls-input-btn-text">Add</span>',
      '</a>',
      '<label class="ls-input-label">Hit Enter to Add</label>'
    ].join('');
  }

  function bindElements() {
    qs('.ls-input-btn', cont)
      .addEventListener('click', onClick, false);
    qs('.ls-input', cont)
      .addEventListener('blur', inputBlur, false);
    qs('.ls-input', cont)
      .addEventListener('focus', inputFocus, false);
    qs('.ls-input', cont)
      .addEventListener('keyup', inputKeyup, false);
  }

  function unbindElements() {
    qs('.ls-input-btn', cont)
      .removeEventListener('click', onClick, false);
    qs('.ls-input', cont)
      .removeEventListener('blur', inputBlur, false);
    qs('.ls-input', cont)
      .removeEventListener('focus', inputFocus, false);
    qs('.ls-input', cont)
      .addEventListener('keyup', inputKeyup, false);
  }

  function onClick(e) {
    e.preventDefault();
    var input = qs('.ls-input', cont);
    var value = input.value;
    var isValid = opts.inputValidation(value);
    if (isValid) inputValid(input);
    else inputError(input);
  }

  function createInputForm() {
    var elm = el('div', 'ls-input-cont');
    elm.innerHTML = tmpl();
    return elm;
  }

  function inputBlur() {
    cont.classList.remove('input--focus');
  }

  function inputFocus() {
    cont.classList.add('input--focus');
  }

  function inputKeyup(e) {
    var input = e.currentTarget;
    var keyCode = e.keyCode;
    var isValid = opts.inputValidation(input.value);
    opts.onChange(input.value);

    if (keyCode === ENTER && !isValid) inputError(input);
    else if (keyCode === ENTER) inputValid(input);
  }

  function inputError(input) {
    input.classList.add('shake');
    input.classList.add('ls-input-error');
    setTimeout(function() {
      input.classList.remove('shake');
      input.classList.remove('ls-input-error');
    }, INPUT_ERROR_TIME);
  }

  function inputValid(input) {
    opts.add(input.value);
    input.value = '';
  }

};
