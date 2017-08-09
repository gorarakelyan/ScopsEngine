<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  $sql_host = '{host}'; // Your Host ( Usually localhost )
  $sql_name = '{db}'; // DB Name
  $sql_user = '{user}'; // SQL User Name
  $sql_pass = '{pass}'; // SQL USER Pass

  $dbConnect = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_name);
  if( !$dbConnect ) {
      exit();
  }
  
  mysqli_set_charset($dbConnect, "utf8");
  
?>