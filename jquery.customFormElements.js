/**
 *	Custom Form Elements Plugin
 *	v1.2
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
				data = $this.data(methods.namespace);
			}

			if ($this.is('input[type="checkbox"]')) {
				methods.styleCheckbox.apply($this);
			} else if ($this.is('input[type="radio"]')) {
				methods.styleRadio.apply($this);
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

			//	Wraps target with a parent wrapper
			//	Replaces targets background image
			$this.wrap(data.checkboxWrap);

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

			//	Wraps target with a parent wrapper
			//	Replaces targets background image
			$this.wrap(data.radioWrap);

			$this.on('click', function(evt) {
				var $radio = $(this);
				var radioGroup = $this.prop('name');

				//	if callback function defined, fire callback
				if (typeof data.beforeChecked() === "function") {
					data.beforeChecked.apply($radio);
				}

				//	looks for name attribute for target - removes 'active' state
				$radio.filter('[name="' + radioGroup + '"]').parent().removeClass('active');

				//	re-applies 'active' state
				$radio.parent().addClass('active');

				//	if callback function defined, fire callback
				if (typeof data.afterChecked() === "function") {
					data.afterChecked.apply($radio);
				}
			});
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