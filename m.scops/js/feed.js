/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var feedOptions = { 
    content: 'news',
    last_id: 'NULL',
    length: loadContentLengths[0] ,
    prof_id: profID,
    feed_author: 0,
    feed_content: 0
  };
  
  generateFeed( _root_ + '/php_requests/get_content.php', feedOptions , $('.content-pages .container .content') , true );    
  
  function modifyFeedWall( type , option ) {
    continueWall = false;
    endOfScroll = false;
    
    $('.content-pages .block.bl' + type + ' .option').attr('class','option');
    $('.content-pages .block.bl' + type + ' .option' ).eq( option ).attr('class','option selected');
    
    if( type ) feedOptions.feed_content = option;
    else feedOptions.feed_author = option;
    
    $('.content-pages .container .content').empty();
    $(document).scrollTop( 0 );
    $('.content-pages .options').css('margin-top', 0 );    
    
    setTimeout(function(){
      generateFeed( _root_ + '/php_requests/get_content.php', feedOptions , $('.content-pages .container .content') , true , true );
    }, 100 );
  }
  
    