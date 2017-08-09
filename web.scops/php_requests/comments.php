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

  $id = escaper_mysql( $_POST['article'] );
  
  if( !get_news( $id )['isset'] ) exit;
  
  $time = time();
  $res_post = mysqli_query( $dbConnect, "SELECT id, prof_id, author FROM news WHERE id='$id'" );
  $news = mysqli_fetch_array( $res_post , MYSQLI_ASSOC );
  
  if( !$news['author'] ) {
    $get = get_user( $news['prof_id'] , 0 ,0 );
    if( $get['blocked_me'] ) exit();
  } else {
    $get = get_club( $news['prof_id'] , 0 ,0 );
    if( $get['blocked_me'] ) exit();
  }
  
  switch( $_POST['type'] ) {
    case 'fill':
      
      $length = escaper_mysql( $_POST['length'] );
      $from_query = ( $_POST['from'] != 'NULL' ) ? " id<'".escaper_mysql( $_POST['from'] )."' AND ":"";
      $comm_res = mysqli_query( $dbConnect, "SELECT id FROM comments WHERE ".$from_query." article_id='$id' ORDER BY id DESC LIMIT ".$length );
      $array = array();
      $i = 0;
      
      while( $comm = mysqli_fetch_array( $comm_res , MYSQLI_ASSOC ) ) $array[$i++] = get_comm( $comm['id'] );
      
      $array = array( 'langs' => $langs , 'mobile' => _mobile_ , 'comment' => $array, 'main_set' => $global , 'end' => ( mysqli_num_rows( $comm_res ) < $length ? true : false ) , 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/comments.tpl') );
      $array['main_set']['root'] = _root_;
      echo json_encode( $array );
      
    break;
    case 'listen':
      
      $timer = 50;
      $comm_id = escaper_mysql( $_POST['comm'] );
      $found = false;
      
      for( $t = 0 ; $t < $timer ; $t++ ) {
        $comm_res = mysqli_query( $dbConnect, "SELECT id FROM comments WHERE id > '$comm_id' AND article_id='$id' ORDER BY id DESC" );
        $array = array();
        $i = 0;
        
        if( mysqli_num_rows( $comm_res ) > 0 ) {
          
          $found = true;
          
          while( $comm = mysqli_fetch_array( $comm_res , MYSQLI_ASSOC ) ) $array[$i++] = get_comm( $comm['id'] );

          $array = array( 'langs' => $langs , 'mobile' => _mobile_ , 'comment' => $array, 'main_set' => $global, 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/comments.tpl') );
          $array['main_set']['root'] = _root_;
          echo json_encode( $array );
          
          break;
          
        } else usleep( 500000 );
      }
      
      if( !$found ) echo 'NULL';
    
    break;
    case 'send':
      
      if( !strlen( str_replace( " ", "", $_POST['text'] ) ) ) exit;
      $text = escaper_mysql( $_POST['text'] );
      
      mysqli_query( $dbConnect , "INSERT into comments ( article_id,prof_id,text,time ) VALUES ('$id', '$my_id', '$text', '$time')" );
      
      $news = get_news( $id );
      if( !$news['blocked_me'] && !$news['author'] && $news['prof_id'] != $my_id ) {
        $not_res = mysqli_query( $dbConnect, "SELECT * FROM notif WHERE extra_column_2='".$news['id']."' AND type='4'" );
        if( mysqli_num_rows( $not_res ) ) {
          $notif = mysqli_fetch_array( $not_res , MYSQLI_ASSOC );
          if( in_array( $my_id , explode( ',' , $notif['extra_column_1'] ) ) ) {
            $others = check_array( $notif['extra_column_1'] , $my_id );
            $others = check_array( $others , $my_id );
          } else $others = check_array( $notif['extra_column_1'] , $my_id );
          $fr_id = explode( ',' , $others )[0];
          
          mysqli_query( $dbConnect , "DELETE FROM notif WHERE id='".$notif['id']."'");
          mysqli_query( $dbConnect , "INSERT INTO notif ( prof_id , friend_id , extra_column_1 , extra_column_2 , type , time ) VALUES ( ".$news['author_info']['id'].", '$fr_id' , '$others' , ".$news['id']." , '4' ,'".time()."' ) " );
          
          update_rating( $news['prof_id'] , 10 );
          
        } else {
          mysqli_query( $dbConnect , "INSERT INTO notif ( prof_id , friend_id , extra_column_1 , extra_column_2 , type , time ) VALUES ( ".$news['author_info']['id'].", '$my_id' , '$my_id' , ".$news['id']." , '4' ,'".time()."' ) " );
          update_rating( $news['prof_id'] , 10 );
        }
      }
      
    break;
  }
?>