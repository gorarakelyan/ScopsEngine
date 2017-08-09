/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var ajax, ajaxtrue = false, getParsedHTML, getParsedJSON, wallAjax = true, canStartScroll = false, continueWall = true, endOfScroll = false;
  var keyUpAjax , keyUpAjaxStart = false;
  var showFooter = false;
    
  function ajaxQuery( url , content, id , putLoader , event ) {
    
    if( $('.full-dialogue .chat-window').length ) closeChat( $('.full-dialogue .chat-window').data('id') );
    if(ajaxtrue == true) ajax.abort();
    
    wallAjax = true;
    endOfScroll = false;
    
    var dataSend = 'ajax=1&tab=' + url;
    
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
        case 'game':
          changeLoc( 'game' + id );
        break;
        case 'chat':
          changeLoc( 'chat' + id );
        break;
      }
    }
    
    if( !putLoader ) loader('#content-positioning .main-content' , 'block');
    $('#content-positioning .main-footer').attr('class','main-footer hide');
    showFooter = false;
    
    if( url == 'chat' ) {
      fullDialogue( id );
      ajaxGenData( false );
    } else {
      ajaxtrue = true;
      ajax = $.ajax({
        type: 'GET',
        url: '../php_main/tab.php',
        data: dataSend,
        success: function(data) {
          ajaxtrue = false;
          parseJSON( data, 'ajaxGenData( true )' );
        }
      });
    } 
    
    if( event ) event.preventDefault();
    
  } 
  
  function ajaxGenData( bool ) {
    if( bool ) $('#content-positioning .main-content').html(getParsedHTML);
    
    showFooter = true;
    setTimeout(function(){
      if( showFooter ) $('#content-positioning .main-footer').attr('class','main-footer');
    }, 1500);
    
    $(document).scrollTop(0);
    loadChat();
  }
  
  function fillDataTPL( php , exp , handle ) {
    $.post( php , exp , function(data){
      parseJSON( data, handle );
    });
  }
  
  function fillJSON( elem , bool , load , scroll , notif , emptyClass , chat ) {
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
    if( chat ) {
      if( chat == 'remLdr' ) refreshDialogues( 0 );
      setTimeout( function(){ resizeFullDial( 0 ); } , 100 );
      setTimeout( function(){ resizeFullDial( 0 ); } , 400 );
    }
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
      
      keyUpAjax = $.post( opt.action , opt , function(data){
        parseJSON( data , 'fillJSON(\'' + box + '\')' );
        keyUpAjaxStart = false;
      });
    } , 200 );
  }
  
  function fillMUSIC( elem , load , scroll , playlist ) {
    
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
    
    if( playlist ) elem.data( 'playlist', playlist );
    
  }
  
  function generateFeed( php , exp , box , oneBlock , empty ) {
    continueWall = true;
    var linkNews = window.location.pathname;
    var startNum = $('.news-object').length;
    $.post( php , exp , function(dataRes){
      
      var dataJSON = JSON.parse( dataRes );
      var tpl = dataJSON.tpl;
      delete dataJSON.tpl;
      
      endOfScroll = dataJSON.end;
      
      var images = new Array();
      
      if( dataJSON.news.length > 0 ) {
        wallAjax = false;
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
        
        if( !oneBlock ) {
          if( !shareBool ) checkLoaded( i );
          else appendElem( i , true );
        } else appendElem( i , shareBool );
      }  
        
      function checkLoaded( i ) {
        var check = true;
        for( var m = 0 ; m < i ; m++ ) 
          if( dataJSON.news[m].img > 0 )  
          for( var n = 0 ; n < images[m].length ; n++ )
            if( images[m][n] == false ) {
              check = false;
              break;
            }
            
        if( check == true ) appendElem( i , false );
        else setTimeout( function(){ checkLoaded( i ); }, 100 );
      }
      
      function appendElem( num , shareBool ) {
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
          
          if( !shareBool ) {
            elem.css( 'opacity', 0 );
            elem.appendTo( box );
            
            if( elem.offset().left - box.offset().left == 0 ) elem.css('padding-right','10px');
            else elem.css('padding-left','10px');
            
            if( current.img > 0 ) {
              images[num] = new Array();
              
              for( var j = 0 ; j < current.img ; j++ ) {
                images[num][j] = false;
                if( $('.news-object').eq( num + startNum ).find('img')[j] ) {
                  var image = $('.news-object').eq( num + startNum ).find('img')[j];
                  image.onload = setLoadedImg( num , j );
                }
              }
            }
            
          } else {
            
            if( !current.blocked_me ) {
              elem.find('.news-footer').remove();
              elem.attr('class','news-share-object');
              elem.find('.news-content').attr('class','news-share-content');
              elem.appendTo('.news-object:last .news-shared');
              
              if( current.img > 0 ) {
                if( !images[num] ) images[num] = new Array();
                for( var j = dataJSON.news[num].img ; j < dataJSON.news[num].img + current.img ; j++ ) {
                  images[num][j] = false;
                  if( $('.news-object').eq( num + startNum ).find('img')[j] ) {
                    var image = $('.news-object').eq( num + startNum ).find('img')[j];
                    image.onload = setLoadedImg( num , j );
                  }
                }
              }
            } else {
              $('<div class="news-share-object"><div class="news-share-content"><div class="alert-object-small">' + langs.privacy + '</div></div></div>').appendTo('.news-object:last .news-shared');
            }
            
          }
          
          if( $('.news-object').length > 2 && !shareBool ) {
            
            if( !oneBlock ) {
              var arrayPos = new Array( new Array(), new Array() );
              
              for( var i = 0 ; i < $('.news-object').length ; i++ ) 
                if( $('.news-object').eq(i).offset().left - box.offset().left == 0 )
                  arrayPos[0][arrayPos[0].length] = i;
                else arrayPos[1][arrayPos[1].length] = i;
                
              if( arrayPos[0][arrayPos[0].length - 1] == $('.news-object').length - 1 ) var type = 0;
              else var type = 1;
                
              var margin_prev = $('.news-object').eq( arrayPos[type][arrayPos[type].length - 2] ).offset().top - box.offset().top + 
                $('.news-object').eq( arrayPos[type][arrayPos[type].length - 2] ).innerHeight() + 20;
              var margin_this = elem.offset().top - box.offset().top;
              
              var margin = margin_prev - margin_this;
              
              elem.css('margin-top',margin);
            }
            
            setTimeout( function(){ elem.css('opacity','1') } ,5 );
          } else setTimeout( function(){ elem.css('opacity','1') } ,5 );
          
          if( current.shared != '' ) genElem( num, true );
          else {
            num++;
            if( num < dataJSON.news.length && continueWall ) setTimeout( function(){ genElem( num, false ); }, 50);
            else {
              fixWall();
              ajaxScrolling = true;
              wallAjax = true;
              continueWall = true;
            }
          }
        } else {
          fixWall();
          ajaxScrolling = true;
          wallAjax = true;
          continueWall = true;
          return;
        }
      }
      
      function setLoadedImg( i , j ) {
      
        setTimeout( function() { images[i][j] = true; }, 100) ;
        
      }
      
    });
  }
  
  function fixWall() {
    box = $('.news-object').parent();
    
    for( var i = 2 ; i < box.find('.news-object').length ; i++ ) {
      
      var arrayPos = [[],[]];
      for( var j = 0 ; j <= i ; j++ )
        if( box.find('.news-object').eq(j).offset().left - box.offset().left < 25 )
          arrayPos[0][arrayPos[0].length] = j;
        else arrayPos[1][arrayPos[1].length] = j;
      
      var elem = box.find('.news-object').eq(i);
      if( arrayPos[0][arrayPos[0].length - 1] == i ) var type = 0;
      else var type = 1;
        
      var margin_prev = box.find('.news-object').eq( arrayPos[type][arrayPos[type].length - 2] ).offset().top + 
      box.find('.news-object').eq( arrayPos[type][arrayPos[type].length - 2] ).innerHeight() + 20;
      
      var margin_this = elem.offset().top;
      var margin = margin_prev - margin_this;
      elem.css('margin-top', parseInt( elem.css('margin-top') ) + margin );
      
      if( elem.offset().left - box.offset().left < 20 ) elem.css('padding-right','10px').css('padding-left' , 0);
      else elem.css('padding-left','10px').css('padding-right' , 0);
      
    }
  }
  
  function lightBoxScroll( block , props ) {
    
    var box = $('#pages #win-page #win-content'), page = $('#pages #win-page');
    
    if( box.outerHeight(true) + 2 * parseInt( page.find('#win-table-imit').css('padding') ) - $(window).height() - page.scrollTop() < 200 && !lightBoxEnd && canStartLightBox ) {

      canStartLightBox = false;
      
      props.from = $(block).find('.item').length;
      
      $.post('../php_requests/get_content.php', props , function(data){
        
        var dataJSON = JSON.parse( data );
        var tpl = dataJSON.tpl;
        delete dataJSON.tpl;        
        
        $( Mustache.to_html( tpl , dataJSON ) ).find('.content .item').appendTo( block );
          
        lightBoxEnd = dataJSON.end;
        canStartLightBox = true;
        
      });
      
    }
    
  }
  