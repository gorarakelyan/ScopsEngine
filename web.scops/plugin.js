/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/
		
		if( window.location.hash == '#wrong-attempt' ) $('.wrong').css( 'display' , 'block' );
		
		var reg = true;
		$('.content-block.registration #reg-form .submit-button').click(function(){
			if( !reg ) return;
			reg = false;
			$('.content-block.registration #reg-form .input-box.result-box').css('height','20px');
			$('.content-block.registration #reg-form #result').html( 'Loading...' );
			$('#reg-form').ajaxForm({
				success: function(data){
					if( data != '1' ) {
						if( JSON.parse(data)[0] == '0' ) window.location = JSON.parse(data)[1];
						else $('.content-block.registration #reg-form #result').html( JSON.parse(data)[1] );
						reg = true;
					} else {
						$('.content-block.registration .input-box').not('.result-box').css('height' , 0 + 'px').css('margin',0);
						$('.content-block.registration #reg-form #result').html('Message was sent to your mail');
					}
				}
			}).submit();
		});
		
		function openReg() {
			
			var reg = $('.content-block.registration #reg-form');
			reg.css('display','table-cell');
			
			setTimeout( function(){
				reg.css( 'opacity' , 1 ).css( 'width' , '650px' );
				$('.content-block.layer .bg').css( 'background' , 'rgba( 0, 0, 0, 0.6 )' );
				
			} , 10);
			
		}
		
		function remindPass() {
			
			$('.content-block .login-box #login-form').css('opacity', 0);
			setTimeout(function() {
				$('.content-block .login-box #login-form').css('display', 'none'); 
				$('.content-block .login-box #remind-form').css('height', '200px');
			}, 250);
			
		}
		
		function loginPage() {
			
			$('.content-block .login-box #remind-form').css('height', '0px');
			setTimeout(function() {
				$('.content-block .login-box #login-form').css('display', 'block'); 
				setTimeout( function(){
					$('.content-block .login-box #login-form').css('opacity', '1'); 
				} , 20);
			}, 150);
			
		}
		
		function sendPass() {
			
			var btn = $('.content-block #remind-form .submit-button');
			btn.text('Loading..').attr('onclick','');
			
			$('#remind-form').ajaxForm({
				success: function(data){
					if( data == '1' ) {
						btn.text('Success.');
						setTimeout(function(){
							btn.attr('onclick','sendPass()');
							loginPage();
						}, 800);
					}
					else btn.text('Error. Invalid Email').attr('onclick','sendPass()');
				}
			}).submit();
			
		}