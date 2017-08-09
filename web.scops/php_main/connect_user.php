<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  $user_link = mysqli_real_escape_string( $dbConnect , ( isset( $_COOKIE['link'] ) ? $_COOKIE['link'] : ( isset( $_POST['log_link'] ) ? $_POST['log_link'] : $_GET['log_link'] ) ) );
  
  $user_res = mysqli_query($dbConnect , "SELECT * FROM network WHERE link='$user_link'");
  $user_row = mysqli_fetch_array( $user_res , MYSQLI_ASSOC );
  
  if( str_replace( " ", "", $user_link ) == '' || mysqli_num_rows($user_res) == 0 ) {
    
    setcookie('link','',time() - 10 , '/');
    setcookie('id','',time() - 10 , '/');
    setcookie('ch','',time() - 10 , '/');
    header('Location:../');
    exit();
    
  } else {
    
    $my_id = $user_row['id'];
    include_once dirname(__FILE__).'/../langs/'. $user_row['lang'] .'.php';
    setcookie( 'langs' , $user_row['lang'] , time() + 315360000 , '/' );
    
    if( _mobile_ ) define( '_theme_' , 'classic' );
    else {
      if( $global['user_theme'] ) define( '_theme_' , $user_row['theme'] );
      else define( '_theme_' , $global['theme'] );
    }
    
  }
  
?>