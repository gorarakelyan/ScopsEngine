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
  
  switch( $_POST['query'] ) {
    case 1:
      $birth_pattern = '/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/';
        
      $post_array = array('theme','pass','name','country','city','day','month','year','gender','privacy','visits','dating');
        foreach($post_array as $item) 
          if( isset( $_POST[$item] ) ) $$item = $_POST[$item];
      
      $birth = $day."-".$month."-".$year;
      
      if (
        ( $user_row['password'] == md5( $pass ) ) && strlen( $name ) && strlen( $city ) && strlen( $country ) && preg_match( $birth_pattern, $birth ) &&
        ( $gender == 1 || $gender == 0 ) && ( $privacy == 1 || $privacy == 0 ) && ( $visits == 1 || $visits == 0 ) && ( $dating == 1 || $dating == 0 )
      ) {
        
        $res = mysqli_query( $dbConnect , 
          "UPDATE network SET 
          
            name='".escaper_mysql( $name )."',
            country='".escaper_mysql( $country )."',
            city='".escaper_mysql( $city )."',
            birth='".escaper_mysql( $birth )."',
            gender='".escaper_mysql( $gender )."',
            secret='".escaper_mysql( $privacy )."',
            visits_enabled='".escaper_mysql( $visits )."',
            dating_enabled='".escaper_mysql( $dating )."'
            " . ( isset( $_POST['theme'] ) ? ",theme='" . escaper_mysql( $theme ) . "'" : "" ) ."
            
          WHERE id='$my_id'
        ");
        echo '1';
        
      } else echo '0';
    break;
    case 2:
      $password_pattern = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,25}$/';
      
      $post_array = array('new_pass','re_pass','current_pass');
        foreach($post_array as $item) $$item = $_POST[$item];
      
      if ( $user_row['password'] == md5( $current_pass ) && preg_match( $password_pattern, $new_pass ) && $re_pass == $new_pass ) {
        
        $re_pass = md5( $re_pass );
        $new_pass = md5( $new_pass );
        
        $res = mysqli_query( $dbConnect , 
          "UPDATE network SET 
            password = '$new_pass'
          WHERE id='$my_id'
        ");
        echo '1';
        
      } else echo '0';
    break;
    case 3:

      if( isset( $_POST['club'] ) ) {
        $club = get_club( $_POST['club'] , 0 , 0 );
        if( $club['isset'] ) {
          if( $club['me_admin'] ) {
            
            $name = escaper_mysql( $_POST['name'] );
            $descr = escaper_mysql( $_POST['description'] );
            $secret = isset( $_POST['secret'] ) ? 1 : 0;
            
            $res = mysqli_query( $dbConnect , "UPDATE clubs set name='$name', description='$descr', secret='$secret' WHERE id='".$club['id']."'" );
            if( $res ) echo 1;
            
          }
        }
      }
      
    break;
    case '4':

      $url_pattern = '/^[a-zA-Z0-9_]{2,25}$/';
      $new_url = escaper_mysql( $_POST['url'] );
      
      if( $user_row['url'] == '@' . $new_url ) echo '5';
      else {
        if ( isset( $_POST['url'] ) && preg_match( $url_pattern, $new_url ) ) {
          
          $check = mysqli_query( $dbConnect ,  "SELECT id FROM network WHERE url = '@$new_url' ");
          
          if( !mysqli_num_rows( $check ) ) {
            
            $res = mysqli_query( $dbConnect ,  "UPDATE network SET url = '@$new_url' WHERE id='$my_id' ");
            if( $res ) echo '1';
            else echo '0';
            
          } else echo '3';
          
        } else echo '4';
      }
      
    break;
  }
  
?>