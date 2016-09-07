'use strict';

module.exports = function forwardProps(sender, receiver, props) {
  props.forEach(function(prop) {
    receiver[prop] = sender[prop];
  });
  return receiver;
};
