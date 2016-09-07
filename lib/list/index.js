'use strict';

var el = require('../create-element');
var qs = require('../query-selector');
var layout = require('../constants').layout;
var createListItem = require('./item');


module.exports = function createList(opts) {
  var dataList = [];
  var childList = [];
  var container = createListEl();

  return {
    el: container,
    clear: clear,
    data: data,
    push: push,
    destroy: destroy,
  };

  function createListEl() {
    var cont = el('div', 'ls-list-cont');
    return cont;
  }

  function clear() {
    clearData();
    destroyChildren();
  }


  function destroy() {
    destroyChildren();
    destroyContainer();
    clearData();
  }

  function clearData() {
    dataList = [];
  }

  function destroyContainer() {
    container.remove();
  }

  function destroyChildren() {
    childList.forEach(function(child) { child.destroy(); });
    childList = [];
  }

  function data() {
    return dataList.slice(0);
  }

  function push(item) {

    var layoutScheme = opts.layout.split('-')[0];
    var btnPlacement = opts.layout.split('-')[1];
    var btnFirst = [layout.TOP, layout.LEFT].indexOf(btnPlacement) !== -1;

    var newListItem = createListItem({
      data: item,
      layout: opts.layout,
      itemTransitionOut: opts.itemTransitionOut,
      onRemove: function(item) {
        var index = dataList.indexOf(item);
        dataList.splice(index, 1);
        childList.splice(index, 1);
        opts.onRemove(item);
      }
    });

    dataList.push(item);
    childList.push(newListItem);
    opts.onAdd(item);

    if (btnFirst || layoutScheme === layout.VERTICAL) {
      container.appendChild(newListItem.el);
    } else {
      var inputCont = container.children[container.children.length - 1];
      container.insertBefore(newListItem.el, inputCont);
    }
  }

};
