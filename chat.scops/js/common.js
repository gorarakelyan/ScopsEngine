/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  function changeLang( langName ) {
    $.post( _root_ + '/php_requests/request.php', { mobile_application: true, log_link: getCookie('link'), type: 34 , lang: langName } , function(){ 
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
          document.title = titleTexts[text[1]];
          setTimeout( function(){ titleTextModify( animation , condition , text , type ); } , 800 );
        },800);
      else eval( 'titleWorkingModifs.' + type + ' = false' );
    } else setTimeout( function(){ titleTextModify( animation , condition , text , type ); } , 800 );
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
    
    $( html ).prependTo('#pages #windows-box');
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
    
    setCookie('link', '', {expires: - 1 , path: '/'});
    setCookie('id', '', {expires: - 1 , path: '/'});
    setCookie('ch', '', {expires: - 1 , path: '/'});
    console.log('s');
    window.location = '../';
    
  }
  
  function goToSearch( event ) {
    if( event.keyCode == 13 ) {
      var searchVal =  $('#panels #main-panel .item.search .find').val();
      searchVal = searchVal.replace(/^\s+/, "");
      searchVal = searchVal.substring(0,1);
      if( searchVal == '#' ) ajaxQuery('search', 4 );
      else ajaxQuery('search', 0 );
      
      closeMenu();
    }
  }
  
  function notification( type ) {
    
    if( notifIsOpened ) {
      setTimeout(function(){ notification( type ); },100);
    } else {
      
      endOfNotif = false;
      canStartNotif = false;
      
      $('#pages #panel-page').css('left','0');
      $('body').css('overflow','hidden');
      
      loader( '#pages #panel-content' );
      
      if( type == 'msg' )
        fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'notif_' + type , length: loadContentLengths[9] , last_id: 'NULL' },'fillJSON(\'#pages #panel-content\' , false , false , false , [ 13 , true , false ] , false , true )');
      else   
        fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'friends', 'from': 0, length: loadContentLengths[2], prof_id: getCookie('id') },'fillJSON(\'#pages #panel-content\' , false , false , false , [ 5 , true , true ] , false , true )');

      var wordElem = $('#pages #panel-page .panel-header .cell.name');
      wordElem.text( type == 'msg' ? langs.messages : langs.friends ); 
      
      setTimeout(function(){ notifIsOpened = type; },100);
      
    }
    
  }
  
  function closeNotif() {
    if( notifIsOpened ) {
      
      $('body').css('overflow-y','scroll');
      $('body').css('overflow-x','auto');
      
      $('#pages #panel-page').css('left','-150%');
      $('#pages #panel-content').empty();
      notifIsOpened = false;
      
    }
  }
  
  function getNewNotifs() {
    if( notifIsOpened ) {
      var box = $('#pages #panel-page #panel-content');
      if( box[0].scrollHeight - box.innerHeight() - box.scrollTop() < 100 && !endOfNotif && canStartNotif ) {
        canStartNotif = false;
        if( notifIsOpened == 'msg' ) {
          var last = box.find('.notification-object:last').data('id');
          fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'notif_' + notifIsOpened , length: loadContentLengths[9] , last_id: last },'fillJSON(\'#pages #panel-content\' , true , false , false , false , false , true )');
        } else {
          var fromID = $('#pages #panel-content .friend-object').length ;
          fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'friends', 'from': fromID , length: loadContentLengths[2], prof_id: getCookie('id') },'fillJSON(\'#pages #panel-content\' , true , false , false , false , false , true )');
        }
      }
    }
  }
  
  function openWinPage( widthCont , eventBool ) {
    if( winPage ) closeWinPage( false );
    else {
      winPage = true;
      
      if( widthCont == 1 ) widthCont = standartWinWidth;
      
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
    }
    options = JSON.stringify( options );
    $.post( _root_ + '/php_requests/request.php',{ mobile_application: true, log_link: getCookie('link'), type:type, id:id, options: options },function(data){
      switch( type ) {
        case 0:
          if( data == '0' ) addAlert( langs.alert_blocked );
          else addAlert( langs.alert_unblocked );
          
          ajaxQuery('user' , userContent , profID );

        break;
        case 1:
          if( data == '0' ) {
            $('.profile #user-profile-requests .request-object#add-follow').css('display','none');
            $('.profile #user-profile-requests  .request-object#remove-follow').css('display','inline-block');
            addAlert( langs.alert_follow );
          } else {
            $('.profile #user-profile-requests  .request-object#remove-follow').css('display','none');
            $('.profile #user-profile-requests  .request-object#add-follow').css('display','inline-block');
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
          if( $('#pages #pop-page #left-block').length ) closeNews();
          setTimeout(function(){
            removeAlert( remID );
            $('.news-object#news-' + id).find('.post-shadow:first').css('height',$('.news-object#news-' + id).height()).css('width',$('.news-object#news-' + id).width()).css('border-radius',0);
            $('.photo-object#img-' + id).find('.post-shadow:first').css('height',$('#img-' + id).height()).css('width',$('#img-' + id).width()).css('border-radius',0);
            $('#vid-' + id).find('.post-shadow:first').css('height',$('#vid-' + id).height()).css('width',$('#vid-' + id).width()).css('border-radius',0);
          }, 400 );
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
            fillDataTPL( _root_ + '/php_requests/get_content.php',{ content : 'events' , act: 0 , date: eventsDay },'fillJSON(\'#events-page .box.my-events\')');          
            fillDataTPL( _root_ + '/php_requests/get_content.php',{ content : 'events' , act: 1 , date: eventsDay },'fillJSON(\'#events-page .box.all-events\')');          
          }      
          break;
        case 25:
          if( event ) $(event.target).closest('.notification-object').remove();
          if( eventsDay ) {
            fillDataTPL( _root_ + '/php_requests/get_content.php',{ content : 'events' , act: 0 , date: eventsDay },'fillJSON(\'#events-page .box.my-events\')');          
            fillDataTPL( _root_ + '/php_requests/get_content.php',{ content : 'events' , act: 1 , date: eventsDay },'fillJSON(\'#events-page .box.all-events\')');          
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
      default:
      case 'inline-block':
        var html = '<div class="loader-box material-object"><div class="loader-object inline"></div><div class="title">' + langs.loading + '..</div></div>';
        $( elem ).html( html );
      break;
    }
  }
  
  function changeLoc( url ) {
    
    if( !url ) return;
    if( url.substring( 0, 1 ) == '/' ) url = url.substring( 1 , url.length );
    
    endOfScroll = false;
    
    if( location.pathname != '/' + url ) history.pushState({foo: 'bar'}, '', '/' + url);
    
  }
  
  
  updates();
  function updates() {    
    var req = $('#panels #main-panel .item#req-icon .extra'),
      notif = $('#panels #main-panel .item#notif-icon .extra'),
      visits = $('#panels #main-panel .item#visits-icon .extra'),
      sms = $('#panels #main-panel .item#sms-icon .extra');
    
    $.post( _root_ + '/php_requests/updates.php', { mobile_application: true, log_link: getCookie('link'), vis: visits.text(), not: notif.text(), req: req.text(), sms: sms.text() }, function( dataRes ){
      
      var data = JSON.parse(dataRes);
      
      if( notif.text() != data[0] ) notif.text(data[0]);
      if( req.text() != data[1] ) req.text(data[1]);
      if( visits.text() != data[2] ) visits.text(data[2]);
      if( sms.text() != data[3] ) sms.text(data[3]);
      
      if( data[3] > 0 ) $('#panels .top-panel .item.sms .new ').css('display', 'inline-block' );
      else $('#panels .top-panel .item.sms .new').css('display', 'none' );  
      
      updates();      
    });
  }
  
  function insertMainPage() {
    if( typeof( langs.chat_main ) == 'undefined' ) setTimeout( insertMainPage , 100 );
    else 
      $('#content-positioning .main-content').html( '<div class="main-layout"><div class="container"><div class="content material-object">' + langs.chat_main + '</div></div></div>' );
  }
