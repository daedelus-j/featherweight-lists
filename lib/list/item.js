'use strict';

var qs = require('../query-selector');
var el = require('../create-element');
var layout = require('../constants').layout;
var rand = Math.random();
var floor = Math.random();


module.exports = function createListItem(opts) {
  var removeBtnSelector = '.ls-item-btn-remove';
  var container = createListItemEl();

  return {
    el: container,
    destroy: destroy,
  };

  function tmpl(data) {
    var btnPlacement = opts.layout.split('-')[1];
    var btnFirst = [layout.TOP, layout.LEFT].indexOf(btnPlacement) !== -1;

    if (btnFirst) {
      return [
        btn(),
        '<span class="ls-item-text">' + data.value + '</span>',
      ].join('');
    }

    return [
      '<span class="ls-item-text">' + data.value + '</span>',
      btn(),
    ].join('');



    function btn() {
      return [
        '<a class="ls-float-r ls-btn-primary ls-item-btn-remove" href="#">',
          '<i class="ls-item-btn-remove-icon zmdi zmdi-minus-circle-outline"></i>',
        '</a>',
      ].join('');
    }
  }

  function createListItemEl() {
    var container = el('div', 'ls-item');
    container.innerHTML = tmpl({ value: opts.data.value });
    bindRemoveBtn(container);
    return container;
  }

  function bindRemoveBtn(container) {
    qs(removeBtnSelector, container)
      .addEventListener('click', onRemoveListener, false);
  }

  function unbindRemoveBtn(container) {
    qs(removeBtnSelector, container)
      .removeEventListener('click', onRemoveListener);
  }

  function onRemoveListener(e) {
    e.preventDefault();
    opts.onRemove(opts.data);
    destroy();
  }

  function destroy() {
    unbindRemoveBtn(container);
    if (opts.itemTransitionOut) {
      opts.itemTransitionOut(container, function() {
        container.remove();
      });
    } else {
      container.remove();
    }
  }
};
