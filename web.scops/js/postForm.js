/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/
	
	var clubPost = 0;
	var audioAttach = "" , videoLocAttach = "", peopleAttach = "";
	var arrayUplTexts;
	var attachMarker;

	function insertUploadForm( elem , type, club ) {
		
		if( $('#user-profile #user-profile-options .user-option-object #user-profile-img').data('url') )
			var img = $('#user-profile #user-profile-options .user-option-object #user-profile-img').data('url');
		else var img = $('#panels .panel-obj-info .panel-obj-info-user .img-content').data('url');
		
		switch( type ) {
			case 'post':
				var html = '	\
				<div id="new-post-box">\
					<div class="area">\
						<div class="box">\
							<div class="post-user">\
								<div class="img" style="background:url(\'../' + img + '\');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>\
							</div>\
							<div class="form material-object">\
								<form action="../php_requests/upload_post.php" enctype="multipart/form-data" method="post" id="new-post-form">\
									<textarea rows="3" name="text" placeholder="' + langs.post_text + '" class="post-text" onpaste="checkLinkEx()" onkeyup="checkLinkEx()"></textarea>\
									<input type="hidden" value="post" name="type">\
									<div class="form-attach" id="form-attach-people">\
										<span class="form-attach-input" onclick="showAttachBox( \'people\' )"></span>\
										<input type="hidden" value="" id="attach-people-input" name="people">\
										<div class="input-empty input-btn-object" onclick="emptyFormAttach(\'people\')"></div>\
									</div>\
									<div class="form-attach" id="form-attach-pic">\
										<span class="form-attach-input"></span>\
										<input id="attach-pic-input" name="photoimg[]" accept=".png, .jpg, .jpeg .jpg" multiple type="file" onchange="setFormAttach(\'pic\')">\
										<div class="input-empty input-btn-object" onclick="emptyFormAttach( \'pic\' )"></div>\
									</div>\
									<div class="form-attach" id="form-attach-link">\
										<span class="form-attach-input"></span>\
										<input type="hidden" class="form-attach-choose input-textarea-object" id="attach-link-input" name="link"></textarea>\
										<div class="input-empty input-btn-object" onclick="emptyFormAttach(\'link\')"></div>\
									</div>\
									<div class="form-attach" id="form-attach-videoLoc">\
										<span class="form-attach-input" onclick="showAttachBox( \'videoLoc\' )"></span>\
										<input type="hidden" value="" id="attach-videoLoc-input" name="videoLoc">\
										<div class="input-empty input-btn-object" onclick="emptyFormAttach(\'videoLoc\')"></div>\
									</div>\
									<div class="form-attach" id="form-attach-audio">\
										<span class="form-attach-input" onclick="showAttachBox( \'audio\' )"></span>\
										<input type="hidden" value="" id="attach-audio-input" name="audio">\
										<div class="input-empty input-btn-object" onclick="emptyFormAttach(\'audio\')"></div>\
									</div>\
									<div class="map-attach">\
										<input type="hidden" value="" name="location" class="attach-map-input">\
										<div id="attach-location-map" class="hidden"></div>\
									</div>\
									<div id="form-buttons">\
										<div class="icon-buttons" id="pic-choose"></div>\
										<div class="icon-buttons" id="loc-choose" onclick="showAttachBox( \'videoLoc\' )"></div>\
										<div class="icon-buttons" id="audio-choose" onclick="showAttachBox( \'audio\' )"></div>\
										<div class="icon-buttons" id="friends-choose" onclick="showAttachBox( \'people\' )"></div>\
										<div class="icon-buttons" id="location-choose" onclick="showAttachMap()"></div>\
										<input type="button" class="input-btn-object" id="insert-btn" name="upload-btn" value="' + langs.post_sb + '" onclick="uploadNewPost()">\
									</div>\
								</form>\
							</div>\
							<div class="cursor">\
								<div class="icon"></div>\
							</div>\
						</div>\
					</div>\
				</div>';
			break;
			case 'photo':
				var html = '\
				<div id="new-post-box">\
					<div class="area">\
						<div class="box">\
							<div class="post-user">\
								<div class="img" style="background:url(\'../' + $('#panels .panel-obj-info .panel-obj-info-user .img-content').data('url') + '\');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>\
							</div>\
							<div class="form material-object">\
								<form action="../php_requests/upload_post.php" enctype="multipart/form-data" method="post" id="new-post-form">\
									<input type="hidden" value="photo" name="type">\
									<div class="form-attach" id="form-attach-pic">\
										<span class="form-attach-input"></span>\
										<input id="attach-pic-input" name="photoimg[]" accept=".png, .jpg, .jpeg .jpg" multiple type="file" onchange="setFormAttach(\'pic\')">\
										<div class="input-empty input-btn-object" onclick="emptyFormAttach( \'pic\' )"></div>\
									</div>\
									<div id="form-buttons">\
										<div class="icon-buttons" id="pic-choose"></div>\
										<input type="button" class="input-btn-object" id="insert-btn" name="upload-btn" value="' + langs.post_upl + '" onclick="uploadNewPost()">\
									</div>\
								</form>\
							</div>\
						</div>\
					</div>\
				</div>';			
			break;
			case 'video': 
				var html = '\
				<div id="new-post-box">\
					<div id="media-upload-form">\
						<input type="text" placeholder="' + langs.post_descr + '" id="upload-media-name" class="input-text-object">\
						<input type="file" accept="video/*" id="upload-media-file" style="display:none;">\
						<input type="button" value="' + langs.post_choose_vid + '" id="media-select-btn" class="input-btn-object" onclick="chooseUplVideo()">\
						<input type="button" value="' + langs.post_upl + '" id="upload-media-btn" class="input-btn-object" onclick="uploadVideo()">\
					</div>\
					<div style="display:none;height:0;overflow:hidden;padding:0;" id="upload-video-info">\
						<video id="take-thumb-vid"></video>\
						<canvas id="video-upl-canvas"></canvas>\
					</div>\
					<div id="media-upload-info">\
						<div id="media-upl-progress">\
							<div id="media-upl-progress-fill"></div>\
						</div>\
					</div>\
					<div id="media-upl-status"></div>\
				</div>';
			break;
			case 'music':
			var html ='\
				<div id="new-post-box">\
					<div id="media-upload-form">\
						<input type="text" placeholder="' + langs.post_aud_name + '" id="upload-media-name" class="input-text-object">\
						<input type="file" accept="audio/*" id="upload-media-file" style="display:none;">\
						<input type="button" value="' + langs.post_choose_aud + '" id="media-select-btn" class="input-btn-object" onclick="chooseUplMusic()">\
						<input type="button" value="' + langs.post_upl + '" id="upload-media-btn" class="input-btn-object" onclick="uploadMusic()">\
					</div>\
					<div id="media-upload-info">\
						<div id="media-upl-progress">\
							<div id="media-upl-progress-fill"></div>\
						</div>\
					</div>\
					<div id="media-upl-status"></div>\
				</div>';
			break;
			case 'club':
				var html ='\
				<div id="new-post-box">\
					<div id="media-upload-form">\
						<input type="text" placeholder="' + langs.post_gr_name + '" id="upload-club-name" class="input-text-object">\
						<input type="text" placeholder="' + langs.post_descr + '" id="upload-club-descr" class="input-text-object">\
						<input type="button" value="' + langs.create + '" id="upload-club-btn" class="input-btn-object" onclick="createClub()">\
					</div>\
				</div>';
			break;
		}
		
		if( $('#new-post-box').length == 0 ) $(html).prependTo(elem);
		
		audioAttach = '' , videoLocAttach = '', peopleAttach = '';
		
		if( club ) {
			clubPost = 1;
			var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
			$('<input name="club" type="hidden" value="' + clubID + '">').appendTo('#new-post-form');
		} else clubPost = 0;
		
		if( $('#new-post-form .post-text').length ) $('#new-post-form .post-text').focus();
		
		$('body').scrollTop( $('#new-post-box').offset().top - 200 );
		
		if( $('#new-post-form #form-attach-pic').length ) {
			$('#new-post-form #form-buttons #pic-choose').click(function(){ $('#new-post-form #attach-pic-input').click(); });
			$('#new-post-form #form-attach-pic > span').click(function(){ $('#new-post-form #attach-pic-input').click(); });
		}
		
		if( type == 'music' ) {
		
			ajaxAudio = new XMLHttpRequest();
			audioFile = $('#media-upload-form #upload-media-file'), audioBtn = $('#media-upload-form #media-select-btn'), audioUpload = $('#media-upload-form #upload-media-btn');
			audioStatus = $('#new-post-box #media-upl-status');
		
			audioFile.change(function(){
				audioBtn.val( '...' + audioFile.val().substring( audioFile.val().length - 10, audioFile.val().length ) );
			});
			
		}
		
		if( type == 'video' ) {
			
			seekedVid = false;
			videoPlay = document.getElementById('take-thumb-vid');
			ajaxVideo = new XMLHttpRequest();
			videoFile = $('#media-upload-form #upload-media-file'), videoBtn = $('#media-upload-form #media-select-btn'), videoUpload = $('#media-upload-form #upload-media-btn');
			videoStatus = $('#new-post-box #media-upl-status');
		
			videoFile.change(function(){
				videoBtn.val( '...' + videoFile.val().substring( videoFile.val().length - 10, videoFile.val().length ) );
			});
			
		}
		
		arrayUplTexts = [ langs.ajax_upl , langs.error_try , langs.ajax_success , langs.ajax_inv_format , langs.ajax_big_size , langs.ajax_select , langs.error_try , langs.ajax_aborted ];
	}

	function showAttachMap() {
		
		var map = $('#new-post-form #attach-location-map');
		
		if( map.hasClass('hidden') ) {
			
			map.removeClass('hidden');
			
			var latlng = { lat: 40.70871100268984, lng: -73.99921815312496 };
			
			if( "geolocation" in navigator ) {
				navigator.geolocation.getCurrentPosition(function( position ) {
					
					if( position ) latlng = { lat: position.coords.latitude , lng: position.coords.longitude };
					attachMarker = initMap( 'attach-location-map' , latlng );
					
				});
			} else attachMarker = initMap( 'attach-location-map' , latlng );
			
		} else {
			
			map.addClass('hidden');
			map.empty();
			
		}
	
	}
	
/************* Attach Boxes ************/
	
	function showAttachBox( type ) {
		openWinPage( 600 , false );	
		
		loader('#pages #win-page #win-content');
		
		$('#pages #win-page .shadow-object').bind('click' , function(){
			$('#pages #win-page .shadow-object').unbind('click');
			closeWinPage( false );
			eval( type + 'Attach = "' + $('#form-attach-' + type + ' #attach-' + type + '-input').val() + '"' );
		});
		
		var props = { 'from': 0 , 'length': loadContentLengths[12] };
		
		if( clubPost ) {
			var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
			$.extend( props , { author: clubPost , prof_id: clubID } );
		}
		
		switch( type ) {
			case 'audio':
				props.content = 'audio_attach';
			break;
			case 'videoLoc':
				props.content = 'video_loc_attach';
			break;
			case 'people':
				props.content = 'people_attach';
			break;
		}
		
		lightBoxContent = props.content;
		
		$('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
		
		fillDataTPL('../php_requests/get_content.php', props , 'fillATTACH( \'#pages #win-page #win-content\' , \''+ type +'\')' );
	}
	
	function fillATTACH( elem , name ) {
		
		$( elem ).html(getParsedHTML);
		
		if( audioAttach != '' && name == 'audio' ) {
			var attach =	audioAttach.split(',');
			$(elem).find('.options .button').text( langs.save_ch );
			if( attach.length ) $(elem).find('.options .count').text( attach.length );
			for( var i = 0 ; i < attach.length ; i++ ) $(elem).find('.item#item-' + attach[i]).attr('class','audio item select');
		}
		if( videoLocAttach != '' && name == 'videoLoc' ) {
			$(elem).find('.item#item-' + videoLocAttach).attr('class','video item select');
			$(elem).find('.options .count').text( langs.post_video + ': #' + videoLocAttach );
		}
		if( peopleAttach != '' && name == 'people' ) {
			var attach =	peopleAttach.split(',');
			$(elem).find('.options .button').text( langs.save_ch );
			if( attach.length ) $(elem).find('.options .count').text( attach.length );
			for( var i = 0 ; i < attach.length ; i++ ) $(elem).find('.item#item-' + attach[i]).attr('class','people item select');
		}
		
	}
	
	function selectAttach( type , num ) {
		var parent = $('#pages #win-page #win-content');
		switch( type ) {
			case 1:
				audioAttach = modifyString( num.toString() , audioAttach.toString() );
				if( parent.find('.audio#item-' + num).hasClass('select') ) {
					parent.find('.count').text( parseInt(parent.find('.count').text()) - 1 );
					parent.find('.audio#item-' + num).attr('class' , 'item audio simple' );
				} else {
					parent.find('.count').text( parseInt(parent.find('.count').text()) + 1 );
					parent.find('.audio#item-' + num).attr('class' , 'item audio select' );
				}
			break;
			case 2:
				videoLocAttach = ( videoLocAttach == num )?"":num;
				
				parent.find('.video.item').not('.video#item-' + num).attr('class' , 'item video simple' );
				if( parent.find('.video#item-' + num).hasClass('simple') ) parent.find('.video#item-' + num).attr('class' , 'item video select' );
				else parent.find('.video#item-' + num).attr('class' , 'item video simple' );
				
				parent.find('.count').text( ( videoLocAttach != '' )?( langs.post_video + ': #' + videoLocAttach):'-' );
			break;
			case 3:
				peopleAttach = modifyString( num.toString() , peopleAttach.toString() );
				if( parent.find('.people#item-' + num).hasClass('select') ) {
					parent.find('.count').text( parseInt(parent.find('.count').text()) - 1 );
					parent.find('.people#item-' + num).attr('class' , 'item people simple' );
				} else {
					parent.find('.count').text( parseInt(parent.find('.count').text()) + 1 );
					parent.find('.people#item-' + num).attr('class' , 'item people select' );
				}
			break;
		}

	}

/************* Create Group ****************/

	function createClub() {
		var name = $('#media-upload-form #upload-club-name').val(), descr = $('#media-upload-form #upload-club-descr').val();
		$.post('../php_requests/request.php',{ type: 10, name:name , descr: descr },function(){
			setNewContent( false , clubPost ? 'club' : 'user' );
		});
	}

/************* Audio Post ****************/
	
	var  ajaxAudio , audioFile , audioBtn, audioStatus, maxAudioSize = 64;
	
	function chooseUplMusic() { $('#media-upload-form #upload-media-file').click(); }
	
	function uploadMusic() {
		
		if( document.getElementById('upload-media-file').files[0] != undefined ) {
			$('#media-upload-info').css('display','block');
			if( document.getElementById('upload-media-file').files[0].size <=  1024*1024*maxAudioSize ) {
				
				audioUpload.attr('onclick','');
				startUploadingMusic();
				
			} else audioStatus.text(arrayUplTexts[4]);
		} else audioStatus.text(arrayUplTexts[5]);
		
	}
	
	function startUploadingMusic() {
		
		var formdata = new FormData();
		
		formdata.append("audio", document.getElementById('upload-media-file').files[0]);
		formdata.append("descr", $('#upload-media-name').val());
		formdata.append('type','audio');
		
		if( clubPost ) {
			var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
			formdata.append('club', clubID);
		}
		
		ajaxAudio.upload.addEventListener("progress", progressMusHandler, false);
		ajaxAudio.addEventListener("load", completeMusHandler, false);
		ajaxAudio.addEventListener("error", errorMusHandler, false);	
		ajaxAudio.addEventListener("abort", abortMusHandler, false);
		ajaxAudio.open("POST", "../php_requests/upload_post.php");
		ajaxAudio.send(formdata);
		
	}
	
	function completeMusHandler( event ) {
		audioUpload.attr('onclick','uploadMusic()');
		if( event.target.responseText == 1 ) {
			audioStatus.text( arrayUplTexts[2] );
			setTimeout(function(){ setNewContent( false , clubPost ? 'club' : 'user' ); } , 800 );
		} else {
			$('#media-upl-progress-fill').width( 0 );
			audioStatus.text(arrayUplTexts[6]);
		}
	}
	
	function abortMusHandler( event ) {
		audioStatus.text(arrayUplTexts[7]);
		$('#media-upl-progress-fill').width( 0 );
		audioUpload.attr('onclick','uploadMusic()');
	}
	
	function errorMusHandler( event ) {
		audioStatus.text(arrayUplTexts[6]);
		$('#media-upl-progress-fill').width( 0 );
		audioUpload.attr('onclick','uploadMusic()');
	}
	
	function progressMusHandler(event){
		if( audioStatus.text() != arrayUplTexts[0] ) audioStatus.text(arrayUplTexts[0]);
		$('#media-upl-progress-fill').width( $('#media-upl-progress').width()*event.loaded/event.total );
	}
	
	
/************* Video Post ****************/

	var seekedVid , videoPlay , ajaxVideo , videoFile , videoBtn, videoChoose, videoStatus, maxVideoSize = 512;

	function chooseUplVideo() { $('#media-upload-form #upload-media-file').click(); }
	
	function uploadVideo() {
		if( document.getElementById('upload-media-file').files[0] != undefined ) {
			seekedVid = false;
			$('#media-upload-info').css('display','block');
			if( document.getElementById('upload-media-file').files[0].size <=  1024*1024*maxVideoSize ) {
				videoPlay.src = URL.createObjectURL(document.getElementById('upload-media-file').files[0]);
				videoUpload.attr('onclick','');
				videoPlay.addEventListener('canplaythrough',startUploading) ;
			} else videoStatus.text(arrayUplTexts[4]);
		} else videoStatus.text(arrayUplTexts[5]);
	}
	
	function startUploading() {
		if( !seekedVid ) {
			videoPlay.currentTime = videoPlay.duration * 0.3;
			seekedVid = true;
		} else {
			$('#upload-video-info').css('display','block');
			
			var canvas = document.getElementById('video-upl-canvas');
			
			var num = 500;
			if(videoPlay.clientWidth > num || videoPlay.clientHeight > num) {
				if(videoPlay.clientWidth > videoPlay.clientHeight) {
					var nWidth = num;
					var nHeight = num*videoPlay.clientHeight/videoPlay.clientWidth;
				} else {
					var nHeight = num;
					var nWidth = num*videoPlay.clientWidth/videoPlay.clientHeight;
				}
			} else {
				nHeight = videoPlay.clientHeight;
				nWidth = videoPlay.clientWidth;
			}
			
			canvas.width = nWidth ;
			canvas.height = nHeight ;
				
			canvas.getContext('2d').drawImage(videoPlay, 0, 0, nWidth, nHeight);
				
			var url = canvas.toDataURL('image/jpeg');
			
			var formdata = new FormData();

			formdata.append("video", document.getElementById('upload-media-file').files[0]);
			formdata.append("descr", $('#upload-media-name').val());
			formdata.append('image',url);
			formdata.append('length',videoPlay.duration);
			formdata.append('type','video');
			
			if( clubPost ) {
				var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
				formdata.append('club', clubID);
			}
			
			ajaxVideo.upload.addEventListener("progress", progressVidHandler, false);
			ajaxVideo.addEventListener("load", completeVidHandler, false);
			ajaxVideo.addEventListener("error", errorVidHandler, false);	
			ajaxVideo.addEventListener("abort", abortVidHandler, false);
			ajaxVideo.open("POST", "../php_requests/upload_post.php");
			ajaxVideo.send(formdata);
		}
	}
	
	function completeVidHandler( event ) {
		videoUpload.attr('onclick','uploadVideo()');
		if( event.target.responseText == 1 ) {
			videoStatus.text(arrayUplTexts[2]);
			setTimeout(function(){ setNewContent( false , clubPost ? 'club' : 'user' ); } , 800 );
		} else {
			$('#media-upl-progress-fill').width( 0 );
			videoStatus.text(arrayUplTexts[6]);
		}
	}
	
	function abortVidHandler( event ) {
		videoStatus.text(arrayUplTexts[7]);
		$('#media-upl-progress-fill').width( 0 );
		videoUpload.attr('onclick','uploadVideo()');
	}
	
	function errorVidHandler( event ) {
		videoStatus.text(arrayUplTexts[6]);
		$('#media-upl-progress-fill').width( 0 );
		videoUpload.attr('onclick','uploadVideo()');
	}
	
	function progressVidHandler(event){
		if( videoStatus.text() != arrayUplTexts[0] ) videoStatus.text(arrayUplTexts[0]);
		$('#media-upl-progress-fill').width( $('#media-upl-progress').width()*event.loaded/event.total );
	}
	
/************** Whole Post **************/

	function uploadNewPost() {
		
		$('#new-post-form .input-btn-object#insert-btn').attr('onclick','');
		var alert = addAlert( 0 , true );
		
		var map = $('#new-post-form #attach-location-map');
		if( !map.hasClass('hidden') ) {
			
			var latlng = { lat: attachMarker.getPosition().lat(), lng: attachMarker.getPosition().lng() };
			$('#new-post-form .attach-map-input').val( JSON.stringify( latlng ) );
			
		}
		
		$('#new-post-form').ajaxForm({
			success: function(){
				
				removeAlert( alert );
				$('#user-profile-controls').length ? setNewContent( false , clubPost ? 'club' : 'user' ) : ajaxQuery('news') ;
				
			}
		}).submit();
		
	}
	
	function displayMediaAttach( name ) {
		var block = $('#form-attach-' + name), input = $('#form-attach-' + name + ' #attach-' + name + '-input');
		if( eval( name+'Attach' ) != '' ) displayFormAttch( block, input , name );
		else emptyFormAttach( name );
		
		$('#pages #win-page .shadow-object').unbind('click');
		closeWinPage( false );
	}

	function setFormAttach( name ) {
		var block = $('#form-attach-' + name), input = $('#form-attach-' + name + ' #attach-' + name + '-input');
		if( input.val().replace(/\s+/g, '').length > 0) displayFormAttch( block, input );
		else hideFormAttch( block, input );
	}

	function displayFormAttch( block, input, name ) {
		if( block.attr('id') == 'form-attach-pic' ) {
			var length = document.getElementById('attach-pic-input').files.length
			block.find('span').text( langs.post_images + ': ' + length );
		} else if( block.attr('id') == 'form-attach-audio' ) {
			block.find('span').text( langs.post_audio + ': ' + eval( name + 'Attach' ).split(',').length );
			input.val( eval( name + 'Attach' ) );
		} else if( block.attr('id') == 'form-attach-videoLoc' ) {
			block.find('span').text( langs.post_video + ': #' + videoLocAttach );
			input.val( eval( name + 'Attach' ) );
		} else if( block.attr('id') == 'form-attach-people' ) {
			block.find('span').text( langs.post_metetions + ': ' + eval( name + 'Attach' ).split(',').length  );
			input.val( eval( name + 'Attach' ) );
		} else block.find('span').text( langs.post_link + ': ' + input.val().substr( 0, 30 ) + ( input.val().length > 30 ? '...' : '' ) );
		block.css('height','40px');
		block.find('.input-empty').css('display','block');
		block.find('span').css('display','block');
		input.css('display','none');
	}

	function hideFormAttch( block, input ) {
		block.find('span').css('display','none');
		block.css('height','0');
		input.css('display','none');
		block.find('.input-empty').css('display','none');
	}

	function emptyFormAttach( name ) {
		var block = $('#form-attach-' + name), input = $('#form-attach-' + name + ' #attach-' + name + '-input');
		block.find('span').text('').css('display','none');
		block.css('height','0');
		input.val('').css('display','none');
		block.find('.input-empty').css('display','none');
		if( eval( name + 'Attach' ) ) eval( name + 'Attach = ""' );
	}
	
	function checkLinkEx( bool ) {
		var input = $('#new-post-box .form .post-text').val();
		var pattern = new RegExp( "^(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,8}(\/\S*)?" );
		
		var text = input.split(/[\s\n]/);

		for( var i = text.length - 1 ; i >= 0 ; i-- )
			if( pattern.test(text[i]) ) {
				$('#form-attach-link #attach-link-input').val( text[i] );
				setFormAttach('link');
				break;
			}

	}

	function closeAttach( type ) {
		
		eval( type + 'Attach = "' + $('#form-attach-' + type + ' #attach-' + type + '-input').val() + '"' );
		$('#pages #win-page .shadow-object').unbind('click');
		closeWinPage( false );
		
	}