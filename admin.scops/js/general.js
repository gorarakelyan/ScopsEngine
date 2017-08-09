/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var emptyContents = [
      'No user was found' , 'No club was found' , 'No announcement was found' , 'No game was found' , 'No sticker pack was found' , 'No gift was found', 'No ads was found'
    ];
    
  var loadContentLengths = 20;
  
  var currentLink = getCookie('admin');
  
  var ajaxScrolling = true;
  var popupBox = false;

  var titleWorkingModifs = { };
  var popUpProps = new Array();
  
  setInterval(function(){
    if( currentLink != getCookie('admin') ) $('#main-panel #exit').click();
  },500);
  
  $(document).bind("scroll", function(){
    var scroll = $(document).scrollTop();
    var height = $(document).height();
    var winHeight = $(window).height();
    var point = 300;
    
    var path = window.location.pathname.split('/');
    path.splice(0,1);
    
    if( height - scroll - winHeight < point ) {
      if( ajaxScrolling && !endOfScroll && canStartScroll ) {
        ajaxScrolling = false;
        switch( path[0] ) {
          case 'users':
            if( $('.content-pages .list .user-object').length ) {
              var lastID = $('.content-pages .list .user-object:last').data('id') ;
              var key = $('.header .form .input-text-object').val();
              fillDataTPL('../php/get_content.php',{ content: 'manage_users', key: key , last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
          case 'clubs':
            if( $('.content-pages .list .user-object').length ) {
              var lastID = $('.content-pages .list .user-object:last').data('id') ;
              var key = $('.header .form .input-text-object').val();
              fillDataTPL('../php/get_content.php',{ content: 'manage_clubs', key: key , last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
          case 'ads':
            if( $('.content-pages .list .ads-get').length ) {
              var lastID = $('.content-pages .list .ads-get:last').data('id') ;
              fillDataTPL('../php/get_content.php',{ content: 'ads_get', last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
          case 'games':
            if( $('.content-pages .list .user-object').length ) {
              var lastID = $('.content-pages .list .user-object:last').data('id') ;
              fillDataTPL('../php/get_content.php',{ content: 'games', last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
          case 'stickers':
            if( $('.content-pages .list .user-object').length ) {
              var lastID = $('.content-pages .list .user-object:last').data('id') ;
              fillDataTPL('../php/get_content.php',{ content: 'stickers', last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
          case 'gifts':
            if( $('.content-pages .list .user-object').length ) {
              var lastID = $('.content-pages .list .user-object:last').data('id') ;
              fillDataTPL('../php/get_content.php',{ content: 'gifts', last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
          case 'announcements':
            if( $('.content-pages .list .user-object').length ) {
              var lastID = $('.content-pages .list .user-object:last').data('id');
              fillDataTPL('../php/get_content.php',{ content: 'manage_reports', last_id: lastID, length: loadContentLengths },'fillJSON(\'.content-pages .list\' , true , true , true )');
            }
          break;
        }
      }
    }
  });

  $(window).bind("popstate", function( event ) {
    
    ajaxScrolling = true;
    endOfScroll = false;
    var array = window.location.pathname.split('/');
    array.splice(0,1);
    
    ajaxQuery( array[0] );
    $(document).scrollTop(0);
    
  });
  