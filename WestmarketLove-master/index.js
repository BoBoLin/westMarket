$(document).ready(function() {
	var width = $(window).width();
	var height = $(window).height();


	//save n-th letter opened bool
	opened = JSON.parse(localStorage.getItem("opened") );
	if(opened == null) var opened=[];



	$.each($('.card'),function(){
		$(this).data('ori',{ x:($(this).offset().left), y:($(this).offset().top) } );
	});
	

	// for pc 736*387 1280*619
	$('html').mousemove(function(event){
		$('.card').each(function() {

			if ( $('.opened').length>0 ){ return false; }


			var xPos = -($(this).data('speed')) * 0.1 * ( event.pageX / width - 0.5) + $(this).data('left') +'vw';
			var yPos = -($(this).data('speed')) * 0.1 * ( event.pageY / height - 0.5) + $(this).data('top') + 'vh';
			$(this).css({"top":yPos, "left":xPos});

		});
	});






	//for the animate calculation
	var xpos_rel;
	var ypos_rel;
	
	$(window).click(function(e){
		
		//to close a letter (a letter is already opened)
		if( $('.opened').length>0){
			
				// if($('.back').is(e.target)){ return false; }
				var card = $('.card.opened');
								
				$('#overlay-back').fadeOut(500); 
				card.siblings().css( '-webkit-filter' , 'none' );

				//eliminate open & close mouse position gap
				var open_close_offset_x = -($(this).data('speed')) * 0.1 * ( (event.pageX - open_pos_x) / width - 0.5)+ '%';
				var open_close_offset_y = -($(this).data('speed')) * 0.1 * ( (event.pageY - open_pos_y) / width - 0.5)+ '%';
				
				var xpos = "+="+ ( -xpos_rel +open_close_offset_x);
				var ypos = "+="+ ( -ypos_rel +open_close_offset_x);
				card.animate({ left:xpos, top:ypos }, 'easeInSine').removeClass('opened');
				
		}

		//to open a letter

		else if($('.front').is(e.target)){
			var open_pos_x = event.pageX;
			var open_pos_y = event.pageY;
			
			//e.target =  img.front
			//card = div.card			
			var card = $(e.target).parent();			
			
			//get the immediate card position for animate position calculation
			$.each($('.card'),function(){
				$(this).data('ori',{ x:($(this).offset().left), y:($(this).offset().top) } );
			});

			
			$('#overlay-back').fadeIn(500); 
			card.siblings().css( '-webkit-filter' , 'blur(20px)' );
			
			
			//relative to currrent card position	
			xpos_rel = (( width - card.width() )/2 - card.data('ori').x) +"px";
			ypos_rel = (( height - card.height() )/2 - card.data('ori').y) +"px";
			var xpos = "+="+ xpos_rel;
			var ypos = "+="+ ypos_rel;		
			card.addClass('opened').animate({ left:xpos, top:ypos });

			//record n-th letter opened
			opened[ $('.card').index(card) ] = 1;
		}

		//send to box.html & link
		else if($('img#logo-btn').is(e.target)){

			var openedstr = JSON.stringify(opened);
			localStorage.setItem("opened", openedstr );
			window.location = "box.html";
		}

	});




// for mobile
//*************************************************************************
		
	var	tmp = 0 ;

	var getPointerEvent = function(event) {
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
	};
	
	var $touchArea = $('#wall'),
		touchStarted = false, // detect if a touch event is sarted
		currX = 0,
		currY = 0,
		cachedX = 0,
		cachedY = 0,
		
		first_cachedX =0,
		first_cachedY =0;

		
	//for the card-OpenClose animation calculation
	var xpos_rel;
	var ypos_rel;
	
	
	//Touching (PC:Click)
	//setting the events listeners
	$touchArea.on('touchstart',function (e){
		e.preventDefault(); 
		var pointer = getPointerEvent(e);
		// caching the current x
		cachedX = currX = pointer.pageX;
		// caching the current y
		cachedY = currY = pointer.pageY;
		// a touch event is detected      
		touchStarted = true;
		//$touchArea.text('Touchstarted');
		// detecting if after 200ms the finger is still in the same position
		setTimeout(function (){
			
			
			
			if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
				
				
				// Here you get the Tap event
				//$touchArea.text('Tap');
					
					//to close a letter (a letter is already opened)
					if( $('.opened').length>0 ){
						
							// if($('.back').is(e.target)){ return false; }
							var card = $('.card.opened');
											
							$('#overlay-back').fadeOut(500); 
							card.siblings().css( '-webkit-filter' , 'none' );
							
							var xpos = "-="+ xpos_rel;
							var ypos = "-="+ ypos_rel;
							card.removeClass('opened').animate({ left:xpos, top:ypos }, 'easeInSine');
							
						
					}

					//to open a letter
					else if($('.front').is(e.target)){
						
						//e.target =  img.front
						//card = div.card			
						var card = $(e.target).parent();			
						
						//get the immediate card position for animate position calculation
						$.each($('.card'),function(){
							$(this).data('ori',{ x:($(this).offset().left), y:($(this).offset().top) } );
						});

						
						$('#overlay-back').fadeIn(500); 
						card.siblings().css( '-webkit-filter' , 'blur(10px)' );
						$(e.target).next().css('z-index','3');
						
						
						//relative to currrent card position	
						xpos_rel = (( width - card.width() )/2 - card.data('ori').x) +"px";
						ypos_rel = (( height - card.height() )/2 - card.data('ori').y) +"px";						
						var xpos = "+="+ xpos_rel;
						var ypos = "+="+ ypos_rel;
						card.addClass('opened').animate({ left:xpos, top:ypos }, 'easeOutSine');


						opened[ $('.card').index(card) ] = 1;
					}

					
						//send to box.html & link
					else if($('img#logo-btn').is(e.target)){

						var openedstr = JSON.stringify(opened);
						localStorage.setItem("opened", openedstr );
						window.location = "box.html";
					}
			}
		},200);
	});
	
	
	
	$touchArea.on('touchend touchcancel',function (e){
		e.preventDefault();
		// here we can consider finished the touch event
		touchStarted = false;
		//$touchArea.text('Touchended');
		temp =0;
		
		
					var card = $('.card');
					$.each($('.card'),function(){
										$(this).data('ori',{ x:($(this).offset().left), y:($(this).offset().top) } );
					});
					// console.log('cardx : ' + card.data('ori').x / width);
					// console.log('cardy : ' + card.data('ori').y / height);
		
		
		
	});
	
	
	
	
	
					//e.target =  img.front
					//card = div.card			
					// var card = $(e.target).parent();			
							
					//get the immediate card position for animate position calculation
					// $.each($('.card'),function(){
						// $(this).data('ori',{ x:($(this).offset().left), y:($(this).offset().top) } );
					// });
	
	var temp =0;
	var card = $('.card');
	$.each($('.card'),function(){
						$(this).data('ori',{ x:($(this).offset().left), y:($(this).offset().top) } );
					});
	
	
	
	//Swiping (PC:Mousemove)
	$touchArea.on('touchmove',function (e){
		e.preventDefault();
		var pointer = getPointerEvent(e);

		currX = pointer.pageX;
		currY = pointer.pageY;
		
		// console.log(cachedX);
		// console.log(cachedY);
		
		
		var card = $('.card');
		
		
		//get the immediate card position for animate position calculation
		
		
		
		if (temp ==0){
					first_cachedX = currX;
					first_cachedY = currY;
							
					
					$.each($('.card'),function(){
						$(this).data('ori_cached',{ x:card.data('ori').x, y:card.data('ori').y } );
					});
					
					
					
					
					temp =1;
					
					// console.log(first_cachedX);
					// console.log(first_cachedY);
					// console.log('card.data_oriX : ' + card.data('ori').x);
					// console.log('card.data_oriY : ' + card.data('ori').Y);
					// console.log('card.data_X : ' + card.data('ori_cached').x);
					// console.log('card.data_Y : ' + card.data('ori_cached').Y);
				}
				
		
					
		
		

		if(touchStarted) {
				
				
				$('.card').each(function() {
					
					
					if ( $('.card').hasClass('opened') ){ return false; }
					var rel_xPos = ($(this).data('speed')) * 0.1 * ( (currX - first_cachedX) / width);
					var rel_yPos = ($(this).data('speed')) * 0.1 * ( (currY - first_cachedY) / height);
					// var xPos = (rel_xPos + 100*( card.data('ori_cached').x / width )) + '%';
					// var yPos = (rel_yPos + 100*( card.data('ori_cached').y / height )) + '%';
					var xPos = (rel_xPos + 100*( card.data('ori_cached').x / width )) + $(this).data('left') +'vw';
					var yPos = (rel_yPos + 100*( card.data('ori_cached').y / height )) + $(this).data('top') +'vh';
					// + $(this).data('left') +'vw'
					$(this).css({"top":yPos, "left":xPos});
					
					
					// console.log('card.data_X % : ' + card.data('ori_cached').x / width);
					// console.log('card.data_Y %: ' + card.data('ori_cached').Y / height);
					// console.log('rel_xPos : ' + rel_xPos);
					// console.log('rel_yPos : ' + rel_yPos);
					// console.log('xPos : ' + xPos);
					// console.log('yPos : ' + yPos);
					
					// console.log('currX - first_cachedX : ' + currX +' - '+ first_cachedX);
					// console.log('first_cachedY : ' + first_cachedY);
					// console.log('rel_xPos + oriX: ' + rel_xPos + ' + ' + card.data('ori_cached').x / width);
					// console.log('rel_yPos + oriY: ' + rel_yPos + ' + ' + card.data('ori_cached').y / height);
					// console.log('xPos : ' + xPos);
					// console.log('yPos : ' + yPos);
					
					// console.log('moving_card_x : ' + card.data('ori_cached').x);
					// console.log('moving_card_y : ' + card.data('ori_cached').y);
					
					// if ( $('.card').hasClass('opened') ){ return false; }
					// var xPos = -($(this).data('speed')) * 0.1 * ( currX / width - 0.48)+ '%';
					// var yPos = -($(this).data('speed')) * 0.1 * ( currY / height - 0.4) + '%';
					// $(this).css({"top":yPos, "left":xPos});

				});
			 
		}
		
	   
	});


//*************************************************************************
//audio
var audio = document.getElementById('audio')
    var btn  = document.getElementById('a');
    var btn2 = document.getElementById('b');
    var btn3 = document.getElementById('c');
    var btn4 = document.getElementById('d');
    var btn5 = document.getElementById('e');
    var btn6 = document.getElementById('f');
    var btn7 = document.getElementById('g');
    var btn8 = document.getElementById('h');
    var btn9 = document.getElementById('i');
    var btn10 = document.getElementById('j');
    var btn11 = document.getElementById('k');
    var btn12 = document.getElementById('l');

 

    btn.mousemove = function() {
        audio.cloneNode().play();
    };
    btn2.onclick = function() {
        audio.cloneNode().play();
    };
    btn3.onclick = function() {
        audio.cloneNode().play();
    };
    btn4.onclick = function() {
        audio.cloneNode().play();
    };
    btn5.onclick = function() {
        audio.cloneNode().play();
    };
    btn6.onclick = function() {
        audio.cloneNode().play();
    };
    btn7.onclick = function() {
        audio.cloneNode().play();
    };
    btn8.onclick = function() {
        audio.cloneNode().play();
    };
    btn9.onclick = function() {
        audio.cloneNode().play();
    };
    btn10.onclick = function() {
        audio.cloneNode().play();
    }
    btn11.onclick = function() {
        audio.cloneNode().play();
    };
    btn12.onclick = function() {
        audio.cloneNode().play();
    };





	

});


