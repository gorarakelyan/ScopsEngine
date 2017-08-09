/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var gamesTab = 0;
  selGamesTab( 0 );
  
  function selGamesTab( num ) {
    
    gamesTab = num;
    var box = $('#games-page .games-menu');
    
    box.find('.item.selected').attr('class' , 'item');
    box.find('.item').eq( num ).attr('class' , 'item selected');
    
    ajaxScrolling = true;
    canStartScroll = true;
    endOfScroll = false;
    
    fillDataTPL('../php_requests/get_content.php',{ content: 'games', act: 1 , genre: num , length: loadContentLengths[10] , last_id: 'NULL' },'fillJSON(\'.container #games-page .all-games\' , false , true , false , false , [ 11 , true , true ] )');
    
  }
  
  var game = {
    
    box: '#game-page .content .game',
    resize: '#game-page .content .game .resize',
    bar: '#game-page .content .game .size-bar',
    game: '#game-page .content .game .game-html',
    action: false,
    defaultWidth: 0,
    change: function( event ) {
      
      var x = event.pageX;
      var newWidth = Math.abs( $(this.resize).offset().left + $(this.resize).innerWidth()/2 - x ) * 2;
      if( newWidth > $(this.resize).innerWidth() ) newWidth = $(this.resize).innerWidth() ;
      if( newWidth < 40 ) newWidth = 40;
      
      $(this.game).width( newWidth ).height( newWidth * $(this.game).data('prop') );
      $(this.bar).width( newWidth );
      
    },
    up: function() { 
    
      $(document).enableSelection();
      $('body').css('cursor','');
      this.action = false; 
      
    },
    down: function() { 
    
      $(document).disableSelection();
      $('body').css('cursor','pointer');
      this.action = true;
      
    },
    move: function( event ) {  if( this.action ) this.change( event ); },
    load: function( parent , first ) {
      
      if( first ) {
        $(parent).html( getParsedHTML );
        this.defaultWidth = $(this.resize).width() * 0.6;
      }
      
      $(this.game).width( this.defaultWidth ).height( this.defaultWidth * $(this.game).data('prop') );
      $(this.bar).width( this.defaultWidth );
      
    },
    screen: function() {
      
      this.defaultWidth = $(this.resize).width() * 0.6;
      this.load( '.content-pages#game-page .content' , false );
      
    }
    
  };