/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
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
        
        ajaxFrom.open( "POST", _root_ + "/php_requests/upload_post.php" );
        ajaxFrom.send( formdata );
    }
  
  }
  
  function viewCover( id , event ) {
    if( event.offsetY > $('#user-profile .cover-upload').innerHeight() ) openNews( id );
  }
  
  function askQuestion( id ) {
    openWinPage( 500 , true );
    fillDataTPL( _root_ + '/php_requests/get_content.php', { content: 'question_form', prof_id: id },'fillJSON(\'#pages #win-page #win-content\')');
  }
  
  var peopleInvite = '';
  
  function invitePeopleToClub( id ) {
    openWinPage( 500 );
    loader('#pages #win-page #win-content');
    
    $('#pages #win-page .shadow-object').bind('click' , function(){
      $('#pages #win-page .shadow-object').unbind('click');
      closeWinPage();
      peopleInvite = '';
    });
    
    fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'people_invite', prof_id: id },'fillJSON(\'#pages #win-page #win-content\')');
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
    
    fillDataTPL( _root_ + '/php_requests/get_content.php', { content : type ? 'club_form' : 'user_form' , prof_id: id } ,'fillJSON(\'#pages #pop-up-box\')');

  }
