/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  if( scops.theme == 'fb' || scops.theme == 'vk' ) setTimeout( function() { insertUploadForm('#news-page .content', 'post' , 0); } , 200 );
    
  var feedOptions = { 
    content: 'news',
    last_id: 'NULL',
    length: loadContentLengths[0] ,
    prof_id: profID,
    feed_author: 0,
    feed_content: 0
  };
  
  generateFeed('../php_requests/get_content.php', feedOptions , $('.container #news-page .content') , true , true );    
  
  function modifyFeedWall( type , option ) {
    continueWall = false;
    endOfScroll = false;
    
    $('.content-pages#news-page .block.bl' + type + ' .option').attr('class','option');
    $('.content-pages#news-page .block.bl' + type + ' .option' ).eq( option ).attr('class','option selected');
    
    if( type ) feedOptions.feed_content = option;
    else feedOptions.feed_author = option;
    
    $('.container #news-page .content').empty();
    $(document).scrollTop( 0 );
    $('.content-pages#news-page .options').css('margin-top', 0 );    
    
    setTimeout(function(){
      generateFeed('../php_requests/get_content.php', feedOptions , $('.container #news-page .content') , true , true );
    }, 100 );
  }
  
  $(document).on(' scroll load ', function(){
    if( !$('#news-page').length ) return;
      
    switch( scops.theme ) {
      case 'classic':  
      case 'silver':  
        var margins = { top: 110 , bottom: 20 , padding: 0 , sum: function(){ return this.top + this.bottom }};
      break;
      case 'vk':  
        var margins = { top: 70 , bottom: 20 , padding: 0 , sum: function(){ return this.top + this.bottom }};
      break;
      case 'fb':
      default:
        var margins = { top: 60 , bottom: 20 , padding: 107 , sum: function(){ return this.top + this.bottom }};
      break;
    }
    
    var panel = $('.content-pages#news-page .feed-menu') , 
        top = panel.offset().top, 
        bottom = top + panel.innerHeight();
    
    if( panel.innerHeight() + margins.sum() < $(window).height() ) {
      if( $(document).scrollTop() > margins.padding ) panel.css( 'margin-top', $(document).scrollTop() - margins.padding );  
    } else {
      if( $(document).scrollTop() > margins.padding ) {
        if( bottom + margins.bottom <= $(document).scrollTop() + $(window).height() )
          panel.css( 'margin-top', $(document).scrollTop() + $(window).height() - panel.innerHeight() - margins.sum() - margins.padding );  
         else if( top > $(document).scrollTop() + margins.top )
          panel.css( 'margin-top', $(document).scrollTop() - margins.padding );
      } else panel.css( 'margin-top', 0 );
    }
    
  });
  