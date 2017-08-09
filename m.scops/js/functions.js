/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	function setCookie(name, value, options) {
		options = options || {};

		var expires = options.expires;

		if (typeof expires == "number" && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires*1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) { 
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);

		var updatedCookie = name + "=" + value;

		for(var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];    
			if (propValue !== true) { 
				updatedCookie += "=" + propValue;
			 }
		}

		document.cookie = updatedCookie;
	}

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : false;
	}

	function str_replace(search, replace, string) {
		search = [].concat(search);
		replace = [].concat(replace);

		var len = replace.length - search.length;
		var p_last = search[search.length - 1];

		for (var i = 0; i < len; i++) search.push(p_last);

		for (var i = 0; i < -len; i++) replace.push('');

		var resultStr = string;
		for (var i = 0; i < search.length; i++) resultStr = resultStr.split(search[i]).join(replace[i]);
		return resultStr;
	}

	function modifyString( needle , string ) {
			
		if( string == '' ) return needle;
		
		array = string.split( ',' );
		
		if( array.indexOf( needle ) >= 0 ) array.splice( array.indexOf( needle ) , 1 ) ;
		else array.splice( 0 , 0 , needle );
		
		return array.join(",");
		
	}

	function createCalendar( box, callback , year , month , success , change ) {
		var date = new Date( year, month );
		
		var table = '<table data-year="' + year + '" data-month="' + month + '"><tr><th>' + langs.days[0] + '</th><th>' + langs.days[1] + '</th><th>' + langs.days[2] + '</th><th>' + langs.days[3] + '</th><th>' + langs.days[4] + '</th><th>' + langs.days[5] + '</th><th>' + langs.days[6] + '</th></tr><tr>';
	
		for ( var i = 0 ; i < getDay( date ) ; i++ ) table += '<td></td>';
		
		var j = 1;
		while( date.getMonth() == month ) {
			
			table += '<td class="isset" data-date="' + j + '.' + month + '.' + year + '" onclick="' + callback + '( event , \''+ j + '.' + month + '.' + year + '\')">' + date.getDate() + '</td>';
			if ( getDay( date ) % 7 == 6 ) table += '</tr><tr>';
			
			date.setDate( date.getDate() + 1 );
			j++;
			
		}
		
		if ( getDay( date ) != 0 ) for ( var i = getDay( date ) ; i < 7 ; i++ ) table += '<td></td>';
		table += '</tr></table>';
		
		$(box).html( table );
		
		if( success ) eval( success );
		
		if( change ) {
			$(change).eq(0).on('click', function(){
				eventsMonthChange( 0 , box , callback , success );
			});
			$(change).eq(1).on('click', function(){
				eventsMonthChange( 1 , box , callback , success );
			});
		}
	}
	
	function eventsMonthChange( type , box , callback , success ) {
		var cal = $(box);
		var year = parseInt( cal.find('table').data('year') ), month = parseInt( cal.find('table').data('month') );
		
		if( type ) {
			if( month < 11 ) month++;
			else {
				month = 0;
				year++;
			}
		} else {
			if( month > 0 ) month--;
			else {
				month = 11;
				year--;
			}
		}
		createCalendar( box , callback , year , month , success );
	}
	
	function getDay( date ) { 
	
		var day = date.getDay();
		return !day ? 6 : day - 1;
		
	}
	
	function humanDate( date ) {
		
		var realDate = date.split('.');
		if( realDate.length == 2 ) realDate[2] = '';
		
		realDate[1] = langs.months[realDate[1]];
		
		return realDate[0] + ' ' + realDate[1] + ( realDate[2] ? ' ' + realDate[2] : '' );
	}
		
	function browser(){

		var ua = navigator.userAgent;    

		if ( ua.search(/Chrome/) > 0 ) return 'Chrome';
		if ( ua.search(/Firefox/) > 0 ) return 'Firefox';
		if ( ua.search(/Opera/) > 0 ) return 'Opera';
		if ( ua.search(/Safari/) > 0 ) return 'Safari';
		if ( ua.search(/MSIE/) > 0 ) return 'Explorer';

	}
	
	function selection() {
    var txt = '';
    if (txt = window.getSelection)
      txt = window.getSelection().toString();
    else 
      txt = document.selection.createRange().text;
    return txt;
  }