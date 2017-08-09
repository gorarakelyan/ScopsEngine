/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var notifSounds = [ _root_ + '/common/audio/msg.mp3' , _root_ + '/common/audio/ntf.mp3' ];
  var loadContentLengths = [ 10 , 15 , 15 , 15 , 10 , 15 , 15 , 25 , 15 , 20 , 15 , 20 , 25 ];
  
  var currentLink = getCookie('link');
  
  var notifIsOpened = false, endOfNotif = false, canStartNotif = false, videoFullSc;
  var audio = new Audio() , audioElem , currentAudio , eventAudio;
  var ajaxScrolling = true;
  var audioSeeking = false;
  var tabFocuse = true;
  var standartWinWidth = '95%';
  var winPage = false;
  var firstUpdate = true;
  var receivedMSG = false;
  var popupBox = false;
  var searchTab;
  var eventInvitedList = '';
  var befPostURL = window.location.pathname;  
  var firstClick = true , secondClick = false;
  var menuOpen = false , musicTab = false ;

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
  
  var popUpProps = new Array();
  
  setTimeout( function(){ firstUpdate = false; }, 5000 );
  
  setInterval(function(){
    if( currentLink != getCookie('link') || !getCookie('link') ) logOut();
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
  });
  
  $(document).bind("scroll", function(){
    var scroll = $(document).scrollTop();
    var height = $(document).height();
    var winHeight = $(window).height();
    var point = 300;
    
    var path = window.location.pathname.split('/');
    path.splice(0,1);
    
    if( path[0].substring(0,4) == 'chat' ) {
      path[1] = path[0].substring(4 , path[0].length);
      path[0] = 'chat';
    }
    
    if( path[0] == 'chat' ) {
      loadOlderChat( path[1] );
    }
  });

  $(window).bind("popstate", function( event ) {
    
    if( $('#pages #pop-page #page-content table').length ) closeNews();
    
    ajaxScrolling = true;
    endOfScroll = false;
    var array = window.location.pathname.split('/');
    array.splice(0,1);
    
    if( array[0].substring(0,4) != 'chat' ) ajaxQuery( array[0] );
    else {
      ajaxQuery( 'chat' , 0 , array[0].substring( 4 , array[0].length ) );
    }
    $(document).scrollTop(0);
    
  });
    
  $(document).click(function(event){
    
    if( popupBox && !inElem( event ,  $('#pages #pop-up-box') ) )  closePopupBox();
    
  });