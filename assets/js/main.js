$(()=>{

let body = $('body');
body.on('mouseenter','.box',function(){
	let inner = $('<div>').addClass('inner').text($(this).attr('data-url'));
	let tooltip = $('<div>').addClass('tooltip').html('<div class="arrow"></div>').append(inner);
	$(this).after(tooltip);
});
body.on('mouseleave','.box',()=>{
	$('.tooltip').remove();
});
body.on('click','.box',function(){
	window.open($(this).attr('data-url'),'_blank','noopener,noreferrer');
});
body.on('click','a[href]',function(event){
	let href = $(this).attr('href');
	event.preventDefault();
	if(href.startsWith('#'))
		$('html, body').animate({scrollTop: $(href).offset().top-70},0);
	else if(href.startsWith(window.location.origin)||href.startsWith('/'))
		window.location.href = href;
	else
		window.open(href,'_blank','noopener,noreferrer');
});
body.on('click','.navbar-icon.catalogue',()=>{
	$('#toc').addClass('active');
	$('#toc-mask').addClass('active');
});
body.on('click','#backToTop',()=>{
	$('html, body').animate({
		scrollTop: 0
	}, 0);
});
body.on('click','#toc, #toc-mask',()=>{
	$('#toc').removeClass('active');
	$('#toc-mask').removeClass('active');
});

renderToc();
backTopPos();
handleScroll();
$(window).on('scroll',handleScroll);
$(window).on('scroll',backTopPos);
$(window).on('resize',backTopPos);

let img = new Image;
img.onload = ()=>{body.css('background-image','url('+img.src+')');}
img.src = '/assets/img/background.webp';

});