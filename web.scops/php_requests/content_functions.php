<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  function get_news( $id ) {
    
    global $dbConnect , $user_row , $my_id , $global;
    
    if( is_array( $id ) ) $id = $id[0];
    
    if( !strlen( str_replace( " ", "", $id ) ) ) return array( 'isset' => false );
    
    if( $id <=4 ) return array( 'isset' => false );
    
    $get_news_res = mysqli_query($dbConnect, " SELECT * FROM news WHERE id='$id'");
    $news_row = mysqli_fetch_array( $get_news_res, MYSQLI_ASSOC );
    
    if( !$news_row['id'] ) return array( 'isset' => false );
    
    $prof_id = $news_row['prof_id'];
    if( $news_row['author'] == 0 )
      $author_res = mysqli_query($dbConnect, " SELECT * FROM network WHERE id='$prof_id'");
    else $author_res = mysqli_query($dbConnect, " SELECT * FROM clubs WHERE id='$prof_id'");
    
    $author_row = mysqli_fetch_array( $author_res , MYSQLI_ASSOC );

    $author_img = $author_row['img'];
    $author_img_res = mysqli_query($dbConnect, "SELECT img_clip FROM news WHERE id='$author_img'");

    $author_img_row = json_decode( mysqli_fetch_array( $author_img_res , MYSQLI_ASSOC )['img_clip'] , true);
      
    $likes = explode( ',' , $news_row['likes'] );
    $unlikes = explode( ',' , $news_row['unlikes'] );
    $likes_length = count( $likes );
    $unlikes_length = count( $unlikes );
    
    if( $news_row['likes'] ) {
      $likes_people = [];
      for( $l_p = 0 ; $l_p < ( $likes_length > 4 ? 4 : $likes_length ) ; $l_p++ )
        $likes_people[$l_p] = get_user( $likes[$l_p] );
    } else $likes_people = 0;
    
    if( $news_row['unlikes'] ) {
      $unlikes_people = [];
      for( $l_p = 0 ; $l_p < ( $unlikes_length > 4 ? 4 : $unlikes_length ) ; $l_p++ )
        $unlikes_people[$l_p] = get_user( $unlikes[$l_p] );
    } else $unlikes_people = 0;
    
    $mod_text = preg_replace( '/#\S+/' , "<span class=\"link-object dont-react\" onclick=\"openHashtag('$0')\">$0</span>" , escaper_html( $news_row['text'] ) );
    $mod_text = preg_replace( '/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,8}(\/*\S*)/' , "<span class=\"link-object\"><a class=\"dont-react\" href=\"$0\" target=\"_blank\">$0</a></span>" , $mod_text );
    $mod_text = preg_replace( '/@\S+/' , "<span class=\"link-object \"><a class=\"dont-react\" href=\"".( _mobile_ ? $global['connection'].'m.'.$global['host'] : _root_ )."/$0\" target=\"_blank\">$0</a></span>" ,$mod_text );
    
    $array = array(
      'id' => $news_row['id'],
      'isset' => true,
      'blocked_me' => false,
      'prof_id' => $news_row['prof_id'],
      'author' => $news_row['author'] == 1 ? true : false,
      'time' => $news_row['time'],
      'real_day' => unix2date( $news_row['time'] )[0],
      'real_hour' => unix2date( $news_row['time'] )[1],
      'real_min' => unix2date( $news_row['time'] )[2],
      'type' => $news_row['type'],
      'metetions' => ( $news_row['metetions'] != '' )?true:false,
      'text' => $mod_text,
      'clean_text' => $news_row['text'],
      'gif' => $news_row['gif'],
      'img' => $news_row['img'],
      'img_small' => $news_row['img_small'] ,
      'img_medium' => $news_row['img_medium'] ,
      'img_big' =>  $news_row['img_big'] ,
      'video_glob' => $news_row['video_glob'] ,
      'link' =>  $news_row['link'] ,
      'prof_pic' => $news_row['prof_pic'],
      'prof_cover' => $news_row['prof_cover'],
      'group_pic' => $news_row['group_pic'],
      'likes' => ( $news_row['likes'] != '' )? $likes_length : 0 ,
      'liked' => in_array( $my_id , $likes ) ? true : false ,
      'likes_row' => $news_row['likes'],
      'likes_arr' => $likes,
      'likes_people' => $likes_people,
      'unlikes_arr' => $unlikes,
      'unlikes_row' => $news_row['unlikes'],
      'unlikes_people' => $unlikes_people,
      'unlikes' => ( $news_row['unlikes'] != '' )? $unlikes_length  : 0 ,
      'unliked' => in_array( $my_id , $unlikes ) ? true : false ,
      'shared' => $news_row['shared'],
      'author_info' => array(
        'id' => $author_row['id'],
        'name' => $author_row['name'],
        'img' => $author_img_row[0]
      )
    );

    if( in_array( $my_id , explode( ',' , $author_row['black_list']) ) ) {
      $array['blocked_me'] = true;
      $array['list_blocked'] = true;
    }
    if( !$news_row['author'] ) {
      if( $author_row['secret'] && !in_array( $my_id , explode( ',' , $author_row['friends'] ) ) && $author_row['id'] != $my_id ) {
        $array['blocked_me'] = true;
        $array['secret_blocked'] = true;
      }
    } else {
      if( $author_row['secret'] && !in_array( $my_id , explode( ',' , $author_row['followers'] ) ) ) {
        $array['blocked_me'] = true;
        $array['secret_blocked'] = true;
      }
    }
    if( !$array['blocked_me'] ) {
      $views = $news_row['views'];
      if( !in_array( $my_id , explode( ',' , $news_row['views'] ) ) ) {
        $views = check_array( $news_row['views'] , $my_id );
        mysqli_query( $dbConnect , "UPDATE news SET views = '$views' WHERE id = '".$news_row['id']."'" );
      }
      $array['views'] = count( explode( ',', $views ) );
    } else $array['views'] = count( explode( ',', $news_row['views'] ) );
    
    if( $news_row['audio'] != '' ) {
      $array['audio'] = str_replace( ",", "-", $news_row['audio'] );
      $audio_arr = explode(',' , $news_row['audio'] );
      $audio_length = count( $audio_arr );
      $array['audio_count'] = $audio_length;
      $a = 0;
      for( $i = 0 ; $i < $audio_length ; $i++ ) {
        if( $audio_arr[$i] != '' ) $array['audio_array'][$a++] = get_music( $audio_arr[$i] );
      }
      $array['audio_tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/audio.tpl');
    }
    
    if( $news_row['video_loc'] != '' ) $array['video_loc'] = get_video( $news_row['video_loc'] , $news_row['id'] );
    
    if( $news_row['location'] != '' ) {
      $array['location'] = true;
      $array['latlng'] = str_replace( '\'' , '"' , $news_row['location'] );
    }
  
    if( $array['metetions'] ) {
      $mets = explode( ',' , $news_row['metetions'] );
      $m = 0;
      foreach( $mets as $val ) {
        if( $val != '' ) {
          $met_user = get_user( $val , 0 , 0 );
          if( !$met_user['blocked_me'] )
            $array['met_user'][$m++] = array(
              'met_id' => $met_user['id'],
              'met_name' => $met_user['name'],
              'met_img' => $met_user['img']
            );
        }
      }
    }
    
    $share_id = $news_row['shared'];
    if( $share_id != '' ) {
    
      $share = mysqli_query( $dbConnect, "SELECT * FROM news WHERE id='$share_id'");
      $share_row = mysqli_fetch_array( $share, MYSQLI_ASSOC );
      $share_id = $share_row['shared'];
      
      $check_share = get_news( $share_row['id'] );
      $shareable = ( !$check_share['blocked_me'] )? true : false ;

    } else {
      $shareable = ( !$array['blocked_me'] )? true : false ;
      $check_share = '';
    }

    $array['shareable'] = $shareable;
    
    if( $news_row['shared'] != '' ) $array['share_array'] = $check_share;
    
    if( $news_row['author'] == 1 ) $array['author'] = 1;
    if( $news_row['author'] == 0 && $my_id == $news_row['prof_id'] ) $array['me'] = 1;
    
    $author = $news_row['author'];
    $author_id = $author_row['id'];
    
    $query = "type='".$news_row['type']."' AND ";
    
    $prev = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$author_id' AND id>'$id' AND ".$query." author='$author' ORDER BY id LIMIT 1");
    if( !mysqli_num_rows( $prev ) ) $prev = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$author_id' AND id!='$id' AND ".$query." author='$author' ORDER BY id LIMIT 1");
    if( mysqli_num_rows( $prev ) ) $array['prev'] = mysqli_fetch_array( $prev , MYSQLI_ASSOC )['id'];
    
    $next = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$author_id' AND id<'$id' AND ".$query." author='$author' ORDER BY id DESC LIMIT 1");
    if( !mysqli_num_rows( $next ) ) $next = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$author_id' AND id!='$id' AND ".$query." author='$author' ORDER BY id DESC LIMIT 1");
    if( mysqli_num_rows( $next ) ) $array['next'] = mysqli_fetch_array( $next , MYSQLI_ASSOC )['id'];
    
    if( $news_row['author'] == 1 && in_array( $my_id , explode( ',', $author_row['admin'] ) ) ) $array['me_admin'] = true;
    
    switch( $news_row['type'] ) {
      case 0:
        $array['type_post'] = true;
      break;
      case 1:
        $array['type_img'] = true;
      break;    
    }
    
    return $array;
  }



  function get_music( $id ) {
    
    global $dbConnect , $user_row ;
    
    $get_news_res = mysqli_query($dbConnect, " SELECT * FROM audios WHERE id='$id'");
    $news_row = mysqli_fetch_array( $get_news_res, MYSQLI_ASSOC );
    
    if( !mysqli_num_rows( $get_news_res ) ) return array( 'isset' => false );
    
    $audio = json_decode( $news_row['audio'], true );
    $audio['id'] = $id;
    $audio['isset'] = true;
    $audio['added'] = in_array( $id , explode( ',' , $user_row['audios'] ) );
      
    return $audio;
    
  }

  function get_friends( $from, $length, $id ) {
    
    global $dbConnect;
    
    $friends_res = mysqli_query($dbConnect, "SELECT friends FROM network WHERE id='$id'");
    $friends =   explode( ',' , mysqli_fetch_array( $friends_res, MYSQLI_ASSOC )['friends'] );
    
    $count = count( $friends );
    $array = array();
    $j = 0;
    for( $i = $from ; $i < ( $count > $length + $from ? $length + $from : $count ) ; $i++ ) {
      $frid = $friends[$i];
      if( $frid ) {
        $friend = mysqli_query($dbConnect, "SELECT * FROM network WHERE id='$frid'");
        $fr_row =   mysqli_fetch_array( $friend, MYSQLI_ASSOC );
        
        $array[$j++] = get_user( $fr_row['id'] , 0 , 0 );
        
      } else break;
    }
    
    return array( $array , ( $count > $length + $from ? false : true ) );

  }

  function get_followers( $from, $length, $id ) {
    
    global $dbConnect ;
    
    $friends_res = mysqli_query($dbConnect, "SELECT followers FROM clubs WHERE id='$id'");
    $friends =   explode( ',' , mysqli_fetch_array( $friends_res, MYSQLI_ASSOC )['followers'] );
    
    $count = count( $friends );
    $array = array();
    $j = 0;
    for( $i = $from ; $i < ( $count > $length + $from ? $length + $from : $count ) ; $i++ ) {
      $frid = $friends[$i];
      if( $frid ) {
        $friend = mysqli_query($dbConnect, "SELECT * FROM network WHERE id='$frid'");
        $fr_row =   mysqli_fetch_array( $friend, MYSQLI_ASSOC );
        
        $array[$j++] = get_user( $fr_row['id'] , 0 , 0 );
        
      } else break;
    }
    
    return array( $array , ( $count > $length + $from ? false : true ) );

  }

  function get_clubs( $from, $length, $id ) {
    
    global $dbConnect;
    
    $clubs_res = mysqli_query($dbConnect, "SELECT clubs FROM network WHERE id='$id'");
    $clubs =   explode( ',' , mysqli_fetch_array( $clubs_res, MYSQLI_ASSOC )['clubs'] );
    
    $count = count( $clubs );
    $array = array();
    $j = 0;
    for( $i = $from ; $i < ( $count > $length + $from ? $length + $from : $count ) ; $i++ ) {
      $club = $clubs[$i];
      if( $club ) $array[$j++] = get_club( $club , 0 , 0 );
    }
    
    return array( $array , ( $count > $length + $from ? false : true ) );

  }

  function get_club( $id , $img_size = 0, $cover_size = 0 ) {
    global $dbConnect , $user_row , $my_id;
    
    $get_club_res = mysqli_query($dbConnect, "SELECT * FROM clubs WHERE id='$id' ");
    $club = mysqli_fetch_array( $get_club_res, MYSQLI_ASSOC );
    
    if( !mysqli_num_rows( $get_club_res ) ) return array( 'isset' => false );
    
    $array = array();
    
    $img = $club['img'];
    $cover = $club['cover'];
    
    $img_exist = $img > 4;
    $cover_exist = $cover > 4;
    
    $img_res = mysqli_query($dbConnect, "SELECT img_clip , id FROM news WHERE id='$img'");
    $img = mysqli_fetch_array($img_res, MYSQLI_ASSOC);
    $img_id = $img['id'];
    $img = json_decode( $img['img_clip'] , true)[$img_size];
    
    $cover_res = mysqli_query($dbConnect, " SELECT cover_clip , id FROM news WHERE id='$cover'");
    $cover = mysqli_fetch_array($cover_res, MYSQLI_ASSOC);
    $cover_id = $cover['id'];
    $cover = json_decode( $cover['cover_clip'] , true )[$cover_size];
    
    $array = array(
      'id' => $club['id'],
      'isset' => true,
      'blocked_me' => false,
      'admin' => $club['admin'],
      'name' => $club['name'],
      'description' => $club['description'],
      'img' => $img,
      'img_id' => $img_id,
      'img_exist' => $img_exist,
      'cover' => $cover,
      'cover_exist' => $cover_exist,
      'cover_id' => $cover_id,
      'members' => $club['members'],
      'followers' => $club['followers'],
      'videos' => $club['videos'],
      'audios' => $club['audios'],
      'requests' => $club['requests'],
      'secret' => $club['secret'] ? true : false,
      'black_list' => $club['black_list']
    );
    
    $admins = explode( ',' , $club['admin'] );
    $followers = explode( ',' , $club['followers'] );
    
    if( in_array( $my_id , explode( ',' , $club['black_list']) ) ) $array['blocked_me'] = true;
    if( $club['secret'] && !in_array( $my_id , $followers ) ) $array['blocked_me'] = true; 
    
    if( in_array( $my_id , explode( ',' , $club['black_list']) ) ) {
      $array['blocked_me'] = true;
      $array['list_blocked'] = true;
    }
    
    if( $club['secret'] && !in_array( $my_id , $followers ) ) {
      $array['blocked_me'] = true;
      $array['secret_blocked'] = true;
    }
    
    $array['me_admin'] = in_array( $my_id, $admins )?true:false;
    $array['follow'] = in_array( $my_id, $followers )?true:false;
    $array['request'] = in_array( $my_id, explode( ',',$club['requests'] ) )?true:false;
    $array['blocked'] = in_array( $my_id, explode( ',',$club['black_list'] ) )?true:false;

    $array['club_followers'] = ( $club['followers'] != '' )?count( $followers ):0;
    $array['club_music'] = ( $club['audios'] != '' )?count( explode( ',' , $club['audios'] ) ):0;
    $array['club_videos'] = ( $club['videos'] != '' )?count( explode( ',' , $club['videos'] ) ):0;
    
    $array['admins_count'] = count( $admins );
    
    return $array;
    
  }

  function get_user( $id , $img_size = 0, $cover_size = 0 ) {
    global $dbConnect , $user_row , $my_id;
    
    $get_prof = mysqli_query($dbConnect, "SELECT * FROM network WHERE id='$id' ");  
    $prof = mysqli_fetch_array( $get_prof, MYSQLI_ASSOC );
    
    if( !mysqli_num_rows( $get_prof ) ) return array( 'isset' => false );
    
    $array = array();
    
    $img = $prof['img'];
    $cover = $prof['cover'];
    
    $img_exist = $img > 4;
    $cover_exist = $cover > 4;
    
    $img_res = mysqli_query($dbConnect, " SELECT img_clip, id , img_big FROM news WHERE id='$img'");
    $img = mysqli_fetch_array($img_res, MYSQLI_ASSOC);
    $img_id = $img['id'];
    
    $img_original = json_decode( $img['img_big'] , true );
    $img = json_decode( $img['img_clip'] , true)[$img_size];
    
    $cover_res = mysqli_query($dbConnect, " SELECT cover_clip , id FROM news WHERE id='$cover'");
    $cover = mysqli_fetch_array($cover_res, MYSQLI_ASSOC);
    $cover_id = $cover['id'];
    $cover = json_decode( $cover['cover_clip'] , true )[$cover_size];
    
    $array = array(
      'isset' => true,
      'id' => $prof['id'],
      'blocked_me' => false,
      'login' => $prof['login'],
      'name' => $prof['name'],
      'first_name' => explode( ' ' , $prof['name'] )[0],
      'country' => $prof['country'],
      'city' => $prof['city'],
      'birth' => $prof['birth'],
      'gender' => $prof['gender'] ? true : false ,
      'reg_time' => $prof['reg_time'],
      'rating' => $prof['rating'],
      'secret' => $prof['secret'],
      'friends' => $prof['friends'],
      'clubs' => $prof['clubs'],
      'stickers' => $prof['stickers'],
      'gifts' => $prof['gifts'],
      'videos' => $prof['videos'],
      'audios' => $prof['audios'],
      'audios_count' => !$prof['audios'] ? 0 : count( explode( ',' , $prof['audios'] ) ),
      'games' => $prof['games'],
      'followers' => $prof['followers'],
      'requests' => $prof['requests'],
      'visitors' => $prof['visitors'],
      'black_list' => $prof['black_list'],
      'vis_enabled' => !$prof['visits_enabled'],
      'dating_enabled' => !$prof['dating_enabled'],
      'img' => $img,
      'img_id' => $img_id,
      'img_exist' => $img_exist,
      'img_original' => $img_original,
      'cover' => $cover,
      'cover_id' => $cover_id,
      'cover_exist' => $cover_exist,
      'url' => ( $prof['url'] != '' ? substr( $prof['url'] , 1 ) : '' ),
      'verified' => $prof['verified'] == 0 ? false : true
    );
    
    $friends =  explode( ',' , $prof['friends'] );
    $followers =  explode( ',' , $prof['followers'] );
    $black_list = explode( ',' , $prof['black_list'] );
    
    $mutual = ( $id == $my_id ) ? count( $friends ) : 0;
    $mutual_list = '';
    
    if( $id != $my_id ) {
      $user_friends = explode( ',' , $user_row['friends'] );
      
      foreach( $friends as $val ) {
        if( $val && in_array( $val , $user_friends ) ) {
          $mutual++;
          $mutual_list = check_array( $mutual_list , $val , 1 );
        }
      }
    }
    
    $array['mutual_friends'] = $mutual;
    $array['mutual_friends_list'] = $mutual_list;
    
    if( in_array( $my_id , $black_list  ) ) $array['blocked_me'] = true;
    if( $prof['secret'] && !in_array( $my_id , $friends ) && $prof['id'] != $my_id ) $array['blocked_me'] = true; 
    
    if( in_array( $my_id , $black_list ) ) {
      $array['blocked_me'] = true;
      $array['list_blocked'] = true;
    }
    
    if( $prof['secret'] && !in_array( $my_id , $friends ) && $prof['id'] != $my_id ) {
      $array['blocked_me'] = true;
      $array['secret_blocked'] = true;
    }
    
    $array['me'] = ( $prof['id'] == $my_id )?true:false;
    $array['online'] = ( $prof['online'] > time() - 30 )?true:false;
    $array['last_visit'] = $prof['online'];
    $array['friend'] = in_array( $my_id, $friends ) ? true : false;
    $array['follow'] = in_array( $my_id, $followers ) ? true : false;
    $array['request'] = in_array( $my_id,explode( ',',$prof['requests'] ) ) ? true : false;
    $array['blocked'] = in_array( $prof['id'], $black_list ) ? true : false ;
    $array['age'] = birth_to_age( $prof['birth'] );
    $array['user_friends'] = $prof['friends'] != '' ? count( $friends ) : 0;
    $array['user_followers'] = $prof['followers'] != '' ? count( $followers ) : 0;
    $array['user_music'] = $prof['audios'] != '' ? count( explode( ',' , $prof['audios'] ) ) : 0;
    $array['user_clubs'] = $prof['clubs'] != '' ? count( explode( ',' , $prof['clubs'] ) ) : 0;
    $array['user_videos'] = $prof['videos'] != '' ? count( explode( ',' , $prof['videos'] ) ) : 0;
    
    $birth = explode( '-' , $array['birth'] );
    $array['day'] = $birth[0];
    $array['month'] = $birth[1];
    $array['year'] = $birth[2];
    
    $last_visit = unix2date( $prof['online'] );
    $array['real_day'] = $last_visit[0];
    $array['real_hour'] = $last_visit[1];
    $array['real_min'] = $last_visit[2];
    
    return $array;
    
  }

  function get_comm( $id ) {
    global $dbConnect , $user_row , $my_id;
    
    $res_comm = mysqli_query($dbConnect, "SELECT * FROM comments WHERE id='$id'");
    
    if( mysqli_num_rows( $res_comm ) == 0 ) return array();
    
    $comm = mysqli_fetch_array($res_comm, MYSQLI_ASSOC);
    
    $prof_id = $comm['prof_id'];
    $prof_res = mysqli_query( $dbConnect, "SELECT id, name, img FROM network WHERE id='$prof_id'" );
    $prof = mysqli_fetch_array( $prof_res , MYSQLI_ASSOC ); 
    $img = $prof['img'];
          
    $img_res = mysqli_query( $dbConnect, "SELECT img_clip FROM news WHERE id='$img'" );
    $img = mysqli_fetch_array( $img_res , MYSQLI_ASSOC ); 
          
    $img = json_decode( $img['img_clip'] , true )[0];
      
    $array = $comm;
    $likes = explode( ',' , $comm['likes'] );
    $unlikes = explode( ',' , $comm['unlikes'] );
    
    $array['likes_arr'] = $likes;
    $array['unlikes_arr'] = $unlikes;
    $array['likes'] = $comm['likes'] ? count( $likes ) : 0;
    $array['unlikes'] = $comm['unlikes'] ? count( $unlikes ) : 0;
    $array['me_liked'] = in_array( $my_id , $likes ) ? 1 : 0;
    $array['me_unliked'] = in_array( $my_id , $unlikes ) ? 1 : 0;
  
    $array['user'] = array(
      'id' => $prof['id'],
      'name' => $prof['name'],
      'img' => $img
    );
    
    $art_res = mysqli_query( $dbConnect , "SELECT id , prof_id , author FROM news WHERE id='".$array['article_id']."'" );
    $art = mysqli_fetch_array( $art_res );
    
    if( $array['user']['id'] == $my_id || ( !$art['author'] && $art['prof_id'] == $my_id ) ||( $art['author'] && get_club( $art['prof_id'], 0 , 0 )['me_admin'] ) ) $array['removeable'] = true;
    else $array['removeable'] = false;
    
    return $array;
  }
  
  function get_sms( $id ) {
    
    global $dbConnect , $my_id;
    
    $select_chat = mysqli_query( $dbConnect , "SELECT * FROM dialogues WHERE id='$id'" );
    $chat = mysqli_fetch_array( $select_chat , MYSQLI_ASSOC );
    
    $author_arr = get_user( $chat['prof'] );
    
    $mod_text = preg_replace( '/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,8}(\/*\S*)/' , "<span class=\"link-object\"><a class=\"dont-react\" href=\"$0\" target=\"_blank\">$0</a></span>" , escaper_html( $chat['text'] ) );
    
    $array = array(
      'id' => $chat['id'],
      'time' => $chat['sendtime'],
      'img' => $chat['img_medium'],
      'img_big' => $chat['img_big'],
      'text' => $mod_text,
      'sticker' => $chat['sticker']?true:false,
      'sticker_format' => $chat['sticker']?get_sticker_pack( $chat['sticker_pack'] )['format']:'',
      'sticker_pack' => $chat['sticker_pack'],
      'sticker_index' => $chat['sticker_index']
    );
    
    if( $chat['videos'] ) 
      $array['videos'] = get_video( $chat['videos'] );
    
    if( $chat['gif'] ) 
      $array['gif'] = $chat['gif'];
    
    if( $chat['audios'] ) {
      $a = 0;
      $audios = explode( ',' , $chat['audios'] );
      $array['audios'] = array();
      $array['audio_count'] = count( $audios );
      foreach( $audios as $val ) {
          if( $val ) {
            $mus = get_music( $val );
            if( $mus['isset'] )$array['audios'][$a++] = $mus;
          }
        }
    } else $array['audio_count'] = 0;
    
    $array['author_img'] = $author_arr['img'];
    $array['author'] = ( $chat['prof'] == $my_id )?'my':'friend';
    $array['author_id'] = ( $chat['prof'] == $my_id )?$chat['friend']: $chat['prof'];    
    
    return $array;
  }
  
  function delete_club( $id ) {
    
    global $dbConnect , $user_row , $my_id;
    
    $admin = false;
    
    if( is_array( $id ) ) {
      $id = $id[0];

      $admin = mysqli_fetch_array( mysqli_query($dbConnect , "SELECT admin FROM main") , MYSQLI_ASSOC )['admin'];
      if( md5( $admin ) == $id[1] ) $admin = true;
    }
    
    $club = get_club( $id ,0 ,0 );
    
    if( $club['isset'] && ( $club['me_admin'] || $admin ) ) {
        
      $query = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id = '$id' AND author = '1'" );
      while( $row = mysqli_fetch_array( $query , MYSQLI_ASSOC ) ) delete_post( $row['id'] );
        
      mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='10' AND extra_column_1='$id'" );
        
      $query = mysqli_query( $dbConnect , "SELECT id,clubs FROM network WHERE
        clubs LIKE '%,$id' OR
        clubs LIKE '%,$id,%' OR
        clubs LIKE '$id,%' OR
        clubs = '$id'
      " );
        
      while( $row = mysqli_fetch_array( $query , MYSQLI_ASSOC ) ) {
        $prof = $row['id'];
        $string = check_array( $row['clubs'] , $id );
        mysqli_query( $dbConnect , "UPDATE network SET clubs = '$string' WHERE id = '$prof'" );
      }
        
      $res  = mysqli_query( $dbConnect , "DELETE FROM clubs WHERE id='$id'" );
      
      if( $res ) return '1';
      else return '0';
      
    }
      
    return '0';
    
  }
  
  function delete_user( $id ) {
    
    global $dbConnect , $user_row , $my_id;
    
    $prof = get_user( $id , 0 , 0 );
    
    $chat_res = mysqli_query( $dbConnect , "SELECT * FROM chat WHERE prof='$id' OR friend='$id'" );
    
    while( $chat = mysqli_fetch_array( $chat_res , MYSQLI_ASSOC ) ) {
      $chat_id = 'chat_'.$chat['id'];
      mysqli_query( $dbConnect , "DROP TABLE ".$chat_id );
      mysqli_query( $dbConnect , "DELETE FROM chat WHERE id='".$chat['id']."'" );
    }
    
    $event_res = mysqli_query( $dbConnect , "SELECT * FROM events WHERE creator='$id'" );
    while( $event = mysqli_fetch_array( $event_res , MYSQLI_ASSOC ) ) delete_event( $event['id'] );
    
    $query = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id = '$id' AND author = '0'" );
    while( $row = mysqli_fetch_array( $query , MYSQLI_ASSOC ) ) delete_post( $row['id'] );
    
    $news_res = mysqli_query( $dbConnect , "SELECT * FROM news WHERE 
      ( likes LIKE '%,$id' OR
      likes LIKE '%,$id,%' OR
      likes LIKE '$id,%' OR
      likes = '$id' )
      OR
      ( unlikes LIKE '%,$id' OR
      unlikes LIKE '%,$id,%' OR
      unlikes LIKE '$id,%' OR
      unlikes = '$id' )
      OR
      ( metetions LIKE '%,$id' OR
      metetions LIKE '%,$id,%' OR
      metetions LIKE '$id,%' OR
      metetions = '$id' )
    ");
    
    while( $news_row = mysqli_fetch_array( $news_res , MYSQLI_ASSOC ) ) {
      
      if( in_array( $id , explode( ',' , $news_row['likes'] ) ) )
        $likes = check_array( $news_row['likes'] , $id );
      else $likes = $news_row['likes'];
      
      if( in_array( $id , explode( ',' , $news_row['unlikes'] ) ) )
        $unlikes = check_array( $news_row['unlikes'] , $id );
      else $unlikes = $news_row['unlikes'];
      
      if( in_array( $id , explode( ',' , $news_row['metetions'] ) ) )
        $met = check_array( $news_row['metetions'] , $id );
      else $met = $news_row['metetions'];
      
      mysqli_query( $dbConnect , "UPDATE news SET likes = '$likes' , unlikes = '$unlikes' , metetions = '$met' WHERE id='".$news_row['id']."'" );
    
    }

    mysqli_query( $dbConnect , "DELETE FROM notif WHERE prof_id='$id' " );
    mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='11' AND ( friend_id='$id' OR prof_id='$id' ) " );
    mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='7' AND ( friend_id='$id' OR prof_id='$id' ) " );
    mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='5' AND ( friend_id='$id' OR prof_id='$id' ) " );
    mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='6' AND ( friend_id='$id' OR prof_id='$id' ) " );
    mysqli_query( $dbConnect , "DELETE FROM notif WHERE ( type='1' || type='2' || type='3' || type='4' ) AND ( friend_id='$id' OR prof_id='$id' ) " );
    
    mysqli_query( $dbConnect , "DELETE FROM comments WHERE prof_id='$id'" );
    
    $club_res = mysqli_query( $dbConnect , "SELECT id FROM clubs WHERE admin = '$id'" );
    while( $club = mysqli_fetch_array( $club_res , MYSQLI_ASSOC ) ) delete_club( $club['id'] );
    
    $cl_res = mysqli_query( $dbConnect , "SELECT * FROM clubs WHERE 
      ( admin LIKE '%,$id' OR
      admin LIKE '%,$id,%' OR
      admin LIKE '$id,%' OR
      admin = '$id' )
      OR
      ( followers LIKE '%,$id' OR
      followers LIKE '%,$id,%' OR
      followers LIKE '$id,%' OR
      followers = '$id' )
      OR
      ( requests LIKE '%,$id' OR
      requests LIKE '%,$id,%' OR
      requests LIKE '$id,%' OR
      requests = '$id' )
      OR
      ( black_list LIKE '%,$id' OR
      black_list LIKE '%,$id,%' OR
      black_list LIKE '$id,%' OR
      black_list = '$id' )
    ");
    
    while( $cl_row = mysqli_fetch_array( $cl_res , MYSQLI_ASSOC ) ) {
      
      if( in_array( $id , explode( ',' , $cl_row['admin'] ) ) )
        $admin = check_array( $cl_row['admin'] , $id );
      else $admin = $cl_row['admin'];
      
      if( in_array( $id , explode( ',' , $cl_row['followers'] ) ) )
        $followers = check_array( $cl_row['followers'] , $id );
      else $followers = $cl_row['followers'];
      
      if( in_array( $id , explode( ',' , $cl_row['requests'] ) ) )
        $requests = check_array( $cl_row['requests'] , $id );
      else $requests = $cl_row['requests'];
      
      if( in_array( $id , explode( ',' , $cl_row['black_list'] ) ) )
        $black_list = check_array( $cl_row['black_list'] , $id );
      else $black_list = $cl_row['black_list'];
      
      mysqli_query( $dbConnect , "UPDATE clubs SET admin = '$admin' , followers = '$followers' , requests = '$requests' , black_list = '$black_list' WHERE id='".$cl_row['id']."'" );
    
    }
        
    $net_res = mysqli_query( $dbConnect , "SELECT * FROM network WHERE 
      ( friends LIKE '%,$id' OR
      friends LIKE '%,$id,%' OR
      friends LIKE '$id,%' OR
      friends = '$id' )
      OR
      ( followers LIKE '%,$id' OR
      followers LIKE '%,$id,%' OR
      followers LIKE '$id,%' OR
      followers = '$id' )
      OR
      ( requests LIKE '%,$id' OR
      requests LIKE '%,$id,%' OR
      requests LIKE '$id,%' OR
      requests = '$id' )
      OR
      ( black_list LIKE '%,$id' OR
      black_list LIKE '%,$id,%' OR
      black_list LIKE '$id,%' OR
      black_list = '$id' )
    ");
    
    while( $net_row = mysqli_fetch_array( $net_res , MYSQLI_ASSOC ) ) {
      
      if( in_array( $id , explode( ',' , $net_row['friends'] ) ) )
        $friends = check_array( $net_row['friends'] , $id );
      else $friends = $net_row['friends'];
      
      if( in_array( $id , explode( ',' , $net_row['followers'] ) ) )
        $followers = check_array( $net_row['followers'] , $id );
      else $followers = $net_row['followers'];
      
      if( in_array( $id , explode( ',' , $net_row['requests'] ) ) )
        $requests = check_array( $net_row['requests'] , $id );
      else $requests = $net_row['requests'];
      
      if( in_array( $id , explode( ',' , $net_row['black_list'] ) ) )
        $black_list = check_array( $net_row['black_list'] , $id );
      else $black_list = $net_row['black_list'];
      
      mysqli_query( $dbConnect , "UPDATE network SET friends = '$friends' , followers = '$followers' , requests = '$requests' , black_list = '$black_list' WHERE id='".$net_row['id']."'" );
    
    }
    
    $vis_res = mysqli_query( $dbConnect , "SELECT * FROM network WHERE visitors LIKE '%[\"$id\"%' " );
    while( $vis_row = mysqli_fetch_array( $vis_res , MYSQLI_ASSOC ) ) {
      
      $vis = array();
      $j = 0;
      $visitors = $vis_row['visitors'] ? json_decode( $vis_row['visitors'], true, 3 ) : array() ;
          
      foreach( $visitors as $key => $val ) 
        if( $visitors[$key][0] != $id ) $vis[$j++] = $visitors[$key];
      
      $string = json_encode( $vis );
      mysqli_query( $dbConnect , "UPDATE network SET visitors = '$string' WHERE id='".$vis_row['id']."'" );
      
    }
    
    $res  = mysqli_query( $dbConnect , "DELETE FROM network WHERE id='$id'" );
    if( $res ) return '2';
    return 0;

  }

  function delete_post( $id ) {
    global $dbConnect , $user_row , $my_id;
    
    if( $id <= 4 ) return ;
    $get_news = mysqli_query( $dbConnect , "SELECT * FROM news WHERE id='$id'" );
    $news = mysqli_fetch_array( $get_news , MYSQLI_ASSOC );
    
    if( !mysqli_num_rows( $get_news ) ) return ;
    
    if( $news['author'] == 0 ) {
      if( $news['prof_id'] == $my_id ) {
        if( $user_row['img'] == $id ) {
          if( $user_row['gender'] ) mysqli_query( $dbConnect , "UPDATE network SET img='2' WHERE id='$my_id'");
          else mysqli_query( $dbConnect , "UPDATE network SET img='1' WHERE id='$my_id'");
        }
        if( $user_row['cover'] == $id ) mysqli_query( $dbConnect , "UPDATE network SET cover='3' WHERE id='$my_id'");
        
        mysqli_query(  $dbConnect , "DELETE FROM comments WHERE article_id='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM notif WHERE type='8' AND extra_column_1='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM notif WHERE ( type='1' || type='2' || type='3' || type='4' ) AND extra_column_2='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM news WHERE id='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM news WHERE shared='$id'" );
        update_rating( $my_id , -20 );
        if( $news['video_loc'] && $news['type'] == 2 ) delete_video( $news['video_loc'] );
      }
    } else {
      $author = $news['prof_id'];
      $get_club = mysqli_query( $dbConnect , "SELECT admin,img,cover FROM clubs WHERE id='$author'" );
      $club = mysqli_fetch_array( $get_club , MYSQLI_ASSOC );
      if( in_array( $my_id , explode( ',' , $club['admin'] ) ) ) {
        if( $club['img'] == $id ) mysqli_query( $dbConnect , "UPDATE clubs SET img='4' WHERE id='$author'");
        if( $club['cover'] == $id ) mysqli_query( $dbConnect , "UPDATE clubs SET cover='3' WHERE id='$author'");
        
        mysqli_query(  $dbConnect , "DELETE FROM comments WHERE article_id='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM notif WHERE type='8' AND extra_column_1='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM news WHERE id='$id'" );
        mysqli_query(  $dbConnect , "DELETE FROM news WHERE shared='$id'" );
        
        if( $news['video_loc'] && $news['type'] == 2 ) delete_video( $news['video_loc'] );
        
      }
    }
  }
  
  function delete_event( $id ) {
    global $dbConnect , $user_row , $my_id;
    
    $event = get_event( $id );
    
    if( $event['isset'] && $event['me_creator'] ) {
      
      if( $event['thumb'] != 'img/person/event.jpg' ) unlink( dirname(__FILE__).'/../'.$event['thumb'] );
      mysqli_query( $dbConnect , "DELETE FROM events WHERE id='".$event['id']."'" );
      mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='9' AND extra_column_1='".$event['id']."'" );
      
    }
      
  }
  
  function delete_video( $id ) {
    
    global $dbConnect , $user_row , $my_id;
    
    if( !strlen( str_replace( " ", "", $id ) ) ) return ;
        
    $get_video = mysqli_query( $dbConnect , "SELECT * FROM videos WHERE id='$id'" );
    $video = mysqli_fetch_array( $get_video , MYSQLI_ASSOC );
    
    if( ( $video['author'] == 0 && $video['prof'] == $my_id ) || ( $video['author'] == 1 && get_club( $video['prof'] ,0 , 0 )['me_admin'] ) ) {
      
      unlink( dirname(__FILE__)."/../".json_decode( $video['video'] , true )['name'] );
      mysqli_query( $dbConnect , "DELETE FROM videos WHERE id='$id'");
      
      mysqli_query( $dbConnect , "DELETE FROM dialogues WHERE videos='$id'");
      
      $del_res = mysqli_query( $dbConnect , "SELECT id FROM news WHERE video_loc='$id'");
      while( $del_row = mysqli_fetch_array( $del_res , MYSQLI_ASSOC ) ) delete_post( $del_row['id'] );
      
      if( !$video['author'] ) {
        $string = check_array( $user_row['videos'] , $id );  
        mysqli_query( $dbConnect, "UPDATE network SET videos='$string' WHERE id='$my_id'" );
      } else {
        $string = check_array( get_club( $video['prof'] , 0 , 0 )['videos'] , $id );  
        mysqli_query( $dbConnect, "UPDATE clubs SET videos='$string' WHERE id='".$video['prof']."'" );
      }
    
    }
  }

  function get_video( $id , $post = NULL ) {
    
    if( !strlen( str_replace( " ", "", $id ) ) ) return '';
    
    global $dbConnect , $user_row , $my_id;
    
    $get_video = mysqli_query($dbConnect, "SELECT * FROM videos WHERE id='$id'");
    $video_row = mysqli_fetch_array( $get_video, MYSQLI_ASSOC );
    
    $views = $video_row['views'];
    if( !in_array( $my_id , explode( ',' , $video_row['views'] ) ) ) {
      $views = check_array( $video_row['views'] , $my_id );
      mysqli_query( $dbConnect , "UPDATE videos SET views = '$views' WHERE id = '$id'" );
    }
    
    $video = json_decode( $video_row['video'], true );
    $video['length'] = round( $video['length'] );
    $video['video_id'] = $id;
    $video['views'] = count( explode( ',', $views ) );
    if( $post != NULL ) $video['id'] = $post;
    else {
      $get_post = mysqli_query($dbConnect, "SELECT * FROM news WHERE type='2' AND video_loc='$id'");
      $post_row = mysqli_fetch_array( $get_post, MYSQLI_ASSOC );
      
      $video['id'] = $post_row['id'];
    }
    
    if( !$video_row['author'] ) {
      if( $video_row['prof'] == $my_id ) $video['video_admin'] = true;
    } else {
      if( get_club( $video_row['prof'] , 0, 0 )['me_admin'] ) $video['video_admin'] = true;
    }
    
    return $video;
    
  }

  function get_sticker_pack( $id ) {
    
    global $dbConnect;
    
    $get_pack = mysqli_query($dbConnect, "SELECT * FROM stickers WHERE id='$id'");
    $sticker = mysqli_fetch_array( $get_pack, MYSQLI_ASSOC );
    if( mysqli_num_rows( $get_pack ) ) {
      $array = [
        'id' => $sticker['id'],
        'name' => $sticker['name'],
        'length' => $sticker['length'],
        'format' => $sticker['format'],
        'thumb' => $sticker['thumb'],
        'cover' => $sticker['cover']
      ];
    } else $array = ['empty' => true];
    return $array;
    
  }

  function get_gift( $id ) {
    
    global $dbConnect;
    
    $get_pack = mysqli_query($dbConnect, "SELECT * FROM gifts WHERE id='$id'");
    $gift = mysqli_fetch_array( $get_pack, MYSQLI_ASSOC );
    
    if( mysqli_num_rows( $get_pack ) ) {
      $array = $gift;
      $array['isset'] = true;
    } else $array = ['isset' => false];
    return $array;
    
  }

  function get_game( $id ) {
    
    global $dbConnect;
    
    $games = mysqli_query($dbConnect, "SELECT * FROM games WHERE id='$id'");
    $game = mysqli_fetch_array( $games, MYSQLI_ASSOC );
    if( mysqli_num_rows( $games ) ) {
      $array = [
        'id' => $game['id'],
        'name' => $game['name'],
        'about' => $game['about'],
        'cover' => $game['cover'],
        'prop' => $game['prop'],
        'link' => $game['link'],
        'empty' => false
      ];
    } else $array = ['empty' => true];
    return $array;
    
  }

  function get_event( $id ) {
    
    global $dbConnect , $my_id;
    
    $get_event = mysqli_query( $dbConnect, "SELECT * FROM events WHERE id='$id'" );
    $event = mysqli_fetch_array( $get_event, MYSQLI_ASSOC );
    if( mysqli_num_rows( $get_event ) ) {
      $me_go = in_array( $my_id , explode( ',' , $event['going'] ) );
      $me_inv = in_array( $my_id , explode( ',' , $event['invited'] ) );
      
      if( $event['creator'] == $my_id || !$event['closed'] || $me_go || $me_inv )
        $access = true;
      else $access = false;
      
      $array = [
        'id' => $event['id'],
        'isset' => true,
        'author' => get_user( $event['creator'], 0 , 0 ) ,
        'creator' => $event['creator'] ,
        'me_creator' => $event['creator'] == $my_id ? true : false,
        'title' => strlen( $event['title'] ) > 200 ? substr( $event['title'], 0 , 200 ).'...' : $event['title'],
        'full_title' => $event['title'],
        'about' => $event['about'] ? $event['about'] : false ,
        'thumb' => $event['thumb'] ? $event['thumb'] : false ,
        'place' => $event['place'] ? $event['place'] : false ,
        'date' => $event['date'],
        'human_date' => human_date( $event['date'] ),
        'start' => $event['start'] ? $event['start'] : false,
        'going' => $event['going'],
        'invited' => $event['invited'],
        'members' => $event['members'],
        'closed' => $event['closed'] ? true : false,
        'me_go' => $me_go ? true : false,
        'me_inv' => $me_inv ? true : false,
        'access' => $access
      ];
    } else $array = ['isset' => false];
    
    return $array;
    
  }

  function update_rating( $id , $num ) {
    global $dbConnect;
    
    $get_prof = mysqli_query($dbConnect, "SELECT id, rating FROM network WHERE id='$id' ");
    $prof = mysqli_fetch_array( $get_prof, MYSQLI_ASSOC );
    
    $rating = $prof['rating'];
    $rating += $num;
    
    $rating = $rating >= 0 ? $rating : 0;
    mysqli_query( $dbConnect , "UPDATE network set rating='$rating' WHERE id='$id'" );
  }


  function notification_set_function( $news , $my_id , $type ) {
    global $dbConnect;
    
    if( !$news['author'] && $news['prof_id'] != $my_id ) {
      $not_res = mysqli_query( $dbConnect, "SELECT * FROM notif WHERE extra_column_2='".$news['id']."' AND type='$type'" );
      if( mysqli_num_rows( $not_res ) ) {
        $notif = mysqli_fetch_array( $not_res , MYSQLI_ASSOC );
        
        if( $notif['extra_column_1'] == $my_id ) {
          update_rating(  $news['prof_id'] , -10 );
          mysqli_query( $dbConnect , "DELETE FROM notif WHERE id='".$notif['id']."'");
        } else {
          if( in_array( $my_id , explode( ',' , $notif['extra_column_1'] ) ) ) {
            
            update_rating( $news['prof_id'] , -10 );
            $others = check_array( $notif['extra_column_1'] , $my_id );
            $fr_id = explode( ',' , $others )[0];
            mysqli_query( $dbConnect , "UPDATE notif SET extra_column_1='$others', friend_id='$fr_id' WHERE id='".$notif['id']."'" );            
          
          } else {
            
            update_rating( $news['prof_id'] , 10 );
            $others = check_array( $notif['extra_column_1'] , $my_id );
            mysqli_query( $dbConnect , "DELETE FROM notif WHERE id='".$notif['id']."'");
            mysqli_query( $dbConnect , "INSERT notif ( prof_id , friend_id , extra_column_1 , extra_column_2 , type , time ) VALUES ( ".$news['author_info']['id'].", '$my_id' , '$others' , ".$news['id']." , '$type' ,'".time()."' ) " );
          
          }
        }
      } else {
        update_rating( $news['prof_id'] , 10 );
        mysqli_query( $dbConnect , "INSERT notif ( prof_id , friend_id , extra_column_1 , extra_column_2 , type , time ) VALUES ( ".$news['author_info']['id'].", '$my_id' , '$my_id' , ".$news['id']." , '$type' ,'".time()."' ) " );
      }
    }
  }
  
?>