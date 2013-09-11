/*
	Grid Expander v1.0.0
	by Constantine Kiriaze: http://www.kiriaze.com
	Latest version: https://github.com/ckiriaze/
	
	Copyright 2013 Constantine Kiriaze
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	Inspired by Google Image Search, Codrops and SuperBox


	TODOS:
		1. Options
		2. 

*/
;(function($) {
		
	$.fn.GridExpander = function(options) {
		
		var gridExpander      = $('<div class="gridExpander-show"></div>');
		var gridExpanderimg   = $('<img src="" class="gridExpander-current-img">');
		var gridExpanderclose = $('<div class="gridExpander-close"></div>');

		// new
		var gridExpanderName  	= $('<h2></h2>');
		var gridExpanderFooter  = $('<footer></footer>');
		gridExpander.append(gridExpanderimg).append(gridExpanderName).append(gridExpanderFooter).append(gridExpanderclose);
		

		// $(this) = container, i.e. '.gridExpander'
		$(this).imagesLoaded( function(){

			return this.each(function() {
				
				$(this).on('click', '.gridExpander-list', function() {
			
					var currentimg = $(this).find('.gridExpander-img');
					var imgData = currentimg.data('img');
					gridExpanderimg.attr('src', imgData);

					
					// new
					var name = $(this).find('.photo-wrap').data('title');
					var footer = $(this).find('footer').html();
					gridExpanderName.html(name);
					gridExpanderFooter.html(footer);
					

					if($('.gridExpander-current-img').css('opacity') == 0) {
						$('.gridExpander-current-img').animate({opacity: 1});
					}
					
					if ($(this).next().hasClass('gridExpander-show')) {
						// new
						$('.gridExpander-show').slideToggle();
						console.log('next does have class show');

					} else {
						// new
						// gridExpander.insertAfter(this).hide().slideDown();
						gridExpander.insertAfter(this).hide().fadeIn();
						console.log('next doesnt have class show');
					}
					
					$('html, body').animate({
						scrollTop:gridExpander.offset().top - currentimg.width()
					}, 'medium');
				
				});

				$(this).on('click', '.gridExpander-close', function() {
					$('.gridExpander-current-img').animate({opacity: 0}, 200, function() {
						$('.gridExpander-show').slideUp();
					});
					// $('.gridExpander-show > *').animate({opacity: 0}, 200, function() {
					// 	$('.gridExpander-show').slideUp();
					// });
				});
				
			});



			// this.$loading 		= $( '<div class="og-loading"></div>' );
			// this.$fullimage 	= $( '<div class="og-fullimg"></div>' ).append( this.$loading );
			// // preload large image and add it to the preview
			// // for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
			// if( self.$fullimage.is( ':visible' ) ) {
			// 	this.$loading.show();
			// 	$( '<img/>' ).load( function() {
			// 		var $img = $( this );
			// 		if( $img.attr( 'src' ) === self.$item.children('a').data( 'largesrc' ) ) {
			// 			self.$loading.hide();
			// 			self.$fullimage.find( 'img' ).remove();
			// 			self.$largeImg = $img.fadeIn( 350 );
			// 			self.$fullimage.append( self.$largeImg );
			// 		}
			// 	} ).attr( 'src', eldata.largesrc );	
			// }

		});
	};
})(jQuery);