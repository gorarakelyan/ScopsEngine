/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var ajax, ajaxtrue = false, getParsedHTML, getParsedJSON, canStartScroll = false, endOfScroll = false, continueWall;
  var keyUpAjax , keyUpAjaxStart = false;
  
  function ajaxQuery( url , content, id , putLoader , event ) {
    
    if( $('.chat-window').length ) closeChat( $('.chat-window').data('id') );
    if(ajaxtrue == true) ajax.abort();
  
    endOfScroll = false;
    
    var dataSend = '&ajax=1&tab=' + url;
    
    if( content ) {
      if( url != 'search' ) dataSend += '&section=' + content;
      else dataSend += '&search_tab=' + content;
    }
    if( id ) dataSend += '&id=' + id;
    
    if( url != 'user' && url != 'club' && url != 'post' && url != 'game' && url != 'chat' ) changeLoc( url );
    else {
      switch( url ) {
        case 'user':
          changeLoc( 'id' + id + '/' + content );
        break;
        case 'club':
          changeLoc( 'club' + id + '/' + content );
        break;
        case 'post':
          changeLoc( 'post' + id );
        break;
        case 'chat':
          changeLoc( 'chat' + id );
        break;
      }
    }
    
    if( !putLoader ) loader('#content-positioning .content-pages' , 'inline-block');
    
    
      ajaxtrue = true;
      ajax = $.ajax({
        type: 'GET',
        url: '../php_main/tab.php',
        data: dataSend,
        success: function(data) {
          data = JSON.parse( data );
          $.extend( data , {langs: langs} );
          data = JSON.stringify( data );
          
          ajaxtrue = false;
          parseJSON( data, 'ajaxGenData()' );
        }
      });
    
    if( event ) event.preventDefault();
    
  } 
  
  function ajaxGenData() {
    $('#content-positioning .main-content').html(getParsedHTML);  
    $(document).scrollTop(0);
  }
  
  function fillDataTPL( php , exp , handle ) {
    $.post( php , $.extend( exp , { log_link: getCookie('link') , mobile_application: true } ) , function(data){
      parseJSON( data, handle );
    });
  }
  
  function fillJSON( elem , bool , load , scroll , emptyClass , callback , notif ) {
    if( emptyClass ) emptyClass[0] = emptyClass[0] ? emptyClass[0] : 0 ;
    
    if( bool ) $(getParsedHTML).appendTo( elem );
    else
      if( getParsedHTML.replace(/\s+/g, '') ) $( elem ).html( getParsedHTML );
      else if( emptyClass ) $( elem ).html( '<div class="empty-object ' + ( emptyClass[1] ? 'padding ' : '' ) + ( emptyClass[2] ? 'material-object' : '' ) + '">' + emptyContents[emptyClass[0]] + '</div>' );
        
    if( load ) {
      ajaxScrolling = true;
      canStartScroll = true;
    }
    if( scroll ) {
      endOfScroll = getParsedJSON.end;
    }    
    if( notif ) {
      endOfNotif = getParsedJSON.end;
      canStartNotif = true;
    }
    if( callback ) eval( callback );
  }
  
  function parseJSON( data, handle ) {
    var dataJSON = JSON.parse( data );
    
    var tpl = dataJSON.tpl;
    delete dataJSON.tpl;
    
    getParsedJSON = '';
    getParsedJSON = dataJSON;
    
    getParsedHTML = '';
    getParsedHTML = Mustache.to_html( tpl , dataJSON );
    eval(handle);
  }
  
  function keyUpAJAX( opt , box , condition ) {
    setTimeout(function(){
      if( eval( condition.variable ) === undefined ) return;
      if( eval( condition.variable ) != condition.value ) return;
      
      if( keyUpAjaxStart ) keyUpAjax.abort();
      keyUpAjaxStart = true;
      
      keyUpAjax = $.post( opt.action ,  $.extend( opt , { log_link: getCookie('link') , mobile_application: true } ) , function(data){
        parseJSON( data , 'fillJSON(\'' + box + '\')' );
        keyUpAjaxStart = false;
      });
    } , 200 );
  }
  
  function fillMUSIC( elem , load , scroll ) {
    elem = $(elem);
    
    if( load ) {
      ajaxScrolling = true;
      canStartScroll = true;
    }
    if( scroll ) endOfScroll = getParsedJSON.end;
    
    if( !getParsedHTML.replace(/\s+/g, '') && !scroll ) {
      $( elem ).html( '<div class="empty-object padding material-object">' + emptyContents[2] + '</div>' );
      return ;
    }
    
    $( getParsedHTML ).appendTo(elem);
    var audioID = '';
    
    for( var i =  0 ; i < elem.find('.audio-object').length ; i++ )
      audioID += elem.find('.audio-object').eq(i).data('id') + '-';
    
    elem.attr( 'id' , audioID );
    
  }
  
  
  function changeUserContent( media , type ) {
    canStartScroll = false;
    
    if(  $('#user-profile-controls').length ) {
      $('#user-profile-controls #user-menu .menu-block').removeClass('selected');
      
      var userTab = $('#user-profile-controls #user-menu .menu-block#' + media );
      userTab.addClass('selected');
      
      for( var num = 0 ; num < $('#user-profile-controls .menu-block').length ; num++ )
        if( $('#user-profile-controls #user-menu .menu-block').eq(num).hasClass('selected') ) break;
      
      $('.profile #user-profile-controls').animate({
        scrollLeft: 10 + userTab.outerWidth(true) * num - $('.profile #user-profile-controls').innerWidth() / 2 + userTab.outerWidth(true) / 2
      }, 300);
    }
    
    if( type == 'user' ) changeLoc( 'id' + profID + '/' + media );
    else changeLoc( 'club' + profID + '/' + media );
    
    $('#user-content #content-show').empty();
    loader('#user-content #content-show');
    
    var num = ( type == 'user' )?0:1;
    
    $('#user-content #content-set').empty();
    
    if( typeof(userContent) != 'undefined' ) userContent = media;
    
    switch( media ) {
      case 'wall':
        if( profID == getCookie('id') ) insertUploadForm('#user-content #content-set' , 'post', num );
        generateFeed( _root_ + '/php_requests/get_content.php',{content: 'wall', last_id: 'NULL', length: loadContentLengths[0], author:num , prof_id: profID }, $('#user-content #content-show') , true );
      break;
      case 'friends':
        fillDataTPL(_root_ + '/php_requests/get_content.php',{'content': 'friends', 'from': 0, 'length': loadContentLengths[2], 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true , false , [ 5 , true , true ] )');
      break;
      case 'photos':
        if( profID == getCookie('id') ) insertUploadForm('#user-content #content-set' , 'photo', num );
        fillDataTPL(_root_ + '/php_requests/get_content.php',{'content': 'app_photos', 'from': 0, 'length': loadContentLengths[1], 'author': num, 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true, false , [ 4  , true , true ] )');
      break;
      case 'videos':
        fillDataTPL(_root_ + '/php_requests/get_content.php',{'content': 'videos', 'last_id': 'NULL', 'length': loadContentLengths[4], 'author': num, 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true , false , [ 7 , true , true ] )');
      break;
      case 'music':
        $('#user-content #content-show').empty();
        $('<div class="audiolist"></div>').appendTo('#user-content #content-show');
        fillDataTPL(_root_ + '/php_requests/get_content.php',{'content': 'music', 'from': 0, 'length': loadContentLengths[8], 'author': num, 'prof_id': profID },'fillMUSIC(\'#user-content #content-show .audiolist\' , true )');
      break;
      case 'clubs':
        fillDataTPL(_root_ + '/php_requests/get_content.php',{'content': 'clubs', 'from': 0, 'length': loadContentLengths[3], 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true , false , [ 6 , true , true ] )');
      break;
      case 'followers':
        fillDataTPL( _root_ + '/php_requests/get_content.php',{'content': 'followers', 'from': 0, 'length': 15, author: 1, 'prof_id': profID },'fillJSON(\'#user-content #content-show\') , false , true , false , [ 8 , true , true ]');
      break;
      case 'settings':
        fillDataTPL(_root_ + '/php_requests/get_content.php',{'content': 'club_settings', 'prof_id': profID , act: 0 },'fillJSON(\'#user-content #content-show\') , false , true ');
      break;
    }
  }
  
  
  function generateFeed( php , exp , box , empty ) {
    
    continueWall = true;
    var linkNews = window.location.pathname;
    var startNum = $('.news-object').length;
    
    $.post( php , $.extend( {} , exp , { log_link: getCookie('link') , mobile_application: true } ) , function( dataRes ){
      
      var dataJSON = JSON.parse( dataRes );
      var tpl = dataJSON.tpl;
      delete dataJSON.tpl;
      
      endOfScroll = dataJSON.end;
      
      if( empty ) $(box).empty();
    
      if( dataJSON.news.length > 0 ) {
        $(box).find('empty-object').remove();
        genElem( 0, false );
      } else {
        if( empty ) $( box ).html( '<div class="empty-object padding material-object">' + emptyContents[1] + '</div>' );
        return;
      }
      
      function genElem( i , shareBool ) {
        if( !continueWall ) return;
        
        if( !shareBool ) var current = dataJSON.news[i];
        else var current = dataJSON.news[i].share_array;
        
        if( current.video_glob != '' )
          current.video_glob = JSON.parse(current.video_glob);
        
        if( current.link != '' )
          current.link = JSON.parse(current.link);
        
        if( current.img > 0 ) {
          current.img_big = JSON.parse(current.img_big);
          current.img_medium = JSON.parse(current.img_medium);
        }
        
        if( current.img > 2 ) {
          if( current.img > 4 ) current.img_more = current.img - 4 ;
          var firstImg = current.img_big.splice(0,1);
          var boxImages = current.img_medium.splice(1,3);
          current.img_box = boxImages;
          current.img_big = firstImg;
          current.box = true;
          current.img = 1;
        }
        
        var num = i;
        
        if( linkNews == window.location.pathname  ) {
          
          if( !shareBool ) var current = dataJSON.news[num];
          else var current = dataJSON.news[num].share_array;
          var elem = $(Mustache.to_html( tpl , $.extend( {}, current, { langs: langs } , { main_set: dataJSON.main_set } ) ) );  
          
          if( current.audio ) {        
            for( var a = 0 ; a < current.audio_count ; a++ )
            $( Mustache.to_html( current.audio_tpl , $.extend( {} , { 'music': current.audio_array[a] } , { langs: langs }, { main_set: dataJSON.main_set } ) ) ).appendTo(elem.find('.audiolist'));
          }
          
          if( current.img_more > 0 ) {
            var boxClick = elem.find('.img-box-container:first .img-box-elem').attr('onclick');
            boxClick = str_replace( ['%' , '*'], [ 3 , dataJSON.news[num].id ], boxClick );
            
            $('<div class="img-box-more" onclick="'+ boxClick +'">+'+ current.img_more +'</div>').appendTo(elem.find('.img-box-container:last'));
          }
          if( current.img_box ) elem.find('.img-box-container').css('width', 100 / current.img_box.length + '%' );
          
          if( elem.find('.news-body .img-elem').length  > 0 )
            for( var i = 0 ; i < elem.find('.news-body .img-elem').length  ; i++ ) {
              var imgSetEvent = elem.find('.news-body .img-elem').eq(i);
              imgSetEvent.attr('onclick' , str_replace( ['%' , '*'], [ i , dataJSON.news[num].id ], imgSetEvent.attr('onclick' ) ) );
            }
          
          if( !shareBool ) elem.appendTo( box );
          else {
            
            if( !current.blocked_me ) {
              elem.find('.news-footer').remove();
              elem.attr('class','news-share-object');
              elem.find('.news-content').attr('class','news-share-content');
              elem.appendTo('.news-object:last .news-shared');
              
            } else 
              $('<div class="news-share-object"><div class="news-share-content"><div class="alert-object-small">' + langs.privacy + '</div></div></div>').appendTo('.news-object:last .news-shared');
          
          }
          
          if( current.shared != '' ) genElem( num, true );
          else {
            num++;
            if( num < dataJSON.news.length && continueWall ) genElem( num, false );
            else {
              ajaxScrolling = true;
              continueWall = true;
              canStartScroll = true;
            }
          }
        } else {
          ajaxScrolling = true;
          continueWall = true;
          canStartScroll = true;
          return;
        }
      }
      
    });
  }
  
  function lightBoxScroll( block , props ) {
    
    var box = $('#pages #win-page #win-content'), page = $('#pages #win-page');
    
    if( box.outerHeight(true) + 2 * parseInt( page.find('#win-table-imit').css('padding') ) - $(window).height() - page.scrollTop() < 200 && !lightBoxEnd && canStartLightBox ) {

      canStartLightBox = false;
      
      props.from = $(block).find('.item').length;
      
      $.post( _root_ + '/php_requests/get_content.php', props , function(data){
        
        var dataJSON = JSON.parse( data );
        var tpl = dataJSON.tpl;
        delete dataJSON.tpl;        
        
        $( Mustache.to_html( tpl , dataJSON ) ).find('.content .item').appendTo( block );
          
        lightBoxEnd = dataJSON.end;
        canStartLightBox = true;
        
      });
      
    }
    
  }
  