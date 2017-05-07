/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	function changeLang( langName ) {
		$.post('../php_requests/request.php', { type: 34 , lang: langName } , function(){ 
			var exp = new Date();
			exp = new Date( exp.getTime() + 315360000 * 1000 );
			setCookie( 'langs' , langName , { path: '/' , expires: exp  } );
			window.location.reload();
		});
	}
	
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
	
	function titleTextModify( animation , condition , text , type ) {
		if( typeof( titleTexts[0] ) != 'undefined' ) {
			eval( 'titleWorkingModifs.' + type + ' = true' );
			document.title = titleTexts[text[0]];
		
			if( animation && eval( condition ) )
				setTimeout(function(){
					document.title = ( titleCount ? '(' + titleCount + ') ' : '' ) + titleTexts[text[1]];
					setTimeout( function(){ titleTextModify( animation , condition , text , type ); } , 800 );
				},800);
			else eval( 'titleWorkingModifs.' + type + ' = false' );
		} else setTimeout( function(){ titleTextModify( animation , condition , text , type ); } , 800 );
	}
	
	function playNotifSound( num ) {
		var nSound = new Audio();
		nSound.src = notifSounds[num];
		nSound.onloadeddata  = function(){
			nSound.currentTime = 0;
			nSound.play();
		}
	}
	
	function addAlert( text , bool, time ) {
		var textShablons = new Array( langs.loading_pls , langs.success );
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
	
	function audioSeekUP( e ) {
		if( audio.duration ) {
			if( audioSeeking ) {
				
				audioSeeking = false;
				$(document).enableSelection();
				$('body').css('cursor','');
				
				var playAfter = false;
				if( audio.ended ) var playAfter = true;
				
				audio.currentTime = (audio.duration * eventAudio.find('.loader').width() ) / eventAudio.find('.audio-line').width();
				
				if( playAfter ) audio.play();
				
				if( audio.paused ) {
					for( var i = 0 ; i < $('.mus-' + currentAudio).length ; i++  ) {
						var elem = $('.mus-' + currentAudio).eq(i);
						var newWidth = audio.currentTime * elem.find('.audio-line').width() / audio.duration;
						elem.find('.loader').width( Math.ceil( newWidth ) );
						if( audio.duration >= 0) elem.find('.dur').text( '-' + toMinutes( audio.duration - audio.currentTime ) );
					}
				}
				
				setTimeout(function(){
					eventAudio.find('.loader').css('transition','none');
				},100);
				
			}
		} else setTimeout( function(){ audioSeekUP( e ); } , 100 );
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
	
	function logOut() {
		
		var i = 0;
		
		while( getCookie('chat_' + i) ) {
			setCookie( 'chat_' + i, '', {expires: -1 , path: '/'} );
			i++;
		}
		
		setCookie( 'langs', '', {expires: -1 , path: '/'} );
		
		switch( scops.theme ) {
			case 'classic':
			case 'silver':
				$('#main-panel #right-side #exit').click();
			break;
			case 'fb':
			default:
				$('#secondary-panel #exit').click();
			break;
		}
		
	}
	
	function goToSearch( event ) {
		if( event.keyCode == 13 ) {
			var searchVal =  $('#main-panel #input-panel-search').val();
			searchVal = searchVal.replace(/^\s+/, "");
			searchVal = searchVal.substring(0,1);
			if( searchVal == '#' ) ajaxQuery('search', 4 );
			else ajaxQuery('search', 0 );
		}
	}
	
	function notification( type ) {
		
		if( notifIsOpened ) {
			setTimeout(function(){ notification( type ); }, 100);
		} else {
			
			endOfNotif = false;
			canStartNotif = false;
			
			switch( scops.theme ) {
				case 'classic':
				case 'silver':
					if( secPanel ) $('#pages #panel-page').width( 400 ).css('left','200px');
					else $('#pages #panel-page').width( 400 ).css('left','60px');
				break;
				case 'vk':
					var leftMarg = $('#main-panel .right-side #sms-icon').offset().left;
					$('#pages #panel-page').css( 'height' , '95%' ).css('left', leftMarg );
				break;
				case 'fb':
				default:
					var leftMarg = $('#main-panel .right-side').offset().left + $('#main-panel .right-side').outerWidth(true) - 400;
					$('#pages #panel-page').css( 'height' , '95%' ).css('left', leftMarg );
				break;
			}
			
			loader( '#pages #panel-content' );
			fillDataTPL('../php_requests/get_content.php',{ content: 'notif_' + type , length: loadContentLengths[9] , last_id: 'NULL' },'fillJSON(\'#pages #panel-content\' , false , false , false , true , [ 0 , true , false ] )');
			
			setTimeout(function(){ notifIsOpened = type; },100);
			
		}
		
	}
	
	function getNewNotifs() {
		if( notifIsOpened ) {
			var box = $('#pages #panel-page #panel-content');
			if( box[0].scrollHeight - box.innerHeight() - box.scrollTop() < 100 && !endOfNotif && canStartNotif ) {
				canStartNotif = false;
				var last = box.find('.notification-object:last').data('id');
				fillDataTPL('../php_requests/get_content.php',{ content: 'notif_' + notifIsOpened , length: loadContentLengths[9] , last_id: last },'fillJSON(\'#pages #panel-content\' , true , false , false , true )');
			}
		}
	}
	
	updates();
	function updates() {		
		var req = $('#panels .panel-obj-info#req-icon .extra'),
		notif = $('#panels .panel-obj-info#notif-icon .extra'),
		visits = $('#panels .panel-obj-info#visits-icon .extra'),
		sms = $('#panels .panel-obj-info#sms-icon .extra');
		
		$.post('../php_requests/updates.php', { vis: visits.text(), not: notif.text(), req: req.text(), sms: sms.text() }, function( dataRes ){
			
			var data = JSON.parse(dataRes);
			
			if( notif.text() != data[0] ) {
				if( data[0] > notif.text() && !firstUpdate ) playNotifSound( 1 );
				
				notif.text(data[0]);
				if( data[0] > 0 ) notif.parent().find('.new').css('opacity',1);
				else notif.parent().find('.new').css('opacity',0);
			}
			if( req.text() != data[1] ) {
				req.text(data[1]);
				if( data[1] > 0 ) req.parent().find('.new').css('opacity',1);
				else req.parent().find('.new').css('opacity',0);
			}
			if( visits.text() != data[2] ) {
				visits.text(data[2]);
				if( data[2] > 0 ) visits.parent().find('.new').css('opacity',1);
				else visits.parent().find('.new').css('opacity',0);
			}
			if( sms.text() != data[3] ) {
				receivedMSG = ( data[3] != 0 )?true:false;
				titleCount = data[3];
				if( !titleWorkingModifs.sms ) titleTextModify( true , 'receivedMSG' , [ 0 , 1 ] , 'sms' );
				
				if( data[3] > sms.text() ) {
					if( !tabFocuse ) playNotifSound( 0 );
				}
				
				sms.text(data[3]);
				if( data[3] > 0 ) sms.parent().find('.new').css('opacity',1);
				else sms.parent().find('.new').css('opacity',0);	
				
				if( window.location.pathname.split('/')[1].substring( 0 , 4 ) == 'chat' ) refreshDialogues( 1 , false );
			}

			updates();			
		});
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
		lightBoxContent = false;
		lightBoxEnd = false;
		$('#pages #win-page').unbind('scroll');
			
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
			case 3:
				var elem = $('.news-object#news-' + id + ' .btn.like , #right-block #news-' + id + ' .btn.like');
				if( elem.hasClass('check') ) elem.attr('class','btn like');
				else elem.attr('class','btn like check');
			break;
			case 4:
				var elem = $('.news-object#news-' + id + ' .btn.unlike , #right-block #news-' + id + ' .btn.unlike');
				if( elem.hasClass('check') ) elem.attr('class','btn unlike');
				else elem.attr('class','btn unlike check');
			break;
			case 5:
				$('#news-' + id + ' .news-footer .btn.share').attr( 'onclick' , '' );
			break;
			case 6:
				var remID = addAlert( langs.alert_deleting , true );
			break;
			case 17:
				options.text = $('#win-page .quest-form .question').val();
				if( !options.text.replace(/\s+/g,'').length ) return;
				closeWinPage( false );
			break;
			case 18:
				options.text = $('.notification-object#notif-' + id + ' .answer').val();
				if( !options.text.replace(/\s+/g,'').length ) return;
				$('.notification-object#notif-' + id).remove();
			break;
			case 19:
				$('.notification-object#notif-' + id).remove();
			break;
			case 20:
				addAlert( langs.alert_date_like );
				getNewDating();
			break;
			case 23:
				options.people = eventInvitedList;
				eventInvitedList = '';
			break;
			case 26:
				options.user = $( event.target ).closest('.user').data('id');
			break;
			case 27:
				options.user = $( event.target ).closest('.user').data('id');
			break;
			case 28:
				options.user = $( event.target ).closest('.user').data('id');
			break;
			case 29:
				options.user = $( event.target ).closest('.user').data('id');
			break;
			case 30:
				$('#pages #pop-page #page-content #comm-' + id ).remove();
			break;
			case 31:
				options.people = peopleInvite;
				peopleInvite = '';
				addAlert( langs.alert_inv_sent );
			break;
			case 32:
				$( event.target ).closest('.notification-object').remove();
			break;
			case 33:
				$( event.target ).closest('.notification-object').remove();
			break;
			case 35:
				options.id = $( event.target ).closest('.to-friend').data('id');
			break;
		}
		options = JSON.stringify( options );
		$.post('../php_requests/request.php',{ type:type, id:id, options: options },function(data){
			switch( type ) {
				case 0:
					if( data == '0' ) addAlert( langs.alert_blocked );
					else addAlert( langs.alert_unblocked );
					
					ajaxQuery('user' , userContent , profID );

				break;
				case 1:
					if( data == '0' ) {
						$('#user-profile #user-profile-requests .request-object#add-follow').css('display','none');
						$('#user-profile #user-profile-requests .request-object#remove-follow').css('display','inline-block');
						addAlert( langs.alert_follow );
					} else {
						$('#user-profile #user-profile-requests .request-object#remove-follow').css('display','none');
						$('#user-profile #user-profile-requests .request-object#add-follow').css('display','inline-block');
						addAlert( langs.alert_follow_not );
					}
				break;
				case 2:
					addAlert( 1 );
					ajaxQuery('user' , userContent , profID );
				break;
				case 3:
					$('#news-' + id + ' .news-footer .btn.like .text').text( data );
				break;
				case 4:
					$('#news-' + id + ' .news-footer .btn.unlike .text').text( data );
				break;
				case 5:
					$('#news-' + id + ' .news-footer .btn.share .text').attr( 'onclick' , 'request( 5 , '+ id +' )' );
					addAlert( langs.alert_share );
				break;
				case 6:
					if( $('#pages #pop-page #page-content table').length ) closeNews();
					setTimeout(function(){
						removeAlert( remID );
						$('.news-object#news-' + id).find('.post-shadow:first').css('height',$('.news-object#news-' + id).height()).css('width',$('.news-object#news-' + id).width()).css('border-radius',0);
						$('#img-' + id).find('.post-shadow:first').css('height',$('#img-' + id).height()).css('width',$('#img-' + id).width()).css('border-radius',0);
						$('#vid-' + id).find('.post-shadow:first').css('height',$('#vid-' + id).height()).css('width',$('#vid-' + id).width()).css('border-radius',0);
					}, 200 );
				break;
				case 9:
					addAlert( 1 );
					ajaxQuery('club' , userContent , profID );
				break;
				case 11:
					addAlert( 1 );
				break;
				case 14: 
					$( '.audio-object.mus-' + id ).find('.adding-options .opt').text( data == '1' ? '' : '' );
					addAlert( data == '1' ? langs.added : langs.removed );
				break;
				case 15:
				var myBox = $('#pages #win-content .stickers-store .my-box'),
						otherBox = $('#pages #win-content .stickers-store .other-box'),
						store = $('#pages #win-content .stickers-store');
						
					if( data == '1' ) {
						store.find('.sticker-' + id + ' .st-btn').text( langs.remove );
						addAlert( langs.sticker_added );
						if( !myBox.find('.st-pack').length ) myBox.empty();
						otherBox.find('.sticker-' + id ).clone().prependTo( myBox );
					} else {
						store.find('.sticker-' + id + ' .st-btn').text( langs.add );
						addAlert( langs.sticker_removed );
						myBox.find('.sticker-' + id ).remove();
						if( !myBox.find('.st-pack').length ) myBox.html('<div class="alert-object-small">' + langs.sticker_empty_store + '</div>');
					}
				break;
				case 17:
					addAlert( 1 );
				break;
				case 18:
					addAlert( langs.alert_answer_sent );
				break;
				case 22:
					$('.event-object.ev-' + id ).remove();
					addAlert( langs.alert_ev_del );
				break;
				case 23:
					addAlert( langs.alert_inv_sent );
				break;
				case 24:
					addAlert( langs.alert_inv_acc );
					if( event ) $(event.target).closest('.notification-object').remove();
					if( eventsDay ) {
						fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 0 , date: eventsDay },'fillJSON(\'#events-page .box.my-events\')');					
						fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 1 , date: eventsDay },'fillJSON(\'#events-page .box.all-events\')');					
					}			
					break;
				case 25:
					if( event ) $(event.target).closest('.notification-object').remove();
					if( eventsDay ) {
						fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 0 , date: eventsDay },'fillJSON(\'#events-page .box.my-events\')');					
						fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 1 , date: eventsDay },'fillJSON(\'#events-page .box.all-events\')');					
					}
				break;
				case 26:
					if( $( event.target ).closest('.user').data('id') == getCookie('id') ) ajaxQuery( 'club' , 'wall' , profID );
					else {
						if( data == '1' ) addAlert( 1 );
						else addAlert( langs.error_try );
						if( settingsTabNum ) settingsTab( settingsTabNum );
					}
				break;
				case 27:
					if( settingsTabNum ) settingsTab( settingsTabNum );
				break;
				case 28:
					if( settingsTabNum ) settingsTab( settingsTabNum );
				break;
				case 29:
					if( settingsTabNum ) settingsTab( settingsTabNum );
				break;
				case 32:
					addAlert( langs.alert_inv_acc );
				break;
				case 33:
					addAlert( langs.alert_inv_rem );
				break;
				case 35:
					if( data == 1 ) addAlert( 1 );
					else addAlert( langs.error_try );
				break;
				case 37:
					var comment = $('.comment#comm-' + id + ' .like');
					if( comment.hasClass('active') ) comment.removeClass('active');
					else comment.addClass('active');
					$('.comment#comm-' + id + ' .like-counter').text( data );
				break;
				case 38:
					var comment = $('.comment#comm-' + id + ' .unlike');
					if( comment.hasClass('active') ) comment.removeClass('active');
					else comment.addClass('active');
					$('.comment#comm-' + id + ' .unlike-counter').text( data );
				break;
			}
		});
	}
	
	function reqNotif( id , type ) {
		if( type ) request( 11 , id );
		else request( 12 , id );
		$('.notification-object#notif-req-' + id).remove();
	}

	function loader( elem , type ) {
		switch( type ) {
			case 'inline':
				$(elem).text( langs.loading + '...');
			break;
			case 'block':
				var html = '<div class="loader-box block"><div class="loader-object block"></div></div>';
				$( elem ).html( html );
			break;
			default:
			case 'inline-block':
				var html = '<div class="loader-box"><div class="loader-object inline"></div><div class="title">' + langs.loading + '..</div></div>';
				$( elem ).html( html );
			break;
		}
	}
	
	function changeLoc( url ) {
		
		if( !url ) return;
		if( url.substring( 0, 1 ) == '/' ) url = url.substring( 1 , url.length );
		
		endOfScroll = false;
		
		if( location.pathname != '/' + url ) history.pushState({foo: 'bar'}, '', '/' + url);
		
		addToMenu();
		
	}
	
	function openHashtag( name ) {
		$('#main-panel #input-panel-search').val( name );
		ajaxQuery('search' , 4 );
	}
	
	function addToMenu() {
		var loc = window.location.pathname.split('/');
		loc.splice(0,1);
		if( loc[0].substring(0,2) == 'id' ) {
			loc[2] = loc[0].substring(2,loc[0].length);
			var id = loc[0].substring(2,loc[0].length);
			if( id == getCookie('id') ) {
				loc[0] = 'id' + loc[1];
				updateTRMenu( loc );
			} else {
				$.post('../php_requests/request.php',{type:7, id:id},function(data){
					if( data != '0' ) loc[0] = 'fr';
					else loc[0] = 'bl_fr';
					updateTRMenu( loc );
				});
			}
		}
		if( loc[0].substring(0,4) == 'club' ) {
			loc[2] = loc[0].substring(4,loc[0].length);
			var id = loc[2];
			$.post('../php_requests/request.php',{type:8, id:id},function(data){
				if( data ) {
					data = JSON.parse( data );
					loc[0] = '';
					if( data[0] == '1' ) loc[0] = 'club';
					if( data[1] == '0' && loc[1] == 'wall' ) loc[0] += 'inv';
					loc[0] += loc[1];
					updateTRMenu( loc );
				}
			});
		}
		if( loc[0].substring(0,4) != 'club' && loc[0].substring(0,2) != 'id' ) updateTRMenu( loc );
		
	}
	
	function updateTRMenu( loc ) {
		
		switch( scops.theme ) {
			case 'classic':
			case 'silver':
				var checkBlock = $('#panels #tertiary-panel');
			break;
			case 'fb':
			default:
				var checkBlock = $('.din-obj-adding');
			break;
		}
		
		if( checkBlock.length ) {
			checkBlock.empty();
		} else setTimeout(function(){ 
			updateTRMenu( loc );
			return false; 
		}, 100);
		
		var array = new Array(
			new Array('idwall', 'new-post', 'onclick="insertUploadForm(\'#user-content #content-set\' , \'post\', 0)"' ),
			new Array('idphotos', 'new-photo', 'onclick="insertUploadForm(\'#user-content #content-set\', \'photo\', 0)"' ),
			new Array('idvideos', 'new-video', 'onclick="insertUploadForm(\'#user-content #content-set\', \'video\', 0)"' ),
			new Array('idclubs', 'new-club', 'onclick="insertUploadForm(\'#user-content #content-set\', \'club\', 0)"' ),
			new Array('idmusic', 'new-music', 'onclick="insertUploadForm(\'#user-content #content-set\', \'music\', 0)"' ),
			new Array('fr', 'new-question', 'onclick="askQuestion(' + loc[2] + ')"' ),
			new Array('fr', 'new-sms', 'onclick="openChat(' + loc[2] + ', true )"' ),
			new Array('fr', 'new-gift', 'onclick="openGifts(' + loc[2] + ')"' ),
			new Array('news', 'new-post', 'onclick="insertUploadForm(\'#news-page .content\', \'post\' , 0)"' ),
			new Array('clubwall', 'new-post', 'onclick="insertUploadForm(\'#user-content #content-set\', \'post\' , 1)"' ),
			new Array('clubinvwall', 'new-post', 'onclick="insertUploadForm(\'#user-content #content-set\', \'post\' , 1)"' ),
			new Array('clubinvwall', 'new-inv', 'onclick="invitePeopleToClub( ' + loc[2] + ' )"' ),
			new Array('invwall', 'new-inv', 'onclick="invitePeopleToClub( ' + loc[2] + ' )"' ),
			new Array('clubphotos', 'new-photo', 'onclick="insertUploadForm(\'#user-content #content-set\', \'photo\' , 1)"' ),
			new Array('clubvideos', 'new-video', 'onclick="insertUploadForm(\'#user-content #content-set\', \'video\' , 1)"' ),
			new Array('clubmusic', 'new-music', 'onclick="insertUploadForm(\'#user-content #content-set\', \'music\' , 1)"' ),
			new Array('bl_fr', 'new-sms', 'onclick="openChat(' + loc[2] + ' , true )"' )
		);
			
		for( var i = 0 ; i < array.length ; i++ ) {
			if( array[i][0] == loc[0] ) {
				switch( scops.theme ) {
					case 'classic':
					case 'silver':
						var html = '<div class="panel-object round-icon" id="'+ array[i][1] +'" '+array[i][2]+'></div>';
						$(html).appendTo( checkBlock );
					break;
					case 'fb':
					default:
						var html = '<div class="request-object" id="'+ array[i][1] +'" '+array[i][2]+'></div>';
						$(html).appendTo( checkBlock );
					break;
				}
			}
		}
		
	}
	
	function openPlayer() {
		if( !musicTab ) {
			switch( scops.theme ) {
				case 'classic':
				case 'silver':
					$('#pages #audioplayer').css('left' , 105 + 'px' ).outerHeight( $(window).height() - 90 );
				break;
				case 'vk':
					var leftMarg = $('#main-panel .right-side .panel-obj-info.menu').offset().left + $('#main-panel .right-side .panel-obj-info.menu').outerWidth(true) - 800;
					$('#pages #audioplayer').css( 'left' , leftMarg ).outerHeight( $(window).height() - 50 );
				break;
				case 'fb':
				default:
					var leftMarg = $('#main-panel .right-side').offset().left + $('#main-panel .right-side').outerWidth(true) - 800;
					$('#pages #audioplayer').css( 'left' , leftMarg ).outerHeight( $(window).height() - 45 );
				break;
			}
			
			setTimeout(function(){ musicTab = true; },100);
			if( !$('#pages #audioplayer .content .friends').html() ) fillPlayerFriends();
		}
	}
	
	function closePlayer() {
		$('#pages #audioplayer').outerHeight(0).css('border-width','0px');
		musicTab = false;
	}
	
	function openSecPanel() {
		
		if( secPanel ) return ;
		setTimeout( function(){ secPanel = true; },100);
		
		$('#panels #secondary-panel').css('z-index', '4').css('padding-top',0).css('width','200px');
		$('#panels .panel-obj-info#user').css('padding-top', '0').css('margin-bottom' , '0');
		$('#panels .panel-obj-info .cover-content').css('display', 'block');
		
		setTimeout(function(){
			$('#panels .panel-obj-info .cover-content').css('height', '130px').css('margin-bottom','-60px');
			$('#panels .panel-obj-info .panel-obj-info-user').css('padding', '10px');
			$('#panels .panel-obj-info .panel-obj-info-user .img-content').css('height', '40px').css('width', '40px');
			$('#panels .panel-obj-info .panel-obj-info-user .panel-obj-info-title').attr('class' , 'panel-obj-info-title transformed');
		},5);
		
		if( notifIsOpened ) $('#pages #panel-page').css('left','200px');
		
	}	
	
	function closeSecPanel() {
		
		if( !secPanel ) return ;
		
		secPanel = false;
		$('#panels .panel-obj-info .cover-content').css('height', '30px').css('margin-bottom','70px');
		$('#panels .panel-obj-info .panel-obj-info-user').css('padding', '0 15px');
		$('#panels .panel-obj-info .panel-obj-info-user .img-content').css('height', '30px').css('width', '30px');
		$('#panels .panel-obj-info .panel-obj-info-user .panel-obj-info-title').attr('class' , 'panel-obj-info-title');
		$('#panels #secondary-panel').css('z-index', '1').css('width','60px');
		$('#panels .panel-obj-info#user').css('padding-top', '20px').css('margin-bottom' , '40px');;
			
		setTimeout(function(){
			$('#panels #secondary-panel').css('padding-top','90px');
			$('#panels .panel-obj-info#user').css('padding-top', '20px');
			$('#panels .panel-obj-info .cover-content').css('display', 'none');
		},300);
		
		if( notifIsOpened ) $('#pages #panel-page').css('left','60px');
		
	}
	
	
	function openThirdPanel() {
		
		if( thirdPanel ) return ;
		setTimeout( function(){ thirdPanel = true; },100);
		
		switch( scops.theme ) {
			case 'classic':
			case 'silver':
				$('#panels #panel-third-line').css( 'height' , '40px' );
			break;
			case 'vk':
				var leftMarg = $('#main-panel .right-side .panel-obj-info.menu').offset().left + $('#main-panel .right-side .panel-obj-info.menu').outerWidth(true) - 250;
				$('#panels #secondary-panel').css('left' , leftMarg).css( 'height' , 'auto' ).css('margin-top', '0px').css('opacity' , 1);
			break;
			case 'fb':
			default:
				var leftMarg = $('#main-panel .right-side').offset().left + $('#main-panel .right-side').outerWidth(true) - 250;
				$('#panels #secondary-panel').css('left' , leftMarg).css( 'height' , 'auto' ).css('margin-top', '0px').css('opacity' , 1);
			break;
		}
		
	}	
	
	function closeThirdPanel() {
		
		if( !thirdPanel ) return ;
		thirdPanel = false;
		
		switch( scops.theme ) {
			case 'classic':
			case 'silver':
				$('#panels #panel-third-line').css( 'height' , '0' );
			break;
			case 'fb':
			default:
				$('#panels #secondary-panel').css( 'height' , '0' ).css('margin-top', '15px').css('opacity' , 0);
			break;
		}
		
	}
	
	function startVoiceControl() {
		
		var box = $('#pages #voice-page').addClass('show').removeClass('hide');
		$(voiceControl.box).find('.loading').text( langs.voice_tap );
		
	}
	
	function openGifts( id ) {
		
		openWinPage( 700 , true );
		fillDataTPL('../php_requests/get_content.php' , { content: 'gifts_store' , prof_id: id } , 'fillJSON(\'#pages #win-page #win-content\')');
	
	}
	
	function closeNotif() { return true; }
