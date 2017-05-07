/*
	
	p: Scops Engine
	a: Gor Arakelyan
	c: All rights reserved (c) 2016
	!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	var video , firstTimeVid;

	function startVideo(url) {
		appendHtmlVideo();
		$('#video-player').css('display','block');
		video = document.getElementById('video-stream');
		video.src = url;
		firstTimeVid = true;
		videoFullSc = false;
		
		video.addEventListener('ended',function(){
		
			video.currentTime = 0;
			$('#video-player #video-controls #video-buttons #vid-stop').css('display','none');
			$('#video-player #video-controls #video-buttons #vid-play').css('display','inline-block');
		
		});
		
		video.addEventListener('loadeddata',function(){
			video.currentTime = video.duration * 0.3;
		});
		
		changeVid();
		
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
		if( !firstTimeVid ) {
			if(video.duration) $('#video-buttons #vid-time').text( toVidMinutes(video.currentTime) + ' / ' + toVidMinutes( video.duration));
			else $('#video-buttons #vid-time').text( '0:00 / 0:00 ' );
		
			$('#video-player #vid-loader').width( $('#video-player #video-controls #video-dur').width()*video.currentTime/video.duration );
			$('#video-player #video-controls #vid-pointer').css('margin-left',$('#video-player #video-controls #video-dur').width()*video.currentTime/video.duration - 7.5);
		} else {
			if(video.duration) $('#video-buttons #vid-time').text( ' 0:00 / ' + toVidMinutes( video.duration));
			else $('#video-buttons #vid-time').text( '0:00 / 0:00 ' );
		}
		setTimeout('changeVid()' , 200);
	}
	
	function vidDurDown( event ){
		if( firstTimeVid ) firstTimeVid = false;
		
		var relSeek = event.pageX - $('#video-player #video-controls #video-dur').offset().left;
		$('#video-player #video-controls #vid-pointer').css('margin-left',relSeek - 6).css('opacity',1);
		$('#video-player #video-controls #vid-loader').width(relSeek);
		var time = relSeek * video.duration / $('#video-player #video-controls #video-dur').width();
		
		video.currentTime = time;
		if(video.duration) $('#video-buttons #vid-time').text( toVidMinutes(time) + ' / ' + toVidMinutes( video.duration));
	}
	
	function toVidMinutes(num) {
		num = Math.round(num);
		var sec = num%60;
		sec = (sec<10)?'0'+sec:sec;
		return (sec<10)?((num - sec) / 60) + ':0' + Math.abs(sec):((num - sec) / 60) + ':' + Math.abs(sec);
	}
	
	function appendHtmlVideo() {
		var htmlText = 	'<div id="video-player">\
									<video src="" id="video-stream" onclick="playVideo()"></video>\
									<div id="video-controls">\
										<div id="video-dur" onclick="vidDurDown(event)">\
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