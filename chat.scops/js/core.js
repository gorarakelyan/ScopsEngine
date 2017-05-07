/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/
	
	var ajax, ajaxtrue = false, getParsedHTML, getParsedJSON, canStartScroll = false, endOfScroll = false, continueWall;
	var keyUpAjax , keyUpAjaxStart = false;
	
	function ajaxQuery( url , content, id , putLoader , event ) {
		
		if( $('.chat-window').length ) closeChat( $('.chat-window').data('id') );
		if(ajaxtrue == true) ajax.abort();
	
		endOfScroll = false;
		
		if( url != 'chat' ) changeLoc( url );
		else changeLoc( 'chat' + id );
		
		if( !putLoader ) loader('#content-positioning .content-pages' , 'inline-block');
		
		if( url == 'chat' && !id ) {
			insertMainPage();
			return
		}
		
			ajaxtrue = true;
			ajax = $.ajax({
				type: 'POST',
				url: '../main/tab.tpl',
				success: function(tpl) {
					eval( 'getParsedJSON = { ' + url + ': true };');
					
					$.extend( getParsedJSON , { section: content , id: id , my_id: getCookie('id') , root: _root_ , langs: langs });
					
					getParsedHTML = Mustache.to_html( tpl , getParsedJSON );
					$('#content-positioning .main-content').html(getParsedHTML);	
					
					$(document).scrollTop(0);
					ajaxtrue = false;
				}
			});
		
		if( event ) event.preventDefault();
		
	}
	
	function fillDataTPL( php , exp , handle ) {
		$.post( php , $.extend( exp , { log_link: getCookie('link') , mobile_application: true , app_version_chat: true } ) , function(data){
			parseJSON( data, handle );
		});
	}
	
	function fillJSON( elem , bool , load , scroll , emptyClass , callback , notif ) {
		if( emptyClass ) emptyClass[0] = emptyClass[0] ? emptyClass[0] : 0 ;
		
		if( bool ) $(getParsedHTML).appendTo( elem );
		else
			if( getParsedHTML.replace(/\s+/g, '') ) $( elem ).html( getParsedHTML );
			else if( emptyClass ) $( elem ).html( '<div class="empty-object ' + ( emptyClass[1] ? 'padding ' : '' ) + ( emptyClass[2] ? 'material-object' : '' ) + '">' + emptyContents[emptyClass[0]] + '</div>' );
				
		if( load ) {
			ajaxScrolling = true;
			canStartScroll = true;
		}
		if( scroll ) {
			endOfScroll = getParsedJSON.end;
		}		
		if( notif ) {
			endOfNotif = getParsedJSON.end;
			canStartNotif = true;
		}
		if( callback ) eval( callback );
	}
	
	function parseJSON( data, handle ) {
		var dataJSON = JSON.parse( data );
		
		var tpl = dataJSON.tpl;
		delete dataJSON.tpl;
		
		getParsedJSON = '';
		getParsedJSON = dataJSON;
		
		getParsedHTML = '';
		getParsedHTML = Mustache.to_html( tpl , dataJSON );
		eval(handle);
	}
	
	function keyUpAJAX( opt , box , condition ) {
		setTimeout(function(){
			if( eval( condition.variable ) === undefined ) return;
			if( eval( condition.variable ) != condition.value ) return;
			
			if( keyUpAjaxStart ) keyUpAjax.abort();
			keyUpAjaxStart = true;
			
			keyUpAjax = $.post( opt.action ,  $.extend( opt , { log_link: getCookie('link') , mobile_application: true } ) , function(data){
				parseJSON( data , 'fillJSON(\'' + box + '\')' );
				keyUpAjaxStart = false;
			});
		} , 200 );
	}
	
	function fillMUSIC( elem , load , scroll ) {
		elem = $(elem);
		
		if( load ) {
			ajaxScrolling = true;
			canStartScroll = true;
		}
		if( scroll ) endOfScroll = getParsedJSON.end;
		
		if( !getParsedHTML.replace(/\s+/g, '') && !scroll ) {
			$( elem ).html( '<div class="empty-object padding material-object">' + emptyContents[2] + '</div>' );
			return ;
		}
		
		$( getParsedHTML ).appendTo(elem);
		var audioID = '';
		
		for( var i =  0 ; i < elem.find('.audio-object').length ; i++ )
			audioID += elem.find('.audio-object').eq(i).data('id') + '-';
		
		elem.attr( 'id' , audioID );
		
	}
	
	function lightBoxScroll( block , props ) {
		
		var box = $('#pages #win-page #win-content'), page = $('#pages #win-page');
		
		if( box.outerHeight(true) + 2 * parseInt( page.find('#win-table-imit').css('padding') ) - $(window).height() - page.scrollTop() < 200 && !lightBoxEnd && canStartLightBox ) {

			canStartLightBox = false;
			
			props.from = $(block).find('.item').length;
			
			$.post( _root_ + '/php_requests/get_content.php', props , function(data){
				
				var dataJSON = JSON.parse( data );
				var tpl = dataJSON.tpl;
				delete dataJSON.tpl;				
				
				$( Mustache.to_html( tpl , dataJSON ) ).find('.content .item').appendTo( block );
					
				lightBoxEnd = dataJSON.end;
				canStartLightBox = true;
				
			});
			
		}
		
	}
	