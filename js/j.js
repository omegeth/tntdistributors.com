function isValidEmailAddress(emailAddress) {    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);    return pattern.test(emailAddress);};

$(document).ready(function(){
	
	$('ul#nav').superfish();

	/*$( '#nav li:has(ul)' ).doubleTapToGo();*/
	
	var nset = false;
	$('#mobileMenu').click(function(){
		if(!nset){
			$('UL#nav').slideDown(150);
			$('#mobileMenu').addClass('open');
			$('#mobileMenu').removeClass('closed');
			nset = true;
		} else {
			$('UL#nav').css('display','none');
			nset = false;
			$('#mobileMenu').addClass('closed');
			$('#mobileMenu').removeClass('open');
		}
	})		

	var w = $( window ).width();
	$(window).resize(function(){
		var w = $( window ).width();
		if(w < 768 && $('#navWrap ul#nav').hasClass('keep-nav-closed')){
			$('#navWrap ul#nav').hide().removeAttr('class');
		} 
		if($('#mobileMenu').is(':hidden') && $('#navWrap ul#nav').is(':hidden') && w > 767){
			$('#navWrap ul#nav').show().addClass('keep-nav-closed');
		}
	})

	if(w<768){
		$('#backTop').hide();
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				if($('#backTop').is(':hidden')) {
					$('#backTop').fadeIn(500);
				}
			} else {
				if($('#backTop').is(':visible')) {
					$('#backTop').fadeOut(500, function(){
						$('#backTop').removeClass('clicked');
					});
				}
			}
		});
		$('#backTop').click(function(){
			$('#backTop').addClass('clicked');
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
	
	}

});