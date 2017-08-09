/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var chatAjax = new Array();
  var chatOld = new Array();
  var seenChatTop = 0;
  var stScrPlace = 0, strRight = false, strLeft = false;
  var selectChatFriend;
  
  function loadChat() {
    if( window.location.pathname.split('/')[1].substring( 0 , 4 ) == 'chat' )
      while( $('#chat-window-box .chat-window').length ) {
        var elem = $('#chat-window-box .chat-window').eq(0);
        var id = elem.attr('id').substring( 5 , elem.attr('id').length );
        chatAjax[id].abort(); 
        elem.remove(); 
      }
    else {
      var i = 0;
      while( getCookie('chat_' + i) != '' ) {
        openChat( getCookie('chat_' + i ) , false );
        i++;
      }
    }
  }
  
  function fillCHAT( elem ) {
    $( elem ).html( getParsedHTML );
    chatPanelOnline();
  }
  
  function chatPanelOnline() {
    var sendData = '';
    for( var i = 0 ; i < $('#chat .chat-object').length ; i++ )
      sendData = sendData + '-' + $('#chat .chat-object').eq(i).data('user');
    
    $.post('../php_requests/request.php',{ users: sendData, type: 16 }, function(data){
      
      var users = data.split(',');
      var found;
    
      for( var i = 0 ; i < $('#chat .chat-object').length ; i++ ) { 
        found = false;
        for( var j = 0 ; j < users.length ; j++ ) {
          if( users[j] == $('#chat .chat-object').eq(i).data('user') ) {
            $('#chat .chat-object').eq(i).find('.online').css('display','block');
            found = true;
            break;
          }
        }
        if( !found ) $('#chat .chat-object').eq(i).find('.online').css('display','none');
      }
      setTimeout( 'chatPanelOnline()' , 20000 );
    });
  }
  
  function openChat( id , bool , fullSc , cook ) {
    if( !$('.chat-window#chat-' + id).length ) {
      $.post('../php_requests/chat.php',{ request:'check', friend: id }, function( data ) {
        if( data == '1' ) fillDataTPL('../php_requests/get_content.php',{prof_id: id, content: 'chat-window'},'fillWinChat(' + id + ' , ' + bool + ' , ' + fullSc + ' , ' + cook + ' )');
        else if( window.location.pathname.split('/')[1].substring(0,4) == 'chat' ) $('.main-content').html( '<div class="container"><div class="empty-object padding material-object margin">' + emptyContents[13] + '</div></div>' );
      });
    }
  }

  function fillWinChat( id , bool , fullSc , cook ) {
    if( $('.chat-window#chat-' + id).length ) return;
      
    var chatWidth = 310;
    var row = Math.floor( ( $(document).width() - 90 - 280 ) / chatWidth );
    
    $(getParsedHTML).appendTo( '#chat-window-box' );
    
    var length = $('#chat-window-box .chat-window').length;
    
    var bottom = Math.floor( ( length - 1 )/ row ) * 40;
    var right = ( length - 1 )%row * chatWidth + Math.floor( ( length - 1 )/ row ) * 20;
    $('#chat-window-box .chat-window:last').css('right', right +'px').css('bottom', bottom + 'px');
    
    chatOld[id] = new Array( true , 0 , 0 , 0 );
    
    if( typeof( chatAjax[id] ) != 'undefined' ) {
      chatAjax[id].abort();
      chatAjax[id] = 'undefined';
    }
    startListen( true , id );
    
    $('.chat-window').draggable({
      handle: '.chat-header .drag',
      containment: 'window',
      scroll: false
    });
    
    if( bool ) setChatFocus( id , true );
    
    $('.chat-window#chat-' + id + ' .chat-place').scroll( function() { loadOlderChat( id ) } );
    
    if( !cook ) {
      var i = 0, check = true;
      while( getCookie('chat_' + i) != '' ) {
        if( getCookie('chat_' + i) == id ) {
          check = false;
          break;
        }
        i++;
      }
      if( check ) setCookie( 'chat_' + i , id , { expires: 315360000, path:'/' });
    }
    
    if( fullSc ) fullDialogue( id );
  }

  function closeChat( id , cook ) { 
    chatAjax[id].abort(); 
    $('.chat-window#chat-' + id).remove(); 
    
    var i = 0 , j ;
    while( getCookie('chat_' + i) != '' ) {
      if( getCookie('chat_' + i ) == id ) {
        setCookie( 'chat_' + i , id , { expires: -1, path:'/' });
        i++;
        
        while( getCookie('chat_' + i) != '' ) {
          j = i - 1 ;
          setCookie( 'chat_' + j ,  getCookie( 'chat_' + i ) , { expires: 315360000, path:'/' });
          i++;
        }
        
        j++;
        setCookie( 'chat_' + j ,  '' , { expires: -1, path:'/' });
        break;
      } else i++;
    }
    
  }

  function selectChatImg( id ) { $('#chat-send-img-'+ id).click(); }
  function imgSend( id ) { sendMSG( id ); }

  function sendActivate( e , id ) {
    if( e.keyCode == 13 && !e.shiftKey ) {
      sendMSG( id ); 
      e.preventDefault();
    }
  }

  function startListen( bool , friend ) {
    if( !bool ) var prev = $('.chat-window#chat-' + friend + ' .chat-place .chat-content .sms-object:last').data('id');
    chatAjax[friend] = $.post('../php_requests/chat.php',{ request:'listen', friend: friend , load: bool, old: 'false', online: chatOld[friend][1], seen: chatOld[friend][2], prev: prev , length: loadContentLengths[7] }, function( data ){
      if( data != 'NULL' && $('.chat-window#chat-' + friend).length > 0 ) {
        
        var scroller = $('.chat-window#chat-' + friend + ' .chat-place .chat-content').height() - $('.chat-window#chat-' + friend + ' .chat-place').scrollTop() - $('.chat-window#chat-' + friend + ' .chat-place').height();
        
        var dataJSON = JSON.parse( data );
        var tpl = dataJSON.tpl;
        delete dataJSON.tpl;
        
        if( dataJSON.online != chatOld[friend][1] ) {
          chatOld[friend][1] = dataJSON.online;
          $('.chat-window#chat-' + friend + ' .online').css('opacity',chatOld[friend][1]);
        }
            
        delete dataJSON.online;
        
        if( dataJSON.sms != '' || dataJSON.seen !=  chatOld[friend][2] ) {
          
          if( !bool && window.location.pathname.split('/')[1].substring( 0 , 4 ) == 'chat' ) refreshDialogues( 1 , false );
            
          if( dataJSON.seen !=  chatOld[friend][2] ) chatOld[friend][2] = dataJSON.seen;
          
          if( dataJSON.sms != '' ) {

            var sendTime  = 0 , time = '';
            
            for( var i = 0; i < dataJSON.sms.length ; i++ ) {
              
              var item = dataJSON.sms[i];
              var html = $( Mustache.to_html( tpl , $.extend( {} , { main_set: dataJSON.main_set } , { sms: item } ) ) );
            
              sendTime = new Date( parseInt( html.find('.time').text() ) * 1000 );
              time = humanDate( sendTime.getDate() + '.' + sendTime.getMonth() ) + ' ' + sendTime.getHours() + ':' + ( sendTime.getMinutes() > 9 ? sendTime.getMinutes() : '0' + sendTime.getMinutes() );
              html.find('.time').text( time );
              
              var playlistID = '';
              
              for( var a = 0 ; a < item.audio_count ; a++ ) {
                if( item.audios[a] ) {
                  playlistID += item.audios[a].id + '-';
                $(Mustache.to_html( dataJSON.audio_tpl , $.extend( {}, { 'music': item.audios[a] } , { langs: langs } ) ) ).appendTo( html.find('.audiolist') );
                }
              }
              
              html.find('.audiolist').attr('id' , playlistID);
              html.appendTo('.chat-window#chat-' + friend +' .chat-place .chat-content');
            }
            
            if ( 
              $('.chat-window#chat-' + friend +' .chat-place .chat-content .sms-object:last').find('.friend').length &&
              !$('.chat-window#chat-' + friend +' .chat-controls textarea:focus').length
            ) {
              if( chatOld[friend][3] != $('.chat-window#chat-' + friend + ' .chat-place .chat-content .sms-object:last').data('id') ) {
                
                if( !chatOld[friend][3] ){
                  $.post('../php_requests/chat.php',{ request:'check_seen', friend: friend }, function( data ) {
                    if( data < $('.chat-window#chat-' + friend + ' .chat-place .chat-content .friend:last').closest('.sms-object').data('id')
                        && $('.chat-window#chat-' + friend + ' .chat-place .chat-content .friend:last').length
                    ) {
                      var elem = $('.chat-window#chat-' + friend );
                      elem.find('.chat-header').attr('class', 'chat-header new');
                      elem.attr('class', 'chat-window new');
                    } 
                  });
                } else {
                  var elem = $('.chat-window#chat-' + friend );
                  elem.find('.chat-header').attr('class', 'chat-header new');
                  elem.attr('class', 'chat-window new');
                }
                
              }
            } else {
              setChatFocus( friend , false );
            }
            
            if( scroller < 40 ) $('.chat-window#chat-' + friend + ' .chat-place').scrollTop( 9999999 );
          
          }
        }
        
      }
      setSeen( friend );
      if( $('.chat-window#chat-' + friend).length > 0 ) startListen( false , friend );
    });
  }
  
  function setSeen( friend ) {
    var seenMargin = 26;
    if(
      $('.chat-window#chat-' + friend +' .chat-place .chat-content .sms-object').length && (
        $('.chat-window#chat-' + friend +' .chat-place .chat-content .friend').length ||
        chatOld[friend][2] >= $('.chat-window#chat-' + friend +' .chat-place .chat-content .sms-object:first').data('id') 
      )
    ) {
      
      if( chatOld[friend][2] <  $('.chat-window#chat-' + friend +' .chat-place .chat-content .friend:last').parent().data('id') ) var lastSeen = $('.chat-window#chat-' + friend +' .chat-place .chat-content .friend:last').parent().data('id');
      else lastSeen = chatOld[friend][2];
      
      var sum = 0;
      
      for( var i = 0 ; $('.chat-window#chat-' + friend +' .chat-place .chat-content .sms-object').eq(i).data('id') < lastSeen ; i++ ) 
        sum += $('.chat-window#chat-' + friend +' .chat-place .chat-content .sms-object').eq(i).find('.sms-cont').outerHeight(true);
      
      var setTop = sum - $('.chat-window#chat-' + friend +' .chat-place .chat-content').innerHeight() + seenMargin;
      $('.chat-window#chat-' + friend +' .chat-place .chat-seen-scroller .seen').css('opacity',1).css('top' , setTop + 'px');
      
    } else $('.chat-window#chat-' + friend +' .chat-place .chat-seen-scroller .seen').css('opacity',0);
      
  }

  function setChatFocus( id , bool ) {
    
    var elem = $('.chat-window#chat-' + id );
    elem.find('.chat-header').attr('class', 'chat-header simple');
    elem.attr('class', 'chat-window simple');
    if( bool )
      if( !selection().replace(/\s+/g, '') )
        $('.chat-window#chat-' + id + ' .chat-controls textarea').focus();
    
    var last = $('.chat-window#chat-' + id + ' .chat-place .chat-content .sms-object').length?$('.chat-window#chat-' + id + ' .chat-place .chat-content .sms-object:last').data('id'):'NULL';
    if( chatOld[id][3] != last && ( chatOld[id][3] == 0 || $('.chat-window#chat-' + id + ' .chat-place .chat-content .sms-object').length ) )
      $.post('../php_requests/chat.php',{ request:'seen' , friend: id , prev: last },function(data){
        if( data == '1' ) chatOld[id][3] = last;
      });
    
  }

  function loadOlderChat( id ) {
    if(
        $('.chat-window#chat-' + id + ' .chat-place').scrollTop() < 40 &&
        $('.chat-window#chat-' + id + ' .chat-place .chat-content .sms-object:first').length
      ) {
      var first = $('.chat-window#chat-' + id + ' .chat-place .chat-content .sms-object:first').data('id');
      if( chatOld[id][0] ) {
        chatOld[id][0] = false;
        $.post('../php_requests/chat.php',{ request:'listen', friend: id , load: true, first: first, old: true , length: loadContentLengths[7] }, function( data ){
          if( data != 'NULL' && $('.chat-window#chat-' + id).length > 0 ) {
            
            var dataJSON = JSON.parse( data );
            var tpl = dataJSON.tpl;
            delete dataJSON.tpl;
          
            var html = $( Mustache.to_html( tpl , dataJSON ) ) , elem ;
            for( var i = 0; i < html.length ; i++ ) {
              
              elem = html.eq(i).find('.time');
              sendTime = new Date( parseInt( elem.text() ) * 1000 );
              time = humanDate( sendTime.getDate() + '.' + sendTime.getMonth() ) + ' ' + sendTime.getHours() + ':' + ( sendTime.getMinutes() > 9 ? sendTime.getMinutes() : '0' + sendTime.getMinutes() );
              elem.text( time );
              
            }
            html.prependTo('.chat-window#chat-' + id +' .chat-place .chat-content');
            
            $('.chat-window#chat-' + id +' .chat-place .get-height').html( html.html() );
            var scrollHeight = $('.chat-window#chat-' + id +' .chat-place .get-height').height();
            
            $('.chat-window#chat-' + id +' .chat-place').scrollTop( scrollHeight );
            
            setSeen( id );
            
          }
          chatOld[id][0] = true;
        });
      }
    }
  }

  function sendMSG( id ) {
    
    var formdata = new FormData();
      
    if( document.getElementById('chat-send-img-' + id).files[0] != undefined ) formdata.append("img", document.getElementById('chat-send-img-' + id).files[0]);
    formdata.append("text", $('.chat-window#chat-'+ id +' .chat-controls textarea').val());
    formdata.append('friend',id);
    formdata.append('request', 'send');
      
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../php_requests/chat.php');
    ajax.send(formdata);
      
    $('.chat-window#chat-'+ id +' .chat-controls textarea').val('');
    $('#chat-send-img-' + id).val('');
    
    $('.full-dialogue .chat-controls').attr('class','chat-controls blur').find('.chat-form').attr('class','chat-form blur');
    
  }
  
  function sendSticker( id , num, pack ) {
    closePopupBox();
    var formdata = new FormData();
    formdata.append( 'sticker', true );
    formdata.append( 'sticker_pack', pack );
    formdata.append( 'sticker_index', num );
    formdata.append( 'friend' , id );
    formdata.append( 'request', 'send' );
    
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../php_requests/chat.php');
    ajax.send(formdata);
  }
  
  function openChatImg( event ) {
    var url = $(event.target).data('url');
    openWinPage( '80%' , true );
    var html = '\
    <div class="img-view-box"><img class="img-standart-view" src="'+ url +'"></div>\
    '; 
    if( winPage ) $('#pages #win-page #win-content').html( html );
  }
  
  function openStickers( id ) {
    var elem = $('.chat-window#chat-'+ id +' .chat-controls'),
      popBottom = $(document).scrollTop() + $(window).height() - elem.offset().top,
      popRight = $(document).scrollLeft() + $(window).width() - elem.offset().left - elem.outerWidth(true) - 10 ;
      
    openPopupBox( [['position','fixed'] , ['bottom', popBottom ] , ['right', popRight ],['width', 370 ] , ['height', 300 ]] );
    
    var box = $('#pages #pop-up-box');
    
    loader( box );
    fillDataTPL('../php_requests/get_content.php', { content : 'stickers' , prof_id: id } ,'fillStickers(\'#pages #pop-up-box\' , ' + id + ')');
  }
  
  function fillStickers( elem , id ) {
    $(elem).html( getParsedHTML );
    if( $(elem).find('.st-pack:first').data('id') ) getStickerPack( id , $(elem).find('.st-pack:first').data('id') );
    else $('#pages #pop-up-box #sticker-box').html('<div class="alert-object-small">' + langs.sticker_empty + '</div>');
    stScrPlace = 0, strRight = false, strLeft = false;
    stickersButtons();
  }
  
  function getStickerPack( id, num ) {
    var box = $('#pages #pop-up-box');
    box.find('.st-pack').css('background','transparent');
    box.find('.st-pack#stpack' + num ).css('background','#fff');
    
    if( box.find('#sticker-box').data('pack') != num ) {
      box.find('#sticker-box').data( 'pack', num );
      
      box.find('#sticker-box').empty();
      var format = box.find('.st-pack#stpack' + num).data('format');
      for( var i = 1; i <= box.find('.st-pack#stpack' + num).data('length') ; i++ ) 
        $('<div onclick="sendSticker( ' + id + ' , ' + i + ' , ' + num + ' )" style="background-image:url(\'../img/stickers/' + num + '/' + i + '.' + format + '\');background-size: contain;background-repeat: no-repeat;background-position: 50% 50%;" class="sticker-obj"></div>').appendTo( '#sticker-box' );
    }
  }
  
  function scrollStickers( type ) {
    var box = $('#pages #pop-up-box #stickers-scrolling-area');
      if( box ) {
      switch( type ) {
        case 1:      
          stScrPlace++;
          box.css('margin-left', stScrPlace * 42);
          stickersButtons();
        break;
        case 2:
          stScrPlace--;
          box.css('margin-left', stScrPlace * 42);
          stickersButtons();
        break;
      }
    }
  }
  
  function stickersButtons() {
    var box = $('#pages #pop-up-box');
    if( box.find('#stickers-scrolling-area') ) {
      if( box.find('.st-pack').length + stScrPlace > 6 ) {
        if( strRight == false ) {
          strRight = true;
          box.find('#sticker-scroll-right').css('display','block');
          box.find('#stickers-scroll').width( $('#stickers-scroll').width() - 42 );
        }
      } else {
        if( strRight == true ) {
          strRight = false;
          box.find('#sticker-scroll-right').css('display','none');
          box.find('#stickers-scroll').width( $('#stickers-scroll').width() + 42 );
        }
      }
      if( stScrPlace < 0 ) {
        if( strLeft == false ) {
          strLeft = true;
          box.find('#sticker-scroll-left').css('display','block');
          box.find('#stickers-scroll').width( $('#stickers-scroll').width() - 42 );
        }
      } else {
        if( strLeft == true ) {
          strLeft = false;
          box.find('#sticker-scroll-left').css('display','none');
          box.find('#stickers-scroll').width( $('#stickers-scroll').width() + 42 );
        }
      }
    }
  }
  
  function openStickersShop() {
    if( popupBox ) closePopupBox();
    openWinPage( 700 , true );
    fillDataTPL('../php_requests/get_content.php' , { content: 'sticker_store' } , 'fillJSON(\'#pages #win-page #win-content\')');
  }

  function showChat() {
    if( $(window).width() <= 1200 ) {
      $('#chat').css( 'right' ,0 );
      $('#chat-small-screen').attr( 'onclick' ,'chatHide()' ).text('');
      $('#panels #tertiary-panel').css( 'margin-left', '-275px' );
    }
  }
  
  function chatHide() {
    if( $(window).width() <= 1200 ) {
      $('#chat').css( 'right' , '-250px' );
      $('#chat-small-screen').attr( 'onclick' ,'showChat()' ).text('');
      $('#panels #tertiary-panel').css( 'margin-left', '-120px' );
    }
  }
  
  function deleteSMS( id , chat ) {    
    $.post('../php_requests/chat.php',{ request: 'hide', id: id , friend: chat });
    $('.chat-window#chat-' + chat + ' .chat-place .sms-' + id).css('opacity' , 0);
    
    setTimeout(function(){
      $('.chat-window#chat-' + chat + ' .chat-place .sms-' + id).empty();
      setSeen( chat );
    }, 300);
  }
  
  function fullDialogue( id ) {
    
    if( !$('#chat-window-box .chat-window#chat-' + id).length ) {
      
      openChat( id , false , true , true );
      return;
      
    } else if( !$('.full-dialogue .chat-window#chat-' + id ).length ) {
      
      if( !$('.main-content .full-dialogue' ).length ) {
        
        $('#content-positioning .main-content').html('\
          <div class="container chat-page">\
            <div class="dialogues">\
              <div class="users">\
                <div class="refresh material-object">' + langs.dialogues + '<span class="refr-btn onclick="refreshDialogues(1 , true)""></span></div>\
                <div class="view"></div>\
              </div>\
            </div>\
            <div class="full-dialogue">\
              <div class="content material-object"></div>\
            </div>\
          </div>');
        refreshDialogues( true , false );
        
      } else $('.main-content .full-dialogue .content').empty();
      resizeFullDial( id );
      
    }
  }
  
  function resizeFullDial( append ) {
    
    if( append ) {
      $('#chat-window-box .chat-window#chat-' + append ).appendTo('#content-positioning .main-content .full-dialogue .content');
      
      $('.full-dialogue .chat-window').attr('style','');
      $('.full-dialogue .chat-place').attr('onclick','setChatFocus( ' + append + ' , false )').scrollTop( 99999999 );
      
      $('.full-dialogue .chat-controls .chat-form').on('keyup paste' , function(){
        var elem = $('.full-dialogue .chat-controls');
        if( elem.find('.chat-form').val() == '' ) {
          elem.attr('class','chat-controls blur');
          elem.find('.chat-form').attr('class','chat-form blur');
        }
        else {
          elem.attr('class','chat-controls focus');
          elem.find('.chat-form').attr('class','chat-form focus');
        }
      });
      
      setChatFocus( append , true );
    }

    var height = $(document).height() - $(document).scrollTop() - 40 - $('#content-positioning .main-footer').outerHeight(true) - $('#panels #main-panel').outerHeight(true);
    var winHeight = $(window).height() - 40 - $('#panels #main-panel').outerHeight(true);
      
    height = height > winHeight ? winHeight : height ;
      
    $('#content-positioning .main-content .full-dialogue').height( height );
    
    $('.full-dialogue .chat-place').innerHeight( $('#content-positioning .main-content .full-dialogue .content').innerHeight() - $('.full-dialogue .chat-header').outerHeight(true) - $('.full-dialogue .chat-controls').outerHeight(true) );
    
  }
  
  function refreshDialogues( act , loading ) {
    if( act ) {
      if( loading ) loader( '.chat-page .users .refresh' , 'inline');
      endOfScroll = false;
      fillDataTPL('../php_requests/get_content.php',{ content: 'notif_msg' , full: true , length: $('.full-dialogue .chat-controls .dial').length ? $('.full-dialogue .chat-controls .dial').length : loadContentLengths[11] , last_id: 'NULL' },'fillJSON(\'.main-content .dialogues .users .view\' , false , true , false , false , [ 14 , true , true ] , \'remLdr\' )');    
    } else {
      $('.chat-page .users .refresh').html( langs.dialogues + '<span class="refr-btn" onclick="refreshDialogues(1 , true)"></span>' );
    }
  }
  
  function openChatFromDials( event ,  id ) {
    if( !$( event.target ).closest('.dont-react').length ) ajaxQuery( 'chat' , 0 , id , 1 , event );
  }
  
  function openChatFromPanel( id ) {
    if( window.location.pathname.split('/')[1].substring(0,4) == 'chat' ) ajaxQuery('chat', 0 , id , 1 );
    else openChat( id , true );
  }
  
  function openChatAttach( type , friend ) {
    closePopupBox();
    selectChatFriend = friend;
    
    openWinPage( 600 , false );  
    
    loader('#pages #win-page #win-content');
    
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage( false );
    });
    
    var props = { chat: true , 'from': 0 , 'length': loadContentLengths[12] };
    
    switch( type ) {
      case 'audio':
        props.content = 'audio_attach';
      break;
      case 'video':
        props.content = 'video_loc_attach';
      break;
    }
    
    lightBoxContent = props.content;
    
    $('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
    
    fillDataTPL('../php_requests/get_content.php', props , 'fillATTACH( \'#pages #win-page #win-content\' , \''+ type +'\')' );
  }
  
  
  function closeChatAttach() {
    
    $('#pages #win-page .shadow-object').unbind('click');
    closeWinPage( false );
    selectChatFriend = 0;
    
  }
  
  function selectChatAttach( type , num ) {
    
    var parent = $('#pages #win-page #win-content');
    switch( type ) {
      case 1:
        if( parent.find('.audio#item-' + num).hasClass('select') ) {
          parent.find('.count').text( parseInt( parent.find('.count').text() ) - 1 );
          parent.find('.audio#item-' + num).addClass('simple').removeClass('select');
        } else {
          parent.find('.count').text( parseInt( parent.find('.count').text() ) + 1 );
          parent.find('.audio#item-' + num).addClass('select').removeClass('simple');
        }
      break;
      case 2:      
        parent.find('.video.item').not('.video#item-' + num).addClass('simple').removeClass('select');
        if( parent.find('.video#item-' + num).hasClass('simple') ) parent.find('.video#item-' + num).addClass('select').removeClass('simple');
        else parent.find('.video#item-' + num).addClass('simple').removeClass('select');
        
        parent.find('.count').text( langs.post_video + ': #' + parent.find('.video.item').not('.video#item-' + num).data('id') );
      break;
    }

  }
  
  function sendChatAttached( act ) {
    
    var parent = $('#pages #win-page #win-content');
    
    var string = '';
    if( act == 1 )
      for( var i = 0 ; i < parent.find('.item.select').length ; i++ ) {
        var item = parent.find('.item.select').eq(i);
        string = modifyString( item.data('id').toString() , string );
      }
    else string = parent.find('.item.select:first').data('id');
    
    var formdata = new FormData();
    formdata.append( act == 1 ? 'audios' : 'videos' , string );
    formdata.append( 'friend' , selectChatFriend );
    formdata.append( 'request', 'send' );
    
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../php_requests/chat.php');
    ajax.send( formdata );
    
    closeChatAttach();
    
  }

  function openAttachOpt( id ) {
    
    var elem = $('.chat-window#chat-'+ id +' .chat-controls'),
      popBottom = $(document).scrollTop() + $(window).height() - elem.offset().top,
      popRight = $(document).scrollLeft() + $(window).width() - elem.offset().left - elem.outerWidth(true) - 10 ;
      
    openPopupBox( [['position','fixed'] , ['bottom', popBottom ] , ['right', popRight ],['width', 250 ] , ['height', 165 ]] );
    
    var box = $('#pages #pop-up-box');
    
    var html = '<div class="attach-box">\
        <div class="attach" onclick="openChatAttach(\'audio\' , ' + id + ')">' + langs.attach_audios + '</div>\
        <div class="attach" onclick="openChatAttach(\'video\' , ' + id + ')">' + langs.attach_videos + '</div>\
        <div class="attach" onclick="selectChatImg( ' + id + ' )">' + langs.attach_images + '</div>\
      </div>';
    $('#pages #pop-up-box').html(html);
    
  }