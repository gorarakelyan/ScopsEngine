<?php
/*
	
	$p: Scops Engine
	$a: Gor Arakelyan
	$c: All rights reserved (c) 2016
	$!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	include_once 'lock.php';
	include_once 'connect.php';
	include_once 'functions.php';
	include_once 'content_functions.php';
	
	$type = escaper_mysql( $_POST['type'] );
	
	if( $general_row['demo'] ) exit();
	
	switch( $type ) {
		case 0:
		
			$text = escaper_mysql( $_POST['text'] );
			$find_last = mysqli_query( $dbConnect , "SELECT * FROM notif WHERE type='12' ORDER BY id DESC LIMIT 1" );
			if( mysqli_num_rows( $find_last ) ) {
				$not_id = intval( mysqli_fetch_array( $find_last , MYSQLI_ASSOC )['extra_column_2'] );
			} else $not_id = 0;
			
			$not_id++;
			
			$profs = mysqli_query( $dbConnect , "SELECT id FROM network" );
			while( $prof = mysqli_fetch_array( $profs , MYSQLI_ASSOC ) )
				mysqli_query( $dbConnect , "INSERT INTO notif SET prof_id='".$prof['id']."' , type='12' , extra_column_1='$text' , extra_column_2='$not_id' , time='".time()."'" );
			
			echo 1;
			
		break;
		case 1:
		
			$num = escaper_mysql( $_POST['num'] );
			$res = mysqli_query( $dbConnect , "DELETE FROM notif WHERE type='12' AND extra_column_2='$num'" );
			if( $res ) echo 1;
			
		break;
		case 2:
		
			$id = escaper_mysql( $_POST['id'] );
			
			$games_res = mysqli_query( $dbConnect , "SELECT * FROM network WHERE 
					( games LIKE '%,$id' OR
					games LIKE '%,$id,%' OR
					games LIKE '$id,%' OR
					games = '$id' )
				");
			while( $games_row = mysqli_fetch_array( $games_res , MYSQLI_ASSOC ) ) {
				
				$string = check_array( $games_row['games'] , $id );
				mysqli_query( $dbConnect , "UPDATE network SET games='$string' WHERE id='".$games_row['id']."'" );
				
			}
			$res = mysqli_query( $dbConnect , "DELETE FROM games WHERE id='$id'" );
			echo $res ? 1 : 0;
			
		break;
		case 3:
		
			$id = escaper_mysql( $_POST['id'] );
			
			$st_res = mysqli_query( $dbConnect , "SELECT * FROM network WHERE 
					( stickers LIKE '%,$id' OR
					stickers LIKE '%,$id,%' OR
					stickers LIKE '$id,%' OR
					stickers = '$id' )
				");
			while( $sticker = mysqli_fetch_array( $st_res , MYSQLI_ASSOC ) ) {
				
				$string = check_array( $sticker['stickers'] , $id );
				mysqli_query( $dbConnect , "UPDATE network SET stickers='$string' WHERE id='".$sticker['id']."'" );
				
			}
			$res = mysqli_query( $dbConnect , "DELETE FROM stickers WHERE id='$id'" );
			echo $res ? 1 : 0;
			
		break;
		case 4:
		
			$id = escaper_mysql( $_POST['id'] );
			
			$langs = mysqli_query( $dbConnect , "SELECT * FROM langs");
			if( mysqli_num_rows( $langs ) > 1 ) {
				
				$res = mysqli_query( $dbConnect , "DELETE FROM langs WHERE id='$id'" );
				echo $res ? 1 : 0;
			
			} else echo 0;
		
		break;
		case 5:
		
			$new_key = gen_name(40);
			
			$res = mysqli_query( $dbConnect , "UPDATE main SET admin='$new_key'" );
			echo $res ? 1 : 0;
					
		break;
		case 6:
		
			$name = escaper_mysql( $_POST['name'] );
			$host = escaper_mysql( $_POST['host'] );
			$connection = escaper_mysql( $_POST['connection'] );
			$mail = escaper_mysql( $_POST['mail'] );
			$conf = isset( $_POST['email_conf'] ) ? 1 : 0;
			$user_theme = isset( $_POST['user_theme'] ) ? 1 : 0;
			$res = mysqli_query( $dbConnect , "UPDATE main SET name='$name',host='$host',connection='$connection',mail='$mail',email_conf='$conf',user_theme='$user_theme'" );
			echo $res ? 1 : 0;
					
		break;
		case 7:

			$id = escaper_mysql( $_POST['id'] );
			
			$st_res = mysqli_query( $dbConnect , "SELECT * FROM network WHERE 
					( gifts LIKE '%,$id' OR
					gifts LIKE '%,$id,%' OR
					gifts LIKE '$id,%' OR
					gifts = '$id' )
				");
			while( $gift = mysqli_fetch_array( $st_res , MYSQLI_ASSOC ) ) {
				
				$string = check_array( $gift['gifts'] , $id );
				mysqli_query( $dbConnect , "UPDATE network SET gifts='$string' WHERE id='".$gift['id']."'" );
				
			}
			$res = mysqli_query( $dbConnect , "DELETE FROM gifts WHERE id='$id'" );
			echo $res ? 1 : 0;
			
		break;
		case 8:

			$theme = escaper_mysql( $_POST['theme'] );
			
			$res = mysqli_query( $dbConnect , "UPDATE main SET theme = '$theme'" );
			echo $res ? 1 : 0;
			
		break;
		case 9:
			
			$id = escaper_mysql( $_POST['id'] );
			$res = mysqli_query( $dbConnect , "DELETE FROM ads WHERE id='$id' " );
			if( $res ) echo 1;
		
		break;
		case 10:
			
			$id = escaper_mysql( $_POST['id'] );
			$prof = get_user( $id );
			$verified = !$prof['verified'];
			
			$q = mysqli_query( $dbConnect , "UPDATE network SET verified='$verified' WHERE id='$id' ");
			
			echo $q ? 1 : 0;
			
		break;
	}
	
	/***
	
		friend - 40, 
		follow - 20,
		new post - 20
		share , comm , like , unlike - 10
		sms - 1
	
	**/
	
?>