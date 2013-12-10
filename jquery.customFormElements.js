/**
 *  jQuery Custom Form Elements Plugin 1.3.0
 *
 *  https://github.com/jmatc/custom-form-elements
 *  https://github.com/jmatc/custom-form-elements/blob/master/README.md
 *
 *  (c) 2013 Jonathan Calvin
 *  Released under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */	
;(function($){

	var methods = {

		namespace : 'customFormElements',

		settings : {
			beforeUnChecked : function (){},
			afterUnChecked : function (){},
			beforeChecked : function (){},
			afterChecked : function (){}
		},

		init : function (options) {
			var $this = $(this),
				data = $this.data(methods.namespace);

			if (!data) {
				var opts = $.extend( {}, methods.settings, options );
				opts.checkboxWrap = $('<div class="checkbox-wrapper"/>');
				opts.radioWrap = $('<div class="radio-wrapper"/>');
				$this.data(methods.namespace, opts);

				// Bind the markup after all initialization has been made.
				if ($this.is('input[type="checkbox"]')) {
					methods.styleCheckbox.apply($this);
				} else if ($this.is('input[type="radio"]')) {
					methods.styleRadio.apply($this);
				}
			}
		},

		/**
		 *	styleCheckbox:
		 *
		 *		Wraps target with a parent wrapper
		 *		Replaces targets background image
		 *		Adds/removes 'active' state
		 */
		styleCheckbox : function () {
			var $this = this,
				data = $this.data(methods.namespace);

			//	Wraps target with a parent wrapper replaces targets background image
			$this.wrap(data.checkboxWrap).parents('.input-box').addClass('select-child');

			if ($this.prop('checked')) {
				$this.parent().addClass('active');
			}

			$this.on('change', function(evt) {
				var $chkBox = $(this);

				//	Adds/removes 'active' state
				if ($chkBox.prop('checked')) {
					//	if callback function defined, fire callback
					if (typeof data.beforeUnChecked() == "function") {
						data.beforeUnChecked.apply($chkBox);
					}

					$chkBox.parent().addClass('active');
					//	if callback function defined, fire callback
					if (typeof data.afterUnChecked() == "function") {
						data.afterUnChecked.apply($chkBox);
					}
				} else {
					//	if callback function defined, fire callback
					if (typeof data.beforeChecked() == "function") {
						data.beforeChecked.apply($chkBox);
					}

					$chkBox.parent().removeClass('active');
					//	if callback function defined, fire callback
					if (typeof data.afterChecked() == "function") {
						data.afterChecked.apply($chkBox);
					}
				}
			});
		},

		/**
		 *	styleRadio:
		 *
		 *		Wraps target with a parent wrapper
		 *		Replaces targets background image
		 *		Adds/removes 'active' state
		 */
		styleRadio : function () {
			var $this = this,
				data = $this.data(methods.namespace);

			//	Wraps target with a parent wrapper replaces targets background image
			//	Adds a class of select-child to parent input-box element - prevents use of IE8 imagery
			$this.wrap(data.radioWrap).parents('.input-box').addClass('select-child');

			if ($this.prop('checked')) {
				$this.parent().addClass('active');
			}

			$this.on('click', function(evt) {
				var $radio = $(this);
				var radioGroup = $this.prop('name');

				// if callback function defined, fire callback
				if (typeof data.beforeChecked() === "function") {
					data.beforeChecked.apply( $this );
				}

				// looks for name attribute for target - removes 'active' state
				$('[name="' + radioGroup + '"]').parent().removeClass('active');
				$radio.parent().addClass('active');

				// if callback function defined, fire callback
				if (typeof data.afterChecked() === "function") {
					data.afterChecked.apply( $this );
				}
			});
		},

		/**
		 * Auto selects target on page load
		 */
		autoCheck : function() {
			var $this = $(this),
                data = $this.data(methods.namespace);

			if (!data) {
				methods.init.apply($this);
				return;
			}

			if (!$this.prop('checked')) {
				// looks for name attribute for target - removes 'active' state
				$this.prop('checked', true);
				$this.parent().addClass('active');
			}
		},

		/**
		 * Resets the style back to the default style
		 */
		reset : function() {
			var $this = $(this),
                data = $this.data(methods.namespace);

			if (!data) {
				methods.init.apply($this);
				return;
			}
			
			$this.parent().removeClass('active');
			if ($this.prop('checked')) {
				if ($this.is('input[type="radio"]')) {
					// looks for name attribute for target - removes 'active' state
					$('[name="' + $this.prop('name') + '"]').parent().removeClass('active');
				}
				$this.parent().addClass('active');
			}
		},

		/**
		 * Removes the styling entirely from the form element
		 */
		remove : function() {
			var $this = $(this),
				data = $this.data(methods.namespace);

			if (!data) {
				return;
			}

			var $input = $this;
			$this.parent().before($input).remove();
			$this.data(methods.namespace, null);
		}
	};

	/**
	 * Bind to the jquery .fn namespace
	 *
	 * @param option
	 * @returns {*}
	 */
	$.fn.customFormElements = function(option) {
		var args = arguments;

		return this.each(function() {
			if (typeof option === 'object' || typeof option === 'undefined') {
				methods.init.apply(this, [option]);
			} else if (typeof option === 'string' && methods[option]) {
				methods[option].apply(this, Array.prototype.slice.call(args, 1));
			} else {
				$.error('Method ' + option + ' does not exist in ' + methods.namespace);
			}
		});
	};
})(window.jQuery);
