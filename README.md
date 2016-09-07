# Feather Weight UI - ListForm Component

Easily create list items!

```
var listForm = require('featherweight-lists');
var mainForm = listForm({
  layout: 'horizontal-left',
  onChange: function(inputValue) {
    console.log('input changed! (' + inputValue + ')');
  },
  onAdd: function(item) {
    console.log('item added! (' + item.value + ')');
  },
  onRemove: function(item) {
    console.log('item removed! (' + item.value + ')');
  },
  onClear: function() {
    console.log('wohoo empty! ', mainForm.data()); // logs empty array
  },
  itemTransitionOut: function(el, done) {
    var transitionClass = 'transition-out';
    el.classList.add(transitionClass);
    setTimeout(function(){
        el.classList.remove(transitionClass);
    }, 200);
  }
});

# Run Demo

You can find the example code in `./example.js`.

If you run a simple webserver in this directory to serve `./index.html` and static assets. 

For example with python's `SimpleHTTPServer`:

        $ python -m SimpleHTTPServer

The main demo displays the events and hooks provided by the list form component API.

```

### Options

Each item in a list has a data represenation as follows:

    DataItem = { value: String }

| Option Name   | Value         |  Default     | Notes about values  |
|:-------------|:-------------:|:-------------:|:--------------------|
| layout        | `String`    | `'vertical-top'` | viable options are: 'vertical-top', 'vertical-bottom', 'horizontal-left', 'horizontal-right'. See example for layout renderings.
| placeholder   | `String`    |  `'Item Text'` |
| onChange | `Function(value: String)`    |  `null` | `value` is the current value of the text input. This is attached to the input element's `keyup` event. |
| onAdd | `Function(item: DataItem)` | `null` | item is a `DataItem`, see the above object for reference. Whenever an item is added, this function is called.
| onRemove | `Function(item: DataItem)` | `null` | item is a `DataItem`, see the above object for reference. Whenever an item is removed, this function is called.
| onClear |`Function()` | `null` | this method clears the items in the list
| itemTransitionOut | Function(itemElement: HtmlNode, done: Function) | null | `itemElement` is the container of the current item being removed. By default this is called when the `click` event is fired on the dom element's remove button. `done` must be called when your animation is completed to prevent memory leaks. |
| inputValidation | `Function(value: String)` | value !== '' | This function is called when the 

### ListForm Instance API

| Option Name   | Type         | Notes |
|:-------------|:-------------:|:-------------:|
| el | `HTMLElement` |  This is the container dom node
| clear | `Function` |  This function clears all the items in the list
| data | `Function` |  This function returns an array of all the `DataItem`s
| destroy | `Function` |  This clears the data, unbinds even handlers, and removes the dom element
