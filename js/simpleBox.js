/*
    SimpleBox v1.0.0
    by Constantine Kiriaze: http://www.kiriaze.com
    Latest version: https://github.com/kiriaze/simpleBox
    
    Copyright 2013 Constantine Kiriaze
    Licensed under the MIT license
    http://www.opensource.org/licenses/mit-license.php

    Inspired by Google Image Search, Codrops and SuperBox

*/
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "simpleBox",
        defaults = {
            duration: 350,          // vary the speed of animation
            easing: 'swing',        // the easing function for animation // expo, cubic, circ, swing
            activeClass: 'active',  // class given to the active element
            selector: 'li',         // defaults to li
            sequentialLoad: true,   // fade in images sequentially
            overlay: true           // hover overlay
        };

    // The actual plugin constructor
    function Plugin( element, options ) {

        this.element    = element;
        this.$elem      = $(this.element);
        this.options    = $.extend( {}, defaults, options );

        this._defaults  = defaults;
        this._name      = pluginName;
        
        this.container  = this.element.selector ? this.element.selector : '.simpleBox';
        this.$container = $(this.container);
        this.link       = this.options.selector;
        this.$link      = $(this.link);

        this.init();

    }

    Plugin.prototype = {

        init: function() {

            // console.log(this.element.selector);
            // console.log(this.options);

            var container       = this.$container,
                selector        = this.link,
                duration        = this.options.duration,
                easing          = this.options.easing,
                activeClass     = this.options.activeClass,
                imgsLoaded      = this.options.imgsLoaded,
                sequentialLoad  = this.options.sequentialLoad,
                overlay         = this.options.overlay;

            // return out of function if container class isnt on page
            if ( !container.length ) return;

            // classes
            var simpleBoxClass      = '.simpleBox-show',
                simpleBoxImageClass = '.simpleBox-current-img',
                simpleBoxCloseClass = '.simpleBox-close';

            // elems
            var simpleBox           = $('<div class="simpleBox-show"></div>'),
                simpleBoxImage      = $('<img src="" class="simpleBox-current-img">'),
                simpleBoxClose      = $('<div class="simpleBox-close"></div>'),
                simpleBoxOverlay    = $('<div class="overlay"></div>'),
                simpleBoxContent    = $('<div class="simpleBox-content"></div>');

            // append markup
            simpleBox.append(simpleBoxImage).append(simpleBoxContent).append(simpleBoxClose);

            if( overlay ) {
                $(selector).not('.filler').append(simpleBoxOverlay);
            }

            // this.$elem = container, i.e. '.simpleBox'
            container.imagesLoaded( function(){

                if( sequentialLoad ) {
                    (function hidenext(jq){
                        jq.eq(0).fadeIn(300, function(){
                            (jq=jq.slice(1)).length && hidenext(jq);
                        });
                    })($('img'));
                } else {
                    $('img').show();
                }

                container.on('click', selector, { myOptions: this.options }, function(e) {

                    var currentimg = $(this).find('img'),
                        imgData = currentimg.data('sbox-img');
                        
                    simpleBoxImage.attr('src', imgData);

                    // find all elems other than image
                    var elements = $(this).find(currentimg).siblings();
                    var content = [];

                    // push them all into array
                    elements.each(function(){
                        content.push($(this).html());
                    })

                    // attach array of content into container
                    simpleBoxContent.html(content);

                    // if only has image, dont add container
                    if( content == '' ) {
                        simpleBox.removeClass('has-content');
                        simpleBoxContent.remove();
                    } else {
                        simpleBox.append(simpleBoxContent);
                        simpleBox.addClass('has-content');
                    }

                    // Active state
                    if( !$(this).hasClass(activeClass) ){
                        $(selector).removeClass(activeClass);
                        $(this).addClass(activeClass);
                    } else {
                        $(this).removeClass(activeClass);
                    }
                    
                    if ( $(this).next().is(simpleBoxClass) ) {

                        // if( $(this).hasClass(activeClass) ) {
                        //     $(simpleBoxClass).animate({opacity: 1}, duration, easing, function() {
                        //         $(simpleBoxClass).slideDown(duration, easing);
                        //     })
                        // } else {
                        //     $(simpleBoxClass).animate({opacity: 0}, duration, easing, function() {
                        //         $(simpleBoxClass).slideUp(duration, easing);
                        //     })
                        // }
                        $(simpleBoxClass).slideToggle(duration, easing);
                    } else {
                        simpleBox.insertAfter(this).hide().fadeIn(duration, easing);
                        
                        // simpleBox.insertAfter(this).hide().fadeIn(duration, easing, function(){
                        
                        //     // simpleBox.slideDown(duration, easing, function(){
                        //     //     simpleBox.animate({opacity: 1}, duration, easing);
                        //     // });

                        //     // simpleBox.animate({opacity: 1}, duration, easing);

                        //     simpleBox.animate({opacity: 1}, duration, easing, function() {
                        //         $(simpleBoxClass).slideDown(duration, easing);
                        //     })

                        // });
                    }
                    
                    $('html, body').animate({
                        // scrollTop:simpleBox.offset().top - currentimg.width()
                        scrollTop:$(this).offset().top
                    }, duration, easing);
                    
                });

                $(this).on('click', simpleBoxCloseClass, function() {
                    $(selector).removeClass(activeClass);

                    $(simpleBoxClass).slideUp(duration, easing);

                    // $(simpleBoxClass).animate({opacity: 0}, duration, easing, function() {
                    //     $(simpleBoxClass).slideUp(duration, easing);
                    // });
                });

            });

        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        })
    };
    
    // Made into selectorless call
    $[pluginName] = function(options) {
        var $window = $(window);
        return $window.simpleBox.apply($window, Array.prototype.slice.call(arguments, 0));
    };

})( jQuery, window, document );