/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var lastResize = [ $(window).height() , $(window).width() ];
  windowResize();
  
  function windowResize() {
    
    $('#user-profile #user-cover').height( 300 / 950 * $('#user-profile #user-cover').width() );
    $('.photo-object').height( $('.photo-object').width() );
    $('.video-object .thumb').height( $('.video-object .thumb').width() * 0.4 );
    
    $('#user-profile-controls #user-menu').width( $('#user-profile-controls #user-menu .menu-block').outerWidth(true) * $('#user-profile-controls #user-menu .menu-block').length + 5 );
    
    if( musicTab ) $('#pages #audioplayer .playlist').outerHeight( $(window).height() - $('#pages #audioplayer .header').outerHeight(true) );
    
    if( lastResize[0] != $(window).height() || lastResize[1] != $(window).width() ) {
      lastResize[0] = $(window).height();
      lastResize[1] = $(window).width();
    }

  }
