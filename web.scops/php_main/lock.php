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
	if( !$dbConnect ) exit();
	
	mysqli_set_charset($dbConnect, "utf8");
	
	$global = mysqli_fetch_array( mysqli_query($dbConnect , "SELECT name, host, mail , connection , theme , email_conf , demo , user_theme FROM main") , MYSQLI_ASSOC );
	
	define( '_host_' , $global['host'] );
	define( '_root_' , $global['connection'].$global['host'] );
	define( '_mobile_' , isset( $_POST['mobile_application'] ) ||  isset( $_GET['mobile_application'] ) );
	define( '_app_chat_' , isset( $_POST['app_version_chat'] ) ||  isset( $_GET['app_version_chat'] ) );
	
	$http_origin = $_SERVER['HTTP_ORIGIN'];
	if( strripos( $http_origin , _host_ ) )
		header( 'Access-Control-Allow-Origin: ' . $http_origin );
?>