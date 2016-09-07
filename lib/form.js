'use strict';

var el = require('./create-element');
var createInputCont = require('./input-cont');
var createList = require('./list');
var layout = require('./constants').layout;

module.exports = function form(opts) {
  var elm = el('div', 'ls-cont ls-clearfix');
  var listCont = createList({
    layout: opts.layout,
    itemTransitionOut: opts.itemTransitionOut,
    onAdd: opts.onAdd,
    onRemove: opts.onRemove,
  });
  var inputCont = createInputCont({
    layout: opts.layout,
    placeholder: opts.placeholder,
    inputValidation: opts.inputValidation,
    onChange: opts.onChange,
    add: onAdd
  });

  elm.classList.add(opts.layout);

  renderElements();

  return {
    el: elm,
    clear: clear,
    destroy: destroy,
    data: data,
  };

  function renderElements() {
    var layoutPreset = opts.layout.split('-')[0];
    var btnPlacement = opts.layout.split('-')[1];
    var formFirst = [layout.TOP, layout.LEFT].indexOf(btnPlacement) !== -1;
    var isVertical = layoutPreset === layout.VERTICAL;

    if (isVertical && formFirst) {
      elm.appendChild(inputCont.el);
      elm.appendChild(listCont.el);
    } else if (isVertical) {
      elm.appendChild(listCont.el);
      elm.appendChild(inputCont.el);
    } else if (formFirst) {
      var firstChild = listCont.el.children[0];
      listCont.el.insertBefore(inputCont.el, firstChild);
      elm.appendChild(listCont.el);
    } else {
      listCont.el.appendChild(inputCont.el);
      elm.appendChild(listCont.el);
    }
  }

  function clear() {
    listCont.clear();
    opts.onClear();
  }

  function data() {
    return listCont.data();
  }

  function destroy() {
    inputCont.destroy();
    listCont.destroy();
  }

  function onAdd(val) {
    if (validate(val)) {
      listCont.push({ value: val });
    }
  }

  function validate(val) {
    return typeof val !== 'undefined' &&
      val !== '' &&
        val !== null;
  }
}
