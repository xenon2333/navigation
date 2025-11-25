function renderToc(){
	let toc = $('#toc');
	let button = $('.navbar-icon.catalogue');
	let titles = $('#main-column h3');
	if(titles.length === 0||titles.eq(0).attr('id')===undefined){
		toc.addClass('hide');
		button.removeClass('show');
		return;
	}
	let ul = $('<ul>');
	titles.each(function(){
		let li = $('<li>').append($('<a>').attr('href','#'+this.id).text($(this).text()));
		ul.append(li);
	});
	toc.append(ul);
	$('#toc ul').addClass('toc-list');
	toc.removeClass('hide');
	button.addClass('show');
}
function backTopPos(){
	let backTop = $('#backToTop');
	if( $(window).scrollTop() < 200 ){
		backTop.removeClass('show');
		return;
	}
	else
		backTop.addClass('show');
	let main = $('#main-column').eq(0);
	let footer = $('footer').eq(0);
	backTop.css('left',(main.offset().left+main.outerWidth()-20).toString()+'px');
	if( footer.offset().top <= ($(window).scrollTop()+$(window).height()-60) )
		backTop.css('bottom',($(window).scrollTop()+$(window).height()-footer.offset().top-20).toString()+'px');
	else
		backTop.css('bottom','40px');
}
function handleScroll(){
	if( $('#toc .toc-list').length === 0 )
		return;
	let curPos = $(window).scrollTop() + 72;
	let closest = null;
	let titles = $('#main-column h3');
	for(let i = 0;i < titles.length;i++){
		if(i === titles.length-1){
			if(curPos > titles.eq(i).offset().top){
				closest = titles[i].id;
				break;
			}
		}
		else{
			if(curPos >= titles.eq(i).offset().top&&curPos < titles.eq(i+1).offset().top){
				closest = titles[i].id;
				break;
			}
		}
	}
	$('#toc .active').removeClass('active');
	if(closest){
		let activeLink =$('#toc a[href="#' + closest + '"]');
		if (activeLink)
			activeLink.parentsUntil('div','li').each(function(){
				$(this).children('a:first').addClass('active');
			});
	}
}