<?php
/*
	
	$p: Scops Engine
	$a: Gor Arakelyan
	$c: All rights reserved (c) 2016
	$!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	include_once dirname(__FILE__).'/../php_main/lock.php';
	include_once dirname(__FILE__).'/../php_main/functions.php';
	
	$timer = 25;
	
	$notif = $_POST['not'];
	$req = $_POST['req'];
	$visits = $_POST['vis'];
	$sms = $_POST['sms'];
		
	for( $i = 0 ; $i < $timer ; $i++ ) {
		include dirname(__FILE__).'/../php_main/connect_user.php';
		$time = time();
		
		$check_v = ( $user_row['visitors'] != '' )?json_decode( $user_row['visitors'], true, 3 ):array();
		$j = 0;
		foreach( $check_v as $key ) {
			if( $key[2] == 0 ) $j++;
		}
		$check_v = $j;
		
		$check_r = ( $user_row['requests'] != '' )?count(explode(',' , $user_row['requests'])):0;
		
		$res_not = mysqli_query($dbConnect, "SELECT * FROM notif WHERE prof_id='$my_id' AND view='0'");
		$check_n = mysqli_num_rows( $res_not );
		
		$msg = 0;
		$chat_res = mysqli_query($dbConnect, "SELECT * FROM chat WHERE prof='$my_id' OR friend='$my_id'");
		while( $chat = mysqli_fetch_array( $chat_res , MYSQLI_ASSOC ) ) {
			
			$sms_res = mysqli_query($dbConnect, "SELECT id FROM dialogues WHERE chat_id='".$chat['id']."' AND friend='$my_id' AND friend_hide='0' AND viewtime='0' ORDER BY id LIMIT 1");
			if( mysqli_num_rows( $sms_res ) ) $msg++;
			
		}
		
		mysqli_query($dbConnect,"UPDATE network SET online='$time' WHERE id='$my_id'");
		
		if( $notif != $check_n || $req != $check_r || $visits != $check_v || $msg != $sms ) break;
		sleep(1);
	}
	
	echo json_encode( array( $check_n , $check_r , $check_v, $msg ) );

?>