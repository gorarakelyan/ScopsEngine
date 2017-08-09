<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/
  
  include_once dirname(__FILE__).'/../php_main/lock.php';
  include_once dirname(__FILE__).'/../php_main/connect_user.php';
  include_once dirname(__FILE__).'/../php_main/functions.php';
  include_once 'content_functions.php';
  
  if( isset( $_POST['prof_id'] ) ) $id = escaper_mysql( $_POST['prof_id'] );
  if( isset( $_POST['post_id'] ) ) $post_id = escaper_mysql( $_POST['post_id'] );
  if( isset( $_POST['from'] ) ) $from = escaper_mysql( $_POST['from'] );
  if( isset( $_POST['length'] ) ) $length = escaper_mysql( $_POST['length'] );
  if( isset( $_POST['author'] ) ) $author = escaper_mysql( $_POST['author'] );
  if( isset( $_POST['wall'] ) ) $wall = escaper_mysql( $_POST['wall'] );
  if( isset( $_POST['last_id'] ) ) $last_id = escaper_mysql( $_POST['last_id'] );
  
  switch( $_POST['content'] ) {
    case 'user':
      $array = get_user( $id , 1 , 2);
      if( $array['isset'] ) {
        
        $photo_res = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$id' AND author='0' AND type='1' ");
        $array['user_photos'] = mysqli_num_rows( $photo_res );

        $wall_res = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$id' AND author='0' AND type!='2'");
        $array['user_wall'] = mysqli_num_rows( $wall_res );
        
        if( !$array['me'] && !$user_row['visits_enabled'] && $array['vis_enabled'] ) {
          $visit = ($array['visitors'] != '')?json_decode( $array['visitors'], true, 3 ):array();
          
          $fill = true;
          
          if( $array['visitors'] != '' )
            for( $i = 0 ; $i < count( $visit ) ; $i++ ) {
              if( $visit[$i][0] == $my_id && $visit[$i][1] > time() - 60*5 )
                $fill = false;
              if( $visit[$i][0] == $my_id && $visit[$i][1] <= time() - 60*5 )
                array_splice( $visit , $i , 1);
            }
          
            if( $fill ) array_unshift( $visit , array( $my_id , time() , 0 ) );
          
          $str = json_encode( $visit );
          mysqli_query( $dbConnect, "UPDATE network SET visitors='$str' WHERE id='$id'" );
        }
        
        if( !$array['me'] ) {
          $string = in_array( $id , explode( ',', $user_row['visits'] ) ) ? check_array( $user_row['visits'] , $id ) : $user_row['visits'] ;
          $string = check_array( $string , $id );
          mysqli_query( $dbConnect, "UPDATE network SET visits='$string' WHERE id='$my_id'" );
        }
        
        $info = [ 'friends' , 'clubs' , 'gifts' ];
        $info_row = [ 'user' , 'club' , 'gift' ];
        $info_arr = [];
        
        for( $part = 0 ; $part <= 2 ; $part++ ) {
          
          $info_arr[$info[$part]] = array();
          
          if( $array[$info[$part]] ) {
            $content_list = explode( ',' , $array[$info[$part]] );
            $list_length = count( $content_list );
            $count = $list_length <= 10 ? $list_length : 10 ;
          
            if( $list_length > 10 ) $info_arr['more_'.$info[$part]] = '+'.( $list_length - 10 );
          
            for( $i = 0 ; $i < $count ; $i++ ) {
              
              if( $content_list[$i] ) eval( '$get_media = get_'.$info_row[$part].'('.$content_list[$i].');' );
              if( $get_media['isset'] ) $info_arr[$info[$part]][$i] = $get_media;
              
            }
          } else {
            $info_arr['more_'.$info[$part]] = '0';
            $info_arr['more_zero_'.$info[$part]] = true;
          }
          
        }
        
        $array['user_link'] = $array['url'] ? _root_.'/@'.$array['url'] : _root_.'/id'.$array['id'];
        $dataArr = array( 'user' => $array , 'user_info' => $info_arr , 'empty' => false );
        
      } else $dataArr = array( 'empty' => true );
      
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/user.tpl');
    break;
    case 'club_form':
      $array = get_club( $id , 0 , 0 );
      
      $dataArr = array( 'form' => $array );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/club.tpl');
    break;
    case 'club':
      $array = get_club( $id , 1 , 2);
      if( $array['isset'] ) {
        
        $photo_res = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$id' AND author='1' AND type='1' ");
        $array['club_photos'] = mysqli_num_rows( $photo_res );

        $wall_res = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$id' AND author='1' AND type!='2' ");
        $array['club_wall'] = mysqli_num_rows( $wall_res );
        
        $dataArr = array( 'club' => $array , 'empty' => false );
        
      } else   $dataArr = array( 'empty' => true );
      
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/club.tpl');
    break;
    case 'news':
      
      $load_query = ( $last_id != 'NULL' )?" id < '$last_id' AND ":"";
      
      switch( $_POST['feed_content'] ) {
        case 0: break;
        case 1:
          $load_query .= " ( text!='' AND audio='' AND video_loc='' AND video_glob='' AND link='' AND img='0' ) AND ";
        break;
        case 2: 
          $load_query .= " img!='0' AND ";
        break;
        case 3: 
          $load_query .= " ( video_loc!='' OR video_glob!='' ) AND ";
        break;
        case 4: 
          $load_query .= " audio!='' AND ";
        break;
      }
      
      switch( $_POST['feed_author'] ) {
        case 0: break;
        case 1:
          $load_query .= " author='0' AND ";
        break;
        case 2: 
          $load_query .= " author='1' AND ";
        break;
      }
  
      $query = "SELECT id FROM news WHERE ".$load_query." ( followers='$id' OR followers LIKE '$id,%' OR followers LIKE '%,$id' OR followers LIKE '%,$id,%') AND type!='2' ORDER BY id DESC LIMIT ".$length;
      
      $get_news_num = mysqli_query($dbConnect, $query);
      
      $i = 0;
      $array = array();
      
      while( $news_row = mysqli_fetch_array( $get_news_num, MYSQLI_ASSOC ) ) $array[$i++] = get_news( $news_row['id'] );
      
      $dataArr = array( 'news' => $array , 'end' => ( mysqli_num_rows( $get_news_num ) < $length ? true : false )  );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/news.tpl');
      
    break;
    case 'wall':
      
      $load_query = ( $last_id != 'NULL' )?"id < '$last_id' AND ":"";
  
      $query = "SELECT id FROM news WHERE ".$load_query."(prof_id='".$id."' AND author='".$author."' AND type != '2' ) ORDER BY id DESC LIMIT ".$length;
      
      $get_news_num = mysqli_query($dbConnect, $query);
      
      $i = 0;
      $array = array();
      
      while( $news_row = mysqli_fetch_array( $get_news_num, MYSQLI_ASSOC ) ) $array[$i++] = get_news( $news_row['id'] );
      
      $dataArr = array( 'news' => $array , 'end' => ( mysqli_num_rows( $get_news_num ) < $length ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/news.tpl');
      
    break;
    case 'friends':
    
      $array = get_friends( $from , $length, $id );
      $dataArr = array( 'friend' => $array[0] , 'end' => $array[1] );
      if( !_app_chat_ )
        $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
      else $dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl_app_chat/friend.tpl');
    break;
    case 'followers':
    
      $array = get_followers( $from , $length, $id );
      $dataArr = array( 'friend' => $array[0] , 'end' => $array[1] );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
      
    break;
    case 'clubs':
    
      $array = get_clubs( $from , $length, $id );
      $dataArr = array( 'club' => $array[0] , 'end' => $array[1] );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
      
    break;
    case 'news_view':
      $array = get_news( $post_id );
      $dataArr = array('news' => $array );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/news-view.tpl');
    break;
    case 'likes':
    
      $post = get_news( $post_id );
      $like_type = escaper_mysql( $_POST['like_type'] );
      $array = array();
      $j = 0;
      $limit = $post[$like_type] > $length + $from ? $length + $from : $post[$like_type] ;
      
      if( $post['isset'] && !$post['blocked_me'] )
        for( $i = $from; $i < $limit ; $i++ )
          if( $post[$like_type.'_arr'][$i] ) $array[$j++] = get_user( $post[$like_type.'_arr'][$i] , 0, 0 );
        
      $dataArr = array( 'news_people' => true , 'item' => $array , 'exist' => $post[$like_type.'_row'] ? true : false , 'likes' => $like_type == 'likes' ? true : false , 'end' => ( $post[$like_type] > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'comm_likes':
    
      $comm = get_comm( escaper_mysql( $_POST['comm_id'] ) );
      $like_type = escaper_mysql( $_POST['like_type'] );
      $array = array();
      $j = 0;
      $limit = $comm[$like_type] > $length + $from ? $length + $from : $comm[$like_type] ;
      
      if( $comm ) {
        
        for( $i = $from; $i < $limit ; $i++ )
          if( $comm[$like_type.'_arr'][$i] ) $array[$j++] = get_user( $comm[$like_type.'_arr'][$i] , 0, 0 );
        
      }
        
      $dataArr = array( 'news_people' => true , 'item' => $array , 'exist' => $comm[$like_type] > 0 ? true : false , 'likes' => $like_type == 'likes' ? true : false , 'end' => ( $comm[$like_type] > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'media_view':
      $post = get_news( $post_id );
      $array = array();
      if( $post['isset'] ) {
        if( !$post['blocked_me'] ) {
          if( $_POST['media'] == '1' ) {
            if( $post['img'] ) {
              $array = array(
                'photo' => true ,
                'count' => $post['img'],
                'author' => $post['author_info'],
                'one' => ( $post['img'] > 1 )?false:true,
                'empty' => false,
                'id' => $post['id']
              );
              $script = $post['img_big'];
            }
          } else {
            if( $post['video_loc'] ) {
              $array = $post['video_loc'];
              $array['author'] = $post['author_info'];
              $array['video'] = true;
              $array['empty'] = false;
              $script = $post['video_loc']['name'];
            }
          }
        } else $array = array( 'empty' => true );
      } else $array = array( 'empty' => true );
      $dataArr = array('media' => $array );
      if( isset( $script ) ) $dataArr['script'] = $script;
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/media-view.tpl');
    break;
    case 'question_form':
    
      $dataArr = [ 'question_form' => true , 'user' => get_user( $id , 0 , 0 ) ];
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'chat':
      $array = array();
      $i = 0;
      $empty = false;
      
      $get_chat = mysqli_query( $dbConnect , "SELECT * FROM chat WHERE ( prof='$my_id' OR friend='$my_id' ) AND count != '0' ORDER BY count DESC LIMIT ".$length );
      
      if( mysqli_num_rows( $get_chat ) )
        while( $chat = mysqli_fetch_array( $get_chat , MYSQLI_ASSOC ) ) {
          $friend = ( $chat['prof'] == $my_id ) ? $chat['friend'] : $chat['prof'];
          $array[$i++] = get_user( $friend , 0 , 0 );
        }
      else $empty = true;
        
      $dataArr = array('chat' => $array , 'chat_empty' => $empty );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/chat.tpl');
    break;
    case 'footer':
      $array = array();
      
      $lang_res = mysqli_query($dbConnect, "SELECT * FROM langs ORDER BY id" );
      
      $i = -1;
      
      while( $lang = mysqli_fetch_array( $lang_res , MYSQLI_ASSOC ) )
        $array[++$i] = $lang;      
      
      $dataArr = array('footer' => true , 'date' => date('Y') , 'lang' => $array );
      
      $dataArr['tpl'] = tpl( dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/panels.tpl' );
    break;
    case 'panel':
    
      if( _mobile_ ) {
        $lang_res = mysqli_query($dbConnect, "SELECT * FROM langs ORDER BY id DESC" );
        $i = -1;
      
        while( $lang = mysqli_fetch_array( $lang_res , MYSQLI_ASSOC ) )
          $array[++$i] = $lang;
        
        $dataArr = array( 'footer' => true , 'date' => date('Y') , 'lang' => $array );
      } else $dataArr = array();
      
      
      $array = get_user( $my_id , 0 , 1 );
      $dataArr['panel_user'] = $array;
      
      $dataArr['tpl'] = tpl( dirname(__FILE__).'/../'.( _mobile_ && !_app_chat_ ? 'tpl_app' : ( _app_chat_ ? 'tpl_app_chat' : 'themes/'._theme_.'/tpl' ) ).'/panels.tpl' );
      
    break;
    case 'chat-window':
      $array = get_user(  $id , 0 , 0 );
      $dataArr = array('window' => $array , 'mobile' => _mobile_ , 'app_chat' => _app_chat_ );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/chat.tpl');
    break;
    case 'photos':
      
      $limit = $from + $length;
      $query = "SELECT id FROM news WHERE prof_id='".$id."' AND author='".$author."' AND type='1' ORDER BY id DESC LIMIT ".$limit;
      
      $get_news_num = mysqli_query($dbConnect, $query);
      if( mysqli_num_rows( $get_news_num ) >= $from ) {

        mysqli_data_seek( $get_news_num, $from - 1);
        
        $get_num = mysqli_fetch_array($get_news_num, MYSQLI_ASSOC );
        $get_num = $get_num['id'];
        
        $query = "SELECT * FROM news WHERE id<='$get_num' AND prof_id='$id' AND author='$author' AND type='1' ORDER BY id DESC LIMIT $length";
        $get_news_res = mysqli_query($dbConnect, $query );
        
        $i = 0;
        $array = array();
        
        while( $news_row = mysqli_fetch_array( $get_news_res, MYSQLI_ASSOC ) ) {
          $array[$i] = get_news( $news_row['id'] );
          $array[$i]['img_medium'] = json_decode( $array[$i]['img_medium'] )[0];
          
          $i++;
        }
        
        $array = array_chunk( $array, 5 );
        $array_ch = array();
        
        for( $i = 0 ; $i < count( $array ) ; $i++ ) {
          if( $i == count( $array ) - 1 && count( $array[$i] ) <= 4 ) {
            $array_ch[$i]['last_thumbs'] = array( $array[$i][0] ,$array[$i][1] ,$array[$i][2] ,$array[$i][3] );
            $array_ch[$i]['line_exist'] = true;
          } else {
            if( $i%2 ) {
              $array_ch[$i]['big_thumb'] = $array[$i][0];
              $array_ch[$i]['thumb_box'] = array( $array[$i][1] ,$array[$i][2] ,$array[$i][3] ,$array[$i][4] );
            } else {
              $array_ch[$i]['big_thumb'] = $array[$i][4];
              $array_ch[$i]['thumb_box'] = array( $array[$i][0] ,$array[$i][1] ,$array[$i][2] ,$array[$i][3] );
            }
          }
        }
        
      }
      
      $dataArr = array( 'photo' => $array_ch , 'end' =>  ( mysqli_num_rows( $get_news_num ) < $limit ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl');
    break;
    case 'app_photos':
      
      $limit = $from + $length;
      $query = "SELECT id FROM news WHERE prof_id='".$id."' AND author='".$author."' AND type='1' ORDER BY id DESC LIMIT ".$limit;
      
      $get_news_num = mysqli_query($dbConnect, $query);
      if( mysqli_num_rows( $get_news_num ) >= $from ) {

        mysqli_data_seek( $get_news_num, $from - 1);
        
        $get_num = mysqli_fetch_array($get_news_num, MYSQLI_ASSOC );
        $get_num = $get_num['id'];
        
        $query = "SELECT * FROM news WHERE id<='$get_num' AND prof_id='$id' AND author='$author' AND type='1' ORDER BY id DESC LIMIT $length";
        $get_news_res = mysqli_query($dbConnect, $query );
        
        $i = 0;
        $array = array();
        
        while( $news_row = mysqli_fetch_array( $get_news_res, MYSQLI_ASSOC ) ) {
          
          $array[$i]['img'] = json_decode( $news_row['img_medium'] , true )[0];
          $array[$i]['id'] = $news_row['id'];
          
          $i++;
        }
        
      }
      
      $dataArr = array( 'photo' => $array , 'end' =>  ( mysqli_num_rows( $get_news_num ) < $limit ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl_app/content.tpl');
    break;
    case 'videos':
    
      $array = array();
      $j = 0;
      $load_query = ( $last_id != 'NULL' )?"id < '$last_id' AND ":"";
      
      $query = mysqli_query( $dbConnect , "SELECT * FROM news WHERE ".$load_query." prof_id='$id' AND author='$author' AND type='2' ORDER BY id DESC LIMIT $length" );
      while( $video = mysqli_fetch_array( $query , MYSQLI_ASSOC ) ) $array[$j++] = get_video( $video['video_loc'] , $video['id'] );
      
      $dataArr = array( 'video' => $array , 'end' => ( mysqli_num_rows( $query ) < $length ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
      
    break;
    case 'music':
      
      if( !$author ) $query = mysqli_query($dbConnect, "SELECT audios FROM network WHERE id='$id'" );
      else $query = mysqli_query($dbConnect, "SELECT audios FROM clubs WHERE id='$id'" );
      $get_music = mysqli_fetch_array( $query , MYSQLI_ASSOC )['audios'];
      
      $mus_arr = explode( ',', $get_music);
      $count = count( $mus_arr );
      $j = 0;
      $array = array();

      for( $i = $from ; $i < ( $count > $length + $from ? $length + $from : $count ) ; $i++ ) if( $mus_arr[$i] ) $array[$j++] = get_music( $mus_arr[$i] );

      $dataArr = array( 'music' => $array , 'end' => ( $count > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/audio.tpl');
      
    break;
    case 'audio_attach':
      
      $chat = isset( $_POST['chat'] ) ? '_chat' : '';
      
      if( !$author ) $query = mysqli_query($dbConnect, "SELECT audios FROM network WHERE id='$my_id'" );
      else $query = mysqli_query($dbConnect, "SELECT audios FROM clubs WHERE id='$id'" );
      $get_music = mysqli_fetch_array( $query , MYSQLI_ASSOC )['audios'];
      
      $mus_arr = explode( ',', $get_music);
      $count = count( $mus_arr );
      $j = 0;
      $limit = $count > $length + $from ? $length + $from : $count ;
      $array = array( 'audio_attach' => true , 'exist' => ( $get_music != '' ) ? true : false , 'item' => array() );

      for( $i = $from ; $i < $limit ; $i++ )
        if( $mus_arr[$i] ) $array['item'][$j++] = get_music( $mus_arr[$i] );
    
      $dataArr = array('audio_attach'.$chat => $array , 'end' => ( $count > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'video_loc_attach':
    
      $chat = isset( $_POST['chat'] ) ? '_chat' : '';
      
      if( !$author ) $query = mysqli_query($dbConnect, "SELECT videos FROM network WHERE id='$my_id'" );
      else $query = mysqli_query($dbConnect, "SELECT videos FROM clubs WHERE id='$id'" );
      $get_video = mysqli_fetch_array( $query , MYSQLI_ASSOC )['videos'];
      
      $vid_arr = explode( ',', $get_video);
      $count = count( $vid_arr );
      $j = 0;
      $limit = $count > $length + $from ? $length + $from : $count ;
      $array = array( 'video_attach' => true , 'exist' => ( $get_video != '' )?true:false , 'item' => array() );

      for( $i = $from ; $i < $limit ; $i++ )
        if( $vid_arr[$i] ) $array['item'][$j++] = get_video( $vid_arr[$i] , NULL );
      
      $dataArr = array('video_attach'.$chat => $array, 'end' => ( $count > $length + $from ? false : true ));
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'people_attach':
    
      if( !$author ) $get_friends = $user_row['friends'];
      else {
        $get_friends = get_club( $id , 0 , 0 )['followers'];
      }
      
      $fr_arr = explode( ',', $get_friends);
      $count = count( $fr_arr );
      $j = 0;
      $limit = $count > $length + $from ? $length + $from : $count ;
      $array = array( 'people_attach' => true , 'exist' => ( $get_friends != '' )?true:false , 'item' => array() );
      
      for( $i = $from ; $i < $limit ; $i++ )
        if( $fr_arr[$i] ) $array['item'][$j++] = get_user( $fr_arr[$i] , 0, 0 );
      
      $dataArr = array('people_attach'=> $array, 'end' => ( $count > $length + $from ? false : true ));
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'people_invite':
      $get_friends = $user_row['friends'];
      
      $fr_arr = explode( ',', $get_friends);
      $count = count( $fr_arr );
      $j = 0;
      $limit = $count > $length + $from ? $length + $from : $count ;
      $array = array( 'people_invite' => true , 'exist' => $get_friends ? true : false , 'item' => array() , 'club' => $id );

      for( $i = $from ; $i < $limit ; $i++ )
         if( $fr_arr[$i] ) $array['item'][$j++] = get_user( $fr_arr[$i] , 0, 0 );
      
      $dataArr = array( 'people_invite' => $array, 'end' => ( $count > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
    break;
    case 'mutual_friends':
      $user = get_user( $id );
      if( !$user['isset'] || $user['blocked_me'] ) exit;
      
      $fr_arr = explode( ',' , $user['mutual_friends_list'] );
      $count = $user['mutual_friends'];
      $j = 0;
      $limit = $count > $length + $from ? $length + $from : $count ;
      $array = array( 'mutual_friends' => true , 'exist' => $user['mutual_friends'] ? true : false , 'item' => array() );

      for( $i = $from ; $i < $limit ; $i++ )
        if( $fr_arr[$i] ) $array['item'][$j++] = get_user( $fr_arr[$i] );
      
      $dataArr = array( 'mutual_friends' => $array, 'end' => ( $count > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
    break;
    case 'user_followers':
      $user = get_user( $id );
      if( !$user['isset'] || $user['blocked_me'] ) exit;
      
      $fr_arr = explode( ',', $user['followers'] );
      $count = $user['user_followers'];
      $j = 0;
      $limit = $count > $length + $from ? $length + $from : $count ;
      $array = array( 'user_followers' => true , 'exist' => $user['user_followers'] ? true : false , 'item' => array() );

      for( $i = $from ; $i < $limit ; $i++ )
         if( $fr_arr[$i] ) $array['item'][$j++] = get_user( $fr_arr[$i] );
      
      $dataArr = array( 'user_followers' => $array, 'end' => ( $count > $length + $from ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
    break;
    case 'online':
      
      $time = time() - 60 ;
      $online_res = mysqli_query( $dbConnect , " SELECT * FROM network WHERE online > '$time' ");
      
      $online_all = array();
      $array = array();
      $i = 0;
      $j = 0;
      
      while( $online = mysqli_fetch_array( $online_res , MYSQLI_ASSOC ) ) $online_all[$i++] = $online['id']; 
      $length = ( count( $online_all ) > 24 )? 24 : count( $online_all );

      while( $j < $length ) {
        $num = rand(0,$length - 1);
        $check = false;
        for( $l = 0 ; $l < $j ; $l++ )
          if( $array[$l] == $online_all[$num] ) {
            $check = true;
            break;
          }
        if( $check == false ) $array[$j++] = $online_all[$num];
      }
      
      for( $i = 0 ; $i < $length ; $i++ ) $array[$i] = get_user( $array[$i], 0 , 0 );
      
      $dataArr = array( 'friend' => $array );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl');
    break;
    case 'user_settings':
      $array = get_user( $my_id , 0 , 0 );
      $array['gender_man'] = ( !$array['gender'] )?true:false;
      $array['gender_opt'] = $array['gender']?1:0;
      $array['gender_opt_2'] = !$array['gender']?1:0;
      
      $array['open_privacy'] = ( !$array['secret'] )?true:false;
      $array['privacy_opt'] = $array['secret']?1:0;
      $array['privacy_opt_2'] = !$array['secret']?1:0;
      
      $array['enable_visits'] = $array['vis_enabled'] ;
      $array['vis_opt'] = ( $array['vis_enabled'] )?0:1;
      $array['vis_opt_2'] = ( !$array['vis_enabled'] )?0:1;
      
      $array['open_dating'] = $array['dating_enabled'];
      $array['date_opt'] = ( $array['dating_enabled'] )?0:1;
      $array['date_opt_2'] = ( !$array['dating_enabled'] )?0:1;
      
      $themes = array();
      $theme_res = mysqli_query( $dbConnect , "SELECT * FROM themes" );
      while( $theme = mysqli_fetch_array( $theme_res , MYSQLI_ASSOC ) ) $themes[] = array_merge( $theme , array( 'selected' => ( $user_row['theme'] == $theme['key'] ? 'selected' : '' ) ) );
      
      $dataArr = array( 'user' => $array , 'theme' => ( $global['user_theme'] ? true : false ) , 'themes' => $themes );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/settings.tpl');
    break;
    case 'club_settings':
      
      $club = get_club( $id , 0 , 0 );
      if( !$club['isset'] || !$club['me_admin'] ) exit;
      
      $dataArr = [ 'club' => $club ];
      
      switch( $_POST['act'] ) {
        case 0: 
          $dataArr['club_general'] = true;
        break;
        case 1: 
          $dataArr['club_set'] = true;
        break;
        case 2: 
          $dataArr['club_admin'] = true;
          
          $j = 0;
          $admins = explode( ',' , $club['admin'] );
          foreach( $admins as $admin ) $dataArr['admin'][$j++] = get_user( $admin , 0 , 0 );
        break;
        case 3: 
          $dataArr['club_req'] = true;
          
          $j = 0;
          if( $club['requests'] ) {
            $requests = explode( ',' , $club['requests'] );
            foreach( $requests as $req ) $dataArr['req_user'][$j++] = get_user( $req , 0 , 0 );
          }
        break;
        case 4: 
          $dataArr['club_banned'] = true;
          
          $j = 0;
          if( $club['black_list'] ) {
            $bans = explode( ',' , $club['black_list'] );
            foreach( $bans as $ban ) $dataArr['ban'][$j++] = get_user( $ban , 0 , 0 );
          }
        break;
        case 5: 
          $dataArr['club_del'] = true;
        break;
      }
      
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/settings.tpl');
      
    break;
    case 'club_admin_search':
    
      $club = get_club( $id , 0 , 0 );
      if( !$club['isset'] || !$club['me_admin'] ) exit;
      
      $key = str_replace( " ", "", $_POST['key'] );
      $dataArr = [ 'club_info' => $club ];
      $j = 0;
      if( strlen( $key ) ) {
        
        $admins = explode( ',' , $club['admin'] );
        $members = explode( ',' , $club['followers'] );
        
        foreach( $members as $val ) {
          
          if( $j > 50 ) break;
          $prof = get_user( $val , 0 , 0 );
          if( number_search( intval( $key ) , intval( $prof['id'] ) ) ) {
            $dataArr['inline_friend'][$j] = $prof;
            $dataArr['inline_friend'][$j]['callback'] = 'request( 26 , '.$club['id'].' , event )';
            if( in_array( $val , $admins ) ) $dataArr['inline_friend'][$j]['add'] = true;
            else $dataArr['inline_friend'][$j]['remove'] = true;
            $j++;
          }
          
        }
        
      }
      
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/settings.tpl');
    break;
    case 'club_admin_ban':
    
      $club = get_club( $id , 0 , 0 );
      if( !$club['isset'] || !$club['me_admin'] ) exit;
      
      $banned = explode( ',' , $club['black_list'] );
      $key = str_replace( " ", "", escaper_mysql( $_POST['key'] ) );
      $dataArr = [ 'club_info' => $club ];
      $j = 0;
      if( strlen( $key ) ) {
        $search = mysqli_query( $dbConnect , "SELECT id FROM network WHERE id like '$key%' AND id!='$my_id' ORDER BY id LIMIT 50" );
        while( $search_row = mysqli_fetch_array( $search ) ) {
          
          $dataArr['inline_friend'][$j] = get_user( $search_row['id'], 0 ,0 );
          $dataArr['inline_friend'][$j]['callback'] = 'request( 29 , '.$club['id'].' , event )';
          if( in_array( $search_row['id'] , $banned ) ) $dataArr['inline_friend'][$j]['add'] = true;
          else $dataArr['inline_friend'][$j]['remove'] = true;
          $j++;
          
        }
      }
      
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/settings.tpl');
    break;
    case 'top':
      
      $array = array();
      $i = 0;
      $query = mysqli_query( $dbConnect , "SELECT id FROM network ORDER BY rating DESC LIMIT 50" );
      while( $prof = mysqli_fetch_array( $query , MYSQLI_ASSOC ) ) {
        $array[$i] = get_user( $prof['id'], 0 , 0 );
        $array[$i]['index'] = $i + 1;
        $i++;
      }
      $dataArr = array( 'top' => $array );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl');
    break;
    case 'dating_user':
      
      $gender = !$user_row['gender'];
      $search = mysqli_query( $dbConnect , "SELECT id FROM network WHERE gender='$gender' AND dating_enabled='0' ORDER BY id" );
      $length = mysqli_num_rows( $search );
      $found = false; 
      
      if( $length ) {
        
        $i = 0;
        $array = array();
        $people = json_decode( ( $user_row['datings'] )?$user_row['datings']:'[[]]' , true , 3 );
        foreach( $people as $val ) 
          if( $val[1] > time() - 24 * 3600 ) 
            $array[$i++] = $val;
        
        $rand = mt_rand( 0 , $length - 1 );
        $step = 1;
        
        mysqli_data_seek( $search , $rand );
        $prof = mysqli_fetch_array( $search , MYSQLI_ASSOC );
        
        while( in_array_matrix( $prof['id'] , $array , 0 ) ) {
          if( $step < $length ) {
            if( $rand < $length - 1 ) $rand++;
            else {
              $rand = 0;
            }
            
            mysqli_data_seek( $search , $rand );
            $prof = mysqli_fetch_array( $search , MYSQLI_ASSOC );
            $step++;
          } else {
            $rand = -1;
            break;
          }
        }
          
        if( $rand == -1 )  $empty = true;
        else {
          $found = get_user( $prof['id'] , 2 , 2 );
          $empty = false;
        }
        
      } else $empty = true;
      
      if( !$empty ) {
        array_unshift( $array , [ $prof['id'] , time() ] );
        $string = json_encode( $array );
        
        mysqli_query( $dbConnect , "UPDATE network SET datings='$string' WHERE id='$my_id'" );
      }
      
      $dataArr = array( 'user' => $found , 'empty' => $empty );
    break;
    case 'stickers':
      
      $array = array();
      $i = 0;
      if( $user_row['stickers'] ) {
        $stickers = explode( ',' , $user_row['stickers'] );
        foreach( $stickers as $val ) {
          $array[$i] = get_sticker_pack( $val );
          $array[$i++]['friend'] = $id;
        }
      $dataArr = array( 'stickers' => true , 'pack' => $array );
      } else $dataArr = array( 'stickers' => true , 'empty' => true );
      
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/chat.tpl');
      
    break;  
    case 'sticker_store':
      
      $array = array();
      $i = 0;
      $dataArr = array( 'stickers_store' => true , 'my_sticker' => array() , 'all_sticker' => array() );
      
      if( $user_row['stickers'] ) {
        $stickers = explode( ',' , $user_row['stickers'] );
        foreach( $stickers as $val ) $dataArr['my_sticker'][$i++] = get_sticker_pack( $val );
        
      } else $dataArr['my_sticker'] = false;
      
      $i = 0;
      
      $sticker_query = mysqli_query( $dbConnect  , "SELECT id FROM stickers ORDER BY id DESC" );
      
      while( $sticker = mysqli_fetch_array( $sticker_query , MYSQLI_ASSOC ) ) {
        $dataArr['all_sticker'][$i] = get_sticker_pack( $sticker['id'] );
        if( in_array( $sticker['id'] , explode( ',' , $user_row['stickers'] ) ) ) $dataArr['all_sticker'][$i++]['added'] = true;
        else $dataArr['all_sticker'][$i++]['added'] = false;
      }
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'gifts_store':
      
      $array = array();
      $i = 0;
      
      $gifts_query = mysqli_query( $dbConnect  , "SELECT * FROM gifts ORDER BY id DESC" );
      
      while( $gift = mysqli_fetch_array( $gifts_query , MYSQLI_ASSOC ) ) $array[$i++] = $gift;
      
      $dataArr = array( 'gifts_store' => true , 'gifts' => $array , 'friend' => $id );
      $dataArr['tpl'] = tpl( dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'notif_visits':
      
      $array = ($user_row['visitors'] != '')?json_decode( $user_row['visitors'], true, 3 ):array();
      $count = count( $array );
      
      $vis = array();
      $j = 0;
      
      $start = $last_id == 'NULL' ? 0 : ( 1 + array_search( $last_id , array_column( $array , 0 ) ) );
      
      for( $i = $start ; $i < ( $count > $length + $start ? $length + $start : $count ) ; $i++ ) {
        
        $vis[$j] = get_user( $array[$i][0], 0 , 0);
        if( $array[$i][2] == 0 ) $vis[$j]['new_vis'] = true;
        $j++;
        
        $array[$i] = array( $array[$i][0] , $array[$i][1] , 1 );
      }
      
      $str = json_encode( $array );
      mysqli_query( $dbConnect , "UPDATE network SET visitors='$str' WHERE id='$my_id'");
      
      $dataArr = array( 'visitor' => $vis , 'end' => ( $count > $length + $start ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/notification.tpl');
    break;
    case 'events':
    
      $act = escaper_mysql( $_POST['act'] );
      $date = escaper_mysql( $_POST['date'] );
      $array = array();
      $j = 0;
      
      if( !$act ) {
        
        $events = mysqli_query( $dbConnect , "SELECT id FROM events 
          WHERE
          ( 
            invited = '$my_id' OR
            invited LIKE '%,$my_id' OR
            invited LIKE '$my_id,%' OR
            invited LIKE '%,$my_id,%'
          ) AND 
          date='$date' 
          ORDER BY members , id DESC
        ");
        while( $event = mysqli_fetch_array( $events, MYSQLI_ASSOC ) ) $array[$j++] = get_event( $event['id'] );
        
        $events = mysqli_query( $dbConnect , "SELECT id FROM events WHERE creator='$my_id' AND date='$date' ORDER BY id DESC" );
        while( $event = mysqli_fetch_array( $events, MYSQLI_ASSOC ) ) $array[$j++] = get_event( $event['id'] );
        
        $events = mysqli_query( $dbConnect , "SELECT id FROM events 
          WHERE
          (
            going = '$my_id' OR
            going LIKE '%,$my_id' OR
            going LIKE '$my_id,%' OR
            going LIKE '%,$my_id,%'
          ) AND 
          date='$date' 
          ORDER BY members DESC
        ");
        while( $event = mysqli_fetch_array( $events, MYSQLI_ASSOC ) ) $array[$j++] = get_event( $event['id'] );
        
      } else {
        
        $events = mysqli_query( $dbConnect , "SELECT id FROM events 
          WHERE 
          date='$date' AND !(
            going = '$my_id' OR
            going LIKE '%,$my_id' OR
            going LIKE '$my_id,%' OR
            going LIKE '%,$my_id,%'
          ) AND !(
            invited = '$my_id' OR
            invited LIKE '%,$my_id' OR
            invited LIKE '$my_id,%' OR
            invited LIKE '%,$my_id,%'
          ) AND creator != '$my_id'
          AND closed != '1'
          ORDER BY members DESC LIMIT 10
        " );
        while( $event = mysqli_fetch_array( $events, MYSQLI_ASSOC ) ) $array[$j++] = get_event( $event['id'] );
        
      }
      
      $dataArr = array( 'event' => $array );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl');
      
    break;
    case 'games':
    
      $act = escaper_mysql( $_POST['act'] );
      $gen = escaper_mysql( $_POST['genre'] );
      $array = array();
      $j = 0;
      
      if( !$act ) {
        
        $games = explode( ',' , $user_row['games'] );
        if( $user_row['games'] ) foreach( $games as $game ) $array[$j++] = get_game( $game );
        
      } else {
        
        $query = $gen ? "  WHERE genre='$gen' " : "";
        if( $last_id != 'NULL' ) $query.= $query ? " AND id<'$last_id' " : " WHERE id<'$last_id' ";
        
        $games = mysqli_query( $dbConnect , "SELECT id FROM games ". $query ." ORDER BY id DESC LIMIT $length" );
        while( $game = mysqli_fetch_array( $games, MYSQLI_ASSOC ) ) $array[$j++] = get_game( $game['id'] );
        
      }
      
      $dataArr = array( $act ? 'game' : 'inline_game' => $array );
      if( $act ) $dataArr['end'] = mysqli_num_rows( $games ) ? false : true;
        
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl');
      
    break;
    case 'game':
    
      $game = get_game( intval( $_POST['id'] ) );
      
      if( !$game['empty'] ) {
        if( in_array( $game['id'] , explode( ',' , $user_row['games'] ) ) ) $string = check_array( $user_row['games'] , $game['id'] );
        else $string = $user_row['games'];
        $string = check_array( $string , $game['id'] );
        
        mysqli_query( $dbConnect , "UPDATE network SET games = '$string' WHERE id='$my_id'" );
      }
      
      $dataArr = array( 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/game.tpl') , 'game' => $game );

    break;
    case 'new_event':
    
      $dataArr = array( 'event_form' => true );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
    
    break;
    case 'event_invitation':
      
      $array = array();
      $i = 0;
      
      $friends = explode( ',' , $user_row['friends'] );
      foreach( $friends as $val ) $array[$i++] = get_user( $val , 0 , 0 );
      
      $dataArr = array( 'event_invitation' => true , 'event' => get_event( escaper_mysql( $_POST['id'] ) ), 'user' => $array , 'exist' => ( $user_row['friends'] ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/light-box.tpl');
      
    break;
    case 'notif_requests':
      
      $array = explode( ',' , $user_row['requests'] );
      $count = count( $array );
      
      $req = array();
      $j = 0;
      $start = $last_id == 'NULL' ? 0 : ( 1 + array_search( $last_id , $array , 0 ) );
      
      if( $user_row['requests'] != '' ) 
        for( $i = $start ; $i < ( $count > $length + $start ? $length + $start : $count ) ; $i++ ) 
          $req[$j++] = get_user( $array[$i], 0 , 0);
        
      $dataArr = array( 'request' => $req , 'end' => ( $count > $length + $start ? false : true ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/notification.tpl');
    break;
    case 'ads':
      
      $ads_res = mysqli_query( $dbConnect , "SELECT * FROM ads ORDER BY RAND() LIMIT " . $length );
      $array = array();
      
      while( $ads = mysqli_fetch_array( $ads_res , MYSQLI_ASSOC ) ) {
        $id = $ads['id'];
        
        if( $ads['limit_views'] != -1 || $ads['limit_clicks'] != -1 ) {
          if( $ads['limit_views'] ) {
            if( $ads['limit_views'] == 1 ) mysqli_query( $dbConnect , "DELETE FROM ads WHERE id = '$id'" );
            if( $ads['limit_views'] > 1 ) mysqli_query( $dbConnect , "UPDATE ads SET limit_views = '". ( $ads['limit_views'] - 1 ) ."' WHERE id = '$id'" );
          }
        }
        
        $array[] = $ads;
      }
      
      $dataArr = array( 'ads' => $array , 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl'));
      
    break;
    case 'suggestion':
      switch( escaper_mysql( $_POST['type'] ) ) {
        case 'clubs':
          
          $res = mysqli_query( $dbConnect , "
            SELECT id FROM clubs WHERE 
              ( followers NOT LIKE '%,$my_id' AND
              followers NOT LIKE '%,$my_id,%' AND
              followers NOT LIKE '$my_id,%' AND
              followers != '$my_id' ) ORDER BY members DESC LIMIT $length
          ");
          
          $array = array();
          $j = 0;
          while( $club = mysqli_fetch_array( $res , MYSQLI_ASSOC ) )
            $array[$j++] = get_club( $club['id'] );
          
          $dataArr = array( 'club' => $array , 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl') );
        break;
        case 'friends':
          
          $visits = explode( ',' , $user_row['visits'] );
          $friends = explode( ',' , $user_row['friends'] );
          
          $array = array();
          $friends_arr = array();
          $curr_length = 0;
          $j = 0;
          
          foreach( $friends as $val ) {
            
            $get_prof = mysqli_query($dbConnect, "SELECT friends FROM network WHERE id='$val'");  
            $prof = mysqli_fetch_array( $get_prof, MYSQLI_ASSOC );
            if( !mysqli_num_rows( $get_prof ) ) continue;
            
            $f_friends = explode( ',' , $prof['friends'] );
            
            foreach( $f_friends as $fr ) {
              $found = in_array_matrix( $fr , $friends_arr , 0 , true );
              if( $found ) $friends_arr[--$found][1]++;
              else $friends_arr[$curr_length++] = array( $fr , 1 );
            }
            
          }
          
          usort( $friends_arr , 'matrix_compare_fr' );
          
          foreach( $friends_arr as $fr ) {
            if( $j < $length ) {
              $prof = get_user( $fr[0] );
              if( !$prof['isset'] ) continue;
              
              if( $prof['me'] || $prof['friend'] || $prof['follow'] || $prof['request'] || $prof['list_blocked'] ) continue;
              if( in_array( $prof['id'] , explode( ',' , $user_row['requests'] ) ) ) continue;
              
              $array[$j++] = $prof;
            } else break;
          }
          
          foreach( $visits as $val ) {
            if( $j < $length ) {
              if( in_array_matrix( $val , $friends_arr , 0 ) ) continue;
              $prof = get_user( $val );
              if( !$prof['isset'] ) continue;
              
              if( $prof['friend'] || $prof['follow'] || $prof['request'] || $prof['list_blocked'] ) continue;
              if( in_array( $prof['id'] , explode( ',' , $user_row['requests'] ) ) ) continue;
              
              if( $prof['isset'] ) $array[$j++] = $prof;
            } else break;
          }
          
          $dataArr = array( 'friend' => $array , 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/content.tpl') );
        break;
      }
    break;
    case 'notif_msg':
      $array = array();
      $i = 0;
      $chat_res = mysqli_query($dbConnect, "SELECT * FROM chat WHERE prof='$my_id' OR friend='$my_id'");
      while( $chat = mysqli_fetch_array( $chat_res , MYSQLI_ASSOC ) ) {
      
        $sms_res = mysqli_query($dbConnect, "SELECT * FROM dialogues WHERE chat_id='".$chat['id']."' AND ( ( friend='$my_id' AND friend_hide='0' ) OR ( prof='$my_id' AND prof_hide='0' ) ) ORDER BY id DESC LIMIT 1");
        $sms_row = mysqli_fetch_array( $sms_res , MYSQLI_ASSOC );
        if( mysqli_num_rows( $sms_res ) ) 
          $array[$i++] = array(
            'app_chat' => _app_chat_,
            'time' => $sms_row['sendtime'],
            'new' => ( $sms_row['prof'] != $my_id && !$sms_row['viewtime'] ),
            'text' => ( $sms_row['text'] != '' )?(( strlen($sms_row['text']) > 100 )?substr( $sms_row['text'] , 0 , 90).'...': $sms_row['text']):'' ,
            'sticker' => ( $sms_row['sticker'] )?true:false ,
            'media' => ( $sms_row['videos'] || $sms_row['audios'] || $sms_row['gif'] )?true:false ,
            'img' => ( $sms_row['img'] != '' )?$sms_row['img_small']:'' ,
            'author' => get_user( ($sms_row['prof'] == $my_id)?$sms_row['friend']:$sms_row['prof'], 0 , 0),
            'id' => ( $sms_row['prof'] == $my_id ) ? $sms_row['friend'] : $sms_row['prof']
            );
      }
      
      usort( $array , 'matrix_compare' );
      
      $offset = $last_id != 'NULL' ? ( 1 + array_search( $last_id , array_column( $array , 'id' ) ) ) : 0 ;
      $array = array_slice( $array , $offset , $length );
      
      $dataArr = array( 'msg' => $array , 'end' => ( $offset + $length > $i ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/'. ( isset( $_POST['full'] ) ? 'chat' : 'notification' ) .'.tpl');
    break;
    case 'notif_notif':
      
      $query = ( $last_id == 'NULL' ) ? '' : " id < '$last_id' AND ";
      
      $notif_res = mysqli_query( $dbConnect , "SELECT * FROM notif WHERE ".$query." prof_id='$my_id' ORDER BY id DESC LIMIT $length");
      $array = array();
      $i = 0;
      
      while( $notif = mysqli_fetch_array( $notif_res , MYSQLI_ASSOC ) ) {
        if( $notif['friend_id'] ) $author = get_user( $notif['friend_id'] , 0 , 0 );
        
        switch( $notif['type'] ) {
          case 1:        
            $array[$i] = [
              "show_author" => true,
              "type_1" => true,
              "other_count" => ( $others = ( count( explode( ',' , $notif['extra_column_1'] ) ) - 1 ) ) ? $others : false ,
              "post_footer" => $notif['extra_column_2'],
              "author" => $author
            ];
          break;
          case 2:        
            $array[$i] = [
              "show_author" => true,
              "type_2" => true,
              "other_count" =>  ( $others = ( count( explode( ',' , $notif['extra_column_1'] ) ) - 1 ) ) ? $others : false ,
              "post_footer" => $notif['extra_column_2'],
              "author" => $author
            ];
          break;
          case 3:        
            $array[$i] = [
              "show_author" => true,
              "type_3" => true,
              "other_count" => false,
              "post_footer" => $notif['extra_column_2'],
              "author" => $author
            ];
          break;
          case 4:        
            $array[$i] = [
              "show_author" => true,
              "type_4" => true,
              "other_count" => ( $others = ( count( explode( ',' , $notif['extra_column_1'] ) ) - 1 ) ) ? $others : false ,
              "post_footer" => $notif['extra_column_2'],
              "author" => $author
            ];
          break;
          case 5:        
            $array[$i] = [
              "show_author" => false,
              "question" => $notif['extra_column_1'],
              "form" => true,
              "hide_body" => true,
              "type_5" => true
            ];
          break;
          case 6:        
            $array[$i] = [
              "show_author" => true,
              "author" => $author,
              "question" => $notif['extra_column_2'],
              "answer" => $notif['extra_column_1'],
              "type_6" => true
            ];
          break;
          case 7:        
            $array[$i] = [
              "show_author" => true,
              "type_7" => true,
              "other_count" => false ,
              "author" => $author
            ];
          break;
          case 8:        
            $array[$i] = [
              "show_author" => true,
              "type_8" => true,
              "other_count" => false ,
              "post_footer" => $notif['extra_column_1'],
              "author" => ( $notif['extra_column_2'] == '0' ) ? get_user( $notif['friend_id'] , 0 , 0 ) : get_club( $notif['friend_id'] , 0 , 0 )
            ];
          break;
          case 9: 
            $array[$i] = [
              "show_author" => true ,
              "type_9" => true ,
              "other_count" => false ,
              "author" => get_user( $notif['friend_id'] , 0 , 0 ) ,
              "event" => get_event( $notif['extra_column_1'] ),
              "form" => true
            ];
          break;
          case 10: 
            $array[$i] = [
              "show_author" => true ,
              "type_10" => true ,
              "other_count" => false ,
              "author" => get_user( $notif['friend_id'] , 0 , 0 ) ,
              "club" => get_club( $notif['extra_column_1'] , 0 , 0 ),
              "form" => true
            ];
          break;
          case 11: 
            $array[$i] = [
              "show_author" => true,
              "type_11" => true,
              "other_count" => false ,
              "author" => $author
            ];
          break;
          case 12: 
            $array[$i] = [
              "show_author" => false,
              "hide_body" => true,
              "type_12" => true,
              "other_count" => false,
              "announcement" => $notif['extra_column_1']
            ];
          break;
          case 13: 
            $array[$i] = [
              "show_author" => true,
              "type_13" => true,
              "other_count" => false ,
              "author" => $author
            ];
          break;
        }
        $array[$i]["id"] = $notif['id'];
        
        if( $notif['type'] != 8 ) $array[$i]["author_type"] = false;
        else if( $notif['extra_column_2'] == '0' ) $array[$i]["author_type"] = false;
        else $array[$i]["author_type"] = true;
        
        $array[$i++]["new_notif"] = ( !$notif['view'] )?true:false;
        $not_id = $notif['id'];
        mysqli_query( $dbConnect , "UPDATE notif SET view='1' WHERE id='$not_id'");
      }
      /* 1 - likes, 2 - unlikes, 3 - share, 4 - comment, 5 - question, 6 - answer, 7 - datings , 8 - metetion , event inv. - 9 , club inv. - 10 , request accept - 11 */
      $dataArr = array( 'notif' => $array , 'end' => ( mysqli_num_rows( $notif_res ) < $length ? true : false ) );
      $dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/notification.tpl');
    break;
  }
  
  if( !isset( $dataArr ) ) $dataArr = array();
  
  $dataArr['langs'] = $langs;
  $dataArr['main_set'] = $global;
  $dataArr['main_set']['root'] = _root_;
  
  echo json_encode( $dataArr );
  
?>