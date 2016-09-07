/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Design a REUSABLE form component that meets the following requirements:

	// - The initial state should be an empty input box, and an ADD button.
	// - If the user enters input text to the box, clicking ADD should add that text to a list.
	// - There should be a way to delete a list element.
	// - On form submit, the list elements should be submitted as an array.
	// - Please provide documentation on how to implement your component.

	// Please use only straight HTML, CSS, and Javascript. Do not use any CSS frameworks or external Javascript libraries.

	// Your submission will be evaluated on the following:
	// - Functionality - Does the component satisfy all the requirements?
	// - Reusability - How easily reusable is the component?
	// - Design - Does the component look nice? Is the user experience pleasant?
	// - Style & Documentation - Is the code written in a clean and easily readable way? Does the documentation clearly and simply explain how to implement and use the component?
	'use strict';

	var qs = __webpack_require__(1);
	var el = __webpack_require__(4);
	var listForm = __webpack_require__(2);


	//
	//
	// MAIN DEMO
	//
	//

	var transition = function(itemElement, done) {
	  var textCont = qs('.ls-item-text', itemElement);
	  animate();
	  var ctr = 0;
	  var frameId = null;
	  function animate() {
	    frameId = requestAnimationFrame(animate);
	    draw();
	  }
	  function draw() {
	    if (textCont.textContent === '') {
	      cancelAnimationFrame(frameId);
	      done();
	      return;
	    }
	    ctr++;
	    var charFunc = charContUp;
	    if (ctr % 2 === 0) charFunc = charContDown;
	    var exitingChar = charFunc(
	      textCont.textContent.split('').splice(0,1)[0]
	    );
	    itemElement.insertBefore(exitingChar, textCont);
	    textCont.textContent = textCont.textContent
	    .split('').slice(1).join('');
	  }

	  function charContDown(character) {
	    var exitingChar = el('span', 'item-char-exit-down');
	    exitingChar.textContent = character;
	    return exitingChar;
	  }

	  function charContUp(character) {
	    var exitingChar = el('span', 'item-char-exit-up');
	    exitingChar.textContent = character;
	    return exitingChar;
	  }
	};

	var printString = function(list) {
	  var string = [
	    'values = ',
	    '[ "',
	      list.map(function(item) { return item.value }).join('", "'),
	    '" ]'
	  ].join('');
	  qs('#result').textContent = list.length === 0
	    ? 'Empty!'
	    : string;
	};

	var itemCount = qs('#item-count');
	var updateItemCount = function(list) {
	  itemCount.textContent = list.length + ' Items';
	};

	var mainDemoCont = qs('.main-demo-form-cont');
	var formSubmitBtn = qs('#js-btn-submit');
	var formClearBtn = qs('#js-btn-clear');

	var mainForm = listForm({
	  layout: 'horizontal-left',
	  onChange: function(val) {
	    qs('#result').textContent = 'input changed! (' + val + ')';
	  },
	  onAdd: function(item) {
	    qs('#result').textContent = 'item added! (' + item.value + ')';
	    updateItemCount(mainForm.data());
	  },
	  onRemove: function(item) {
	    qs('#result').textContent = 'item removed! (' + item.value + ')';
	    updateItemCount(mainForm.data());
	  },
	  onClear: function() {
	    qs('#result').textContent = 'list cleared!';
	    updateItemCount(mainForm.data());
	  },

	  itemTransitionOut: transition
	});

	mainDemoCont.appendChild(mainForm.el);
	updateItemCount(mainForm.data())

	formSubmitBtn.addEventListener('click', function(e) {
	  e.preventDefault();
	  printString(mainForm.data());
	}, false);

	formClearBtn.addEventListener('click', function(e) {
	  e.preventDefault();
	  mainForm.clear();
	}, false);


	// Layout Demos

	var verticalTopContainer = qs('#example-1');
	var vtform = listForm({ layout: 'vertical-top' });
	verticalTopContainer.appendChild(vtform.el);

	var verticalBottomContainer = qs('#example-2');
	var vbform = listForm({ layout: 'vertical-bottom' });
	verticalBottomContainer.appendChild(vbform.el);

	var horizontalLeftContainer = qs('#example-3');
	var hlform = listForm({ layout: 'horizontal-left' });
	horizontalLeftContainer.appendChild(hlform.el);

	var horizontalRightContainer = qs('#example-4');
	var hrform = listForm({ layout: 'horizontal-right' });
	horizontalRightContainer.appendChild(hrform.el);



	(function() {
	  var lastTime = 0;
	  var vendors = ['ms', 'moz', 'webkit', 'o'];
	  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	      || window[vendors[x]+'CancelRequestAnimationFrame'];
	  }

	  if (!window.requestAnimationFrame)
	    window.requestAnimationFrame = function(callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	                                 timeToCall);
	                                 lastTime = currTime + timeToCall;
	                                 return id;
	    };

	    if (!window.cancelAnimationFrame)
	      window.cancelAnimationFrame = function(id) {
	        clearTimeout(id);
	      };
	}());


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function qs(sel, el) {
	  if (typeof el !== 'undefined') return el.querySelector(sel);
	  return document.querySelector(sel);
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var form = __webpack_require__(3);
	var isObject = __webpack_require__(9);
	var noop = function(){};
	var forwardProps = __webpack_require__(10);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var el = __webpack_require__(4);
	var createInputCont = __webpack_require__(5);
	var createList = __webpack_require__(7);
	var layout = __webpack_require__(6).layout;

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var el = __webpack_require__(4);
	var qs = __webpack_require__(1);
	var INPUT_ERROR_TIME = __webpack_require__(6).INPUT_ERROR_TIME;


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


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {

	  INPUT_ERROR_TIME: 400,

	  layout: {
	    VERTICAL: 'vertical',
	    HORIZONTAL: 'horizontal',
	    TOP: 'top',
	    BOTTOM: 'bottom',
	    LEFT: 'left',
	    RIGHT: 'right',
	  },

	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var el = __webpack_require__(4);
	var qs = __webpack_require__(1);
	var layout = __webpack_require__(6).layout;
	var createListItem = __webpack_require__(8);


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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var qs = __webpack_require__(1);
	var el = __webpack_require__(4);
	var layout = __webpack_require__(6).layout;
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


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isObject(item) {
	  return item !== null && typeof item === 'object';
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function forwardProps(sender, receiver, props) {
	  props.forEach(function(prop) {
	    receiver[prop] = sender[prop];
	  });
	  return receiver;
	};


/***/ }
/******/ ]);
//# sourceMappingURL=example.js.map