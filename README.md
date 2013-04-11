<h1>Custom Form Elements</h1>
Version: 1.2

<i>A simple, lightweight, custom form elements plugin.  Allows styling of checkboxes and radio buttons.</i>

View the <a href="http://plugins.jonathancalvin.com/customformelements/">Demo</a>

<h2>Usage:</h2>

Apply <code>customFormElements()</code> to a checkbox and/or radio button to allow simple styling of each, based on image sprite.

<h4>Settings/defaults:</h4>

<code>beforeUnChecked</code> : <i>( function )</i> executes callback function before unchecking styled target checkbox<br>
<code>afterUnChecked</code> : <i>( function )</i> executes callback function after unchecking styled target checkbox<br>
<code>beforeChecked</code> : <i>( function )</i> executes callback function before checking or selecting styled target<br>
<code>afterChecked</code> : <i>( function )</i> executes callback function after checking or selecting styled target<br>

---

Example usage ( no callback ):

<pre>
var checkBox = $( 'input[type="checkbox"]' );

checkBox.customFormElements();
</pre>
-

Example usage ( with callback ):

<pre>
var checkBox = $( 'input[type="checkbox"]' );

checkBox.customFormElements({
  beforeChecked : function (){
    alert('Before checked');
  }
});
</pre>
