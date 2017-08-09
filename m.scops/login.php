<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  include_once 'php_main/lock.php';
  include_once 'php_main/functions.php';
  
  if( isset( $_COOKIE['link'] ) && str_replace( " ", "", $_COOKIE['link'] ) != '' ) {
    
    if( isset( $_POST['log_out'] ) ) {
      setcookie('link','',time() - 1 );
      setcookie('id','',time() - 1 );
      setcookie('ch','',time() - 1 );
    } else {
      
      $link = escaper_mysql( $_COOKIE['link'] );
      if( str_replace( " ", "", $link ) != '' ) {
        $check_user = mysqli_num_rows($check_user_res = mysqli_query( $dbConnect, "SELECT * FROM network WHERE link='$link'" ));
        if( $check_user > 0 ) {
          
          $check_user_row = mysqli_fetch_array( $check_user_res, MYSQLI_ASSOC );
          
          header('Location:id'.$check_user_row['id'].'/wall');
          exit();
        } else {
          setcookie('link','',time() - 1 );
          setcookie('id','',time() - 1 );
          setcookie('ch','',time() - 1 );
        }
      } else {
        setcookie('link','',time() - 1 );
        setcookie('id','',time() - 1 );
        setcookie('ch','',time() - 1 );
      }
      
    }
    
  } else {
    
    if( isset( $_POST['log_in'] ) ) {
    
      $login = escaper_mysql( $_POST['login'] );
      $password = md5( escaper_mysql( $_POST['password'] ) );
      
      if( str_replace( " ", "", $login ) != '' && str_replace( " ", "", $password ) != '' ) {
        $check_user = mysqli_num_rows($check_user_res = mysqli_query( $dbConnect, "SELECT * FROM network WHERE login='$login' AND BINARY password='$password'" ));
        if( $check_user > 0 ) {
          
          $check_user_row = mysqli_fetch_array( $check_user_res, MYSQLI_ASSOC );
          
          $set_link = $check_user_row['link'];
          $set_id = $check_user_row['id'];
          $set_ch = isset( $_POST['check'] ) ? 'true' : 'false';
          
          if( isset( $_POST['check'] ) ) {
            setcookie( 'link' , $set_link , time() + 315360000 );
            setcookie( 'id' , $set_id , time() + 315360000 );
            setcookie( 'ch' , $set_ch , time() + 315360000 );
          } else {
            setcookie( 'link' , $set_link );
            setcookie( 'id' , $set_id );
            setcookie( 'ch' , $set_ch );
          }
          
          header('Location:id'.$set_id.'/wall');
          exit();
        }
      }
    }
    
  }
  
  $bg_arr = ['3.jpg','4.jpg','5.jpg'];
  $bg = $bg_arr[rand( 0 , 2 )];
  
?>