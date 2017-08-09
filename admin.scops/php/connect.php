<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  $admin_link = mysqli_real_escape_string( $dbConnect , $_COOKIE['admin'] );
  $admin_res = mysqli_query($dbConnect , "SELECT * FROM main WHERE BINARY admin='$admin_link'");
  $general_row = mysqli_fetch_array( $admin_res , MYSQLI_ASSOC );
  
  if( str_replace( " ", "", $admin_link ) == '' || !mysqli_num_rows($admin_res) ) {
    setcookie('admin','',time() - 10 , '/');
    header('Location:../');
    exit();
  }
  
  define( '_root_' , $general_row['connection'].$general_row['host'].'/' );
  
?>