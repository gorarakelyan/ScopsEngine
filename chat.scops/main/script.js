/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	document.title = 'Chat | ' + _sitename_;
	fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'panel' },'fillJSON(\'nav#main\')');
	
	loadContent();
	function loadContent() {
		var query = window.location.search.substring( 1 , window.location.search.length );
		var tab = false , section = false , id = false ;
		if( query ) {
			query = query.split('&');
			for( var i = 0 ; i < query.length ; i++ ) {
				eval( query[i].split('=')[0] + ' = "' + query[i].split('=')[1] + '";' );
			}
		} else {
			query = window.location.pathname.split('/');
			query.splice( 0 , 1 );
			
			var key = query[0].substring( 0 , 2 );
			if( key == 'ch' ) {
				tab = query[0].substring( 0 , 4 );
				id = query[0].substring( 4 , query[0].length );
			} else tab = query[0];
		}		
		ajaxQuery( tab , section , id , true );
	}