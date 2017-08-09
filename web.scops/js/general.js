/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  var scops = {
    version: '1.0.0',
    theme: _theme_
  };
  
  var notifSounds = [ '../common/audio/msg.mp3' , '../common/audio/ntf.mp3' ];
  var loadContentLengths = [ 15 , 20 , 24 , 24 , 10 , 24 , 15 , 25 , 20 , 20 , 15 , 20 , 25 ];
  
  var currentLink = getCookie('link');
  
  var scrollBarWidth = 0;
  var notifIsOpened = false, endOfNotif = false, canStartNotif = false, musicTab = false, videoFullSc;
  var audio = new Audio() , audioElem , currentAudio , eventAudio;
  var ajaxScrolling = true;
  var secPanel = false , thirdPanel = false;
  var audioSeeking = false;
  var tabFocuse = true;
  var standartWinWidth = 800;
  var winPage = false;
  var firstUpdate = true;
  var receivedMSG = false , titleCount = 0;
  var popupBox = false;
  var searchTab;
  var eventInvitedList = '';
  var befPostURL = window.location.pathname;  

  var titleWorkingModifs = {};
  var lightBoxContent , lightBoxEnd = false , canStartLightBox = true;
  
  /* 
    0 - news
    1 - photos ( 10n tesqov )
    2 - friends
    3 - clubs
    4 - videos
    5 - followers
    6 - comments
    7 - sms
    8 - music
    9 - notif
    10 - games
    11 - dialogues
    12 - light box
  */
  
  setTimeout( function(){ scrollBarWidth = window.innerWidth - $(window).width(); } , 100);
  
  var popUpProps = new Array();
  
  setTimeout( function(){ firstUpdate = false; }, 5000 );
  
  setInterval(function(){
    if( currentLink != getCookie('link') ) $('#main-panel #exit').click();
    if( musicTab ) $('#pages #audioplayer .body').innerHeight( $('#pages #audioplayer').height() - $('#pages #audioplayer .header').outerHeight(true) );    
  },500);
  
  $(window).on('blur' , function(){ tabFocuse = false; });
  
  $(window).on('focus' , function(){ 
    tabFocuse = true; 
    if( $('.chat-window').length ) {
      setTimeout(function(){
        if( $('.chat-window .chat-controls .chat-form:focus').length ) 
          setChatFocus( $('.chat-window .chat-controls .chat-form:focus').closest('.chat-window').data('id') );
      },250);
    }
  });
  
  $(window).on('unload' , function(){ if( $('.video-call').css('display') == 'block' ) localStorage.setItem('videoCallACT' , 'false'); });
  
  $(document).on('DOMNodeInserted',function( event ){
    if( currentAudio ) {
      audioElem = $( '.mus-' + currentAudio );
      
      $('.audio-object .seek').data('check' , '1');
      audioElem.find('.seek').data('check' , '0');
      
      audioElem.find('.options').css('height','35px');
      audioElem.find('.loop:eq(' + audioLoop + ')').attr('class','loop selected');
      if( !audio.paused ) {
        audioElem.find('.pause').css('display','block');
        audioElem.find('.play').css('display','none');
      } else {
        audioElem.find('.pause').css('display','none');
        audioElem.find('.play').css('display','block');
      }
    }
    if( $('a.prevent-link.not-prevented').length ) {
      $('a.prevent-link.not-prevented').attr( 'class' , 'prevent-link prevented' );
      $('a.prevent-link.prevented').click(function( e ){
        e.preventDefault();
      });
    }
    if( $('#callFriendVideo video').length ) {
      $('#callFriendVideo .video-loader').css('display' , 'none');
    }
    if( $('#dating-page .user-view-block .info ').length )
      $('#dating-page .user-view-block .info ').outerWidth( $('#dating-page .user-view-block .table-imit').outerWidth() );
  });
  
  $(document).bind("scroll", function(){
    var scroll = $(document).scrollTop();
    var height = $(document).height();
    var winHeight = $(window).height();
    var point = 300;
    
    var path = window.location.pathname.split('/');
    path.splice(0,1);
    
    if( ( path[0].substring(0,2) == 'id' || path[0].substring(0,4) == 'club' ) && $( document ).scrollTop() < 400 ) {
      
      switch( scops.theme ) {
        case 'vk':
          var bgParallax = ( $( document ).scrollTop() - 20 ) * 0.5;
        break;
        case 'classic':
        case 'silver':
        case 'fb':
        default:
          var bgParallax = $( document ).scrollTop() * 0.5;
        break;
      }
      
      $('#user-profile #user-cover').css('background-position',' 0 ' + bgParallax + 'px');
      $('#user-profile .bg-blur').css('background-position',' 0 ' + bgParallax + 'px');
    }
    
    if( path[0].substring(0,4) == 'chat' ) {
      $('.full-dialogue .content').css('margin-top', $( document ).scrollTop() + 'px');
      resizeFullDial( 0 );
      path[0] = 'chat';
    }
    
    if( path[0].substring(0,2) == 'id' ) {
      path[2] = path[0].substring(2,path[0].length);
       path[0] = 'user' + path[1];
      var auth = 0;
    }
    if( path[0].substring(0,4) == 'club' ) {
      path[2] = path[0].substring(4,path[0].length);
      path[0] = 'user' + path[1];
      var auth = 1;
    }
    if( height - scroll - winHeight < point ) {
      if( ajaxScrolling && !endOfScroll && ( canStartScroll || path[0] == 'news' || path[0] == 'userwall' || ( path[0] == 'search' && searchTab == 4 ) ) ) {
        ajaxScrolling = false;
        switch( path[0] ) {
          case 'chat':
            if( $('.main-content .dialogues .dial').length ) {
              var lastID = $('.main-content .dialogues .dial:last').data('id');
              fillDataTPL('../php_requests/get_content.php',{ content: 'notif_msg' , full: true , length: loadContentLengths[11] , last_id: lastID },'fillJSON(\'.main-content .dialogues .users .view\' , true , true , true , false , false , true  )');
            }
          break;
          case 'news':
            if( wallAjax ) {
              if( $('.news-object:last').length ) {
                feedOptions.last_id = $('.news-object:last').data('id');
                feedOptions.prof_id = getCookie('id');
                generateFeed('../php_requests/get_content.php', feedOptions , $('.container #news-page .content') , true );
              }
            }
          break;
          case 'userwall':
            if( wallAjax ) {
              if( $('.news-object:last').length ) {
                lastID = $('.news-object:last').data('id');
                generateFeed('../php_requests/get_content.php',{ content: 'wall', last_id: lastID, length: loadContentLengths[0], author: auth , 'prof_id': path[2] }, $('#user-content #content-show') );
              }
            }
          break;
          case 'userphotos':
            
            if( !$('#user-content .line-thumbs-box').length ) {
              var fromID = $('#user-content .photo-block').length * 5 ;
              fillDataTPL('../php_requests/get_content.php',{'content': 'photos', 'from': fromID + 1, 'length': loadContentLengths[1], 'author': auth, 'prof_id': path[2] },'fillJSON(\'#user-content #content-show\' , true, true, true )');
            }
            
          break;
          case 'userfriends':
          
            var fromID = $('#user-content .friend-object').length ;
            fillDataTPL('../php_requests/get_content.php',{'content': 'friends', 'from': fromID, 'length': loadContentLengths[2], 'prof_id': path[2] },'fillJSON(\'#user-content #content-show\' , true , true , true )');
            
          break;
          case 'userfollowers':
            
            var fromID = $('#user-content .friend-object').length ;
            fillDataTPL('../php_requests/get_content.php',{'content': 'followers', 'from': fromID, 'length': loadContentLengths[2], 'prof_id': path[2] },'fillJSON(\'#user-content #content-show\' , true , true , true )');
            
          break;
          case 'userclubs':
            
            var fromID = $('#user-content .club-object').length ;
            fillDataTPL('../php_requests/get_content.php',{'content': 'clubs', 'from': fromID, 'length': loadContentLengths[3], 'prof_id': path[2] },'fillJSON(\'#user-content #content-show\' , true , true , true )');
            
          break;
          case 'uservideos':
            var lastID = $('.video-object:last').data('id');
            if( lastID ) {
              fillDataTPL('../php_requests/get_content.php',{'content': 'videos', 'last_id': lastID, 'length': loadContentLengths[4], 'author': auth, 'prof_id': path[2] },'fillJSON(\'#user-content #content-show\' , true , true, true  )');
            }
          break;
          case 'usermusic':
            
            var fromID = $('#user-content .audio-object').length ;
            fillDataTPL('../php_requests/get_content.php',{'content': 'music', 'from': fromID, 'length': loadContentLengths[8], 'author': auth, 'prof_id': path[2] },'fillMUSIC(\'#user-content #content-show .audiolist\' , true , true )');
            
          break;
          case 'games':
            
            if( typeof( gamesTab ) != 'undefined' && $('#games-page .all-games .game-object').length ) 
              fillDataTPL('../php_requests/get_content.php',{ content: 'games', act: 1 , genre: gamesTab , length: loadContentLengths[10] , last_id: $('#games-page .all-games .game-object:last').data('id') },'fillJSON(\'.container #games-page .all-games\' , true , true , true )');
          
          break;
          case 'search':
            var searchForm = $('#search-area #search-form');
            switch( searchTab ) {
              case 4:
              if( wallAjax ) {
                if( $('.news-object:last').length ) {
                  lastID = $('.news-object:last').data('id');
                  generateFeed('../php_requests/search.php',{ name: searchForm.find('#name').val(), type: 'tag', length: loadContentLengths[0],  last_id: lastID } , $('#search-result') );
                }
              }
              break;
              case 3:
                if( $('#search-result .audio-object:last').length ) {
                  lastID = $('#search-result .audio-object:last').data('id');
                  fillDataTPL('../php_requests/search.php',{ type: 'audios', name: searchForm.find('#name').val(), 'length': loadContentLengths[8], last_id: lastID },'fillMUSIC(\'#search-result .audiolist\' , true , true )');
                }
              break;
              case 2:
                if( $('#search-result .video-object:last').length ) {
                  var lastID = $('#search-result .video-object:last').data('video');
                  fillDataTPL('../php_requests/search.php',{ type: 'videos', name: searchForm.find('#name').val() , last_id: lastID, length: loadContentLengths[4] },'fillJSON(\'#search-result\' , true , true, true )');
                }
              break;
              case 1:
                if( $('#search-result .club-object:last').length ) {
                  var lastID = $('#search-result .club-object:last').data('id');
                  fillDataTPL('../php_requests/search.php',{ type: 'clubs', name: searchForm.find('#name').val() , descr : searchForm.find('#descr').val() , last_id: lastID, length: loadContentLengths[3] },'fillJSON(\'#search-result\' , true , true, true )');
                }
              break;
              case 0:
                if( $('#search-result .friend-object:last').length ) {

                  var lastID = $('#search-result .friend-object:last').data('id');
                  var searchSCProps = {
                    type: 'people', 
                    name: searchForm.find('#name').val() , 
                    country: searchForm.find('#country').val() , 
                    city: searchForm.find('#city').val() , 
                    gender: searchForm.find('#gender').val() , 
                    'year-from': searchForm.find('#from').val() , 
                    'year-to': searchForm.find('#to').val() , 
                    last_id: lastID,
                    length: loadContentLengths[2] 
                  };
                  
                  var onlSCProp = {} , opSCProp = {};
                  
                  if ( searchForm.find('#online:checked').length > 0 ) var onlSCProp = { online: 0 }; 
                  if ( searchForm.find('#opened:checked').length > 0 ) var opSCProp = { 'opened-profile': 0 };
                  
                  searchSCProps = Object.assign( onlSCProp , opSCProp , searchSCProps );
                  
                  fillDataTPL('../php_requests/search.php', searchSCProps ,'fillJSON(\'#search-result\' , true , true, true )');
                }
              break;
            }
            
          break;
        }
      }
    }
  });

  $(window).bind("popstate", function( event ) {
    
    if( $('#pages #pop-page #page-content table').length ) closeNews();
    
    ajaxScrolling = true;
    endOfScroll = false;
    var array = window.location.pathname.split('/');
    array.splice(0,1);
    
    if(
      array[0].substring(0,2) != 'id' && array[0].substring(0,4) != 'club' && array[0].substring(0,4) != 'post' && array[0].substring(0,4) != 'chat' &&
      ( array[0].substring(0,4) != 'game' || array[0].substring(4,5) == 's' ) 
    ) ajaxQuery( array[0] );
    else {
      
      switch( array[0].substring(0,2) ) {
        case 'id':
          ajaxQuery( 'user' , array[1] , array[0].substring( 2 , array[0].length ) );
        break;
        case 'cl':
          ajaxQuery( 'club' , array[1] , array[0].substring( 4 , array[0].length ) );
        break;
        case 'po':
          ajaxQuery( 'post' , 0 , array[0].substring( 4 , array[0].length ) );
        break;
        case 'ga':
          ajaxQuery( 'game' , 0 , array[0].substring( 4 , array[0].length ) );
        break;
        case 'ch':
          ajaxQuery( 'chat' , 0 , array[0].substring( 4 , array[0].length ) );
        break;
      }
      
    }
    $(document).scrollTop(0);
    
  });
  
  $( document ).on('click',function( event ){
    
    if( thirdPanel && !inElem( event, $('#panels #panel-third-line') ) ) closeThirdPanel();
    
    if( notifIsOpened ) {
      if( !inElem( event ,  $('#pages #panel-content') ) ) {
        switch( scops.theme ) {
          case 'classic':
          case 'silver':
            $('#pages #panel-page').width( 0 ).css('left',0);
            $('#pages #panel-content').empty();
            notifIsOpened = false;
          break;
          case 'fb':
          default:
            $('#pages #panel-page').css( 'height' , '0' );
            $('#pages #panel-content').empty();
            notifIsOpened = false;
          break;
        }
      }
    }
    
    if( musicTab ) {
      if( !inElem( event ,  $('#pages #audioplayer') ) ) {
        closePlayer();
      }
    }
    
  });
  
  $( document ).on('mousemove', function( event ){
    if( ( scops.theme == 'classic' || scops.theme == 'silver' ) && secPanel && !inElem( event, $('#panels #secondary-panel') ) ) closeSecPanel();
    
    if( audioSeeking ) {
      
      var leftCir = event.pageX - eventAudio.find('.audio-line').offset().left;
      if( event.pageX < eventAudio.find('.audio-line').offset().left ) leftCir = 0;
      if( event.pageX > eventAudio.find('.audio-line').offset().left + eventAudio.find('.audio-line').width() ) leftCir = eventAudio.find('.audio-line').width();
      
      eventAudio.find('.loader').css( 'width', leftCir + 'px' );
      
      var audFakeTime = ( audio.duration * eventAudio.find('.loader').width() ) / eventAudio.width();
      if( audio.duration >= 0) eventAudio.find('.dur').text( '-' + toMinutes( audio.duration - audFakeTime ) );
      
    }
    
    if( typeof( game ) != 'undefined' && game.action ) game.move( event );
  });
  
  $(document).mouseup(function(e){
    audioSeekUP( e );
    if( typeof( game ) != 'undefined' && game.action ) game.up();
  });
  
  $(document).mousedown(function(event){
      
    if( popupBox && !inElem( event ,  $('#pages #pop-up-box') ) ) closePopupBox();
    
  });
  
  $(document).keyup(function(e) {
    if( e.keyCode == 27 && videoFullSc ) {
      toggleFullScreen();
      return false;
    }
  });
  
  $(window).resize(function(){
    windowResize();
  });
  