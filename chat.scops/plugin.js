  $(function(){
    
    document.title = 'Chat | ' + _sitename_;
    $('.content-block .form-box.login-box form').attr('action' , _root_ + $('.content-block .form-box.login-box form').data('action') );
    $('.content-block .header').html( _sitename_ + ' <span>Chat</span>');

    $('.content-block .services .web').closest('a').attr('href' , _root_ );
    $('.content-block .services .mob').closest('a').attr('href' , _connection_ + 'm.' + _domain_ );

  });
  
  $('.content-block .login-box .submit-button').click(function(){
    $('#login-form').ajaxForm({
      success: function(data){
        
        data = JSON.parse( data );
        
        if( data && data[0] ) {
          setCookie( 'link' , data.info.link , { expires: 315360000 , path: '/' } );
          setCookie( 'id' , data.info.id , { expires: 315360000 , path: '/' } );
    
          window.location = '/chat';
        } else $('#login-res').text('Incorrect Login or Password');
        
      }
    }).submit();
  });