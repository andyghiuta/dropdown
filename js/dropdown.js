/*!
 * jQuery plugin for custom dropdown
 * @author: Andy Ghiuta (@andy_ghiuta)
 * Licensed under the MIT license
 */


;(function ( $, window, document, undefined ) {
    "use strict";
    
    // Create the defaults once
    var pluginName = 'dropdown',
        defaults = {
            minWidth: 80,
            maxWidth: 100,
            change: function(oldVal, newVal){
            }
        };

    // The actual plugin constructor
    function Dropdown( element, options, index ) {
        this.element = element;
        this.id = this.element.attr('id') || "dropdown_"+index;
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
    Dropdown.prototype.hideActive = function(){
        $(".dropdown.active").removeClass('active');
        $(".dropdownOptions.active").hide().removeClass('active');
    }
    Dropdown.prototype.init = function() {
        // vars
        var $d = $(document.createElement('div')), 
            tip = this.element.data('tip') || "&nbsp;",
            inst = this;
        // create the select container
        $d.html(tip).attr({
            title: tip,
            id: this.id
        }).addClass('dropdown').width(this.element.outerWidth());
        // create a hidden input to store the value
        $d.after($(document.createElement("input")).attr({
            type: 'hidden',
            name: this.element.attr('name') || this.id,
            id: "inp_"+this.id
        }));
        // create the options
        var $ul = $(document.createElement('ul')).addClass("dropdownOptions").attr({
            id: "opt_"+this.id
        }).data('id', this.id);
        // get the select's original options
        this.element.find('option').each(function(){
            var $o = $(this), 
                $li = $(document.createElement('li')).html($o.html()).attr('title', $o.html()).data('val', $o.attr('value'));
            $ul.append($li);
        });
        // add the select
        this.element.after($d);
        // bind events
        $d.click(function(){
            var $d = $(this),
                $ul = $("#opt_"+$d.attr("id"));
            if (!$d.hasClass('active')) {
                inst.hideActive();
            }
            // mark it as active/inactive
            $ul.toggleClass('active');
            $d.toggleClass('active');
            // position the select options just below the select
            var offs = $d.offset();
            $ul.css({
                left: offs.left,
                top: offs.top + $d.outerHeight() - parseInt($ul.css('border-bottom-width')),
                'min-width': Math.max($d.outerWidth() - parseInt($ul.css('border-left-width')) - parseInt($ul.css('border-right-width')), inst.options.minWidth),
                'max-width': inst.options.maxWidth
            });
            $ul.toggle();
        });
        $ul.click(function(event){
            // check if we are on a LI
            if ("LI" == event.target.nodeName) {
                // set the selected value
                var $li = $(event.target), $ul = $(this), $inp = $("#inp_"+$ul.data('id')), oldVal = $inp.val(), newVal = $li.data('val');
                $inp.val(newVal);
                $("#"+$ul.data('id')).html($li.html());
                inst.hideActive();
                if ('function' == typeof inst.options.change && newVal != oldVal) {
                    inst.options.change(newVal, oldVal);
                }
            }
        });
        // hide the active dropdown on click outside
        $('body').click(function(event){
            if (!$(event.target).hasClass('dropdown')) {
                inst.hideActive();
            }
        });
        // add the select options
        $("body").append($ul);
        // remove the original select
        this.element.remove();
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function (index) {
            var $this = $(this);
            if (!$.data($this, 'dropdown_' + pluginName)) {
                $.data($this, 'dropdown_' + pluginName, 
                new Dropdown( $this, options, index));
            }
        });
    }

})( jQuery, window, document );
