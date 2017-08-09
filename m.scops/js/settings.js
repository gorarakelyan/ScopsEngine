/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  /************* USER Settings **************/
  
  function sendSettingsReq( num ) {
    
    var box = $('.content-pages .settings .form-' + num);
    box.find('.request-status').css('display','block');
    
    var hiddenInputs = '<input type="hidden" name="mobile_application" value="true"><input type="hidden" name="log_link" value="' + getCookie('link') + '">';
    $(hiddenInputs).appendTo(box);
    loader( box.find('.request-status') , 'inline' );
    
    var disFunction = box.find('.submit').attr('onclick');
    box.find('.submit').attr('onclick','');
    
    $('.user-settings-form.form-' + num ).ajaxForm({
      success:function( data ){
        setTimeout(function(){
          if( data == '1' ) box.find('.request-status').text( langs.success );
          if( data == '0' ) box.find('.request-status').text( langs.error_try );
          if( data == '2' ) window.location = '/';
        }, 800);
        box.find('.submit').attr('onclick' , disFunction);
        
      }
    }).submit();
    
  }
