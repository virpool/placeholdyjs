/*
    PlaceholdyJS
    2013 (c) virpool
    license: MIT/GPLv2
*/

;(function (window) {
    'use strict';

    var $ = window.jQuery;
    if (typeof $ == 'undefined') {
        throw 'jQuery is required';
    }
    if (!console) console = {};
    if (!console.warn) console.warn = function(msg) {alert(msg);}

    var defaults = {};

    $.fn.placeholdy = function(options) {
        options = $.extend({}, defaults, options);
        this.each(function () {
            var $this = $(this);
            if (!$this.data('placeholdy-tmpl')) {
                console.warn('Element hasn\'t specified template');
                return;
            }
            if (!$this.data('plugin_placeholdy')) {
                $this.data('plugin_placeholdy', new Placeholdy(this, options))
            }
        });
    }

    function Placeholdy(el, options) {
        this.$el = $(el);
        this.template = $('#' + this.$el.data('placeholdy-tmpl')).html();
        this.options = options;

        this.render();
    }

    Placeholdy.prototype.render = function() {
        var width = this.$el.outerWidth(true),
            height = this.$el.outerHeight(true);

        var $container = $('<div />', {
            css: {
                width: width,
                height: height,
                display: 'inline-block',
                position: 'relative',
                lineHeight: height + 'px',
                fontSize: this.$el.css('font-size'),
                color: '#aaa'
            }
        });

        this.$placeholder = $('<div />', {
            css: {
                width: this.$el.innerWidth(),
                height: this.$el.innerHeight(),
                position: 'absolute',
                top: 0, left: 0,
                zIndex: 1,
                textAlign: 'left',
                overflow: 'hidden',
                paddingLeft: this.$el.css('padding-left')
            },
            html: this.template
        });

        this.$el.replaceWith($container);
        $container.append(this.$el);
        $container.append(this.$placeholder);

        var that = this;
        this.$placeholder.on('click', function () {
            that.$placeholder.hide();
            that.$el.focus();
        });
        this.$el.on('focusout', function () {
            if (!that.$el.val().length) {
                that.$placeholder.show();
            }
        });
    }

})(this)
