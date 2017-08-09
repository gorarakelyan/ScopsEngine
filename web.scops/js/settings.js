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
    box.find('.request-status').css('color','#555');
    loader( box.find('.request-status') , 'inline' );
    
    var disFunction = box.find('.submit').attr('onclick');
    box.find('.submit').attr('onclick','');
    
    $('.user-settings-form.form-' + num ).ajaxForm({
      success:function( data ){
        
        setTimeout(function(){
          if( data == '1' ) {
            box.find('.request-status').text( langs.success );
            if( $('.content-pages .settings .set-menu .header.num1').hasClass('active') ) window.location.reload();
          }
          if( data == '0' ) box.find('.request-status').text( langs.error_try );
          if( data == '2' ) window.location = '/';
          if( data == '3' ) box.find('.request-status').text( langs.url_error1 );
          if( data == '4' ) box.find('.request-status').text( langs.url_error2 );
          if( data == '5' ) box.find('.request-status').text( langs.url_error3 );
        }, 800);
        box.find('.submit').attr('onclick' , disFunction);
        
      }
    }).submit();
    
  }
  
  function hideSettings( bool ) {
    
    var parent = $('.content-pages .settings .set-forms');
    parent.find('.settings-block').each(function( index ){
      
      $(this).data( 'height' , $(this).outerHeight() );
      if( index ) $(this).addClass('close').animate({'height' : '0px'});
      
    });
    
  }
  
  function openSetting( num ) {
    
    var parent = $('.content-pages .settings .set-forms'),
        opened = parent.find('.settings-block.open'),
        closed = parent.find('.settings-block.num' + num );
        
    opened.addClass('close').removeClass('open').data( 'height' , opened.outerHeight() ).animate({'height' : '0px'});
    closed.addClass('open').removeClass('close').animate({'height' : closed.data('height') });
    
    $('.settings .set-menu .header.active').removeClass('active');
    $('.settings .set-menu .header.num' + num ).addClass('active');
    
  }
  
  function fillUrlView() {
    
    var elem = $('.settings .settings-block.num3');
  
    elem.find('.url-view span').text( elem.find('.input').val() );
    
  }
  
  if( typeof( userSettings ) != 'undefined' ) hideSettings();
  
  /************* CLUB Settings **************/
  var settingsTabNum;
  
  if( typeof( userSettings ) == 'undefined' ) settingsTab( 0 );
  
  function settingsTab( num ) {
    settingsTabNum = num;
    
    var parent = $('.club-settings .menu');
    
    parent.find('.menu-item.selected').attr( 'class' , 'menu-item' );
    parent.find('.menu-item').eq( num ).attr( 'class' , 'menu-item selected' );
    
    fillDataTPL( '../php_requests/get_content.php' , {'content': 'club_settings' , 'prof_id': profID , act: ( num + 1 ) } , 'fillJSON(\'#user-content .club-settings .content.main .box\')');
  }
  
  function clubUpdate() {
    
    $('.club-settings #club-set-form').ajaxForm({
      success:function( data ){
        if( data == '1' ) {
          addAlert( langs.alert_changes_saved );
          $('#user-profile #user-profile-options .user-option-object.text').text( $('.club-settings .content .box .input.name').val() );
          $('#user-profile #user-profile-options .user-option-object.descr').text( $('.club-settings .content .box .input.descr').val() );
        }
      }
    }).submit();
    
  }
  
  function adminSearchSet( id ) {
    var opt = {
      action: '../php_requests/get_content.php',
      content: 'club_admin_search',
      prof_id: id,
      key: $('.club-settings .content .box .input').val()
    },
    condition = { variable: 'settingsTabNum' , value: settingsTabNum };
    
    keyUpAJAX( opt , '.club-settings .content .box .block.search' , condition );
  }
  
  function banSearchSet( id ) {
    var opt = {
      action: '../php_requests/get_content.php',
      content: 'club_admin_ban',
      prof_id: id,
      key: $('.club-settings .content .box .input').val()
    },
    condition = { variable: 'settingsTabNum' , value: settingsTabNum };
    
    keyUpAJAX( opt , '.club-settings .content .box .block.search' , condition );
  }
  
  function deleteGroup( id ) {
    
    $.post('../php_requests/delete.php', { act: 1 , id: id } , function(data){
      
      addAlert( 0 );
      if( data == '1' ) {
        setTimeout(function(){ 
          ajaxQuery( 'user' , 'wall' , getCookie('id') ); 
          addAlert( langs.alert_gr_del );
        } , 1000 );
      } else addAlert( langs.error_try );
      
    });
    
  }