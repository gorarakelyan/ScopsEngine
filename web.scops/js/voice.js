/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var box = $('.voice-control .button');
  
  var voiceControl = {
    started: false,
    ended: false,
    begin: function(){
      
      if( annyang ) {
      
        annyang.removeCommands();
        annyang.addCommands({
          'hello': voiceControl.connect
        });

        annyang.setLanguage('en');
        
        annyang.addCallback('start' , voiceControl.interStart );
        annyang.addCallback('end' , voiceControl.interEnd );
        annyang.addCallback('resultMatch' , voiceControl.interMatch );
        annyang.addCallback('resultNoMatch' , voiceControl.interNoMatch );
        annyang.addCallback('result' , voiceControl.interRes );
        
        annyang.start( { autoRestart: false, continuous: true } );
        
      }
      
    },
    manualStart: function() {
      
      if( voiceControl.started ) {
        if( !annyang.isListening() ) {
          annyang.resume();
          voiceControl.loading();
        }
      } else {
        voiceControl.begin();
        voiceControl.started = true;
      }
      
    },
    abort: function() {
      annyang.abort();
    },
    exit: function() {
      
      this.abort();
      $(this.box).closest('#voice-page').addClass('hide').removeClass('show');
      
    },
    connect: function(){
      
      voiceControl.interConnected();
      annyang.removeCommands();
      annyang.addCommands( voiceControl.commands );  

    },
    interConnected: function(){
    
      $(voiceControl.box).find('.loading').text( voiceControl.write()[0] );
      voiceControl.loading();
      
    },
    interStart: function(){
    
      $(voiceControl.box).find('.action').text( '' );
      if( !voiceControl.ended ) $(voiceControl.box).find('.loading').text( voiceControl.write()[1] );
      else $(voiceControl.box).find('.loading').text( voiceControl.write()[2] );
      
      voiceControl.loading();
      
    },
    interEnd: function(){
    
      annyang.pause();
      voiceControl.started = true;
      voiceControl.ended = true;
      
      $(voiceControl.box).find('.shadow').addClass( 'simple' ).removeClass('listen');
      $(voiceControl.box).find('.action').text('');
      $(voiceControl.box).find('.loading').text( voiceControl.write()[3] );
    
    },
    interMatch: function( userSaid, commandText, phrases ){
      
      if( userSaid != 'hello' ) {
        $(voiceControl.box).find('.action').text( userSaid );
        annyang.pause();
        
        $(voiceControl.box).find('.loading').text( voiceControl.write()[4] );
        $(voiceControl.box).find('.shadow').addClass( 'simple' ).removeClass('listen');
      
      }
    
    },
    interNoMatch: function( phrases ){
    
      $(voiceControl.box).find('.action').text( '..' + phrases[phrases.length - 1] + '..' );
      $(voiceControl.box).find('.loading').text( voiceControl.write()[5] );
      
    },
    loading: function() {
      
      $(voiceControl.box).find('.shadow').addClass( 'listen' ).removeClass('simple');
      
    },
    box: '#voice-page .voice-control',
    write: function() {
      return [ langs.voice_connected , langs.voice_hello , langs.voice_listen , langs.voice_next , langs.voice_success , langs.voice_again ]
    },
    commands: {
      
      '(write) (make) (a) new (post) (note)': function(){ annComm( 5 ) },
      'play my (audios) (music)': function(){ annComm( 2 , true ) },
      'find *tag': function( tag ){ annComm( 1 , tag ) },
      'go to *place': function( place ){ annComm( 3 , place ) },
      'open *place': function( place ){ annComm( 3 , place ) },
      'show (me) (my) *place': function( place ){ annComm( 3 , place ) }
      
    }
  };
  
  
  function annComm( type , data ) {
  
    switch( type ) {
      case 5:
        
        insertUploadForm('#news-page .content', 'post' , 0);
        
      break;
      case 1:
        
        $('#main-panel #panel-first-line #middle-side #input-panel-search').val( data );
        ajaxQuery('search' , 4 );
        
      break;
      case 2:
      
        if( data ) openNewPlaylist( 0 );
        if( $('#pages #audioplayer .playlist .audio-object').length )
          $('#pages #audioplayer .playlist .audio-object:first .play').trigger('click');
        else setTimeout( function(){ annComm( 2 , false ) } , 100 );
        
      break;
      case 3:
        
        switch( data ) {
          case 'my account': 
            ajaxQuery('user','wall',getCookie('id'));
          break;
          case 'news feed': 
            ajaxQuery('news');
          break;
          case 'games': 
            ajaxQuery('games');
          break;
          case 'the first game': 
            ajaxQuery( 'game' , 0 , $('.all-games .game-object:first').data('id') , false , undefined );
          break;
          case 'friends': ajaxQuery('user', 'friends', getCookie('id')); break;
          case 'photos': ajaxQuery('user', 'photos', getCookie('id')); break;
          case 'clubs': ajaxQuery('user', 'clubs', getCookie('id')); break;
          case 'audios': ajaxQuery('user', 'music', getCookie('id')); break;
          case 'videos': ajaxQuery('user', 'videos', getCookie('id')); break;
        }
        
      break
    }
  
  }
  
  