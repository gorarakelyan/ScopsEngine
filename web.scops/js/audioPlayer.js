/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var firstPlay = true , audioLoop = 2 , canStartPlayer = false , endOfPlayer = false , loadedFriendsPL = -1;
  if( !getCookie('audVol') ) setCookie('audVol', 0.8, { expires: 315360000 , path: '/' });
  
  function playAudio( id , event , bool ) {
    if( id == currentAudio ) startPlayingAudio( id , event , bool );
    else {
      var playlist = $('#pages #audioplayer .content .playlist');
      
      if( event ) {
        
        var listID = $(event.target).closest('.audiolist').attr('id');
        eventAudio = $(event.target).closest('.audio-object');
        
        if( playlist.attr('id') != listID ) {
          playlist.find('.list').html( $('.audiolist#' + listID ).html() );
          
          playlist.attr('id' , listID);
          
          playlist.data( 'playlist', '' ).data( 'author', '' );
          canStartPlayer = true;
          endOfPlayer = false;
          
        }
        
        var playID = $(event.target).closest('.audiolist').data('playlist');
        var authorID = $(event.target).closest('.audiolist').data('author');
        
        if( playlist.data('playlist') != playID || playlist.data('author') != authorID )        
          playlist.data( 'playlist', playID ).data( 'author', authorID );
        
      }
      
      currentAudio = id;
      
      $('#pages #audioplayer .content .player').empty();
      $( '.mus-' + currentAudio ).eq(0).clone().appendTo('#pages #audioplayer .content .player');
      
      $('#pages #audioplayer .playlist header').text( langs.playlist );
      
      $('.audio-object .loader').width(0);
      $('.audio-object .options').css('height','0px');
      $('.audio-object .options .loop').attr('class','loop');
      $('.audio-object .dur').text('');
      
      $('.audio-object .play').css('display','block');
      $('.audio-object .pause').css('display','none');
      
      audioElem = $( '.mus-' + currentAudio );
      
      $('.audio-object .seek').data('check' , '1');
      audioElem.find('.seek').data('check' , '0');
      
      audioElem.find('.options').css('height','35px');
      audioElem.find('.loop:eq(' + audioLoop + ')').attr('class','loop selected');
      
      audio.src = '../' + $('.mus-' + currentAudio + ':first').data('src');
      audio.volume = getCookie('audVol');
      
      audioElem.find('.pointer').draggable({
        containment:"parent",
        axis: 'x',
        cursor: 'pointer',
        start: function( e ) {
          eventAudio = $( e.target ).closest('.audio-object');
        },
        drag: function() { audSetVol( eventAudio.find('.volume') , 1 ); },
        stop: function() { audSetVol( eventAudio.find('.volume') , 1 ); }
      });
      
      audSetVol( audioElem.find('.volume') , 0 );
      
      startPlayingAudio( id , event , bool );
      
    }
  }
  
  function audSetVol( elem , type ) {
    
    var placement = elem.find('.pointer').position().left - elem.find('.load').position().left,
        placeWidth = elem.find('.line').width();
    
    if( type ) {
      elem.find('.load').width( placement );
      audio.volume = placement / placeWidth;
      setCookie('audVol', placement / placeWidth, { expires: 315360000, path:'/' });
    } else {
      elem.find('.load').width( getCookie('audVol') * placeWidth );
      audio.volume = getCookie('audVol');
    }
    
    elem.find('.pointer').css('left', elem.find('.load').width() );
  
  }
  
  function startPlayingAudio( id , event, bool ) {
    if( audio.paused ) {
      audio.play();
      audioElem.find('.pause').css('display','block');
      audioElem.find('.play').css('display','none');
      $('#main-panel .panel-object .panel-object-content.mus-button').text('');
    } else {
      audio.pause();
      audioElem.find('.pause').css('display','none');
      audioElem.find('.play').css('display','block');
      $('#main-panel .panel-object .panel-object-content.mus-button').text('');
    }
    if( firstPlay ) {
      firstPlay = false;
      changesAudio();
      $('#main-panel .panel-object .panel-object-content.mus-button').css('display','inline-block');
    }
    if( bool ) seekAudio( event , id );
  }
  
  function changesAudio() {
    if( !audio.paused ) {
      for( var i = 0 ; i < $('.mus-' + currentAudio).length ; i++  ) {
        var elem = $('.mus-' + currentAudio).eq(i);
        if( !audioSeeking || ( audioSeeking && elem.get(0) != eventAudio.get(0) ) ) {
          var newWidth = audio.currentTime * elem.find('.audio-line').width() / audio.duration;
          elem.find('.loader').width( Math.ceil( newWidth ) );
          if( audio.duration >= 0) elem.find('.dur').text( '-' + toMinutes( audio.duration - audio.currentTime ) );
        } 
      }
    }
    
    setTimeout( changesAudio , 200 );
  }
  
  function seekAudio( e , id ) {
    
    if( $(e.target).data('check') == '1' ) {      
      playAudio( id , e , true );
    } else {
      audioSeeking = true;
      eventAudio = $(e.target).closest('.audio-object');
      
      $(document).disableSelection();
      $('body').css('cursor','pointer');
      
      var leftCir = e.pageX - eventAudio.find('.audio-line').offset().left;
      
      eventAudio.find('.loader').css( 'width' , leftCir + 'px' );
      
      if( audioSeeking ) {
        var audFakeTime = ( audio.duration * eventAudio.find('.loader').width() ) / eventAudio.width();
        if( audio.duration >= 0) eventAudio.find('.dur').text( '-' + toMinutes( audio.duration - audFakeTime ) );
      }
      
      eventAudio.find('.loader').css('transition','all 0.1s ease');
    }
  }
  
  function toMinutes( num ) {
    
    num = Math.round( num );
    var sec = num%60;
    sec = ( sec < 10 )?'0' + sec:sec;
    return ( sec < 10 )?( ( num - sec ) / 60 ) + ':0' + Math.abs( sec ):( ( num - sec ) / 60 ) + ':' + Math.abs( sec );
    
  }
  
  $(audio).on('ended',function(){
    if( !audioSeeking ) {
      switch( audioLoop ) {
        case 0:
          audio.currentTime = 0;
          audio.pause();
          audioElem.find('.pause').css('display','none');
          audioElem.find('.play').css('display','block');
        break;
        case 1:
          audio.currentTime = 0;
          audio.play();
        break;
        case 2:
          for( var i = 0 ; i < $('#pages #audioplayer .content .playlist .audio-object').length ; i++ )
            if( $('#pages #audioplayer .playlist .audio-object').eq(i).data('id') == currentAudio ) break;
            
          i = ( i + 1 < $('#pages #audioplayer .content .playlist .audio-object').length )?i+1:0;
          var playID = $('#pages #audioplayer .playlist .audio-object').eq( i ).data('id');
          playAudio( playID , 0 , false );
        break;
      }
    }
  });
  
  function changeLoop( num ) {
    audioLoop = num;
    audioElem.find('.loop').attr('class','loop');
    audioElem.find('.loop:eq(' + audioLoop + ')').attr('class','loop selected');
  }
  
  function searchAudio( event ) {
    if( event.keyCode == 13 ) {
      var key = $('#pages #audioplayer .form .input').val();
      $('#pages #audioplayer .form .input').val('');
      $('#main-panel #panel-first-line #middle-side #input-panel-search').val(key);
      
      closePlayer();
      
      ajaxQuery('search' , 3 );
    }
  }
  
  function getMoreAudios( listID , authorID , manual ) {
    var playlist = $('#pages #audioplayer .content .playlist'),
      box = $('#pages #audioplayer .body');
      
    if( !manual ) {
      listID = playlist.data('playlist') || '';
      authorID = playlist.data('author') || '';
    }
    
    if( listID.toString().length ) {
      if( manual || ( box[0].scrollHeight - box.innerHeight() - box.scrollTop() < 100 && !endOfPlayer && canStartPlayer ) ) {
        
        canStartPlayer = false;
        var fromID = manual ? 0 : playlist.find('.audio-object').length ;
        if( manual ) loader( playlist.find('.list') , 'inline-block' );
        
        $.post('../php_requests/get_content.php',{ 'content': 'music', 'from': fromID, 'length': loadContentLengths[8], 'author': authorID, 'prof_id': listID }, function(data){
          
          var dataJSON = JSON.parse( data );
          var tpl = dataJSON.tpl;
          delete dataJSON.tpl;        
          
          if( manual ) {
            
            $('#pages #audioplayer .playlist').attr('id','');
            $('#pages #audioplayer .content .list').empty();
            var insertedHTML = Mustache.to_html( tpl , dataJSON );
            if( !insertedHTML.replace(/\s+/g, '').length ) {
              insertedHTML = '<div class="empty alert-object-small material-object">' + langs.a_player_empty + '</div>';
              $('#pages #audioplayer .playlist header').text( '' );
            } else $('#pages #audioplayer .playlist header').text( langs.playlist );
            
            playlist.find('.list').html( insertedHTML );
            playlist.data( 'playlist', listID ).data( 'author', authorID );
            
          } else $( Mustache.to_html( tpl , dataJSON ) ).appendTo( playlist.find('.list') );
            
          endOfPlayer = dataJSON.end;
          canStartPlayer = true;
          
        });
      
      }
    }
  }
  
  function fillPlayerFriends( load ) {
    var box = $('#pages #audioplayer .content .friends'),
        moreFR = $('#pages #audioplayer .content .more-friends');
    
    loadedFriendsPL++;
    $.post('../php_requests/get_content.php',{'content': 'friends', 'from': loadedFriendsPL * loadContentLengths[2], 'length': loadContentLengths[2], 'prof_id': getCookie('id') }, function(data){
      
        var dataJSON = JSON.parse( data );
        delete dataJSON.tpl;    
        
        var tpl = '\
          {{#friend}}\
          <div class="user userlist" onclick="openNewPlaylist({{id}})">\
            <div class="img" style="background:url(\'../{{img}}\');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>\
            <div class="name">{{name}}</div>\
            <div class="audios">' + langs.audio + ': {{audios_count}}</div>\
          </div>\
          {{/friend}}';
        
        var html  = Mustache.to_html( tpl , dataJSON );      
        
        if( dataJSON.end ) moreFR.css('display','none');
        
        if( !load ) box.html(html);
        else $(html).appendTo( box );
    });
    
    if( !load && !$('#pages #audioplayer .list .audio-object').length ) openNewPlaylist( 0 );
  }
  
  function openNewPlaylist( id ) {
    
    getMoreAudios( !id ? getCookie('id') : id , 0 , true );
    
  }