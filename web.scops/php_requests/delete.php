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

  switch( $_POST['act'] ) {
    
    case 0:
      
      if( $user_row['password'] == md5( $_POST['pass'] ) ) echo delete_user( $my_id );
      else echo 0;
      
    break;
    case 1: 
    
      $id = escaper_mysql( $_POST['id'] );
      
      $res = delete_club( $id );
      echo $res;
      
    break;
    
  }
  
?>