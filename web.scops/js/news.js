/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var commAjax, commentsEnd = false, commentsLoaded = false, playingVideo;
  
  function openVideo( id , url ) {
    if( playingVideo ) $( '#vid-' + playingVideo.id ).html( playingVideo.html );
    playingVideo = { html: $('#vid-' + id).children().clone() , id: id };
    $('#vid-' + id).html('<div class="video-container" style="width:100%;height:'+ $('#vid-' + id).innerHeight() +'px;"></div>');
    startVideo( '../'+url ); 
  }
  
  function watchMedia( postID , parent, postBool , mediaType , turn ) {
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage( postBool );
      if( postBool ) openNews( parent );
    });
    
    if( postBool ) closeNews( true );
    openWinPage( ( mediaType == 1 )?'90%':'80%' , false );
    $.post('../php_requests/get_content.php',{ content: 'media_view', post_id: postID , media: mediaType },function(dataRes){
      
      var dataJSON = JSON.parse( dataRes );

      var tpl = dataJSON.tpl;
      delete dataJSON.tpl;
      
      var scriptData = dataJSON.script;
      delete dataJSON.script;
      
      var elem = Mustache.to_html( tpl , dataJSON );
      $('#pages #win-page #win-content').html( elem );
      
      elem = $('#pages #win-page #win-content');
      elem.find('.options .close').click(function(){
        closeWinPage( postBool );
        if( postBool ) openNews( parent );
      });
      
      elem.find('.open-post').click(function(){
        var open = elem.find('.open-post').data('id');
        closeWinPage( true );
        openNews( open );
      });
    
      if( !dataJSON.media.empty ) {
        if( mediaType == 1 ) {  
          scriptData = JSON.parse( scriptData );
          
          var currentImg = turn;
          changePhotosGallery( elem ,scriptData, currentImg );
          
          elem.find('.body .next').click(function(){  changePhotosGallery( elem ,scriptData, ( currentImg < scriptData.length - 1 )? ++currentImg : currentImg = 0 ); });
          elem.find('.body .prev').click(function(){  changePhotosGallery( elem ,scriptData, ( currentImg > 0 )? --currentImg : currentImg = scriptData.length - 1 ); });
        } else  startVideo( '../' + scriptData );
      } 
    });
  }
  
  function changePhotosGallery( elem ,scriptData, num ) {
    elem.find('.img').html( '<img src="../' + scriptData[num] + '">' );
    elem.find('.count').text( langs.photo_gal_title + ' ' + ( num + 1 ) + ' ' + langs.photo_gal_of + ' ' + scriptData.length);
    elem.find('.footer .about.current').text( num + 1 );
    elem.find('.footer .about.current-link').text( scriptData[num] );
  }
  
  function openLedNews( id , event ) {
    if( $( event.target ).closest('.news-header').length ) return;
    if( !$( '.news-object#news-' + id + '.news-share-object' ).length ) {
      if( !$( event.target ).closest('.news-cont-object').hasClass('dont-react') && !$( event.target ).hasClass('dont-react') ) openNews( id );
    } else {
      if( !$( event.target ).closest('.news-share-object').length || ( $( event.target ).closest('.news-share-object').data('id') == id ) )
        openNews( id );
    }
  }
  
  function openNews( id ){
    if( $('#pages #pop-page #page-content table').length ) {
      $('#pages #pop-page #page-content').empty();
      if( commAjax ) commAjax.abort()
    } else openPopPage();
    
    commentsEnd = false;
    
    var loc = window.location.pathname.split('/');
    if( loc[0].substring( 0 , 4 ) != 'post' && loc[1].substring( 0 , 4 ) != 'post' ) befPostURL = window.location.pathname;
      
    changeLoc( 'post' + id );
    
    $.post( '../php_requests/get_content.php' , { content: 'news_view', post_id: id } , function(dataRes){

      var dataJSON = JSON.parse( dataRes );
      var tpl = dataJSON.tpl;
      delete dataJSON.tpl;
      
      if( dataJSON.news.blocked_me || !dataJSON.news.isset ) {
        
          var elem = $('<table><div class="alert-object-big">' + langs.privacy + '</div></table>');
          
          $('#pages #pop-page #page-content').html(elem);
        
      }
      else {
        
        if( dataJSON.news.video_glob != '' )
          dataJSON.news.video_glob = JSON.parse(dataJSON.news.video_glob);
        
        if( dataJSON.news.link != '' )
          dataJSON.news.link = JSON.parse(dataJSON.news.link);
        
        if( dataJSON.news.img > 0 ) {
          dataJSON.news.img_big = JSON.parse(dataJSON.news.img_big);
          dataJSON.news.img_medium = JSON.parse(dataJSON.news.img_medium);
        }
        
        if( dataJSON.news.img > 2 ) {
          if( dataJSON.news.img > 4 ) dataJSON.news.img_more = dataJSON.news.img - 4 ;
          var firstImg = dataJSON.news.img_big.splice(0,1);
          var boxImages = dataJSON.news.img_medium.splice(1,3);
          dataJSON.news.img_box = boxImages;
          dataJSON.news.img_big = firstImg;
          dataJSON.news.box = true;
          dataJSON.news.img = 1;
        }
        
        var elem = $( Mustache.to_html( tpl , $.extend( {}, dataJSON.news , { langs: langs } ) ) );
        
        if( dataJSON.news.img_more > 0 ) {
          var boxClick = elem.find('.img-box-container:first .img-box-elem').attr('onclick');
          boxClick = str_replace( ['%' , '*'], [ 3 , id ], boxClick );
            
          $('<div class="img-box-more" onclick="'+ boxClick +'">+'+ dataJSON.news.img_more +'</div>').appendTo(elem.find('.img-box-container:last'));
        }
        
        if( dataJSON.news.img_box ) elem.find('.img-box-container').css('width', 100 / dataJSON.news.img_box.length + '%' );
          
        if( elem.find('.news-body .img-elem').length > 0 ) 
          for( var i = 0 ; i < elem.find('.news-body .img-elem').length ; i++ ) {
            var imgSetEvent = elem.find('.news-body .img-elem').eq(i);
            imgSetEvent.attr('onclick' , str_replace( ['%' , '*'], [ i , id ], imgSetEvent.attr('onclick' ) ) );
          }
        
        if( dataJSON.news.audio ) {
          for( var a = 0 ; a < dataJSON.news.audio_count ; a++ )
          $( Mustache.to_html( dataJSON.news.audio_tpl , $.extend( {}, { 'music':dataJSON.news.audio_array[a] } , { langs: langs } ) ) ).appendTo(elem.find('.audiolist'));
        }
        
        if( dataJSON.news.shared != '' ) {
          if( !dataJSON.news.share_array.blocked_me ) {
            
            if( dataJSON.news.share_array.video_glob != '' )
              dataJSON.news.share_array.video_glob = JSON.parse(dataJSON.news.share_array.video_glob);
            
            if( dataJSON.news.share_array.link != '' )
              dataJSON.news.share_array.link = JSON.parse(dataJSON.news.share_array.link);
            
            if( dataJSON.news.share_array.img > 0 ) {
              dataJSON.news.share_array.img_big = JSON.parse(dataJSON.news.share_array.img_big);
              dataJSON.news.share_array.img_medium = JSON.parse(dataJSON.news.share_array.img_medium);
            }
        
            if( dataJSON.news.share_array.img > 2 ) {
              if( dataJSON.news.share_array.img > 4 ) dataJSON.news.share_array.img_more = dataJSON.news.share_array.img - 4 ;
              var firstImg = dataJSON.news.share_array.img_big.splice(0,1);
              var boxImages = dataJSON.news.share_array.img_medium.splice(1,3);
              dataJSON.news.share_array.img_box = boxImages;
              dataJSON.news.share_array.img_big = firstImg;
              dataJSON.news.share_array.box = true;
              dataJSON.news.share_array.img = 1;
            }
            
            var share = $( Mustache.to_html( tpl , $.extend( {},  dataJSON.news.share_array , { langs: langs } ) ) );
            
            if( dataJSON.news.share_array.img_more > 0 ) {
              var boxClick = share.find('.img-box-container:first .img-box-elem').attr('onclick');
              boxClick = str_replace( ['%' , '*'], [ 3 , id ], boxClick );
                
              $('<div class="img-box-more" onclick="'+ boxClick +'">+'+ dataJSON.news.share_array.img_more +'</div>').appendTo(share.find('.img-box-container:last'));
            }
        
            if( dataJSON.news.share_array.img_box ) share.find('.img-box-container').css('width', 100 / dataJSON.news.share_array.img_box.length + '%' );
              
            if( share.find('.news-body .img-elem').length > 0 ) 
              for( var i = 0 ; i < share.find('.news-body .img-elem').length ; i++ ) {
                var imgSetEvent = share.find('.news-body .img-elem').eq(i);
                imgSetEvent.attr('onclick' , str_replace( ['%' , '*'], [ i , id ], imgSetEvent.attr('onclick' ) ) );
              }
            
            share = $(share).find('#left-block');
            $(share).attr('class','news-share-object');
            $(share).find('.news-content').attr('class','news-share-content');
            
            if( dataJSON.news.share_array.audio ) {        
              for( var a = 0 ; a < dataJSON.news.share_array.audio_count ; a++ )
              $( Mustache.to_html( dataJSON.news.share_array.audio_tpl , $.extend( {},  { 'music':dataJSON.news.share_array.audio_array[a] } , { langs: langs } ) ) ).appendTo($(share).find('.audiolist'));
            }
            
            var table = $('<table></table>');
            $(share).appendTo( table );
            $(table).appendTo( elem.find('.news-shared') );
          } else {
            $('<table><div class="news-share-object"><div class="news-share-content"><div class="alert-object-small">' + langs.privacy + '</div></div></div></table>').appendTo( elem.find('.news-shared') );
          }
        }
        
        if( browser() == 'Firefox' ) {
          var max = $(window).width() * .8 * .7 - 150 ;
          elem.find('.img.news-cont-object.img-elem').css('max-width' , max);
        }        
        
        $('#pages #pop-page #page-content').html( elem );
          
        fillDataTPL('../php_requests/comments.php',{type: 'fill', length: loadContentLengths[6], 'from': 'NULL', article: id },'fillCOMM(\'.comments-show-area .comments-box\' , ' + id +')');
        $('#pages #pop-page #page-content').attr( 'onscroll' , 'getMoreComments(' + id + ')' );
      }
    });
    
  }
  
  function getMoreComments( id ) {
    if( $('.comments-box').innerHeight() - $('#page-content').scrollTop() - $(window).height() < 300 && !commentsEnd ) {
      if( commentsLoaded ) {
        commentsLoaded = false;
        var lastID = $('#news-'+ id +' .comments-box .comment:last').attr('id');
        if( lastID ) {
          lastID = lastID.substring( 5, lastID.length );
          fillDataTPL('../php_requests/comments.php',{type: 'fill', length: loadContentLengths[6], 'from': lastID, article: id },'fillCOMM(\'#news-'+ id +' .comments-show-area .comments-box\' )');
        }
      }
    }
  }
    
  function closeNews( bool ) {
    
    var loc = befPostURL.split('/');
    if( loc[0].substring( 0 , 4 ) != 'post' && loc[1].substring( 0 , 4 ) != 'post' ) changeLoc( befPostURL );
    else ajaxQuery( 'user' , 'wall' , getCookie('id') );
      
    $('#pages #pop-page #page-content').empty();
    $('#pages #pop-page #page-content').attr( 'onscroll' , '');
    if( commAjax ) commAjax.abort()
    setTimeout(function(){
      closePopPage( bool );
    },10);
    
  }
  
  function fillCOMM( elem , id) {
    
    commentsEnd = getParsedJSON.end;
    
    var html = $( getParsedHTML ) , item , sendTime = 0 , time = '';
    for( var i = 0; i < html.length ; i++ ) {
      
      item = html.eq(i).find('.comm-time');
      sendTime = new Date( parseInt( item.text() ) * 1000 );
      time = humanDate( sendTime.getDate() + '.' + sendTime.getMonth() ) + ' ' + sendTime.getHours() + ':' + ( sendTime.getMinutes() > 9 ? sendTime.getMinutes() : '0' + sendTime.getMinutes() );
      item.text( time );
      
    }
    html.appendTo( elem );
    
    commentsLoaded = true;
    
    if( id ) startListenComms( id );
    
  }
  
  function sendComm( event, id ) {
    if( event.keyCode == 13 && !event.shiftKey ) {  
      var val = $('.comments-show-area .comment-input').val();
      $.post('../php_requests/comments.php',{type: 'send', article: id, text: val  });
      $('.comments-show-area .comment-input').val('');  
      event.preventDefault();
    }
  }
  
  function startListenComms( id ) {
    if( $('.comments-box .comment').length ) {
      var lastComm = $('.comments-box .comment:first').attr('id');
      lastComm = lastComm.substring(5,lastComm.length);
    } else var lastComm = 0;
    commAjax = $.post('../php_requests/comments.php',{ type: 'listen', article: id, comm: lastComm },function(data){
      
      if( data != 'NULL' && $('.comments-box').length > 0 ) {
        
        var dataJSON = JSON.parse( data );
        var tpl = dataJSON.tpl;
        delete dataJSON.tpl;
        
        var html = $(Mustache.to_html( tpl, dataJSON )) , item , sendTime = 0 , time = '';
        for( var i = 0; i < html.length ; i++ ) {
          
          item = html.eq(i).find('.comm-time');
          sendTime = new Date( parseInt( item.text() ) * 1000 );
          time = humanDate( sendTime.getDate() + '.' + sendTime.getMonth() ) + ' ' + sendTime.getHours() + ':' + ( sendTime.getMinutes() > 9 ? sendTime.getMinutes() : '0' + sendTime.getMinutes() );
          item.text( time );
          
        }
        if( $( html[html.length - 1] ).data('id') > $('.comments-box .comment:first').data('id') ) html.prependTo('.comments-box');
        
      }
      
      if( $('.comments-box').length > 0 ) startListenComms( id );
      
    });
  }
  
  function openPopPage() {
    
    $('#pages #pop-page').css('display','block');
    setTimeout(function(){
      
      $('#pages #pop-page .shadow-object').css('opacity','1');
      $('#pages #pop-page #page-content').css('opacity','1');
      
      setTimeout(function(){ 
        $('body').css('overflow','hidden'); 
        $('#pages #pop-page #page-content').css('overflow-y','scroll'); 
      },100);
      
    },0);
    
  }
  
  function closePopPage( bool ) {
    
    if( !bool ) {
      $('body').css('overflow-y','scroll');
      $('body').css('overflow-x','auto');
    }
    $('#pages #pop-page #page-content').css('overflow-y','hidden');
    
    
    $('#pages #pop-page .shadow-object').css('opacity','0');
    $('#pages #pop-page #page-content').css('opacity','0');
      
    setTimeout(function(){
      
      $('#pages #pop-page').css('display','none');
      
    }, 300);
    
  }
  
  function deletePost( id ) {
    request( 6 , id );
  }
  
  function makeProfPic( id , type, author ) {
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage( true );
      openNews( id );
    });
    if( $('#pages #pop-page #page-content table').length ) closeNews( true );
    openWinPage( 0 , false );
    loader( $('#pages #win-page #win-content') );
    $.post('../php_requests/get_content.php',{ 'content': 'news_view', 'post_id': id },function( dataRes ){
      var dataJSON = JSON.parse( dataRes );
      var tpl = dataJSON.tpl;
      delete dataJSON.tpl;
      
      var dragWidth = 100 + 215*type;
      var imgLink = JSON.parse(dataJSON.news.img_big)[0];
      
      var bg = new Image();
      bg.src = '../'+imgLink;
      
      bg.onload = function(){
        var html = '\
        <div id="img-thumb-form">\
          <div id="thumb-header">\
            <div class="text">\
              <div>' + langs.thumb + '</div>\
              <div class="about">' + langs.thumb_descr + '</div>\
            </div>\
          </div>\
          <div id="resize-choose">\
            <img id="bg-img" src="../'+ imgLink +'">\
            <div id="drag-area">\
              <div id="drag" style="width:'+ dragWidth +'px">\
                <div class="thumb-box">\
                  <img class="thumb" src="../'+ imgLink +'">\
                </div>\
              </div>\
            </div>\
            <canvas id="canvas" style="display:none"></canvas>\
          </div>\
          <div id="resize-result">\
            <div id="resize-img" style="background:url(\'../'+ imgLink +'\');background-repeat: no-repeat;"></div>\
            <div id="save-btn" class="input-btn-object" onclick="saveThumb('+ id +' , '+ type +', '+ author +')">' + langs.save + '</div>\
          </div>\
        </div>\
          ';
        
        $('#pages #win-page #win-content').html( html );
        var imgElem = $('#img-thumb-form #bg-img');
        
        $('#img-thumb-form #drag .thumb').css('width', imgElem.width()).css('margin-left','-' + $('#img-thumb-form #drag').position().left + 'px').css('margin-top', '-' + $('#img-thumb-form #drag').position().top + 'px ');      
        
        if( !type ) {
          $('#img-thumb-form #resize-img').height( $('#img-thumb-form #resize-img').width() );
          var dragK = ( imgElem.width() > imgElem.height() )?imgElem.height():imgElem.width();
          $('#img-thumb-form #drag').width( dragK * 0.8 ).height( dragK * 0.8 ).css('left', ( imgElem.width() - dragK*0.8 ) / 2 + 'px' ).css('top', ( imgElem.height() - dragK*0.8 ) / 2 + 'px' );
          $('#img-thumb-form #drag .thumb').css('width', imgElem.width()).css('margin-left','-' + $('#img-thumb-form #drag').position().left + 'px').css('margin-top', '-' + $('#img-thumb-form #drag').position().top + 'px ');
        } else {
          $('#img-thumb-form #resize-img').height( 300/950 * $('#img-thumb-form #resize-img').width() );
          if( 300 * imgElem.width() > imgElem.height() * 950) {
            $('#img-thumb-form #drag').height( imgElem.height() * 0.8 ).width( imgElem.height() * 0.8 * 950 / 300 );
          } else {
            $('#img-thumb-form #drag').width( imgElem.width() * 0.8 ).height( imgElem.width() * 0.8 * 300 / 950 );
          }
          $('#img-thumb-form #drag').css('left', ( imgElem.width() - $('#img-thumb-form #drag').width() ) / 2 + 'px' ).css('top', ( imgElem.height() - $('#img-thumb-form #drag').height() ) / 2 + 'px' );
          $('#img-thumb-form #drag .thumb').css('width', imgElem.width()).css('margin-left','-' + $('#img-thumb-form #drag').position().left + 'px').css('margin-top', '-' + $('#img-thumb-form #drag').position().top + 'px ');
        }
        
        var example = $('#img-thumb-form #resize-img').width() / $('#img-thumb-form #drag').width();
        $('#img-thumb-form #resize-img').css('background-size', imgElem.width()*example).css('background-position','-' + $('#img-thumb-form #drag').position().left*example + 'px -' + $('#img-thumb-form #drag').position().top*example + 'px ');
        
        $('#img-thumb-form #drag-area').css('height', imgElem.height() ).css('width', imgElem.width() )
        .css('top', imgElem.position().top ).css('left', imgElem.position().left + parseInt( imgElem.css('margin-left') ) );
        
        $('#img-thumb-form #drag').draggable({
          scroll:false,
          containment: '#img-thumb-form #drag-area',
          start: function(){
            $('#img-thumb-form .thumb').css('opacity',0);
          },
          drag: function(){
            var example = $('#img-thumb-form #resize-img').width() / $('#img-thumb-form #drag').width();
            $('#img-thumb-form #drag .thumb').css('width', imgElem.width()).css('margin-left','-' + $('#img-thumb-form #drag').position().left + 'px').css('margin-top', '-' + $('#img-thumb-form #drag').position().top + 'px ');
            $('#img-thumb-form #resize-img').css('background-size', imgElem.width()*example).css('background-position','-' + $('#img-thumb-form #drag').position().left*example + 'px -' + $('#img-thumb-form #drag').position().top *example+ 'px ');
          },
          stop: function(){
            $('#img-thumb-form #drag .thumb').css('width', imgElem.width()).css('margin-left','-' + $('#img-thumb-form #drag').position().left + 'px').css('margin-top', '-' + $('#img-thumb-form #drag').position().top + 'px ');
            $('#img-thumb-form .thumb').css('opacity',1);
          }
        }).resizable({
          containment: '#img-thumb-form #drag-area',
          handles:'ne,se,sw,nw',
          aspectRatio: true,
          
          resize: function(){
            $('#img-thumb-form #drag .thumb').css('width', imgElem.width()).css('margin-left','-' + $('#img-thumb-form #drag').position().left + 'px').css('margin-top', '-' + $('#img-thumb-form #drag').position().top + 'px ');
            var example = $('#img-thumb-form #resize-img').width() / $('#img-thumb-form #drag').width();
            $('#img-thumb-form #resize-img').css('background-size', imgElem.width() * example).css('background-position','-' + $('#img-thumb-form #drag').position().left * example + 'px -' + $('#img-thumb-form #drag').position().top * example + 'px ');
          }
        });
      };
    });
  }
  
  function saveThumb( id , type , author ) {
    var canvas = document.getElementById('canvas'),
        k = document.getElementById('bg-img').naturalWidth / $('#img-thumb-form #bg-img').width(),
        elem = $('#img-thumb-form #drag'), top = elem.position().top * k , left = elem.position().left * k , 
        width = elem.width() * k , height = elem.height() * k;
        
    var imageObj = document.getElementById('bg-img');
    var array = new Array();
    var i = 0;
    
    for( var num = 220 ; num < 1500 ; num *= 2.6 ) {
        
        var rel = width / num;
        var newWidth = imageObj.naturalWidth / rel;
        var newHeight =  imageObj.naturalHeight / rel;
        var newLeft = - left /rel;
        var newTop = - top / rel;
        var context = canvas.getContext('2d');
        canvas.width = num;
        canvas.height = num * height / width;
        context.drawImage( imageObj , newLeft , newTop , newWidth, newHeight);
        array[i++] = canvas.toDataURL('image/jpeg');
        
    }
    var photo = ( type == 0 )?'img':'cover';
    $('#img-thumb-form #resize-result #save-btn').attr('onclick','');
    loader( $('#img-thumb-form #resize-result #save-btn') , 'inline' );
    
    if( author ) {
      var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
    
      $.post('../php_requests/upload_post.php',{ img: JSON.stringify( array ), id: id, type: 'thumb', photo: photo, club: clubID },function(data){
        window.location.reload();
      });
      
    } else {
      $.post('../php_requests/upload_post.php',{ img: JSON.stringify( array ), id: id, type: 'thumb', photo: photo },function(data){
        window.location.reload();
      });
    }
  }
  
  function linkFromNews( id , author ) {
    closeNews();
    setTimeout( function() { ajaxQuery( ( !author ? 'user' : 'club' ) , 'wall' , id ); } , 100 );
  }
  
  function likePost( type , id ) { 
    request( type , id ); 
  }
  
  function showNewsActions( type , id ) {
    if( $('#pages #pop-page #page-content table').length ) {
      
      closeNews( true );
      $('#pages #win-page .shadow-object').bind('click' , function(){
        $('#pages #win-page .shadow-object').unbind('click');
        closeWinPage( true );
        openNews( id );
      });
      
      openWinPage( 600 );
    } else openWinPage( 600 , true );
    
    var props = { content: 'likes' , like_type: type == 3 ? 'likes' : 'unlikes' , post_id: id , 'from': 0 , 'length': loadContentLengths[12] };
    
    $('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
    
    loader( '#pages #win-page #win-content' );
    fillDataTPL( '../php_requests/get_content.php' , props , 'fillJSON(\'#pages #win-page #win-content\')' );
  }
  
  function viewProfWin( id ) {
    closeWinPage();
    ajaxQuery( 'user' , 'wall' , id );
  }
  
  function showCommentsActions( type , id ) {
    if( $('#pages #pop-page #page-content table').length ) {
      
      var newsId = $('#pop-page .news-panel').data('id');
      closeNews( true );
      $('#pages #win-page .shadow-object').bind('click' , function(){
        $('#pages #win-page .shadow-object').unbind('click');
        closeWinPage( true );
        openNews( newsId );
      });
      
      openWinPage( 600 );
    } else openWinPage( 600 , true );
    
    var props = { content: 'comm_likes' , like_type: type == 0 ? 'likes' : 'unlikes' , comm_id: id , 'from': 0 , 'length': loadContentLengths[12] };
    
    $('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
    
    loader( '#pages #win-page #win-content' );
    fillDataTPL( '../php_requests/get_content.php' , props , 'fillJSON(\'#pages #win-page #win-content\')' );
  }
  
  function editPost( id , wall ) {
    
    if( wall ) {
      var edit = $('.news-object#news-' + id + ' .edit-text');
      var text = $('.news-object#news-' + id + ' .news-cont-object.text');
    } else {
      var edit = $('#pop-page .news-object .edit-text');
      var text = $('#pop-page .news-object .news-cont-object.text');
    }
    
    text.addClass('hidden');
    edit.removeClass('hidden');
    edit.find('textarea').val(text.data('text'));
    
    if( wall ) fixWall();
    
  }
  
  function saveEditedPost( id , wall ) {
    
    if( wall ) {
      var edit = $('.news-object#news-' + id + ' .edit-text');
      var text = $('.news-object#news-' + id + ' .news-cont-object.text');
    } else {
      var edit = $('#pop-page .news-object .edit-text');
      var text = $('#pop-page .news-object .news-cont-object.text');
    }
    
    text.removeClass('hidden');
    edit.addClass('hidden');
    
    var newText = edit.find('textarea').val();
    
    text.html( newText ).data('text', newText);
    
    if( wall ) fixWall();
    
    $.post('../php_requests/request.php',{ type: 40, id: id, text: newText },function( data ){
      
      if( data ) addAlert(1);
      else addAlert( langs.error_try );
      
    });
    
  }
  