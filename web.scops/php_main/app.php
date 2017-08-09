<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  include_once 'lock.php';
  include_once 'functions.php';
  
  switch( $_POST['action'] ) {
    case 'log_in':
      $login = escaper_mysql( $_POST['login'] );
      $password = md5( escaper_mysql( $_POST['password'] ) );
      
      if( str_replace( " ", "", $login ) != '' && str_replace( " ", "", $password ) != '' ) {
        $check_user = mysqli_num_rows( $check_user_res = mysqli_query( $dbConnect, "SELECT * FROM network WHERE login='$login' AND BINARY password='$password'" ) );
        if( $check_user > 0 ) {
          
          $check_user_row = mysqli_fetch_array( $check_user_res, MYSQLI_ASSOC );
          
          $set_link = $check_user_row['link'];
          $set_id = $check_user_row['id'];
          
          $array = [ 1 , 'info' => [ 'link' => $set_link , 'id' => $set_id ] ];
          
        } else $array = [ 0 , 0 ];
      } else $array = [ 0 , 0 ];
      
      echo json_encode( $array );
    break;
  }
  
?>