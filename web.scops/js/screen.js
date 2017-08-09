/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var lastWinHeight = 0;
  
  startResizing();
  
  function startResizing() {
    if( $('#panels #secondary-panel').length ) windowResize();
    else setTimeout( startResizing , 100 );
  }
  
  function windowResize() {
    
    fixWall();
    closeThirdPanel();
    
    if( scops.theme == 'classic' || scops.theme == 'silver' ) {
    
      var menuParent = $('#main-panel #panel-second-line .menu-container'), newMenu = $('#main-panel #panel-third-line .menu-container');
      $('#main-panel .panel-object.open-menu').css('display' , 'none');
      while( newMenu.find('.panel-object').length ) {
        var elem = newMenu.find('.panel-object').eq( 0 );
        elem.appendTo( menuParent );
      }
      while( true ) {
        var elem = menuParent.find('.panel-object').eq( menuParent.find('.panel-object').length - 1 );
        if( elem.position().top > 80 ) { elem.prependTo( newMenu ); }
        else break;
      }
      
      if( newMenu.find('.panel-object').length ) {
        
        $('#main-panel .panel-object.open-menu').css('display' , 'inline-block');
        while( true ) {
          var elem = menuParent.find('.panel-object').eq( menuParent.find('.panel-object').length - 1 );
          if( elem.position().top > 80 ) { elem.prependTo( newMenu ); }
          else break;
        }
        
      } else {
        $('#main-panel .panel-object.open-menu').css('display' , 'none');
        while( newMenu.find('.panel-object').length ) {
          var elem = newMenu.find('.panel-object').eq( 0 );
          elem.appendTo( menuParent );
        }
        while( true ) {
          var elem = menuParent.find('.panel-object').eq( menuParent.find('.panel-object').length - 1 );
          if( elem.position().top > 80 ) { elem.prependTo( newMenu ); }
          else break;
        }
      }
    }
    
    if( Math.abs( lastWinHeight - $(window).height() ) >= 10 && $('#chat .chat-object').length != parseInt( ( ( $(window).height() - 90 ) / 65 - 1 ) ) ) {
      fillDataTPL('../php_requests/get_content.php',{ content: 'chat', length: parseInt( ( ( $(window).height() - 90 ) / 65 - 1 ) ) },'fillCHAT(\'#chat\')');
    }
    
    if( window.innerWidth <= 1200 ) {
      $('#chat').css( 'right', '-250px' );
      if( scops.theme == 'classic' || scops.theme == 'silver' ) $('#panels #tertiary-panel').css( 'margin-left', '-120px' );
      $('#chat-small-screen').css( 'display', 'block' ).attr( 'onclick' ,'showChat()' ).text('');
    } else {
      $('#chat').css( 'right', '0' );
      if( scops.theme == 'classic' || scops.theme == 'silver' ) $('#panels #tertiary-panel').css( 'margin-left', '-275px' );
      $('#chat-small-screen').css( 'display', 'none' ).attr( 'onclick' ,'chatHide()' ).text('');
    }
    
    if( scops.theme == 'fb' && notifIsOpened ) {
      var leftMarg = $('#main-panel .right-side').offset().left + $('#main-panel .right-side').outerWidth(true) - 400;
      $('#pages #panel-page').css('left', leftMarg );
    }
    
    if( scops.theme == 'vk' && notifIsOpened ) {
      var leftMarg = $('#main-panel .right-side #sms-icon').offset().left;
      $('#pages #panel-page').css('left', leftMarg );
    }
    
    if( typeof( userContent ) !== 'undefined' ) menuTransition( userContent );
    
    if( lastWinHeight != $(window).height() ) lastWinHeight != $(window).height();
    
    closePopupBox();
    if( typeof( game ) != 'undefined' ) game.screen();
    
    if( $('#content-positioning .main-content .full-dialogue') ) resizeFullDial( 0 );
    
    if( musicTab ) {
      switch( scops.theme ) {
        case 'classic':
        case 'silver':
          $('#pages #audioplayer').outerHeight($(window).height() - 90);
        break;
        case 'vk':
          var leftMarg = $('#main-panel .right-side .panel-obj-info.menu').offset().left + $('#main-panel .right-side .panel-obj-info.menu').outerWidth(true) - 800;
          $('#pages #audioplayer').css( 'left' , leftMarg ).outerHeight( $(window).height() - 50 );
        break;
        case 'fb':
        default:
          var leftMarg = $('#main-panel .right-side').offset().left + $('#main-panel .right-side').outerWidth(true) - 800;
          $('#pages #audioplayer').css('left' , leftMarg).outerHeight( $(window).height() - 45 );
        break;
      }
    }
    
    if( $('#dating-page .user-view-block .info ').length )
      $('#dating-page .user-view-block .info ').outerWidth( $('#dating-page .user-view-block .table-imit').outerWidth() );
  }
