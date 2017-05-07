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
	
	$fr_id = escaper_mysql( $_POST['friend'] );
	
	if( !get_user( $fr_id , 0 , 0 )['isset'] ) exit;
	
	$online_check = isset( $_POST['online'] )? escaper_mysql( $_POST['online'] ):"";
	$seen_check = isset( $_POST['seen'] )? escaper_mysql( $_POST['seen'] ):"";
	$time = time();
	$res = mysqli_query($dbConnect, "SELECT * FROM chat WHERE ( prof='$my_id' AND friend='$fr_id' ) OR ( prof='$fr_id' AND friend='$my_id' ) ");
	if( isset( $_POST['length'] ) ) $length = escaper_mysql( $_POST['length'] );
	
	if( !mysqli_num_rows( $res ) ) {
		
		$check_user = mysqli_query($dbConnect, "SELECT id FROM network WHERE id='$fr_id'");
		if( mysqli_num_rows($check_user) ) {
			mysqli_query( $dbConnect, "INSERT INTO chat (prof, friend) VALUES ('$my_id','$fr_id')" );
			$get_chat = mysqli_query($dbConnect, "SELECT * FROM chat WHERE prof='$my_id' AND friend='$fr_id' ");
			$chat_row = mysqli_fetch_array( $get_chat, MYSQLI_ASSOC	 );
		}
		
	} else $chat_row = mysqli_fetch_array( $res, MYSQLI_ASSOC  );
		
	$chat_id = $chat_row['id'];
		
	switch( $_POST['request'] ) {
		case 'check':
			$check_user = mysqli_query($dbConnect, "SELECT id FROM network WHERE id='$fr_id'");
			if( mysqli_num_rows($check_user) ) echo '1';
		break;
		case 'check_seen':
			$check_seen = mysqli_query($dbConnect, "SELECT id FROM dialogues WHERE chat_id='$chat_id' AND friend='$my_id' AND friend_hide='0' AND viewtime!='0' ORDER BY id DESC LIMIT 1");
			$id = mysqli_fetch_array( $check_seen , MYSQLI_ASSOC );
			if( mysqli_num_rows($check_seen) ) echo $id['id'];
		break;
		case 'seen':
			
			$sub = ( $_POST['prev'] != 'NULL' )?"AND id<=".escaper_mysql( $_POST['prev'] ):"";
			$query = mysqli_query( $dbConnect , "UPDATE dialogues SET viewtime='$time' WHERE chat_id='$chat_id' AND friend='$my_id' AND viewtime='0' ".$sub );
			if( $query ) echo '1';
			else echo '0';
			
		break;
		case 'listen':
		
		$array = array();
		$found = false;
		$i = 0;
		
		if( $_POST['load'] == 'true' ) {

			$load = true;
			
			if( $_POST['old'] == 'true' ) {
				$find_offset = mysqli_query( $dbConnect ,  "SELECT COUNT(*) FROM dialogues WHERE chat_id='$chat_id' AND
					( ( friend='$my_id' AND friend_hide='0' ) OR ( prof='$my_id' AND prof_hide='0' ) ) AND
					id < ".escaper_mysql( $_POST['first'] ));
				$count = mysqli_fetch_array( $find_offset , MYSQLI_ASSOC )['COUNT(*)'];
				
				if( $count > $length ) $offset = $count - $length ;
				else {
					$offset = 0;
					$length = $count;
				}
			}
			else {
				$find_offset = mysqli_query( $dbConnect ,  "SELECT COUNT(*) FROM dialogues WHERE chat_id='$chat_id' AND
					( ( friend='$my_id' AND friend_hide='0' ) OR ( prof='$my_id' AND prof_hide='0' ) )");
			
				$count = mysqli_fetch_array( $find_offset , MYSQLI_ASSOC )['COUNT(*)'];
				$offset = $count > $length ? $count - $length : 0;
			}
			
			if( $load ) {
				$query_limit = " LIMIT $length OFFSET $offset";
				
				$select_chat = mysqli_query( $dbConnect , "SELECT * FROM dialogues WHERE chat_id='$chat_id' AND
					( ( friend='$my_id' AND friend_hide='0' ) OR ( prof='$my_id' AND prof_hide='0' ) )
					ORDER BY id ".$query_limit
				);
				
				if( mysqli_num_rows( $select_chat ) ) $found = true;
				while( $chat = mysqli_fetch_array( $select_chat, MYSQLI_ASSOC  ) ) 
					$array[$i++] = get_sms( $chat['id'] );

			} else $found = false;
		} else {
			
			$timer = 50;
			$prev_id = escaper_mysql( $_POST['prev'] );
			for( $t = 1; $t <= $timer ; $t++ ) {
				$get_sms = mysqli_query( $dbConnect , "SELECT * FROM dialogues WHERE chat_id='$chat_id' AND ( ( friend='$my_id' AND friend_hide='0' ) OR ( prof='$my_id' AND prof_hide='0' ) ) AND id>'$prev_id' ORDER BY id" );
				
				if( $_POST['old'] == 'false' ) {
					$friend_online = mysqli_query( $dbConnect , "SELECT online FROM network WHERE id='$fr_id'" );
					$online_row = mysqli_fetch_array( $friend_online , MYSQLI_ASSOC );
					
					$online_checking = ( $online_row['online'] > time() - 30 )?1:0 ;
					if( $online_check != $online_checking ) {
						$online = true;
						$online_check = $online_checking;
						break;
					} else $online = false;
				}
				
				if( mysqli_num_rows( $get_sms ) ) {
					$found = true;
					while( $sms_row = mysqli_fetch_array( $get_sms , MYSQLI_ASSOC ) ) 
						$array[$i++] = get_sms( $sms_row['id'] );
					break;
				}
				
				if( $_POST['old'] == 'false' ) {
					$get_dialog = mysqli_query( $dbConnect , "SELECT id,viewtime FROM dialogues WHERE chat_id='$chat_id' AND prof='$my_id' AND prof_hide='0' AND viewtime!='0' ORDER BY id DESC LIMIT 1" );
					$last_seen = mysqli_fetch_array( $get_dialog , MYSQLI_ASSOC );
					
					if( mysqli_num_rows( $get_dialog ) ) {
						if( $last_seen['id'] != $seen_check ) {
							$seen = true;
							$seen_check = $last_seen['id'] ;
							break;
						} else $seen = false;
					} 
				}
				
				usleep( 500000 ); 
				
			}
			
		}
		
		if( $found || $online || $seen ) {
			$array = array( 'sms' => $array, 'online' => $online_check, 'seen' => $seen_check, 'tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/chat.tpl'), 'audio_tpl' => tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/audio.tpl') );
			$array['main_set'] = $global;
			$array['main_set']['root'] = _root_;
			echo json_encode( $array );
		} else echo "NULL";
	
	break;
	case 'send':
			
		if( !get_user( $fr_id, 0, 0 )['blocked_me'] ) {
			
			$img = 0;
			$sticker = 0;
			$sticker_pack = 0;
			$sticker_index = 0;
			$small = '';
			$medium = '';
			$big = '';
			$send = false;
			
			if( isset( $_POST['sticker'] ) &&  $_POST['sticker_pack'] != '' &&  $_POST['sticker_index'] != '' ) {
				$sticker = get_sticker_pack( escaper_mysql( $_POST['sticker_pack'] ) );
				if( !$sticker['empty'] && intval( $_POST['sticker_index'] ) <= intval( $sticker['length'] ) ) {
					$send = true;
					$sticker = 1;
					$sticker_pack = escaper_mysql( $_POST['sticker_pack'] );
					$sticker_index = escaper_mysql( $_POST['sticker_index'] );
				}
			}
			
			if( isset( $_FILES['img'] ) && $_FILES['img']['name'] != '' ) {
				$folder = '../content/'.$my_id;
				if( !is_dir($folder) ) mkdir($folder);

				$valid_formats = array("jpg", "png", "gif","jpeg"); 
				$ext = strtolower(end(explode(".",  $_FILES['img']['name'] ))) ;
				
				if( in_array($ext,$valid_formats) ) {
					$actual_image_name = gen_name( 10 ).time().".".$ext ; 
					$tmp = $_FILES['img']['tmp_name'];
					if( move_uploaded_file( $tmp, $folder.'/'.$actual_image_name) ) {

						$adress = $folder.'/'.$actual_image_name;
					
						img_resize_save($adress, $folder.'/1-'.$actual_image_name, 150, 150, $ext, $folder);
						img_resize_save($adress, $folder.'/2-'.$actual_image_name, 500, 500, $ext, $folder);
						img_resize_save($adress, $folder.'/3-'.$actual_image_name, 1200, 1200, $ext, $folder);
						
						unlink($adress);
						
						$small = 'content/'.$my_id.'/1-'.$actual_image_name ;
						$medium = 'content/'.$my_id.'/2-'.$actual_image_name ;
						$big = 'content/'.$my_id.'/3-'.$actual_image_name ;
						$img = 1;
						$send = true;
					}
				}
			}
			
			if( strlen( str_replace( " ", "", $_POST['text'] ) ) ) {
				$cont = getGif( $_POST['text'] );
				
				$text = escaper_mysql( $cont[0] );
				$gif = $cont[1];
				
				$send = true;
			}
			
			if( strlen( str_replace( " ", "", $_POST['audios'] ) ) ) {
				$audios = escaper_mysql( $_POST['audios'] );
				$send = true;
			}
			
			if( strlen( str_replace( " ", "", $_POST['videos'] ) ) ) {
				$videos = escaper_mysql( $_POST['videos'] );
				$send = true;
			}
			
			if( $send ) {
				update_rating( $fr_id , 1 );
				update_rating( $my_id , 1 );
				mysqli_query( $dbConnect, "INSERT INTO dialogues SET gif='$gif',videos='$videos',audios='$audios',chat_id='$chat_id',prof='$my_id',friend='$fr_id',text='$text',img='$img',img_small='$small',img_medium='$medium',img_big='$big',sticker='$sticker',sticker_pack='$sticker_pack',sticker_index='$sticker_index',sendtime='$time' " );
				$count = $chat_row['count'] + 1;
				mysqli_query( $dbConnect , "UPDATE chat SET count='$count' WHERE id='".$chat_row['id']."'" );
			}

		}
	break;
	case 'hide':
		
		$id = escaper_mysql( $_POST['id'] );
		$sms = mysqli_query($dbConnect, "SELECT * FROM dialogues WHERE chat_id='$chat_id' AND id='$id'");
		$row = mysqli_fetch_array( $sms , MYSQLI_ASSOC );
		
		if( $row['prof'] == $my_id ) $query = "UPDATE dialogues SET prof_hide = '1' WHERE chat_id='$chat_id' AND id='$id'";
		else $query = "UPDATE dialogues SET friend_hide = '1' WHERE chat_id='$chat_id' AND id='$id'";
		
		$res = mysqli_query( $dbConnect , $query );
		echo $id;
	break;
	}
?>