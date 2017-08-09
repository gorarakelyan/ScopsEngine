<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  $sql_host = '{host}';
  $sql_name = '{db}';
  $sql_user = '{user}';
  $sql_pass = '{pass}';

  $dbConnect = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_name);
  if( !$dbConnect ) {
    exit();
  }
  
  mysqli_set_charset($dbConnect, "utf8");
  
  $global = mysqli_fetch_array( mysqli_query($dbConnect , "SELECT name, host, mail , connection FROM main") , MYSQLI_ASSOC );
  
  define( '_host_' , $global['host'] );
  define( '_root_' , $global['connection'].$global['host'] );
  
?>