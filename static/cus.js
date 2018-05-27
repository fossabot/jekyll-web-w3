;

if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {}
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {

	var TextEffect = {
		init: function (options, elem) {
			var _options = {};
			this.$elem = $(elem);
			this.oldText = this.$elem.html();
			typeof options === 'string' ? _options.effect = options : _options = options;
			this.options = $.extend( {}, $.fn.textJumble.options, _options );
			this[this.options.effect]();
		},

		setup: function (effectOption) {
			this.textArray = [];
			this.$elem.html('');  // oddly jQuery.empty() doesn't work as well here.
			for (var i = 0; i < this.oldText.length; i++) {
				this.textArray[i] = "<span class='text-effect' style='" + effectOption + "'>" + this.oldText.substr(i, 1) + "</span>";
				this.$elem.append(this.textArray[i]);
			}
		},

		jumble: function () {
			var self = this;
			var letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			var i = 0;
			this.setup();
			var jumbleEffectInterval = setInterval(function () {
				if (self.jumbleInterval) {
					clearInterval(self.jumbleInterval);
				}
				self.runJumble(letterArray, i);
				self.$elem.children('span.text-effect').eq(i).html(self.oldText.substr(i, 1)).css('color', self.$elem.css('color'));
				if (i === (self.oldText.length - 1)) {
					clearInterval(jumbleEffectInterval);
					self.reset();
				} else {
					i++;
				}
			}, self.options.effectSpeed);
		},

		runJumble: function (letterArray, jumbleLength) {
			var self = this;
			this.jumbleInterval = setInterval(function () {
				self.$elem.css('visibility', 'visible');
				for (var i = (self.textArray.length - 1); i > jumbleLength; i--) {
					if (self.oldText.substr(i, 1) !== ' ') {
						self.$elem.children('span.text-effect').eq(i).html(letterArray[Math.floor(Math.random() * (letterArray.length - 1))]).css('color', self.options.jumbleColor);
					} else {
						self.$elem.children('span.text-effect').eq(i).html(' ');
					}
				}
			}, 70);
		},

		reset: function () {
			this.$elem.html(this.oldText);
		}
	};

	$.fn.textJumble = function(options) {
		return this.each(function() {
			var texteffect = Object.create(TextEffect);
			texteffect.init(options, this);
		});
	};

	$.fn.textJumble.options = {
		effect: 'jumble',
		effectSpeed: 150,
		completionSpeed: 6000,
		jumbleColor: '#7f7f7f',
		reverse: false
	};
})( jQuery, window, document );