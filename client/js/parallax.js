$(document).ready(function() {
	
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
    	parallaxScroll();
		redrawDotNav();
    });
    
	/* Next/prev and primary nav btn click handlers */
	$('a.frameone').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
    $('a.frametwo').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#frametwo').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    $('a.framethree').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#framethree').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
	$('a.framefour').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#framefour').offset().top
    	}, 1000, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#cloud-1').css('top',(50-(scrolled*.85))+'px');
	$('#cloud-2').css('top',(150-(scrolled*1))+'px');
	$('#cloud-3').css('top',(590-(scrolled*1.7))+'px');
	$('#cloud-4').css('top',(50-(scrolled*2))+'px');
	$('#cloud-5').css('top',(500-(scrolled*1.6))+'px');
	$('#cloud-6').css('top',(450-(scrolled*.7))+'px');
	$('#balloon-1').css('top',(630-(scrolled*.25))+'px');
	$('#bird-1').css('top',(450-(scrolled*.85))+'px');
	$('#bird-2').css('top',(550-(scrolled*.9))+'px');
	$('#bird-3').css('top',(340-(scrolled*.7))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#frametwo').offset().top - (($('#framethree').offset().top - $('#frametwo').offset().top) / 2);
	var section3Top =  $('#framethree').offset().top - (($('#framefour').offset().top - $('#framethree').offset().top) / 2);
	var section4Top =  $('#framefour').offset().top - (($(document).height() - $('#framefour').offset().top) / 2);;
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.frameone').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.frametwo').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.framethree').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#primary a.framefour').addClass('active');
	}
	
}
