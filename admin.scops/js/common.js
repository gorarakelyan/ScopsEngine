/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	function openPopupBox( props ) {
		var box = $('#pages #pop-up-box');
		if( !popupBox ) {
			
			popUpProps = props;
			box.css('display','block');
			
			setTimeout( function(){
				props.forEach(function( item , i , arr ){
					box.css( item[0] , item[1] );
				});
			} , 10 );
			
			setTimeout(function(){ popupBox = true; } , 100);
			
		}
	}
		
	function closePopupBox() {
		var box = $('#pages #pop-up-box');
		popupBox = false;
		var trans = box.css('transition');
		box.css('transition','none');
		
		popUpProps.forEach(function( item , i , arr ){
			box.css( item[0] , '' );
		});
		
		popUpProps = [];
		setTimeout( function(){
			box.css('display','none').css('transition',trans);
			box.empty();
		} , 10 );
	}	
	
	function addAlert( text , bool, time ) {
		var textShablons = new Array( 'Loading..Please wait' , 'Success!' );
		var newID = ( $('#pages .mini-window').length )? parseInt( $('#pages .mini-window:last').attr('id').substring( 3,$('#pages .mini-window:last').attr('id').length )) + 1 :0;
		
		if( text >= 0 && text < textShablons.length ) text = textShablons[text];
		var html = '<div class="mini-window" id="win'+ newID +'">' + text + '</div>';
	
		switch( text ) {
			case 0:
				bool = true;
			break;
			case 1:
				bool = false;
				time = 0;
			break;
		}
		
		$( html ).appendTo('#pages #windows-box');
		setTimeout(function(){
			var elem = $('#pages .mini-window#win' + newID);
			elem.css('margin-left','20px').css('border-radius', 0);
		},100);
					
		if( !bool ) setTimeout( function(){ removeAlert( newID ); } , ( time )?time:2000 ); 
		else return newID;
	}
	
	function removeAlert( id ) {
		var elem = $('#pages .mini-window#win' + id);
		if( parseInt( elem.css('margin-left') ) < 15 ) setTimeout( function(){
			elem.css('margin-left','-250px');
			setTimeout(function(){ elem.remove(); },500);
		}, 1000 );
		else {
			elem.css('margin-left','-250px');
			setTimeout(function(){ elem.remove(); },500);
		}
	}	
	
	function inElem( event , elem , bool ) {
		if( !elem.length ) return false;
		var mouseX = event.pageX, mouseY = event.pageY;
		
		if( mouseX < elem.offset().left ||
				mouseX > elem.offset().left + elem.innerWidth() ||
				mouseY < elem.offset().top ||
				mouseY > elem.offset().top + elem.innerHeight() ) return false;

		return true;
	}

	function openWinPage( widthCont , eventBool ) {
		if( winPage ) closeWinPage( false );
		else {
			winPage = true;
			
			if( widthCont == '' ) widthCont = standartWinWidth;
			
			$('#pages #win-page').css('display','block');
			$('#pages #win-page #win-content').css( 'width' , widthCont );
			
			if( eventBool ) {
				$('#pages #win-page .shadow-object').bind('click' , function(){
				$('#pages #win-page .shadow-object').unbind('click');
					closeWinPage( false );
				});
			}
			
			setTimeout(function(){				
				$('#pages #win-page .shadow-object').css( 'opacity' , 1 );
				$('#pages #win-page #win-content').css( 'opacity' , 1 );
				$('#pages #win-page').css( 'background' , 'rgba(0,0,0,0.75)' );
				
				setTimeout( function(){ 
					$('body').css('overflow','hidden');
					$('#pages #win-page').css('overflow-y','scroll'); 
				}, 40 );
			},0);
			
		}
	}
	
	function closeWinPage( bool ) {
		winPage = false;
		
		if( !bool ) {
			$('body').css('overflow-y','scroll');
			$('body').css('overflow-x','auto');
		}
		$('#pages #win-page').css('overflow-y','hidden');
			
		$('#pages #win-page #win-content').empty().css('opacity', '0' ).css('width','');
		$('#pages #win-page').css('background','rgba(0,0,0,0)');
		
		setTimeout(function(){ 
		
			$('#pages #win-page .shadow-object').css('opacity','0');
			$('#pages #win-page').css('display','none');
			
		},250);
	}	
	
	function request( type , id , event ) {
		var options = {};
		switch( type ) {
			
		}
		$.post('../php_requests/request.php',{ type:type, id:id, options: options },function(data){
			switch( type ) {
				
			}
		});
	}

	function loader( elem , type ) {
		switch( type ) {
			case 'inline':
				$(elem).text( 'Loading...');
			break;
			case 'block':
				var html = '<div class="loader-box block"><div class="loader-object block"></div></div>';
				$( elem ).html( html );
			break;
			default:
			case 'inline-block':
				var html = '<div class="loader-box"><div class="loader-object inline"></div><div class="title">Loading..</div></div>';
				$( elem ).html( html );
			break;
		}
	}
	
	function changeLoc( url ) {
		
		if( !url ) return;
		if( url.substring( 0, 1 ) == '/' ) url = url.substring( 1 , url.length );
		
		endOfScroll = false;
		
		if( location.pathname != '/' + url ) history.pushState({foo: 'bar'}, '', '/' + url);
		
		highlineMenu()
		
	}
	
	function highlineMenu() {
		
		var panel = $('.left-panel .menu');
		
		var loc = window.location.pathname.split('/');
		loc.splice(0,1);
		
		panel.find('.item').removeClass('selected');
		panel.find('.' + loc[0]).addClass('selected');
		
	}
	
	function exit() { $('#main-panel #exit').trigger('click'); }
	
	function findManage( type ) {
		
		loader( '.content-pages .list' , 'inline-block' );
		var key = $('.header .form .input-text-object').val();
		fillDataTPL('../php/get_content.php' , { content: !type ? 'manage_users' : 'manage_clubs' , key: key , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ ' + type + ' , true , false ] )' );
		
	}
  
	function findManageUp( event , type ) {
		
		if( event.keyCode == 13 ) findManage( type );
		
	}
	
	function newAnnounce() {
		
		var text = $('.header .form .input-textarea-object').val();
		$.post('../php/request.php' , { type : 0 , text : text } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				ajaxQuery('announcements');
			}
		});

	}
	
	function delAnnounce( num ) {
		
		$.post('../php/request.php' , { type : 1 , num : num } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				fillDataTPL('../php/get_content.php' , { content: 'manage_reports' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 2 , true , false ] )' );
			}
		});

	}
	
	function delGame( id ) {
		
		$.post('../php/request.php' , { type : 2 , id : id } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				fillDataTPL('../php/get_content.php' , { content: 'games' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 3 , true , false ] )' );
			}
		});

	}
	
	function delStickerPack( id ) {
		
		$.post('../php/request.php' , { type : 3 , id : id } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				fillDataTPL('../php/get_content.php' , { content: 'stickers' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 4 , true , false ]  )' );
			}
		});

	}
	
	function delGift( id ) {
		
		$.post('../php/request.php' , { type : 7 , id : id } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				fillDataTPL('../php/get_content.php' , { content: 'gifts' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 5 , true , false ]  )' );
			}
		});

	}
	
	function delLange( id ) {
		
		$.post('../php/request.php' , { type : 4 , id : id } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				fillDataTPL('../php/get_content.php' , { content: 'langs' } , 'fillJSON(\'.content-pages .list\')' );
			} else addAlert('Error..PLease try again.');
		});

	}
	
	function resetKey() {
		
		$.post('../php/request.php' , { type : 5 } , function( data ){
			if( data == 1 ) addAlert(1);
			else addAlert('Error..PLease try again.');
			window.location.reload();
		});

	}
	
	function changeTheme() {
		
		$.post('../php/request.php' , { type : 8 , theme : $('.header .form .theme-select').val() } , function( data ){
			if( data == 1 ) addAlert(1);
			else addAlert('Error..PLease try again.');
		});

	}
  
	function delUser( id , event , type ) {
		var props = {
				admin: $(event.target).closest('.input-btn-object').data('admin'),
				action: type ? 'del_club' : 'del_user',
				id: id
		}
		$.post( $(event.target).closest('.input-btn-object').data('host') + 'php_main/admin.php' , props , function( data ){
			if( data ) {
				addAlert(1);
				findManage( type );
			} else addAlert('Error');
		} );
	}

	function showLimitRow( type ) {
	
		$('.ads .input-text-object.clicks').addClass('hidden');
		$('.ads .input-text-object.views').addClass('hidden');
		
		switch( type ) {
			case 'views':
				$('.ads .input-text-object.clicks').removeClass('hidden');
			break;
			case 'clicks':
				$('.ads .input-text-object.views').removeClass('hidden');
			break;
		}

	}
	
	function delAD( id , event ) {
		
		$.post('../php/request.php' , { type : 9 , id : id } , function( data ){
			if( data == 1 ) {
				addAlert(1);
				$(event.target).closest('.ads-get').remove();
			} else addAlert('Error..PLease try again.');
		});
		
	}
	
	function verifyUser( id , event ) {
		
		var elem = $(event.target).closest('.verified');
		
		$.post('../php/request.php' , { type : 10 , id : id } , function(data){
			
			if( data == 1 ) {
				if( elem.hasClass('not') ) elem.removeClass('not');
				else elem.addClass('not');
			} else addAlert('Error.');
			
		});
		
	}