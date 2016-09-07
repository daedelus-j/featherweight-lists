'use strict';
var form = require('./form');
var isObject = require('./is-object');
var noop = function(){};
var forwardProps = require('./forward-props');

var defaults = {
  layout: 'vertical-top',
  placeholder: 'Item Text',
  onChange: noop,
  onAdd: noop,
  onRemove: noop,
  onClear: noop,
  itemTransitionOut: null,
  inputValidation: function(val) {
    return val !== '';
  }
};

module.exports = function listForm(opts) {
  var options = forwardProps(defaults, {}, Object.keys(defaults));
  if (isObject(opts)) options = forwardProps(opts, options, Object.keys(opts));
  return form(options);
};
