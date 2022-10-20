$('.fancy-input > .inner').on("click", function() {
	$('.fancy-input > .inner').each(function(){
		if($(this).find('.input').val()==''){
			$(this).find('.input').hide();
		}
	})
	var elem = $(this).find('.input');
	if(elem.val()==''){
		$(this).addClass('active');
		elem.show();
	}else {
		$(this).removeClass('active');
	}
});
$('.fancy-select > .inner .selectpicker').on("change",function(){
	if($(this).val()==""){
		$(this).parents('.inner').find('.input').hide();
	}else {
		$(this).parents('.inner').find('.input').show();
		$(this).parents('.inner').find('.input').val($(this).val());
		
	}
})
$('.form-control').each(function(){
	if($(this).val()!=''){
		$(this).parent('.form-group').addClass("is-filled");
	}
});
$('.form-control').on("focus", function() {
	var val = $(this).val();
	$(this).parent('.form-group').addClass("is-focused");
	if(val==''){
		$(this).parent('.form-group').removeClass("is-filled");
	}else {
		$(this).parent('.form-group').addClass("is-filled");
	}
}).on("blur", function() {
	var val = $(this).val();
	$(this).parent(".form-group").removeClass("is-focused");
	if(val!=''){
		$(this).parent('.form-group').addClass("is-filled");
	}else {
		$(this).parent('.form-group').removeClass("is-filled");
	}
});
var swiper = new Swiper(".column-3", {
	slidesPerView: 3,
	spaceBetween: 20,
	/* slidesPerView: "auto", */
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true,
	},
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
});

var swiper = new Swiper(".single-slider", {
	slidesPerView: 1,
	spaceBetween: 0,
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true,
	},
});
$('.sh-pwd').click(function(){
	if($(this).hasClass('active')){
		$(this).closest('.password').find('input.pwd-icon').attr('type','password');
		$(this).removeClass('active')
	}else {
		$(this).closest('.password').find('input.pwd-icon').attr('type','text');
		$(this).addClass('active')
	}
});

$('.otp input').keyup(function(){
	$(this).next().focus();
}).keyup(function(e){
	if(e.keyCode == 8){
		$(this).prev().focus();
	}
});
$('.search-box .search-input').keyup(function(){
	$(this).closest('.search-box').find('.suggestion').addClass('active');
}).on('search', function () {
	$(this).closest('.search-box').find('.suggestion').removeClass('active');
});

$(document).mouseup(function(e){
	var container = $(".search-box,[data-dropbox],.dropbox,.fancy-input > .inner");
	if(!container.is(e.target) && container.has(e.target).length === 0){
		$(".search-box .suggestion").removeClass('active');
		$('.dropbox').hide();
		$('.fancy-input .input').each(function(){
			if($(this).val()==''){
				$(this).hide();
			}
		})
	}
});

$(function(){
	$(".range-slider").each(function(){
		$(this).find('.slider').slider({
		  range: true,
		  min: 0,
		  max: 500,
		  values: [ 75, 300 ],
		  slide: function( event, ui ) {
			$(this).closest('.range-slider').find('.val').val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ]+"k" );
			$(this).closest('.range-slider').find('.ui-state-default:nth-child(2)').html('<em>$'+ui.values[ 0 ]+'</em>');
			$(this).closest('.range-slider').find('.ui-state-default:nth-child(3)').html('<em>$'+ui.values[ 1 ]+'k</em>');
		  }
		});
		$(this).closest('.range-slider').find('.ui-state-default:nth-child(2)').html('<em>$'+$(this).find('.slider').slider( "values", 0 )+'</em>');
		$(this).closest('.range-slider').find('.ui-state-default:nth-child(3)').html('<em>$'+$(this).find('.slider').slider( "values", 1 )+'k</em>');
		//$(this).closest('.range-slider').find('.val').val( "$" + $(this).find('.slider').slider( "values", 0 ) + " - $" + $(this).find('.slider').slider( "values", 1 ));
	});
});

$('[data-dropbox]').click(function(){
	$('.dropbox').hide();
    $(this).parent().find('.dropbox').show();
});
$('[data-show]').click(function(){
	var elem = $(this).attr('data-show');
	if($(this).parent().find('[data-id="'+elem+'"]').is(':visible')){
		$(this).parent().find('[data-id="'+elem+'"]').hide();
	}else {
		$('[data-id="'+elem+'"]').hide();
		$(this).parent().find('[data-id="'+elem+'"]').show();
	}
});
$('[data-hide]').click(function(){
	var target_elem = $(this).attr('data-hide');
	$('div'+target_elem).addClass('d-none');
});

$('[data-shw]').click(function(){
	var target_elem = $(this).attr('data-shw');
	$('div'+target_elem).removeClass('d-none');
});
$('.fancy-select.auto select').on('change', function(){
	var width = $(this).parent().find('.dropdown-menu').width();
	$(this).closest('.inner').find('.input').width(width);
});
/* $('.nav-tabs.dotted label').click(function(){
	var targetElems = $(this).attr('for-name');
	var targetElem = $(this).attr('for');
	$('input[name="'+targetElems+'"]').prop('checked',false);
	$('input[id="'+targetElem+'"]').prop('checked',true);
}); */