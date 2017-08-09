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
  
  $time = time();
  
  if( isset( $_POST['club'] ) ) {
    $author = 1;
    $id = escaper_mysql( $_POST['club'] );
    
    $club_res = mysqli_query( $dbConnect , "SELECT * FROM clubs WHERE id='$id'" );
    $club = mysqli_fetch_array( $club_res , MYSQLI_ASSOC );
    $followers = $club['followers'];
    $sep_folder = 'content/club';
    
    if( !in_array( $my_id , explode(',',$club['admin']) ) ) exit();
    
  }  else {
    
    $author = 0;
    $id = $my_id;
    $followers = $my_id.','.$user_row['followers'];
    $sep_folder = 'content/';
    
  }
  
  $folder = dirname(__FILE__).'/../'.$sep_folder.$id;
  if( !is_dir($folder) ) mkdir($folder);
  
  switch( $_POST['type'] ) {
  case 'post':
  
  $post = false;
  
  if( isset( $_FILES['photoimg'] ) && count( $_FILES['photoimg']['name'] ) > 0 ) {
    $post = true;

    $valid_formats = array("jpg", "png", "gif","jpeg"); 
    $array_names = array( array(), array(), array() );
    $i = 0;
    
    foreach( $_FILES['photoimg']['name'] as $key ) {
      
      $ext = strtolower(end(explode(".", $key))) ;
      
      if( in_array($ext,$valid_formats) ) {
        
        $actual_image_name = gen_name( 10 ).time().".".$ext ; 
        $tmp = $_FILES['photoimg']['tmp_name'][$i];
        if( move_uploaded_file( $tmp, $folder.'/'.$actual_image_name) ) {

          $adress = $folder.'/'.$actual_image_name;
        
          img_resize_save($adress, $folder.'/1-'.$actual_image_name, 150, 150, $ext, $folder);
          img_resize_save($adress, $folder.'/2-'.$actual_image_name, 500, 500, $ext, $folder);
          img_resize_save($adress, $folder.'/3-'.$actual_image_name, 1200, 1200, $ext, $folder);
          
          unlink($adress);
          
          $array_names[0][$i] = $sep_folder.$id.'/1-'.$actual_image_name ;
          $array_names[1][$i] = $sep_folder.$id.'/2-'.$actual_image_name ;
          $array_names[2][$i] = $sep_folder.$id.'/3-'.$actual_image_name ;
          $i++;
          
        }
      } else continue;
    }
    
    if( count( $array_names[0] ) > 0 ) {
      $query_columns .= ",img,img_small,img_medium,img_big";
      $query_values = ",".$i.",'". json_encode( $array_names[0] ) ."'".","."'". json_encode( $array_names[1] ) ."'".","."'". json_encode( $array_names[2] ) ."'";
    }
  }
  
  if( isset( $_POST['link'] ) && strlen( str_replace( " ", "", escaper_mysql( $_POST['link'] ) ) ) ) {
    $post = true;
    
    include_once dirname(__FILE__).'/../libs/Embera/Autoload.php';
    
    $embera = new \Embera\Embera();
  
    $link = escaper_mysql( $_POST['link'] );
    
    $data = $embera->getUrlInfo($link);
    
    if( !empty( $data ) ) {
      $arrayVid = array(
        'url' => $link,
        'provider' => $data[$link]['provider_url'],
        'provider_name' => $data[$link]['provider_name'],
        'title' => $data[$link]['title'],
        'thumb' => $data[$link]['thumbnail_url'],
        'thumb_k' => $data[$link]['thumbnail_width'] / $data[$link]['thumbnail_height'],
        'duration' => $data[$link]['duration'],
        'width' => $data[$link]['width'],
        'height' => $data[$link]['height'],
        'html' =>  $data[$link]['html']
      );
      
      $query_columns .= ",video_glob";
      $query_values .= ",'".escaper_mysql( json_encode( $arrayVid ) )."'";
    } else {
      
      $link_array = get_link( $link );
    
      $query_columns .= ",link";
      $query_values .= ",'".escaper_mysql( json_encode( $link_array ) )."'";
      
    }
  }
  
  if( isset( $_POST['text'] ) && strlen( str_replace( " ", "", $_POST['text'] ) ) ) {
    
    $post = true;
    
    $cont = getGif( $_POST['text'] );
    $text = escaper_mysql( $cont[0] );
    $gif = $cont[1];
    
    $query_columns .= ",text,gif";
    $query_values .= ",'". $text ."','". $gif ."'";
    
  }  
  
  if( isset( $_POST['audio'] ) && strlen( str_replace( " ", "", $_POST['audio'] ) ) ) {
    
    $post = true;
    $query_columns .= ",audio";
    $query_values .= ",'".escaper_mysql( $_POST['audio'] )."'";
    
  }  
  
  if( isset( $_POST['videoLoc'] ) && strlen( str_replace( " ", "", $_POST['videoLoc'] ) ) ) {
    
    $post = true;
    $query_columns .= ",video_loc";
    $query_values .= ",'".escaper_mysql( $_POST['videoLoc'] )."'";
    
  }
  
  if( isset( $_POST['location'] ) && strlen( str_replace( " ", "", $_POST['location'] ) ) ) {
    
    $post = true;
    $query_columns .= ",location";
    $query_values .= ",'".escaper_mysql( $_POST['location'] )."'";
    
  }
  
  if( $post )  {
    
    if( isset( $_POST['people'] ) && strlen( str_replace( " ", "", $_POST['people'] ) ) ) {
      $mets = explode( ',' , escaper_mysql( $_POST['people'] ) );
      $mets_query = '';
      foreach( $mets as $val ) {
        if( strlen( $val ) ) {
          $prof = get_user( $val , 0 , 0 );
          if( !$prof['blocked_me'] )
            $mets_query = check_array( $prof['id'] , $mets_query );
        }
      }
      if( strlen( $mets_query ) ) {
        $query_columns .= ",metetions";
        $query_values .= ",'$mets_query'";
      }
    }
    
    if( !$author ) update_rating( $my_id , 20 );
    $res = mysqli_query( $dbConnect , "INSERT INTO news ( prof_id,author,time,followers".$query_columns." ) VALUES ( '$id' ,'$author','$time','$followers'".$query_values." )" );
    
    if( $res && isset( $_POST['people'] ) && strlen( str_replace( " ", "", $_POST['people'] ) ) ) {
      $inserted_post = mysqli_query( $dbConnect , "SELECT id FROM news WHERE prof_id='$id' AND author='$author' ORDER BY id DESC LIMIT 1" );
      $post_id = mysqli_fetch_array( $inserted_post , MYSQLI_ASSOC )['id'];
      
      foreach( $mets as $val ) {
        if( strlen( $val ) ) {
          if( !$author )  {
            $prof = get_user( $val , 0 , 0 );
            if( !$prof['blocked_me'] ) mysqli_query( $dbConnect , "INSERT INTO notif SET prof_id='$val', friend_id='$my_id' , type='8',time='".time()."', extra_column_1='$post_id', extra_column_2='$author'" );
          } else {
            $prof = get_club( $val , 0 , 0 );
            if( !$prof['blocked_me'] ) mysqli_query( $dbConnect , "INSERT INTO notif SET prof_id='$val', friend_id='$id' , type='8',time='".time()."', extra_column_1='$post_id', extra_column_2='$author'" );
          }
        }
      }
    }
    
  }
  
  break;
  case 'photo':
  
  if( isset( $_FILES['photoimg'] ) && count( $_FILES['photoimg']['name'] ) ) {

    $valid_formats = array("jpg", "png", "gif","jpeg"); 
    $i = 0;
    
    foreach( $_FILES['photoimg']['name'] as $key ) {
      
      $ext = strtolower(end(explode(".", $key))) ;
      if( in_array($ext,$valid_formats) ) {
        
        $actual_image_name = gen_name( 10 ).time().".".$ext ; 
        $tmp = $_FILES['photoimg']['tmp_name'][$i];
        if( move_uploaded_file( $tmp, $folder.'/'.$actual_image_name) ) {

          $adress = $folder.'/'.$actual_image_name;
        
          img_resize_save($adress, $folder.'/1-'.$actual_image_name, 150, 150, $ext, $folder);
          img_resize_save($adress, $folder.'/2-'.$actual_image_name, 500, 500, $ext, $folder);
          img_resize_save($adress, $folder.'/3-'.$actual_image_name, 1500, 1500, $ext, $folder);
          
          unlink($adress);
          
          $small = '["'.$sep_folder.$id.'/1-'.$actual_image_name.'"]' ;
          $med = '["'.$sep_folder.$id.'/2-'.$actual_image_name.'"]';
          $big = '["'.$sep_folder.$id.'/3-'.$actual_image_name.'"]';
          $i++;
          
          mysqli_query( $dbConnect , "INSERT INTO news ( prof_id,author,time,followers,type,img,img_small,img_medium,img_big ) VALUES ('$id','$author','$time','$followers','1','1','$small','$med','$big')");
          
          if( isset( $_POST['from_prof'] ) ) {
            $last_pic = mysqli_query( $dbConnect , "SELECT id FROM news WHERE author='$author' AND prof_id='$id' AND type='1' ORDER BY id DESC LIMIT 1");
            $last_pic = mysqli_fetch_array( $last_pic , MYSQLI_ASSOC );
            echo $last_pic['id'];
          }
          
        }
      } else continue;
    }  
  }
  
  break;
  case 'video':
    if( $_FILES["video"]["tmp_name"] ) {
      
      $file_name = $_FILES["video"]["name"]; 
      $file_tmp = $_FILES["video"]["tmp_name"];
      
      if(preg_match('/video\/*/',$_FILES['video']['type'])) {
      
        $name = time().gen_name(8);
        $file_name = $name.'.'.strtolower(end(explode(".",$file_name)));
      
        $sql_name = $folder.'/'.$file_name;
      
        move_uploaded_file($file_tmp, $sql_name);
      
        $length = escaper_mysql( $_POST['length'] );
        $img = escaper_mysql( $_POST['image'] );

        $name = time().gen_name(8);
        $uri = substr( $img , strpos( $img,"," ) + 1 );
        $encodedData = str_replace( ' ', '+', $uri );
        $decodedData = base64_decode( $encodedData );
        file_put_contents( $folder.'/'.$name.'.jpg', $decodedData );
      
        $img = $folder.'/'.$name.'.jpg';
        $descr = escaper_mysql( $_POST['descr'] ); 
        
        $video = array(
          "name" => $sep_folder.$id.'/'.$file_name,
          "thumb" => $sep_folder.$id.'/'.$name.'.jpg',
          "description" => $descr,
          "length" => $length
        );
        
        $video = json_encode( $video );
        
        $video_res = mysqli_query($dbConnect , "INSERT INTO videos ( prof,author,time,video ) VALUES ('$id','$author','$time','$video')");
        
        $video_get = mysqli_query( $dbConnect , "SELECT id FROM videos WHERE prof='$id' AND author='$author' ORDER BY id DESC LIMIT 1" );
        $get_id = mysqli_fetch_array( $video_get , MYSQLI_ASSOC );
        
        if( !$author ) {
          $string = check_array( $user_row['videos'] , $get_id['id'] );
          mysqli_query( $dbConnect, "UPDATE network SET videos='$string' WHERE id='$id'" );
          update_rating( $my_id , 20 );
        } else {
          $string = check_array( get_club( $id , 0 , 0 )['videos'] , $get_id['id'] );
          mysqli_query( $dbConnect, "UPDATE clubs SET videos='$string' WHERE id='$id'" ); 
        }
        
        $res = mysqli_query($dbConnect , "INSERT INTO news ( prof_id,author,followers,video_loc,time,type ) VALUES ('$id','$author','$followers','".$get_id['id']."','$time','2')");
        if( $res && $video_res ) echo 1;
      }
    }
  break;
  case 'audio':
    if( $_FILES["audio"]["tmp_name"] ) {
      
      $file_name = $_FILES["audio"]["name"]; 
      $file_tmp = $_FILES["audio"]["tmp_name"];
      
      if(preg_match('/audio\/*/',$_FILES['audio']['type'])) {
      
        $name = time().gen_name(8);
        $file_name = $name.'.'.strtolower(end(explode(".",$file_name)));
      
        $sql_name = $folder.'/'.$file_name;
      
        move_uploaded_file($file_tmp, $sql_name);
  
        $descr = escaper_mysql( $_POST['descr'] ); 
        if( !strlen( str_replace( " ", "", $descr ) ) ) $descr = 'Audio';
        
        $audio = array(
          "name" => $sep_folder.$id.'/'.$file_name,
          "description" => $descr,
        );
        
        $audio = json_encode( $audio );
        
        $audio_res = mysqli_query($dbConnect , "INSERT INTO audios ( prof,author,time,audio ) VALUES ('$id','$author','$time','$audio')");
        
        $audio_get = mysqli_query( $dbConnect , "SELECT id FROM audios WHERE prof='$id' AND author='$author' ORDER BY id DESC LIMIT 1" );
        $get_id = mysqli_fetch_array( $audio_get , MYSQLI_ASSOC );
        
        if( !$author ) {
          update_rating( $my_id , 20 );
          $string = check_array( $user_row['audios'] , $get_id['id'] );
          mysqli_query( $dbConnect, "UPDATE network SET audios='$string' WHERE id='$id'" );
        } else {
          $string = check_array( get_club( $id , 0 , 0 )['audios'] , $get_id['id'] );
          mysqli_query( $dbConnect, "UPDATE clubs SET audios='$string' WHERE id='$id'" ); 
        }
        
        $res = mysqli_query($dbConnect , "INSERT INTO news ( prof_id,author,followers,audio,time ) VALUES ('$id','$author','$followers','".$get_id['id']."','$time')");
        if( $res && $audio_res ) echo 1;
      }
    }
  break;
  case 'thumb':
    
    if( isset( $_POST['img'] ) && $_POST['img'] != '' ) {
      
      $type = escaper_mysql( $_POST['photo'] );
      $array = json_decode( $_POST['img'] , true );
      
      for( $i = 0 ; $i < 3 ; $i++ ) {
        
        $name = gen_name( 10 ).time();
        $uri = substr( $array[$i] , strpos( $array[$i] , ',' ) + 1 );
        $data = base64_decode( str_replace( ' ' , '+' , $uri ) );
        file_put_contents( $folder.'/'.($i + 1).'-'.$name.'.jpg' , $data);
        $array[$i] = $sep_folder.$id.'/'.($i + 1).'-'.$name.'.jpg';
        
      }
      
      $str = json_encode( $array );
      $post_id = escaper_mysql( $_POST['id'] );
      
      if( !isset( $_POST['club'] ) ) $remove_id = $user_row[$type];
      else $remove_id = $club[$type];
      
      if( $remove_id != 1 && $remove_id != 2 && $remove_id != 3 && $remove_id != 4 ) {
        $remove_res = mysqli_query( $dbConnect , "SELECT id,".$type."_clip FROM news WHERE id='$remove_id'" );
        $remove = json_decode( mysqli_fetch_array( $remove_res , MYSQLI_ASSOC )[$type.'_clip'] , true );
        foreach( $remove as $val ) {
          unlink( '../'.$val ) ;
        }
      }
      
      mysqli_query( $dbConnect , "UPDATE news SET ".$type."_clip='$str' WHERE id='$post_id'");
      if( isset( $_POST['club'] ) ) mysqli_query( $dbConnect , "UPDATE clubs SET ".$type."='$post_id' WHERE id='$id'");
      else mysqli_query( $dbConnect , "UPDATE network SET ".$type."='$post_id' WHERE id='$id'");
      
    }
    
  break;
  }
?>