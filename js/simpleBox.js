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
            slSpeed: 300,           // sequential load speed
            overlay: true,          // hover overlay
            slider: false           // slide through gallery
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
                slSpeed         = this.options.slSpeed,
                overlay         = this.options.overlay;
                slider          = this.options.slider;

            // return out of function if container class isnt on page
            if ( !container.length ) return;

            // classes
            var simpleBoxClass      = '.simpleBox-show',
                simpleBoxCloseClass = '.simpleBox-close';

            // elems
            var simpleBox           = $('<div class="simpleBox-show"></div>'),
                simpleBoxClose      = $('<div class="simpleBox-close"></div>'),
                simpleBoxOverlay    = $('<div class="overlay"></div>'),
                simpleBoxContent    = $('<div class="simpleBox-content"></div>');

            // append markup
            simpleBox.append(simpleBoxContent).append(simpleBoxClose);

            if ( overlay ) {
                $(selector).not('.filler').append(simpleBoxOverlay);
            }

            // this.$elem = container, i.e. '.simpleBox'
            container.imagesLoaded( function(){

                if ( sequentialLoad ) {
                    (function hidenext(jq){
                        jq.eq(0).fadeIn(slSpeed, function(){
                            (jq=jq.slice(1)).length && hidenext(jq);
                        });
                    })($('img'));
                } else {
                    $('img').show();
                }

                // if slider enabled, allow for sliding through gallery
                if ( slider ) {
                    var next = $('<span class="next">Next</span>'),
                        prev = $('<span class="prev">Prev</span>'),
                        pagination = next.add(prev);
                    simpleBox.append(pagination);
                    // add index for slider reference in paginate function
                    $.each($(selector), function(index, val) {
                        $(this).attr('data-slider-index', index);
                    });
                }

                container.on('click', selector, { myOptions: this.options }, function(e) {

                    $this = $(this);

                    // find all elems
                    var elements = $this;
                    var content = [];

                    // push them all into array
                    elements.each(function(){
                        content.push($(this).html());
                    });

                    // attach array of content into container
                    simpleBoxContent.html(content);

                    function imgSwap() {
                        $.each( $('.simpleBox-content img[data-sbox-img]'), function(index, val) {
                            $(this).attr('src', $(this).attr('data-sbox-img'));
                        });
                    }

                    // if only has image, dont add container
                    // rewrite this since now im just appending all the content
                    if ( content == '' ) {
                        simpleBox.removeClass('has-content');
                        simpleBoxContent.remove();
                    } else {
                        simpleBox.append(simpleBoxContent);
                        simpleBox.addClass('has-content');
                    }

                    // Active state
                    if ( !$this.hasClass(activeClass) ){
                        $(selector).removeClass(activeClass);
                        $this.addClass(activeClass);
                    } else {
                        $this.removeClass(activeClass);
                    }

                    //
                    if ( $this.next().is(simpleBoxClass) ) {
                        $(simpleBoxClass).slideToggle(duration, easing);
                    } else {
                        simpleBox.insertAfter(this).hide().fadeIn(duration, easing);
                    }

                    // slider pagination function
                    // .off() to prevent from multiple fires
                    pagination.off().on('click', function(e){
                        if ( e.target.className == 'next' ) {
                            console.log('next');
                            var index = $(this).parents(simpleBox).siblings('.active').attr('data-slider-index'),
                                newIndex = parseInt(index) + 1;

                        } else {
                            console.log('prev');
                            var index = $(this).parents(simpleBox).siblings('.active').attr('data-slider-index'),
                                newIndex = parseInt(index) - 1;
                        }

                        $(selector).removeClass('active');

                        var elem    = $(selector + '[data-slider-index='+ newIndex +']'),
                            content = elem.html(),
                            newElem = $(selector + '[data-slider-index='+ newIndex +']').addClass('active');

                        simpleBoxContent.html(content);
                        simpleBox.insertAfter(newElem).hide().fadeIn(duration, easing);
                        imgSwap();
                        $('html, body').animate({
                            scrollTop: newElem.offset().top
                        }, duration, easing);
                    });

                    $(simpleBoxClose).on('click', function(e) {
                        $(selector).removeClass(activeClass);
                        $(simpleBoxClass).slideUp(duration, easing);
                    });

                    imgSwap();
                    $('html, body').animate({
                        scrollTop: $this.offset().top
                    }, duration, easing);

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