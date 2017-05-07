/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	var video ,videoSeek, stopChanging, vidPlaying, mouseInVid, firstTimeVid;

	function startVideo(url) {
		appendHtmlVideo();
		$('#video-player').css('display','block');
		video = document.getElementById('video-stream');
		video.src = url;
		firstTimeVid = true;
		videoSeek = false;
		stopChanging = false;
		vidPlaying = false;
		mouseInVid = false;
		videoFullSc = false;
		
		video.addEventListener('ended',function(){
		if( !videoSeek ) {
			video.currentTime = 0;
			$('#video-player #video-controls #video-buttons #vid-stop').css('display','none');
			$('#video-player #video-controls #video-buttons #vid-play').css('display','inline-block');
		}
		});
		
		video.addEventListener('loadeddata',function(){
			video.currentTime = video.duration * 0.3;
		});
		
		changeVid();
		
		$('#video-player #video-controls #vid-sound-area #vid-sound-pointer').draggable({
			containment:"parent",
			axis: 'x',
			cursor: 'pointer',
			drag: function(){ volVidFix(-1); }
		});
		
		if( getCookie('vidVol') == '' ) setCookie('vidVol',0.5, { expires: 315360000, path:'/' });
		volVidFix( 0 );
		
	}
	
	function playVideo() {
		if( !video.paused ) {
			video.pause();
			$('#video-player #video-controls #video-buttons #vid-stop').css('display','none');
			$('#video-player #video-controls #video-buttons #vid-play').css('display','inline-block');
		} else {
			if( firstTimeVid ) {
				video.currentTime = 0;
				firstTimeVid = false;
			}
			video.play();
			$('#video-player #video-controls #video-buttons #vid-stop').css('display','inline-block');
			$('#video-player #video-controls #video-buttons #vid-play').css('display','none');
		}
	}
	
 function toggleFullScreen() {
	 var elem = document.getElementById('video-player');
    if ( !videoFullSc ) {
			videoFullSc = true;
      if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
      } else {
				elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
			
			if( screen.width / video.getBoundingClientRect().width > screen.height / video.getBoundingClientRect().height ) $('#video-stream').css('width','').css('height',screen.height);
				else $('#video-stream').css('height','').css('width',screen.width);
    } else {
			videoFullSc = false;
			$('#video-stream').css('width','100%').css('height','');
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }
	
	function changeVid() {
		if( !stopChanging ) {
			if( !firstTimeVid ) {
				if(video.duration) $('#video-buttons #vid-time').text( toVidMinutes(video.currentTime) + ' / ' + toVidMinutes( video.duration));
				else $('#video-buttons #vid-time').text( '0:00 / 0:00 ' );
			
				$('#video-player #vid-loader').width( $('#video-player #video-controls #video-dur').width()*video.currentTime/video.duration );
				$('#video-player #video-controls #vid-pointer').css('margin-left',$('#video-player #video-controls #video-dur').width()*video.currentTime/video.duration - 7.5);
			} else {
				if(video.duration) $('#video-buttons #vid-time').text( ' 0:00 / ' + toVidMinutes( video.duration));
				else $('#video-buttons #vid-time').text( '0:00 / 0:00 ' );
			}
		}
		setTimeout(changeVid,200);
	}
	
	function vidDurOver(){ 
		mouseInVid = true;
		$('#video-player #video-controls #vid-pointer').css('opacity',1); 
	}
	function vidDurOut(){
		mouseInVid = false;
		if( videoSeek == false ) $('#video-player #video-controls #vid-pointer').css('opacity',0); 
	}
	
	function vidDurDown( event ){
		if( firstTimeVid ) firstTimeVid = false;
		videoSeek = true;
		stopChanging = true;
		vidPlaying = !video.paused;
		$(document).disableSelection();
		$('html').css('cursor','pointer');
		var relSeek = event.pageX - $('#video-player #video-controls #video-dur').offset().left;
		$('#video-player #video-controls #vid-pointer').css('margin-left',relSeek - 6).css('opacity',1);
		$('#video-player #video-controls #vid-loader').width(relSeek);
		var time = relSeek * video.duration / $('#video-player #video-controls #video-dur').width();
		if(video.duration) $('#video-buttons #vid-time').text( toVidMinutes(time) + ' / ' + toVidMinutes( video.duration));
	}
	
	$(document).mousemove(function( event ){
		if( videoSeek == true ) {
			var relSeek = event.pageX - $('#video-player #video-controls #video-dur').offset().left;
			if( relSeek < 0 ) relSeek = 0;
			if( relSeek > $('#video-player #video-controls #video-dur').width() ) relSeek = $('#video-player #video-controls #video-dur').width();
			$('#video-player #video-controls #vid-loader').width(relSeek);
			$('#video-player #video-controls #vid-pointer').css('margin-left',relSeek - 6);
			$('#video-player #video-controls #vid-loader').width(relSeek);
			var time = relSeek * video.duration / $('#video-player #video-controls #video-dur').width();
			if(video.duration) $('#video-buttons #vid-time').text( toVidMinutes(time) + ' / ' + toVidMinutes( video.duration));
		}
	});
	
	$(document).mouseup(function( event ){
		if( videoSeek == true ) {
			videoSeek = false;
			stopChanging = false;
			if( mouseInVid == false ) $('#video-player #video-controls #vid-pointer').css('opacity',0);
			video.currentTime = ( event.pageX - $('#video-player #video-controls #video-dur').offset().left ) * video.duration / $('#video-player #video-controls #video-dur').width();
			$('html').css('cursor','');
			$(document).enableSelection();
			if( vidPlaying == true ) video.play();
		}
	});
	
	function toVidMinutes(num) {
		num = Math.round(num);
		var sec = num%60;
		sec = (sec<10)?'0'+sec:sec;
		return (sec<10)?((num - sec) / 60) + ':0' + Math.abs(sec):((num - sec) / 60) + ':' + Math.abs(sec);
	}
	
	function volVidFix( vidVol ) {
		var placement = Math.abs( $('#video-player #video-controls #vid-sound-area #vid-sound-loader').position().left - $('#video-player #video-controls #vid-sound-area #vid-sound-pointer').position().left ),
				placeWidth = $('#video-player #video-controls #vid-sound-area').width();
		
		if( vidVol == -1 ) {
			$('#video-player #video-controls #vid-sound-area #vid-sound-loader').width( placement + 5 );
			video.volume = placement / placeWidth;
			setCookie('vidVol',placement / placeWidth, { expires: 315360000, path:'/' });
		} else {
			$('#video-player #video-controls #vid-sound-area #vid-sound-loader').width( (getCookie('vidVol') * placeWidth) + 5 );
			$('#video-player #video-controls #vid-sound-area #vid-sound-pointer').css('left', getCookie('vidVol') * placeWidth + $('#video-player #video-controls #vid-sound-area #vid-sound-loader').position().left );
			video.volume = getCookie('vidVol');
		}
		var soundIcon = $('#video-player #video-buttons #vid-sound');
		if( getCookie('vidVol') > 0.7 ) soundIcon.text('');
		else 
			if( getCookie('vidVol') > 0.3 ) soundIcon.text('');
			else soundIcon.text('');
		
	}
	
	function appendHtmlVideo() {
		var htmlText = 	'<div id="video-player">\
									<video src="" id="video-stream" onclick="playVideo()"></video>\
									<div id="video-controls">\
										<div id="video-dur" onmouseover="vidDurOver()" onmouseout="vidDurOut()" onmousedown="vidDurDown(event)">\
											<div id="vid-loader-box">\
												<div id="vid-loader-place"></div>\
												<div id="vid-loader"></div>\
											</div>\
											<div id="vid-pointer"></div>\
										</div>\
										<div id="video-buttons">\
											<div id="video-left-buttons">\
												<div class="vid-button vid-icon vid-point" id="vid-play" onclick="playVideo()"></div>\
												<div class="vid-button vid-icon vid-point" id="vid-stop" onclick="playVideo()"></div>\
												<div class="vid-button vid-icon" id="vid-sound"></div>\
												<div class="vid-button" id="vid-sound-area">\
													<div id="vid-sound-loader-area"></div>\
													<div id="vid-sound-loader"></div>\
													<div id="vid-sound-pointer"></div>\
												</div>\
												<div class="vid-button" id="vid-time"></div>\
											</div>\
											<div id="video-right-buttons">\
												<div class="vid-button vid-icon vid-point" id="vid-res" onclick="toggleFullScreen()"></div>\
											</div>\
										</div>\
									</div>\
								</div>';
		$('.video-container').eq(0).html(htmlText);
	}