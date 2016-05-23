$(document).ready(function() {

	opened = JSON.parse(localStorage.getItem("opened") );



    for(var i=0;i<13;i++){
    	if(opened[i]==1) continue;
		$('.front').eq(i).css('visibility','hidden');
		$('.card').eq(i).css('background-image','url(http://placehold.it/500x400?text=?)');
    }


	$('.front').click(function(){
			$(this).parent().addClass('opened');
	});
	$('.back').click(function(){
		$(this).parent().removeClass('opened');
	});
	$('img#logo-btn').click(function(){
		var openedstr = JSON.stringify(opened);
		localStorage.setItem("opened", openedstr );
		window.location = "index.html";
	});
});