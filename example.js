'use strict';

var qs = require('./lib/query-selector');
var el = require('./lib/create-element');
var listForm = require('./lib');


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
