/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/
	
	var ajax, ajaxtrue = false, getParsedHTML, getParsedJSON, canStartScroll = false, endOfScroll = false;
	var keyUpAjax , keyUpAjaxStart = false;
	
	function ajaxQuery( url ) {
		
		endOfScroll = false;
		
		var dataSend = 'ajax=1&tab=' + url;
		
		changeLoc( url );
		
		loader('#content-positioning .main-content' , 'block');
		
		ajaxtrue = true;
		ajax = $.ajax({
			type: 'GET',
			url: '../php/tab.php',
			data: dataSend,
			success: function(data) {
				ajaxtrue = false;
				parseJSON( data, 'ajaxGenData()' );
			}
		}); 
		
	} 
	
	function ajaxGenData() {
		$('#content-positioning .main-content').html(getParsedHTML);
		$(document).scrollTop(0);
	}
	
	function fillDataTPL( php , exp , handle ) {
		$.post( php , exp , function(data){
			parseJSON( data, handle );
		});
	}
	
	function fillJSON( elem , bool , load , scroll , emptyClass ) {
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
			
			keyUpAjax = $.post( opt.action , opt , function(data){
				parseJSON( data , 'fillJSON(\'' + box + '\')' );
				keyUpAjaxStart = false;
			});
		} , 200 );
	}