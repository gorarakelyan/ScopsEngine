<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  if( !isset( $_GET['ajax'] ) || !$_GET['ajax'] == 1 ) {
    
    include_once 'lock.php';
    include_once 'functions.php';
    include_once 'connect_user.php';
    
    if( $_GET['tab'] == 'userlink' ) {
      $url = mysqli_fetch_array( mysqli_query( $dbConnect , "SELECT id FROM network WHERE url='@".$_GET['id']."'" ) , MYSQLI_ASSOC )['id'];
      header( 'location:'.$global['connection'].'m.'.$global['host'].'/id' . $url . '/' . ( $_GET['section'] != '' ? $_GET['section'] : 'wall' ) );
    }
    
    include_once 'panel.php';
    
    echo '<script>';
    if( $_GET['tab'] == 'user' || $_GET['tab'] == 'club' ) echo 'ajaxQuery( \''.$_GET['tab'].'\',\''.$_GET['section'].'\','.$_GET['id'].' , true );';
    else if( $_GET['tab'] == 'post' || $_GET['tab'] == 'chat' ) echo 'ajaxQuery( \''.$_GET['tab'].'\' , \'\' , \''.$_GET['id'].'\' , true )';
    else echo 'ajaxQuery( \''.$_GET['tab'].'\' , 0 , 0 , true );';
    echo '</script></body></html>';
    
  } else {
    
    include_once 'lock.php';
    include_once 'functions.php';
    include_once 'connect_user.php';
    
    $dataArr = array();
    
    $dataArr[ $_GET['tab'] ] = array(
      'id' => $_GET['id'],
      'my_id' => $my_id,
      'section' => $_GET['section'],
      'root' => _root_
    );
    
    if( isset( $_GET['search_tab'] ) && $_GET['search_tab'] != 0 ) $dataArr['search_tab'] = $_GET['search_tab'];
    else $dataArr['search_tab'] = 0;
    
    $dataArr['tpl'] = tpl(dirname(__FILE__).'/../tab.tpl');
    echo json_encode( $dataArr );
    
  }

?>