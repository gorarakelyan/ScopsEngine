/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var today = new Date(), eventsDay , firstCall = true;
  
  if( typeof( issetSetDate ) != 'undefined' ) {
    openDate = issetSetDate.split('.');
    openDay = openDate[0];
    openMonth = openDate[1];
    openYear = openDate[2];
  } else {
    openDay = today.getDate();
    openMonth = today.getMonth();
    openYear = today.getFullYear();
  }
  
  createCalendar( '#events-page .events-calendar' , 'setDay' , openYear , openMonth , 'startCal()' , '#events-page .cal-box .item.btn' );
  
  function startCal() {
    var today = new Date();
    
    if( firstCall ) {
      $('#events-page .events-calendar .isset').eq( openDay - 1 ).trigger('click');
    } else {
      
      if(
        $('#events-page .events-calendar').find('table').data('year') == today.getFullYear() &&
        $('#events-page .events-calendar').find('table').data('month') == today.getMonth()
      ) $('#events-page .events-calendar .isset').eq( today.getDate() - 1 ).trigger('click');
      
    }
    
    firstCall = false;
  }
  
  function setDay( event , date ) {
    
    eventsDay = date;
    $('#events-page .events-calendar .isset.selected').attr( 'class' , 'isset' );
    $( event.target ).closest('.isset').attr( 'class' , 'isset selected' );
    
    $('#events-page .box-header.my').text( langs.events_my + ' ' + humanDate( date ) ); 
    $('#events-page .box-header.all').text( langs.events_top + ' ' + humanDate( date ) ); 
    
    fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 0 , date: date },'fillJSON(\'#events-page .box.my-events\' , false , false , false , false , [ 10 , true , true ] )');
    fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 1 , date: date },'fillJSON(\'#events-page .box.all-events\' , false , false , false , false , [ 10 , true , true ] )');

  }
  
  function createNewEvent() {
    openWinPage( 600 , true );
    
    fillDataTPL('../php_requests/get_content.php', { content : 'new_event' } , 'fillEventFORM(\'#pages #win-page #win-content\')');
  }
  
  function fillEventFORM( elem ) {
    var formToday = new Date();
    $(elem).html( getParsedHTML );
    createCalendar( '#win-content .event-form .new-cal .cal' , 'setEventDay' , formToday.getFullYear() , formToday.getMonth() , 'startNewEventCal()' , '#win-content .event-form .new-cal .cal-btn' );
    $('#win-content .event-form .media .select .cover-choose').click(function(){ $('#win-content .cover-file').trigger('click'); });
  
    $('#win-content .cover-file').bind('change' , function(event){
      if( $(event.target).val() ) $('#win-content .cover-choose').text('');
      else $('#win-content .cover-choose').text('');
    });
    
  }
  
  function startNewEventCal() {
    var formToday = new Date();
    if( 
      $('#win-content .new-cal .cal').find('table').data('year') == formToday.getFullYear() &&
      $('#win-content .new-cal .cal').find('table').data('month') == formToday.getMonth() 
    )
      $('#win-content .new-cal .cal .isset').eq( formToday.getDate() - 1 ).trigger('click');
  }
  
  function setEventDay( event , day ) {
    
    $('#win-content .new-cal .cal .isset.selected').attr( 'class' , 'isset' );
    $( event.target ).closest('.isset').attr( 'class' , 'isset selected' );
    
    $('#win-content .select .date-input').val( day );
    
  }
  
  function sendEventForm() {
    var alertID = addAlert( langs.alert_event , true );
    
    $('#win-page .event-form #new-event-form').ajaxForm({
      success: function(  ) {
        removeAlert( alertID );
        fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 0 , date: eventsDay },'fillJSON(\'#events-page .box.my-events\' , false , false , false , false , [ 10 , true , true ] )');
        fillDataTPL('../php_requests/get_content.php',{ content : 'events' , act: 1 , date: eventsDay },'fillJSON(\'#events-page .box.all-events\' , false , false , false , false , [ 10 , true , true ] )');
      }
    }).submit();
    
    closeWinPage();
  }
  
  function eventInvite( id ) {
    
    openWinPage( 600 );
    
    $('#pages #win-page .shadow-object').bind('click',function(){
      $('#pages #win-page .shadow-object').unbind('click');
      eventInvitedList = '';
      closeWinPage();
    });
    
    fillDataTPL('../php_requests/get_content.php',{ content : 'event_invitation' , id: id },'fillJSON(\'#pages #win-page #win-content\')');

  }
  
  function addPeopleEvent( num ) {
    var parent = $('#pages #win-page #win-content');
    eventInvitedList = modifyString( num.toString() , eventInvitedList.toString() );
    if( parent.find('.people#item-' + num ).hasClass('select') ) {
      parent.find('.count').text( parseInt(parent.find('.count').text()) - 1 );
      parent.find('.people#item-' + num).attr('class' , 'item people simple' );
    } else {
      parent.find('.count').text( parseInt(parent.find('.count').text()) + 1 );
      parent.find('.people#item-' + num).attr('class' , 'item people select' );
    }
  }
  
  function sendInvitation( id ) {
    
    request( 23 , id );
    closeWinPage();
    
  }