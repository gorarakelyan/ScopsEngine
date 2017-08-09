/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  getNewDating();
  
  function getNewDating() {
    var box = $('#dating-page .dating-block');
    
    $.post('../php_requests/get_content.php',{ content : 'dating_user' },function( data ){
      
      data = JSON.parse( data );
      var user = data.user;
      
      if( !data.empty ) {
        box.find('a#name').attr('href' , "../id" + user.id + "/wall" ).attr('onclick' , "ajaxQuery( 'user' , 'wall' , " + user.id + ")" );
        box.find('.user-a').text( user.name );
        box.find('.user-index').text( '| ' + user.age + ' ' + langs.year + ' | ' + user.city );
        
        box.find('a#img').attr('href' , "../id" + user.id + "/wall" ).attr('onclick' , "ajaxQuery( 'user' , 'wall' , " + user.id + ")" );
        box.find('.dating-user-img img').attr( 'src' , '../' + user.img_original );
        
        box.find('.dating-options .like').attr('onclick','request( 20 , ' + user.id + ' )');
      } else {
        box.find('a#name').remove();
        box.find('a#img').remove();
        box.find('.user-a').attr('onclick','');
        box.find('.user-index').text( langs.empty_dating );
        
        box.find('.dating-user-img').html('<div class="empty">' + langs.empty_dating + '</div>');
        
        box.find('.dating-options .like').attr('onclick','');
      }
      
      
    });
  }
  