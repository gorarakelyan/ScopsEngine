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
  
  $type = escaper_mysql( $_POST['type'] );
  if( isset( $_POST['options'] ) && $_POST['options'] != '' ) $options = json_decode( $_POST['options'] , true );
  
  switch( $type ) {
    case 0 :
    
      $frid = escaper_mysql( $_POST['id'] );
      $friend = get_user( $frid, 0, 0 );
      
      if( !$friend['isset'] ) exit;
      
      $string = check_array( $user_row['black_list'] , $frid );
      mysqli_query( $dbConnect, "UPDATE network SET black_list='$string' WHERE id='$my_id'" );
      
      if( $friend['friend'] ) {
        $string = check_array( $user_row['friends'] , $frid );
        mysqli_query( $dbConnect, "UPDATE network SET friends='$string' WHERE id='$my_id'" );
        $string = check_array( $friend['friends'] , $my_id );    
        mysqli_query( $dbConnect, "UPDATE network SET friends='$string' WHERE id='$frid'" );
      }
      if( $friend['follow'] ) {
        $string = check_array( $friend['followers'] , $my_id );    
        mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$frid'" );
      }
      if( in_array( $frid , explode( ',',$user_row['followers'] ) ) ) {
        $string = check_array( $user_row['followers'] , $frid );    
        mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$my_id'" );
      }
      
      echo ( !in_array( $frid , explode(',' , $user_row['black_list']) ) )?0:1;
      
    break;
    case 1 :
    
      $frid = escaper_mysql( $_POST['id'] );
      $friend = get_user( $frid ,0 , 0 );
      if( !$friend['isset'] || $friend['blocked_me'] ) exit();
      
      $mysql_friend_res = mysqli_query($dbConnect, "SELECT * FROM network WHERE id='$frid'");
      $friend = mysqli_fetch_array( $mysql_friend_res , MYSQLI_ASSOC );
      
      $string = check_array( $friend['followers'] , $my_id );    
      mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$frid'" );
      
      if( in_array( $my_id , explode(',' , $string) ) ) {
        echo 0;
        update_rating( $frid  , 20 );
      } else {
        echo 1;
        update_rating( $frid , -20 );
      }
      
    break;
    case 2 :
    
      $frid = escaper_mysql( $_POST['id'] );

      $friend = get_user( $frid , 0, 0);
      
      if( !$friend['isset'] || $friend['list_blocked'] ) exit();
      
      if( $friend['friend'] ) {
        
        update_rating( $frid , -40 );
        update_rating( $my_id , -40 );
        $string = check_array( $user_row['friends'] , $frid );
        mysqli_query( $dbConnect, "UPDATE network SET friends='$string' WHERE id='$my_id'" );
        $string = check_array( $friend['friends'] , $my_id );    
        mysqli_query( $dbConnect, "UPDATE network SET friends='$string' WHERE id='$frid'" );
        $string = check_array( $friend['followers'] , $my_id );    
        mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$frid'" );
        $string = check_array( $user_row['followers'] , $frid );    
        mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$my_id'" );
        
        mysqli_query( $dbConnect, "DELETE FROM notif WHERE ( ( friend_id='$my_id' AND prof_id='$frid' ) OR ( friend_id='$frid' AND prof_id='$my_id' ) ) AND type='11'" );
        
        echo 0;
      } else {
        
        $string = check_array( $friend['requests'] , $my_id );    
        mysqli_query( $dbConnect, "UPDATE network SET requests='$string' WHERE id='$frid'" );

        echo $friend['request']?1:0;
        
      }
    
    break;
    case 3 :
    
      $newsid = escaper_mysql( $_POST['id'] );
      $news = get_news( $newsid );
      if( !$news['isset'] ) exit;
      
      if( !$news['blocked_me'] ) {
        $string = check_array( $news['likes_row'] , $my_id );
        mysqli_query( $dbConnect, "UPDATE news SET likes='$string' WHERE id='$newsid'" );

        notification_set_function( $news , $my_id , 1 );
        
        echo ( $string != '' )? count( explode( ',' , $string ) ) : 0 ;
      } else echo $news['likes'];
      
    break;
    case 4 :       
    
      $newsid = escaper_mysql( $_POST['id'] );
      $news = get_news( $newsid );
      if( !$news['isset'] ) exit;
      
      if( !$news['blocked_me'] ) {
        $string = check_array( $news['unlikes_row'] , $my_id );
        mysqli_query( $dbConnect, "UPDATE news SET unlikes='$string' WHERE id='$newsid'" );
        
        notification_set_function( $news , $my_id , 2 );
        
        echo ( $string != '' )? count( explode( ',' , $string ) ) : 0 ;
      } else echo $news['unlikes'];
      
    break;
    case 5 :
    
      $newsid = escaper_mysql( $_POST['id'] );
      
      if( !get_news( $newsid )['isset'] ) exit;
      
      $time = time();
      $followers = $my_id.','.$user_row['followers'];
      
      $mysql_news_res = mysqli_query( $dbConnect , "SELECT id,shared FROM news WHERE id='$newsid'" );
      $mysql_news_row = mysqli_fetch_array( $mysql_news_res, MYSQLI_ASSOC );
      
      while( $mysql_news_row['shared'] != ''  ) {
        $newsid = $mysql_news_row['shared'];
        $mysql_news_res = mysqli_query( $dbConnect , "SELECT id,shared FROM news WHERE id='$newsid'" );
        $mysql_news_row = mysqli_fetch_array( $mysql_news_res, MYSQLI_ASSOC );
      }
      
      $share = $mysql_news_row['id'];
      $news = get_news($mysql_news_row['id']);
      
      if( mysqli_num_rows( $mysql_news_res ) && $news['shareable'] ) {
        
        mysqli_query( $dbConnect , "INSERT INTO news ( prof_id,author,time,followers,shared ) VALUES ( '$my_id','0','$time','$followers','$share' )" );
        if( !$news['author'] && $news['prof_id'] != $my_id ) {
          update_rating( $news['prof_id'] , 10 );
          mysqli_query( $dbConnect , "INSERT INTO notif ( prof_id , friend_id , extra_column_1 , extra_column_2 , type , time ) VALUES ( ".$news['author_info']['id'].", '$my_id' , '$my_id' , ".$news['id']." , '3' ,'".time()."' ) " );
        }
      }
      
    break;
    case 6:
      delete_post( $_POST['id'] );
    break;
    case 7 :
    
      $frid = escaper_mysql( $_POST['id'] );
      $array = get_user( $frid , 0 , 0 );
      if( $array['blocked_me'] ) echo 0;
      else echo 1;
      
    break;
    case 8 :
    
      $frid = escaper_mysql( $_POST['id'] );
      $array = get_club( $frid , 0 , 0 );
      $query = [ 0, 0];
      if( $array['me_admin'] ) $query[0] = 1;
      if( $array['blocked_me'] ) $query[1] = 1;
      
      echo json_encode( $query );
      
    break;
    case 9:
    
      $clubID = escaper_mysql( $_POST['id'] );
      $club = get_club( $clubID , 0, 0);
      
      if( !$club['isset'] ) exit;
      
      if( $club['follow'] || $club['request'] ) {
        
        $query = $club['request'] ? 'requests' : 'followers';
        $string = check_array( $club[$query] , $my_id );
        mysqli_query( $dbConnect, "UPDATE clubs SET ".$query."='$string' WHERE id='$clubID'" );
        
        if( $query == 'followers' ) {
          if( in_array( $club['id'] , explode( ',' , $user_row['clubs'] ) ) ) {
            $string = check_array( $user_row['clubs'] , $club['id'] );    
            mysqli_query( $dbConnect, "UPDATE network SET clubs='$string' WHERE id='$my_id'" );
            mysqli_query( $dbConnect, "UPDATE clubs SET members='".( $club['members'] - 1 )."' WHERE id='$clubID'" );
          }
        }
        
      } else if( !$club['list_blocked'] ) {
        
          $query = $club['secret'] ? 'requests' : 'followers' ;
          $string = check_array( $club[$query] , $my_id );    
          mysqli_query( $dbConnect, "UPDATE clubs SET ".$query."='$string' WHERE id='$clubID'" );
          
          if( $query == 'followers' ) {
            $string = check_array( $user_row['clubs'] , $club['id'] );    
            mysqli_query( $dbConnect, "UPDATE network SET clubs='$string' WHERE id='$my_id'" );
            mysqli_query( $dbConnect, "UPDATE clubs SET members='".( $club['members'] + 1 )."' WHERE id='$clubID'" );
          }
          
        }

    break;
    case 10:
    
      $name = $_POST['name'] == '' ? 'Club' : escaper_mysql( $_POST['name'] );
      mysqli_query( $dbConnect , "INSERT INTO clubs (admin,name,description,reg_time,img,cover,followers) VALUES ('$my_id','".$name."','".$_POST['descr']."','".time()."','4','3','".$my_id."')" );
      
      $groupID = mysqli_query( $dbConnect , "SELECT id FROM clubs WHERE admin='$my_id' ORDER BY id DESC LIMIT 1" );
      $groupID = mysqli_fetch_array( $groupID , MYSQLI_ASSOC );
      
      $string = check_array( $user_row['clubs'] , $groupID['id'] );  
      
      mysqli_query( $dbConnect, "UPDATE network SET clubs='$string' WHERE id='$my_id'" );
  
    break;
    case 11:
      
      $frid = escaper_mysql( $_POST['id'] );
      $friend = get_user( $frid ,0 ,0 );
      
      if(  !$friend['isset'] || $friend['list_blocked'] ) exit();
      if( !in_array( $frid , explode( ',' , $user_row['requests'] ) ) ) exit();
      
      update_rating( $frid , 40 );
      update_rating( $my_id , 40 );
      $string = check_array( $user_row['friends'] , $frid );
      mysqli_query( $dbConnect, "UPDATE network SET friends='$string' WHERE id='$my_id'" );
      $string = check_array( $friend['friends'] , $my_id );    
      mysqli_query( $dbConnect, "UPDATE network SET friends='$string' WHERE id='$frid'" );
      
      if( !in_array( $my_id , explode( ',' , $friend['followers'] ) ) ) {
        $string = check_array( $friend['followers'] , $my_id );    
        mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$frid'" );
      }
      
      if( !in_array( $frid , explode( ',' , $user_row['followers'] ) ) ) {
        $string = check_array( $user_row['followers'] , $frid );    
        mysqli_query( $dbConnect, "UPDATE network SET followers='$string' WHERE id='$my_id'" );
      }
      
      $string = check_array( $user_row['requests'] , $frid );  
      mysqli_query( $dbConnect, "UPDATE network SET requests='$string' WHERE id='$my_id'" );
      
      mysqli_query( $dbConnect, "INSERT INTO notif SET type='11' , prof_id='$frid' , friend_id='$my_id' , time='".time()."'" );
      
      echo 1;
      
    break;
    case 12:
      
      $frid = escaper_mysql( $_POST['id'] );
      if( !get_user( $frid , 0 , 0 )['isset'] ) exit;
      
      $string = check_array( $user_row['requests'] , $frid );  
      mysqli_query( $dbConnect, "UPDATE network SET requests='$string' WHERE id='$my_id'" );
    
    break;
    case 13:
      
      /* maqur */
      
    break;
    case 14:
      
      if( !get_music( escaper_mysql( $_POST['id'] ) )['isset'] ) exit;
      
      $string = check_array(  $user_row['audios'] , escaper_mysql( $_POST['id'] ) );
      mysqli_query( $dbConnect, "UPDATE network SET audios='$string' WHERE id='$my_id'" );
      
      if( in_array( escaper_mysql( $_POST['id'] ) , explode( ',' , $string ) ) ) echo 1;
      
    break;
    case 15:
      
      $id = escaper_mysql( $_POST['id'] );
      $string = check_array( $user_row['stickers'], $id );
      mysqli_query( $dbConnect , "UPDATE network SET stickers='$string' WHERE id='$my_id'");
      
      if( in_array( $id , explode( ',' , $string ) ) ) echo 1;
      else echo 0;
      
    break;
    case 16:
    
      $users = escaper_mysql( $_POST['users'] );
      $array = explode( '-' , $users );
      $length = count( $array );
      
      $online = array();
      $j = 0;
      
      for( $i = 0 ; $i < $length ; $i++ ) {
        if( $array[$i] && get_user( $array[$i] , 0 , 0 )['online'] ) $online[$j++] = $array[$i];
      }
      
      echo implode( ',' , $online );
      
    break;
    case 17:
    
      $id = escaper_mysql( $_POST['id'] );
      $text = $options['text'];
      $prof = get_user( $id , 0 , 0 );
      if( !$prof['isset'] ) exit;
      
      if( !$prof['blocked_me'] && strlen( str_replace( " ", "", $text ) ) ) 
        mysqli_query( $dbConnect , "INSERT INTO notif ( prof_id , friend_id , extra_column_1 , type , time ) VALUES ( ".$id.", '$my_id' , '".escaper_mysql( $text )."' , '5' ,'".time()."' ) " );
      
    break;  
    case 18:
    
      $id = escaper_mysql( $_POST['id'] );
      $answer = $options['text'];
      
      $notif_res = mysqli_query( $dbConnect , "SELECT * FROM notif WHERE id='".$id."'" );
      $notif = mysqli_fetch_array( $notif_res ,MYSQLI_ASSOC );
      
      if( !mysqli_num_rows( $notif_res ) ) exit;
      
      if( $notif['prof_id'] == $my_id && strlen( str_replace( " ", "", $answer ) )) {
        mysqli_query( $dbConnect , "DELETE FROM notif WHERE id='".$id."'" );
        $frid = $notif['friend_id'];
        mysqli_query( $dbConnect , "INSERT INTO notif ( prof_id , friend_id , extra_column_1 , extra_column_2 , type , time ) VALUES ( '$frid', '$my_id' , '".escaper_mysql( $answer )."' , '".escaper_mysql( $notif['extra_column_1'] )."' , '6' ,'".time()."' ) " );
      }
      
    break;
    case 19:
    
      $id = escaper_mysql( $_POST['id'] );
      
      $notif_res = mysqli_query( $dbConnect , "SELECT * FROM notif WHERE id='".$id."'" );
      $notif = mysqli_fetch_array( $notif_res ,MYSQLI_ASSOC );
      
      if( !mysqli_num_rows( $notif_res ) ) exit;
      
      if( $notif['prof_id'] == $my_id ) mysqli_query( $dbConnect , "DELETE FROM notif WHERE id='".$id."'" );
    
    break;
    case 20:
      
      $id = escaper_mysql( $_POST['id'] );
      
      $prof = get_user( $id , 0 , 0 );
      
      if( !$prof['isset'] ) exit;
      
      if( !$prof['list_blocked'] && $prof['dating_enabled'] ) {
        mysqli_query( $dbConnect , "DELETE FROM notif WHERE prof_id='$id' AND friend_id='$my_id' AND type='7'");
        mysqli_query( $dbConnect , "INSERT INTO notif SET prof_id='$id',friend_id='$my_id',type='7',time='".time()."'");
      }
    
    break;
    case 21:
    
      $thumb_name = 'img/person/event.jpg';
    
      if( isset( $_FILES['cover'] ) ) {
        $valid_formats = array("jpg", "png", "gif", "jpeg"); 

        $key = $_FILES['cover']['name'];
        $ext = strtolower( end ( explode( "." , $key ) ) );
          
        if( in_array( $ext, $valid_formats ) ) {
            
          $folder = dirname(__FILE__).'/../content/'.$my_id;
          if( !is_dir( $folder ) ) mkdir( $folder );
            
          $actual_image_name = gen_name( 10 ).time().".".$ext ; 
          $tmp = $_FILES['cover']['tmp_name'];
          if( move_uploaded_file( $tmp, $folder.'/'.$actual_image_name) ) {

            $clone_name = $folder.'/'.$actual_image_name;
            $thumb_name = $folder.'/e-'.$actual_image_name;
            img_resize_save( $clone_name, $thumb_name, 500, 500, $ext, $folder );
            
            $thumb_name = 'content/'.$my_id.'/e-'.$actual_image_name;
            
            unlink( $clone_name );
            
          }
        }
      }
      
      mysqli_query( $dbConnect , "INSERT INTO events SET 
        creator='$my_id' ,
        members='1' ,
        e_time='".time()."' ,
        title='".escaper_mysql( $_POST['title'] )."',
        about='".escaper_mysql( $_POST['about'] )."',
        place='".escaper_mysql( $_POST['place'] )."',
        start='".escaper_mysql( $_POST['time'] )."',
        date='".escaper_mysql( $_POST['date'] )."',
        closed='".( isset( $_POST['closed'] ) ? 1 : 0 ) ."',
        thumb='$thumb_name'
      " );
    
    break;
    case 22:
      
      $id = escaper_mysql( $_POST['id'] );
      delete_event( $id );
      
    break;
    case 23: 
      
      $id = escaper_mysql( $_POST['id'] );
      $people = explode( ',' , $options['people']);
      
      if( count( $people ) ) {
        
        $event = get_event( $id );
        if( $event['access'] ) {
          foreach( $people as $val ) {
            $prof = get_user( $val , 0 , 0 );
            if( $prof['isset'] && !$prof['blocked_me'] && $prof['friend'] && !in_array( $val , explode( ',' , $event['going'] ) ) && $event['creator'] != $val ) {
              
              mysqli_query( $dbConnect , "DELETE FROM notif WHERE prof_id='".$prof['id']."' AND type='9' AND extra_column_1='$id'" );
              mysqli_query( $dbConnect , "INSERT INTO notif SET prof_id='".$prof['id']."', friend_id='$my_id' , extra_column_1='$id' , type='9' , time='".time()."'" );

              $event_inv = explode( ',' , $event['invited'] );

              if( !in_array( $val , $event_inv ) ) array_push( $event_inv , $val );
              $string = implode( ',' , $event_inv );
                
              mysqli_query( $dbConnect , "UPDATE events SET invited='$string' WHERE id='$id' " );

            }
          }
        }
      }
      
    break;
    case 24:
      
      $id = escaper_mysql( $_POST['id'] );
      $event = get_event( $id );
      
      if( !$event['isset'] ) exit;
      
      if( $event['access'] ) {
        
        $string = check_array( $event['going'] , $my_id );
        $members = intval( $event['members'] ) + 1;
        
        if( in_array( $my_id , explode( ',' , $event['invited'] ) ) ) $invited = check_array( $event['invited'] , $my_id );
        else $invited = $event['invited'];
        
        mysqli_query( $dbConnect , "UPDATE events SET going = '$string' , invited = '$invited' , members = '$members' WHERE id='$id'" );
      
      }
      
      mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='9' AND extra_column_1='$id' AND prof_id='$my_id'" );

      
    break;
    case 25:
      
      $id = escaper_mysql( $_POST['id'] );
      $event = get_event( $id );
      
      if( !$event['isset'] ) exit;
      
      if( $event['me_inv'] ) $invited = check_array( $event['invited'] , $my_id );
      else $invited = $event['invited'];
      
      if( $event['me_go'] ) $going = check_array( $event['going'] , $my_id );
      else $going = $event['going'];
      
      mysqli_query( $dbConnect , "UPDATE events SET invited = '$invited' , going = '$going' WHERE id='$id'" );
      mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='9' AND extra_column_1='$id' AND prof_id='$my_id'" );
      
    break;
    case 26:
      
      $id = escaper_mysql( $_POST['id'] );
      $club = get_club( $id , 0 , 0 );
      
      if( $club['isset'] && $club['me_admin'] ) {
        
        $prof =  get_user( $options['user'] , 0 , 0 );
        if( $prof['isset'] && in_array( $prof['id'] , explode( ',' , $club['followers'] ) ) ) {
          
          $string = check_array( $club['admin'] , $prof['id'] );
          if( $club['admins_count'] == 1 && $club['admin'] == $prof['id'] ) $string = $prof['id'];
          
          $res = mysqli_query( $dbConnect , "UPDATE clubs SET admin = '$string' WHERE id = '$id'" );
          if( $res ) echo '1';
          
        } else echo '0';
        
      } else echo '0';
      
    break;
    case 27:
      
      $id = escaper_mysql( $_POST['id'] );
      $club = get_club( $id , 0 , 0 );
      
      if( $club['isset'] && $club['me_admin'] ) {
        
        $prof =  get_user( $options['user'] , 0 , 0 );
        if( $prof['isset'] && in_array( $prof['id'] , explode( ',' , $club['requests'] ) ) ) {
          $string = check_array( $club['requests'] , $prof['id'] );
          mysqli_query( $dbConnect , "UPDATE clubs SET requests = '$string' WHERE id = '$id'" );
        }
        
      }
      
    break;
    case 28:
      
      $id = escaper_mysql( $_POST['id'] );
      $club = get_club( $id , 0 , 0 );
      
      if( $club['isset'] && $club['me_admin'] ) {
        
        $prof =  get_user( $options['user'] , 0 , 0 );
        if( $prof['isset'] ) {
          if( in_array( $prof['id'] , explode( ',' , $club['requests'] ) ) ) {
            $string = check_array( $club['requests'] , $prof['id'] );
            mysqli_query( $dbConnect , "UPDATE clubs SET requests = '$string' WHERE id = '$id'" );
            
            if( !in_array( $prof['id'] , explode( ',' , $club['followers'] ) ) ) {
              $string = check_array( $club['followers'] , $prof['id'] );
              mysqli_query( $dbConnect , "UPDATE clubs SET followers = '$string' WHERE id = '$id'" );
              mysqli_query( $dbConnect , "UPDATE clubs SET members = '".( $club['members'] + 1 )."' WHERE id = '$id'" );
            }
            
          }
        }
        
      }
      
    break;
    case 29:
      
      $id = escaper_mysql( $_POST['id'] );
      $club = get_club( $id , 0 , 0 );
      
      if( $club['isset'] && $club['me_admin'] ) {
        
        $prof =  get_user( $options['user'] , 0 , 0 );
        if( $prof['isset'] && $my_id != $prof['id']) {
          if( in_array( $prof['id'] , explode( ',' , $club['black_list'] ) ) ) {
            
            $string = check_array( $club['black_list'] , $prof['id'] );
            mysqli_query( $dbConnect , "UPDATE clubs SET black_list = '$string' WHERE id = '$id'" );
            
          } else {
            
            if( in_array( $prof['id'] , explode( ',' , $club['followers'] ) ) ){
              $string = check_array( $club['followers'] , $prof['id'] );
              mysqli_query( $dbConnect , "UPDATE clubs SET followers = '$string' WHERE id = '$id'" );
              mysqli_query( $dbConnect , "UPDATE clubs SET members = '".( $club['members'] - 1 )."' WHERE id = '$id'" );
            }
            if( in_array( $prof['id'] , explode( ',' , $club['admin'] ) ) ){
              $string = check_array( $club['admin'] , $prof['id'] );
              mysqli_query( $dbConnect , "UPDATE clubs SET admin = '$string' WHERE id = '$id'" );
            }
            if( !in_array( $prof['id'] , explode( ',' , $club['black_list'] ) ) ){
              $string = check_array( $club['black_list'] , $prof['id'] );
              mysqli_query( $dbConnect , "UPDATE clubs SET black_list = '$string' WHERE id = '$id'" );
            }
          }
        }
        
      }
      
    break;
    case 30:
        
      $comm = get_comm( escaper_mysql( $_POST['id'] ) );
      if( $comm['removeable'] ) mysqli_query( $dbConnect , "DELETE FROM comments WHERE id='".$comm['id']."'" );
      
    break;
    case 31:
    
      $id = escaper_mysql( $_POST['id'] );
      $people = explode( ',' , $options['people']);
      
      if( count( $people ) ) {
        
        $club = get_club( $id );
        $admins = explode( ',' , $club['admin'] );
        $followers = explode( ',' , $club['followers'] );
        
        if( !$club['blocked_me'] ) {
          foreach( $people as $val ) {
            $prof = get_user( $val );
            if( $prof['isset'] && !$prof['blocked_me'] && $prof['friend'] && !in_array( $val , $followers ) && !in_array( $val , $admins ) ) {
              
              mysqli_query( $dbConnect , "DELETE FROM notif WHERE prof_id='".$prof['id']."' AND type='10' AND extra_column_1='$id'" );
              mysqli_query( $dbConnect , "INSERT INTO notif SET prof_id='".$prof['id']."', friend_id='$my_id' , extra_column_1='$id' , type='10' , time='".time()."'" );

            }
          }
        }
      }
      
    break;
    case 32:
    
      $id = escaper_mysql( $_POST['id'] );
      $check = mysqli_query( $dbConnect , "SELECT id FROM notif WHERE type='10' AND prof_id='$my_id' AND extra_column_1='$id'" );
      if( mysqli_num_rows( $check ) ) {
        
        mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='10' AND prof_id='$my_id' AND extra_column_1='$id'" );
        $club = get_club( $id , 0 , 0 );
        
        if( $club['isset'] && !$club['list_blocked'] ) {
          
          if( !$club['follow'] ) {
            $string = check_array( $club['followers'] , $my_id );
            mysqli_query( $dbConnect , "UPDATE clubs SET followers='$string' WHERE id='$id'" );
          }
          if( $club['request'] ) {
            $string = check_array( $club['requests'] , $my_id );
            mysqli_query( $dbConnect , "UPDATE clubs SET requests='$string' WHERE id='$id'" );
          }
          if( !in_array( $id , explode( ',' , $user_row['clubs'] ) ) ) {
            $string = check_array( $user_row['clubs'] , $id );
            mysqli_query( $dbConnect , "UPDATE network SET clubs='$string' WHERE id='$my_id'" );
          }
          
        }
        
      }
    
    break;
    case 33:
    
      $id = escaper_mysql( $_POST['id'] );
      mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='10' AND prof_id='$my_id' AND extra_column_1='$id'" );
      
    break;
    case 34:
    
      $lang_name = escaper_mysql( $_POST['lang'] );
      mysqli_query( $dbConnect , "UPDATE network SET lang='$lang_name' WHERE id='$my_id'" );
    
    break;
    case 35:
      
      $user = get_user( escaper_mysql( $options['id'] ) , 0 , 0 );
      
      if( !$user['isset'] || $user['blocked_me'] ) {
        echo 0;
        exit;
      }
      
      $gift = escaper_mysql( $_POST['id'] );
      $string = check_array( $user['gifts'] , $gift , 1 ); 
      
      if( $my_id != $user['id'] ) {
      
        $res = mysqli_query( $dbConnect , "UPDATE network SET gifts='$string' WHERE id='".$user['id']."'" );
        if( $res ) {
          echo 1;
          mysqli_query( $dbConnect , "INSERT INTO notif ( prof_id , friend_id , type , time ) VALUES ( ".$user['id'].", '$my_id' , '13' ,'".time()."' ) " );
        }
        
      }
      
    break;
    case 36:
      
        echo $user_row['lang'];
      
    break;
    case 37:
      $act = 'likes';
    case 38: // comment likes and unlikes
      
      $id = escaper_mysql( $_POST['id'] );
      if( !isset( $act ) ) $act = 'unlikes';
      
      $comm = mysqli_fetch_assoc( mysqli_query( $dbConnect , "SELECT * FROM comments WHERE id = '$id'" ) );
      if( $comm ) {

        $string = check_array( $comm[$act] , $my_id ); 
        
        mysqli_query( $dbConnect , "UPDATE comments SET `" . $act . "` = '$string' WHERE `id` = '$id'" );
        
        $output = mysqli_fetch_assoc( mysqli_query( $dbConnect , "SELECT `". $act ."` FROM comments WHERE id = '$id'" ) );
        
        echo $output[$act] ? count( explode( ',' , $output[$act] ) ) : 0;
        
      } else echo 0;
      
    break;
    case 39: // ads decrement
      
      $id = escaper_mysql( $_POST['id'] );
      
      $ad = mysqli_fetch_assoc( mysqli_query( $dbConnect , "SELECT * FROM ads WHERE id = '$id'" ) );
      if( $ad ) {

        if( $ad['limit_clicks'] != -1 || $ad['limit_views'] != -1 ) {
          if( !$ad['limit_views'] ) {
            
            if( $ad['limit_clicks'] <= 1 ) mysqli_query( $dbConnect , "DELETE FROM ads WHERE id = '$id'" );
            if( $ad['limit_clicks'] > 1 ) mysqli_query( $dbConnect , "UPDATE ads SET limit_clicks = '". ( $ad['limit_clicks'] - 1 ) ."' WHERE id = '$id'" );
            
          }
        }
        
      }
      
    break;
    case 40:
    
      $id = escaper_mysql( $_POST['id'] );
      $text = escaper_mysql( $_POST['text'] );
      
      $post = get_news( $id );
      if( $post['me'] || $post['me_admin'] ) {
        
        $q = mysqli_query( $dbConnect , "UPDATE news SET text = '$text' WHERE id = '$id'" );
        echo $q == true;
        
      } else echo false;
      
      
    break;
  }
  
  /***
  
    friend - 40, 
    follow - 20,
    new post - 20
    share , comm , like , unlike - 10
    sms - 1
  
  **/
  
?>