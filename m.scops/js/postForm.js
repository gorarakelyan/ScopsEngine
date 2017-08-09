/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var clubPost = 0;
  var audioAttach = "" , videoLocAttach = "", peopleAttach = "";
  var arrayUplTexts;
  var attachMarker;

  function insertUploadForm( elem , type, club ) {
    
    switch( type ) {
      case 'post':
        var html = '  \
        <div id="new-post-box">\
          <div class="area">\
            <div class="box">\
              <div class="form material-object">\
                <form action="' + _root_ + '/php_requests/upload_post.php" enctype="multipart/form-data" method="post" id="new-post-form">\
                  <textarea rows="3" name="text" placeholder="' + langs.post_text + '" class="post-text" onpaste="checkLinkEx()" onkeyup="checkLinkEx()"></textarea>\
                  <input type="hidden" value="post" name="type">\
                  <input type="hidden" value="' + getCookie('link') + '" name="log_link">\
                  <input type="hidden" value="true" name="mobile_application">\
                  <div class="form-attach" id="form-attach-people">\
                    <span class="form-attach-input" onclick="showAttachBox( \'people\' )"></span>\
                    <input type="hidden" value="" id="attach-people-input" name="people">\
                    <div class="input-empty input-btn-object" onclick="emptyFormAttach(\'people\')"></div>\
                  </div>\
                  <div class="form-attach" id="form-attach-pic">\
                    <span class="form-attach-input"></span>\
                    <input id="attach-pic-input" name="photoimg[]" accept=".png, .jpg, .jpeg .jpg" multiple type="file" onchange="setFormAttach(\'pic\')">\
                    <div class="input-empty input-btn-object" onclick="emptyFormAttach( \'pic\' )"></div>\
                  </div>\
                  <div class="form-attach" id="form-attach-link">\
                    <span class="form-attach-input"></span>\
                    <input type="hidden" class="form-attach-choose input-textarea-object" id="attach-link-input" name="link"></textarea>\
                    <div class="input-empty input-btn-object" onclick="emptyFormAttach(\'link\')"></div>\
                  </div>\
                  <div class="form-attach" id="form-attach-videoLoc">\
                    <span class="form-attach-input" onclick="showAttachBox( \'videoLoc\' )"></span>\
                    <input type="hidden" value="" id="attach-videoLoc-input" name="videoLoc">\
                    <div class="input-empty input-btn-object" onclick="emptyFormAttach(\'videoLoc\')"></div>\
                  </div>\
                  <div class="form-attach" id="form-attach-audio">\
                    <span class="form-attach-input" onclick="showAttachBox( \'audio\' )"></span>\
                    <input type="hidden" value="" id="attach-audio-input" name="audio">\
                    <div class="input-empty input-btn-object" onclick="emptyFormAttach(\'audio\')"></div>\
                  </div>\
                  <div class="map-attach">\
                    <input type="hidden" value="" name="location" class="attach-map-input">\
                    <div id="attach-location-map" class="hidden"></div>\
                  </div>\
                  <div id="form-buttons">\
                    <div class="icon-buttons" id="pic-choose"></div>\
                    <div class="icon-buttons" id="loc-choose" onclick="showAttachBox( \'videoLoc\' )"></div>\
                    <div class="icon-buttons" id="audio-choose" onclick="showAttachBox( \'audio\' )"></div>\
                    <div class="icon-buttons" id="friends-choose" onclick="showAttachBox( \'people\' )"></div>\
                    <div class="icon-buttons last" id="location-choose" onclick="showAttachMap()"></div>\
                    <input type="button" class="input-btn-object" id="insert-btn" name="upload-btn" value="' + langs.post_sb + '" onclick="uploadNewPost()">\
                  </div>\
                </form>\
              </div>\
              <div class="cursor">\
                <div class="icon"></div>\
              </div>\
            </div>\
          </div>\
        </div>';
      break;
      case 'photo':
        var html = '\
        <div id="new-post-box">\
          <div class="area">\
            <div class="box photo">\
              <div class="form material-object">\
                <form action="' + _root_ + '/php_requests/upload_post.php" enctype="multipart/form-data" method="post" id="new-post-form">\
                  <input type="hidden" value="photo" name="type">\
                  <input type="hidden" value="' + getCookie('link') + '" name="log_link">\
                  <input type="hidden" value="true" name="mobile_application">\
                  <div class="form-attach" id="form-attach-pic">\
                    <span class="form-attach-input"></span>\
                    <input id="attach-pic-input" name="photoimg[]" accept=".png, .jpg, .jpeg .jpg" multiple type="file" onchange="setFormAttach(\'pic\')">\
                    <div class="input-empty input-btn-object" onclick="emptyFormAttach( \'pic\' )"></div>\
                  </div>\
                  <div id="form-buttons">\
                    <div class="icon-buttons" id="pic-choose"></div>\
                    <input type="button" class="input-btn-object pic" id="insert-btn" name="upload-btn" value="' + langs.post_upl + '" onclick="uploadNewPost()">\
                  </div>\
                </form>\
              </div>\
            </div>\
          </div>\
        </div>';      
      break;
    }
    
    if( $('#new-post-box').length == 0 ) $(elem).html(html);
    
    audioAttach = '' , videoLocAttach = '', peopleAttach = '';
    
    if( $('#new-post-form #form-attach-pic').length ) {
      $('#new-post-form #form-buttons #pic-choose').click(function(){ $('#new-post-form #attach-pic-input').click(); });
      $('#new-post-form #form-attach-pic > span').click(function(){ $('#new-post-form #attach-pic-input').click(); });
    }
    
    if( club ) {
      clubPost = 1;
      var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
      $('<input name="club" type="hidden" value="' + clubID + '">').appendTo('#new-post-form');
    } else clubPost = 0;
    
    arrayUplTexts = [ langs.ajax_upl , langs.error_try , langs.ajax_success , langs.ajax_inv_format , langs.ajax_big_size , langs.ajax_select , langs.error_try , langs.ajax_aborted ];
  }

/************* Attach Boxes ************/
  
  function showAttachBox( type ) {
    openWinPage( '95%' , false );  
    
    loader('#pages #win-page #win-content');
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage( false );
      eval( type + 'Attach = "' + $('#form-attach-' + type + ' #attach-' + type + '-input').val() + '"' );
    });
    
    var props = { 'from': 0 , 'length': loadContentLengths[12] };
    
    if( clubPost ) {
      var clubID = window.location.pathname.split('/')[1].substring( 4, window.location.pathname.split('/')[1].length);
      $.extend( props , { author: clubPost , prof_id: clubID } );
    }
    
    switch( type ) {
      case 'audio':
        props.content = 'audio_attach';
      break;
      case 'videoLoc':
        props.content = 'video_loc_attach';
      break;
      case 'people':
        props.content = 'people_attach';
      break;
    }
    
    lightBoxContent = props.content;
    
    $('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
    
    fillDataTPL( _root_ + '/php_requests/get_content.php', props , 'fillATTACH( \'#pages #win-page #win-content\' , \''+ type +'\')' );
  }
  
  function fillATTACH( elem , name ) {
    
    $( elem ).html(getParsedHTML);
    
    if( audioAttach != '' && name == 'audio' ) {
      var attach =  audioAttach.split(',');
      $(elem).find('.options .button').text( langs.save_ch );
      if( attach.length ) $(elem).find('.options .count').text( attach.length );
      for( var i = 0 ; i < attach.length ; i++ ) $(elem).find('.item#item-' + attach[i]).attr('class','audio item select');
    }
    if( videoLocAttach != '' && name == 'videoLoc' ) {
      $(elem).find('.item#item-' + videoLocAttach).attr('class','video item select');
      $(elem).find('.options .count').text( langs.post_video + ': #' + videoLocAttach );
    }
    if( peopleAttach != '' && name == 'people' ) {
      var attach =  peopleAttach.split(',');
      $(elem).find('.options .button').text( langs.save_ch );
      if( attach.length ) $(elem).find('.options .count').text( attach.length );
      for( var i = 0 ; i < attach.length ; i++ ) $(elem).find('.item#item-' + attach[i]).attr('class','people item select');
    }
    
  }
  
  function selectAttach( type , num ) {
    var parent = $('#pages #win-page #win-content');
    switch( type ) {
      case 1:
        audioAttach = modifyString( num.toString() , audioAttach.toString() );
        if( parent.find('.audio#item-' + num).hasClass('select') ) {
          parent.find('.count').text( parseInt(parent.find('.count').text()) - 1 );
          parent.find('.audio#item-' + num).attr('class' , 'item audio simple' );
        } else {
          parent.find('.count').text( parseInt(parent.find('.count').text()) + 1 );
          parent.find('.audio#item-' + num).attr('class' , 'item audio select' );
        }
      break;
      case 2:
        videoLocAttach = ( videoLocAttach == num )?"":num;
        
        parent.find('.video.item').not('.video#item-' + num).attr('class' , 'item video simple' );
        if( parent.find('.video#item-' + num).hasClass('simple') ) parent.find('.video#item-' + num).attr('class' , 'item video select' );
        else parent.find('.video#item-' + num).attr('class' , 'item video simple' );
        
        parent.find('.count').text( ( videoLocAttach != '' )?( langs.post_video + ': #' + videoLocAttach):'-' );
      break;
      case 3:
        peopleAttach = modifyString( num.toString() , peopleAttach.toString() );
        if( parent.find('.people#item-' + num).hasClass('select') ) {
          parent.find('.count').text( parseInt(parent.find('.count').text()) - 1 );
          parent.find('.people#item-' + num).attr('class' , 'item people simple' );
        } else {
          parent.find('.count').text( parseInt(parent.find('.count').text()) + 1 );
          parent.find('.people#item-' + num).attr('class' , 'item people select' );
        }
      break;
    }

  }
  
  function showAttachMap() {
    
    var map = $('#new-post-form #attach-location-map');
    
    if( map.hasClass('hidden') ) {
      
      map.removeClass('hidden');
      
      var latlng = { lat: 40.70871100268984, lng: -73.99921815312496 };
      
      if( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition(function( position ) {
          
          if( position ) latlng = { lat: position.coords.latitude , lng: position.coords.longitude };
          attachMarker = initMap( 'attach-location-map' , latlng );
          
        });
      } else attachMarker = initMap( 'attach-location-map' , latlng );
      
    } else {
      
      map.addClass('hidden');
      map.empty();
      
    }
  
  }
  
/************** Whole Post **************/

  function uploadNewPost() {
    
    $('#new-post-form .input-btn-object#insert-btn').attr('onclick','');
    var alert = addAlert( 0 , true );
    
    var map = $('#new-post-form #attach-location-map');
    if( !map.hasClass('hidden') ) {
      
      var latlng = { lat: attachMarker.getPosition().lat(), lng: attachMarker.getPosition().lng() };
      $('#new-post-form .attach-map-input').val( JSON.stringify( latlng ) );
      
    }
    
    $('#new-post-form').ajaxForm({
      success: function(data){
        removeAlert( alert );
        changeUserContent( userContent, clubPost ? 'club' : 'user' );
      }
    }).submit();
    
  }
  
  function displayMediaAttach( name ) {
    var block = $('#form-attach-' + name), input = $('#form-attach-' + name + ' #attach-' + name + '-input');
    if( eval( name+'Attach' ) != '' ) displayFormAttch( block, input , name );
    else emptyFormAttach( name );
    
    $('#pages #win-page .shadow-object').unbind('click');
    closeWinPage( false );
  }

  function closeAttach( type ) {
    
    eval( type + 'Attach = "' + $('#form-attach-' + type + ' #attach-' + type + '-input').val() + '"' );
    $('#pages #win-page .shadow-object').unbind('click');
    closeWinPage( false );
    
  }
  
  function setFormAttach( name ) {
    var block = $('#form-attach-' + name), input = $('#form-attach-' + name + ' #attach-' + name + '-input');
    if( input.val().replace(/\s+/g, '').length > 0) displayFormAttch( block, input );
    else hideFormAttch( block, input );
  }

  function displayFormAttch( block, input, name ) {
    if( block.attr('id') == 'form-attach-pic' ) {
      var length = document.getElementById('attach-pic-input').files.length
      block.find('span').text( langs.post_images + ': ' + length );
    } else if( block.attr('id') == 'form-attach-audio' ) {
      block.find('span').text( langs.post_audio + ': ' + eval( name + 'Attach' ).split(',').length );
      input.val( eval( name + 'Attach' ) );
    } else if( block.attr('id') == 'form-attach-videoLoc' ) {
      block.find('span').text( langs.post_video + ': #' + videoLocAttach );
      input.val( eval( name + 'Attach' ) );
    } else if( block.attr('id') == 'form-attach-people' ) {
      block.find('span').text( langs.post_metetions + ': ' + eval( name + 'Attach' ).split(',').length  );
      input.val( eval( name + 'Attach' ) );
    } else block.find('span').text( input.val().substr( 0, 30 ) + ( input.val().length > 20 ? '...' : '' ) );
    block.css('height','40px');
    block.find('.input-empty').css('display','block');
    block.find('span').css('display','block');
    input.css('display','none');
  }

  function hideFormAttch( block, input ) {
    block.find('span').css('display','none');
    block.css('height','0');
    input.css('display','none');
    block.find('.input-empty').css('display','none');
  }

  function emptyFormAttach( name ) {
    var block = $('#form-attach-' + name), input = $('#form-attach-' + name + ' #attach-' + name + '-input');
    block.find('span').text('').css('display','none');
    block.css('height','0');
    input.val('').css('display','none');
    block.find('.input-empty').css('display','none');
    if( eval( name + 'Attach' ) ) eval( name + 'Attach = ""' );
  }
  
  function checkLinkEx( bool ) {
    var input = $('#new-post-box .form .post-text').val();
    var pattern = new RegExp( "^(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,8}(\/\S*)?" );
    
    var text = input.split(/[\s\n]/);

    for( var i = text.length - 1 ; i >= 0 ; i-- )
      if( pattern.test(text[i]) ) {
        $('#form-attach-link #attach-link-input').val( text[i] );
        setFormAttach('link');
        break;
      }

  }
