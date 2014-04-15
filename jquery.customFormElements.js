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

				if ($this.is('input[type="checkbox"]')) {
					methods.styleCheckbox.apply($this);
				} else if ($this.is('input[type="radio"]')) {
					methods.styleRadio.apply($this);
				}
			}
		},

		styleCheckbox : function () {
			var $this = this,
				data = $this.data(methods.namespace);

			$this.wrap(data.checkboxWrap).parents('.input-box').addClass('select-child');

			if ($this.prop('checked')) {
				$this.parent().addClass('active');
			}

			$this.on('change', function(evt) {
				var $chkBox = $(this);

				if ($chkBox.prop('checked')) {
					if (typeof data.beforeUnChecked() == "function") {
						data.beforeUnChecked.apply($chkBox);
					}

					$chkBox.parent().addClass('active');
					if (typeof data.afterUnChecked() == "function") {
						data.afterUnChecked.apply($chkBox);
					}
				} else {
					if (typeof data.beforeChecked() == "function") {
						data.beforeChecked.apply($chkBox);
					}

					$chkBox.parent().removeClass('active');
					if (typeof data.afterChecked() == "function") {
						data.afterChecked.apply($chkBox);
					}
				}
			});
		},

		styleRadio : function () {
			var $this = this,
				data = $this.data(methods.namespace);

			$this.wrap(data.radioWrap).parents('.input-box').addClass('select-child');

			if ($this.prop('checked')) {
				$this.parent().addClass('active');
			}

			$this.on('click', function(evt) {
				var $radio = $(this);
				var radioGroup = $this.prop('name');

				if (typeof data.beforeChecked() === "function") {
					data.beforeChecked.apply( $this );
				}

				$('[name="' + radioGroup + '"]').parent().removeClass('active');
				$radio.parent().addClass('active');

				if (typeof data.afterChecked() === "function") {
					data.afterChecked.apply( $this );
				}
			});
		},

		autoCheck : function() {
			var $this = $(this),
                data = $this.data(methods.namespace);

			if (!data) {
				methods.init.apply($this);
				return;
			}

			if (!$this.prop('checked')) {
				$this.prop('checked', true);
				$this.parent().addClass('active');
			}
		},

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
					$('[name="' + $this.prop('name') + '"]').parent().removeClass('active');
				}
				$this.parent().addClass('active');
			}
		},

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
