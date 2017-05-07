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
	
	$act = escaper_mysql( $_POST['action'] );
	$data = array();
	
	switch( $act ) {
		case 'listen':
			$found = false;
			
			for( $t = 0 ; $t < 25 ; $t++ ) {
				
				$check = mysqli_query( $dbConnect , "SELECT * FROM video_call WHERE ( friend = '$my_id' OR prof = '$my_id' ) " );
				if( mysqli_num_rows( $check ) ) {
					
					$check = mysqli_fetch_array( $check , MYSQLI_ASSOC );
					
					$cur = escaper_mysql( $_POST['current'] );
					$cur = $cur == 'mecalling' ? 'calling' : $cur ;
					
					if( $check['action'] != $cur ) {
						
						$found = true;
						if( $check['action'] == 'calling' && $check['prof'] == $my_id ) $check['action'] = 'mecalling';
						
						$data['act'] = $check['action'];
						$data['hash'] = $check['hash'];
						
						if( $check['action'] == 'calling' ) {
							$friend = get_user( $check['prof'] , 0 );
							$data['name'] = $friend['name'];
							$data['photo'] = $friend['img'];
						}
						
						echo json_encode( $data );
						break;
						
					}
					
				} else {
					if( escaper_mysql( $_POST['current'] ) != 'none' ) {
						$found = true;
						echo 'none';
						break;
					}
				}
				
				sleep( 1 );
				
			}
			
			if( !$found ) echo escaper_mysql( $_POST['current'] ) == 'none' ? 'none' : json_encode( array( 'act' => escaper_mysql( $_POST['current'] ) ) ) ;
		
		break;
		case 'call':
		
			$id = escaper_mysql( $_POST['id'] );
			$prof = get_user( $id );
			
			if( $id != $my_id && $prof['isset'] && !$prof['blocked_me'] && $prof['online'] ) {
				
				$check_free = mysqli_query( $dbConnect , "SELECT id FROM video_call WHERE prof='$id' OR friend='$id' OR prof='$my_id' OR friend='$my_id' " );
				if( !mysqli_num_rows( $check_free ) ) {
					
					$hash = gen_name(40);
					$check = mysqli_fetch_array( mysqli_query( $dbConnect , "SELECT id FROM video_call WHERE hash = '$hash'") , MYSQLI_ASSOC );
					while( $check['id'] ) {
						$hash = gen_name(40);
						$check = mysqli_fetch_array( mysqli_query( $dbConnect , "SELECT id FROM video_call WHERE hash = '$hash'") , MYSQLI_ASSOC );	
					}
					
					$res = mysqli_query( $dbConnect , "INSERT INTO video_call SET action = 'calling',hash = '$hash' , prof = '$my_id' , friend = '$id'");
					echo $res ? 'ok' : 'error';
					
				} else echo 'error';
				
			} else echo 'error';
		
		break;
		case 'answer':
		
			$hash = escaper_mysql( $_POST['hash'] );
			$check = mysqli_fetch_array( mysqli_query( $dbConnect , "SELECT * FROM video_call WHERE hash = '$hash'") , MYSQLI_ASSOC );

			if( $check['id'] ) {
				
				$res = mysqli_query( $dbConnect , "UPDATE video_call SET action = 'answer' WHERE hash = '$hash'");
				echo $res ? 'ok' : 'error';
				
			} else echo 'error';
		
		break;
		case 'off':
		
			$res = mysqli_query( $dbConnect , "DELETE FROM video_call WHERE prof='$my_id' OR friend='$my_id'");
			echo $res ? 'ok' : 'error';
			
		break;
	}
	
	
?>