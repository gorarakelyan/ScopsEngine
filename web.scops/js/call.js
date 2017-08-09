/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var webrtc = false;
  var videoCallTab = false;
  
  checkVideoTab();

  function checkVideoTab() {
    
    var lastUPD = localStorage.getItem('videoCallUPD');
    
    if( lastUPD ) {
      
      if( Date.now() - lastUPD >= 350 ) setVideoCallTab();
      else {
        
        if( localStorage.getItem('videoCallACT') == 'false' ) {
          
          if( tabFocuse ) setVideoCallTab();
          else videoCallTab = false;
          
        } else {
          
          if( $('.video-call').css('display') == 'block' ) setVideoCallTab();
          else videoCallTab = false;
          
        }
        
      }
      
    } else setVideoCallTab();
    
    setTimeout( checkVideoTab , 150 );
    
  }
  
  function setVideoCallTab(num) {
    
    if( Date.now() - localStorage.getItem('videoCallUPD') >= 150 ) {
      localStorage.setItem('videoCallUPD' , Date.now() );
      videoCallTab = true;
    }
    
  }
  
  function callAnswerPend() {
    
    videoCall.answer_accepted();
    if( localStorage.getItem('videoCallACT') == 'false' ) setTimeout( callAnswerPend , 25 );
    
  }
  
  var videoCall = {
    current : 'none' ,
    callingHash : '',
    videoDisplay : function() {
      
      $('.video-call').css('display','block');
      $('#callFriendVideo .video-loader').css('display' , 'block');
      $('.video-call-action').css('display','none');
      $('.video-calling').css('display','none');
      localStorage.setItem('videoCallACT' , 'true');
      
    },
    actionDisplay : function( data ) {
      
      var elem = $('.video-call-action');
      elem.css('display','block');
      elem.find('.name').text( data.name );
      elem.find('.img').css('background-image', 'url(\'../' + data.photo + '\')');
      
    },
    callingDisplay : function() {
      
      $('.video-calling').css('display','block');
      
    },
    hide : function() {
      
      $('.video-call').css('display','none');
      $('.video-call-action').css('display','none');
      $('.video-calling').css('display','none');
      $('#callFriendVideo video').remove();
      
      localStorage.setItem('videoCallACT' , 'false');
      if( webrtc ) webrtc.pause();
      
    },
    listen : function() {
      
      $.post('../php_requests/call.php',{ action: 'listen' , current : videoCall.current }, function(data){
        
        if( data != 'none' ) {
          data = JSON.parse(data);
          if( videoCall.current != data.act ) {
            
            videoCall.current = data.act;
            videoCall.callingHash = data.hash;
            
            switch( data.act ) {
              case 'mecalling':
              
                videoCall.callingDisplay();
              
              break;
              case 'calling':
              
                videoCall.actionDisplay(data);
              
              break;
              case 'answer':
              
                callAnswerPend();
              
              break;
            }
            
          } 
        } else {
          if( videoCall.current != 'none' ) {
            videoCall.current = 'none';
            videoCall.hide();
          }
        }
        
        videoCall.listen();
      });
      
    },
    answer : function() {
      
      $.post('../php_requests/call.php',{ action: 'answer' , hash: videoCall.callingHash });
      
    },
    answer_accepted: function() {
      
      if( videoCallTab ) {
        
        videoCall.videoDisplay();
        
        webrtc = new SimpleWebRTC({
          localVideoEl: 'callMyVideo',
          remoteVideosEl: 'callFriendVideo',
          autoRequestMedia: true
        });
        
        webrtc.on('readyToCall',function () {
          webrtc.joinRoom( videoCall.callingHash );
        });
        
      } else {
        
        $('.video-call-action').css('display','none');
        $('.video-calling').css('display','none');
        
      }
      
    },
    makeCall : function( id ) {
      
      $.post('../php_requests/call.php',{ action: 'call' , id:id }, function(data){
        
        switch( data ) {
          case 'ok':
            
            videoCall.callingDisplay();
            
          break;
          case 'error':
            addAlert( langs.error_try );
          break;
        }
        
      });
    },
    off : function() {
      
      $.post('../php_requests/call.php',{ action: 'off' }, function(data){
        
        videoCall.hide();
        
      });
      
    },
    mute : function() {
      
      elem = $('.video-call .actions .sound');
      
      if( elem.hasClass('mute') ) {
        elem.removeClass('mute').text('');
        webrtc.unmute();
      } else {
        elem.addClass('mute').text('');
        webrtc.mute();
      }
      
    },
    screen : function() {
      
      elem = $('.video-call .actions .screen');
      
      if( elem.hasClass('view') ) {
        elem.removeClass('view').text('');
        webrtc.resumeVideo();
      } else {
        elem.addClass('view').text('');
        webrtc.pauseVideo();
      }
      
    }
  };
  
  setTimeout( function(){ videoCall.listen(); } , 100 );
  

