custom-form-elements
====================

A simple, lightweight, custom form elements plugin.  Allows styling of checkboxes and radio buttons.

Usage:
====================

Apply customFormElements(); to a checkbox and/or radio button to allow simple styling of each, based on image sprite.


/**
 *  Settings/defaults
 */

// callbacks:

beforeUnChecked : function (){} // executes callback function before unchecking styled target checkbox
afterUnChecked : function (){}  // executes callback function after unchecking styled target checkbox
beforeChecked : function (){}   // executes callback function before checking or selecting styled target
afterChecked : function (){}    // executes callback function after checking or selecting styled target

---

Example usage ( no callback ):

var checkBox = $( 'input[type="checkbox"]' );
checkBox.customFormElements();

-

Example usage ( with callback ):

var checkBox = $( 'input[type="checkbox"]' );
checkBox.customFormElements({
  beforeChecked : function (){
    alert('Before checked');
  }
});
