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
		include_once 'connect.php';
		
		include_once 'panel.php';
		
		echo '<script>';
			echo 'ajaxQuery( \''.$_GET['tab'].'\' );';
		echo '</script></body></html>';
		
	} else {
		
		include_once 'lock.php';
		include_once 'functions.php';
		include_once 'connect.php';
		
		$themes = array();
		
		if( $_GET['tab'] == 'themes' ) {
			$theme_res = mysqli_query( $dbConnect , "SELECT * FROM themes" );
			while( $theme = mysqli_fetch_array( $theme_res , MYSQLI_ASSOC ) ) $themes[] = array_merge( $theme , array( 'selected' => ( $general_row['theme'] == $theme['key'] ? 'selected' : '' ) ) );	
		}
		
		$dataArr = [ $_GET['tab'] => true , 'root' => _root_  , 'admin_link' => md5( $general_row['admin'] ) , 'main' => $general_row , 'themes_row' => $themes ];
		$dataArr['main']['email_conf'] = $dataArr['main']['email_conf'] ? true : false;
		$dataArr['main']['user_theme'] = $dataArr['main']['user_theme'] ? true : false;
		$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/tab.tpl');
		echo json_encode($dataArr);
		
	}

?>