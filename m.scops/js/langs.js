/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  var titleTexts = [] , emptyContents = [];
  var langs = [];
  
  $.post( _root_ + '/langs/' + ( getCookie('langs') != '' ? getCookie('langs') : 'en' ) + '.php' , { get_langs: true } , function(data){
    langs = JSON.parse( data );
    
    emptyContents = [
      langs.nocont_cont , langs.nocont_post , langs.nocont_aud , langs.nocont_notif , langs.nocont_photo,
      langs.nocont_fr , langs.nocont_cl , langs.nocont_vid , langs.nocont_follow , langs.nocont_news , langs.nocont_event,
      langs.nocont_games , langs.nocont_user_games , langs.nocont_sms , langs.nocont_dialogue , langs.error_404
    ];
    
    titleTexts = [ document.title , langs.new_msg ];
  });
  