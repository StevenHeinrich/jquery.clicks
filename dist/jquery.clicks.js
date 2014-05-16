/**
jQuery Clicks - 0.1.0
https://github.com/GeoSteve/jquery.clicks
Copyright (c) 2014 Steven Heinrich
License: MIT
*/
(function($) {
    'use strict';

    $.fn.clicks = function(options) {
        return this.each(function() {
            var $el = $(this);
            var data = $el.data('clicks');
            if(!data) {
                $el.data('clicks', (data = new Clicks(this, options)));
            }
            // Catch clicks that fire contextmenu event
            $(this).on('contextmenu', this, function(e){
                handleClicks(e, $el);
            });

            // Catch normal clicks
            $(this).click(function(e) {
                handleClicks(e, $el);
            });

            // Catch double-clicks
            $(this).dblclick(function(e) {
                handleClicks(e, $el);
            });
        }).data('clicks');
    };

    var Clicks = function(element, options) {
        this.options = {
            'comboKeys': []
        };
        this.el = element;
        this.$el = $(element);
        if(options) { $.extend(this.options, options); }
    };

    // Check to see if click event mathes configured criteria. Execute callback if it matches.
    function handleClicks(e, _this) {
        var _bindOn = _this.data().clicks.options,
            _comboKeys = checkComboKeys(e),
            _mouseClick = checkMouseClick(e);

        if (_bindOn.mouseClick === _mouseClick) {
            if (_bindOn.comboKeys.sort().join('+') === _comboKeys.sort().join('+')) {
                if (typeof _bindOn.callback === 'function') { _bindOn.callback(e); }
                if (_bindOn.preventDefault === true) { e.preventDefault(); }
            }
        }
    }

    // Get the type of click
    function checkMouseClick(e) {
        var _mouseClick;

        if (e.type === 'dblclick') { _mouseClick = 'double'; }
        else if (e.which === 3) { _mouseClick = 'right'; }
        else if (e.which === 2) { _mouseClick = 'middle'; }
        else if (e.which === 1) { _mouseClick = 'left'; }
        else { console.log('you have a strange mouse'); }

        return _mouseClick;
    }

    // Get combo keys held during click, if any
    function checkComboKeys(e) {
        var _comboKeys = [];
        
        if (e.altKey) { _comboKeys.push('alt'); }
        if (e.ctrlKey) { _comboKeys.push('control'); }
        if (e.metaKey) { _comboKeys.push('meta'); }
        if (e.shiftKey) { _comboKeys.push('shift'); }
        
        return _comboKeys;
    }

})(jQuery);
