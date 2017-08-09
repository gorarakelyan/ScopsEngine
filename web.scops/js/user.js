/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  function fillUSER(type) {
    if( getParsedJSON.empty ) {
      $('#user-header').html( '<div class="user-padding"><div class="empty-object padding material-object">' + langs.error_404 + '</div></div>' );
    } else {
      $('#user-header').html( getParsedHTML );
      if( $('#user-profile-controls #user-menu .menu-block').length ) {
        setNewContent( false , type );
        setTimeout(endMenuTransition, 500);
      }
    }
  }
  
  function menuTransition( name ) {
    if( scops.theme == 'vk' ) return;
    
    var elem = $('#user-profile-controls #user-menu .menu-block#' + name), pointer = $('#user-profile-controls #user-menu #scroller #pointer'), parent = $('#user-profile-controls #user-menu');
    var newWidth = elem.width() + 20;
    if( typeof( elem.offset() ) !== 'undefined' ) pointer.css('width',newWidth).css('margin-left', elem.offset().left + elem.innerWidth() / 2 - newWidth / 2 - parent.offset().left );
  }
  
  function endMenuTransition() {
    menuTransition( userContent );
  }
  
  function changeContent( name, type ) {
    if( userContent != name ) {
      userContent = name;
      setNewContent( true, type );
    }
  }
  
  function setNewContent( trans , type ) {
    canStartScroll = false;
    if( !$('#user-profile-controls #user-menu .menu-block#' + userContent ).length ) userContent = 'wall';
    if( trans ) endMenuTransition();
    if( type == 'user' ) changeLoc( 'id' + profID + '/' + userContent );
    else changeLoc( 'club' + profID + '/' + userContent );
    
    $('#user-content #content-show').empty();
    $('#user-content #content-set').empty();
    
    if( scops.theme == 'fb' && $('#user-header #user-profile-info').length && !$('#user-header #user-profile-info').hasClass('hide') ) showForm();
    
    var num = ( type == 'user' )?0:1;
    switch( userContent ) {
      case 'wall':
        wallAjax = true;
        generateFeed('../php_requests/get_content.php',{'content': 'wall', 'last_id': 'NULL', 'length': loadContentLengths[0], 'author':num , 'prof_id': profID }, $('#user-content #content-show') , ( scops.theme == 'vk' ? true : false ) , true );
      break;
      case 'friends':
        fillDataTPL('../php_requests/get_content.php',{'content': 'friends', 'from': 0, 'length': loadContentLengths[2], 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true , false , false , [ 5 , true , true ] )');
      break;
      case 'photos':
        fillDataTPL('../php_requests/get_content.php',{'content': 'photos', 'from': 0, 'length': loadContentLengths[1], 'author': num, 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true, false , false , [ 4  , true , true ] )');
      break;
      case 'videos':
        fillDataTPL('../php_requests/get_content.php',{'content': 'videos', 'last_id': 'NULL', 'length': loadContentLengths[4], 'author': num, 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true , false , false , [ 7 , true , true ] )');
      break;
      case 'music':
        $('<div class="audiolist" data-playlist="' + profID + '" data-author="' + num + '"></div>').appendTo('#user-content #content-show');
        fillDataTPL('../php_requests/get_content.php',{'content': 'music', 'from': 0, 'length': loadContentLengths[8], 'author': num, 'prof_id': profID },'fillMUSIC(\'#user-content #content-show .audiolist\' , true , false )');
      break;
      case 'clubs':
        fillDataTPL('../php_requests/get_content.php',{'content': 'clubs', 'from': 0, 'length': loadContentLengths[3], 'prof_id': profID },'fillJSON(\'#user-content #content-show\' , false , true , false , false , [ 6 , true , true ] )');
      break;
      case 'followers':
        fillDataTPL('../php_requests/get_content.php',{'content': 'followers', 'from': 0, 'length': 15, author: 1, 'prof_id': profID },'fillJSON(\'#user-content #content-show\') , false , true , false , false , [ 8 , true , true ]');
      break;
      case 'settings':
        fillDataTPL('../php_requests/get_content.php',{'content': 'club_settings', 'prof_id': profID , act: 0 },'fillJSON(\'#user-content #content-show\') , false , true ');
      break;
    }
  }
  
  function choosePhotoFrom( type , author ) {
    
    $('#user-profile #upload-from-profile').bind('change', fromProfChanged );
    $('#user-profile #upload-from-profile').click();    
    
    function fromProfChanged(){
        var alertID = addAlert( 0 , true);
        var formdata = new FormData();

        formdata.append("type", "photo");
        formdata.append("photoimg[]", document.getElementById('upload-from-profile').files[0]);
        formdata.append("from_prof", 1);
        formdata.append("author", 1);
        if( author ) formdata.append( "club" ,profID );
      
        var ajaxFrom = new XMLHttpRequest();

        ajaxFrom.addEventListener("load", function(){
          removeAlert( alertID );
          $('#user-profile #upload-from-profile').unbind('change');
          makeProfPic( this.responseText , type, author );
        } , false);
        
        ajaxFrom.open( "POST", "../php_requests/upload_post.php" );
        ajaxFrom.send( formdata );
    }
  
  }
  
  function viewCover( id , event ) {
    if( event.offsetY > $('#user-profile .cover-upload').innerHeight() ) openNews( id );
  }
  
  function askQuestion( id ) {
    openWinPage( 500 , true );
    fillDataTPL('../php_requests/get_content.php', { content: 'question_form', prof_id: id },'fillJSON(\'#pages #win-page #win-content\')');
  }
  
  var peopleInvite = '';
  
  function invitePeopleToClub( id ) {
    
    openWinPage( 600 );
    loader('#pages #win-page #win-content');
    
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage();
      peopleInvite = '';
    });
    
    var props = { content: 'people_invite', prof_id: id, 'from': 0 , 'length': loadContentLengths[12] };
    lightBoxContent = 'people_invite';
    $('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
    
    fillDataTPL('../php_requests/get_content.php', props ,'fillJSON(\'#pages #win-page #win-content\')');
    
  }

  function selectInvPeople( num ) {
    var parent = $('#pages #win-page #win-content');
    
    peopleInvite = modifyString( num.toString() , peopleInvite.toString() );
    if( parent.find('.people#item-' + num).hasClass('select') ) {
      parent.find('.count').text( parseInt(parent.find('.count').text()) - 1 );
      parent.find('.people#item-' + num).attr('class' , 'item people simple' );
    } else {
      parent.find('.count').text( parseInt(parent.find('.count').text()) + 1 );
      parent.find('.people#item-' + num).attr('class' , 'item people select' );
    }
  }
  
  function sendGroupInvitation( id ) {
    request( 31, id );
    closeWinPage();
  }
  
  function openForm( id , type ) {
    
    var elem = $('#user-profile'),
      popTop = elem.offset().top + elem.innerHeight(),
      popLeft = elem.offset().left;
      
    openPopupBox( [['position','absolute'] , ['top', popTop ] , ['left', popLeft ],['width', 300 ] , ['height', 'auto' ]] );
    
    var box = $('#pages #pop-up-box');
    
    loader( box );
    
    fillDataTPL('../php_requests/get_content.php', { content : type ? 'club_form' : 'user_form' , prof_id: id } ,'fillJSON(\'#pages #pop-up-box\')');

  }
  
  function showForm( ) {
    
    if( scops.theme == 'vk' ) return;
    
    var form = $('#user-header #user-profile-info');
    if( form.hasClass('hide') ) {
      form.removeClass('hide');
      setTimeout( function() { form.removeClass('opacity'); } , 10 );
    }
    else {
      form.addClass('opacity');
      setTimeout( function() { form.addClass('hide'); } , 180 );
    }
  }
  
  function viewUserFriends( action , id ) {
    
    openWinPage( 600 , false );  
    
    loader('#pages #win-page #win-content');
    
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage( false );
    });
    
    var props = { content: action , prof_id : id , 'from': 0 , 'length': loadContentLengths[12] };
    
    $('#pages #win-page').bind('scroll' , function(){ lightBoxScroll( '#pages #win-page #win-content .content' , props ); } );
    
    fillDataTPL('../php_requests/get_content.php', props , 'fillJSON( \'#pages #win-page #win-content\' )' );
  
  }
  