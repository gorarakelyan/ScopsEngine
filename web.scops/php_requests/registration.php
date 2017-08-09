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
	
	switch( $_GET['request'] ) {
		case 0:
			$mail_pattern = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
			$password_pattern = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,25}$/';
			$birth_pattern = '/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/';
			$mail = escaper_mysql( $_POST['mail'] );
			
			$post_array = array('mail','pass','repass','name','surname','country','city','gender','day','month','year');
				foreach($post_array as $item) $$item = escaper_mysql( $_POST[$item] );
			
			
			$birth = $day."-".$month."-".$year;
			
			$check_user = mysqli_query( $dbConnect , "SELECT id FROM network WHERE login='$mail'");
			
			if( !mysqli_num_rows( $check_user ) ) {
				if (
					preg_match( $mail_pattern, $mail ) && preg_match( $password_pattern, $pass ) && ( $repass == $pass ) &&
					strlen( $name ) && strlen( $surname ) && strlen( $city ) && strlen( $country ) && preg_match( $birth_pattern, $birth ) &&
					( $gender == 1 || $gender == 0 )
				) {
					
					$like_mail = '"'.$mail.'"';
					$user_reg = mysqli_query( $dbConnect , "SELECT id FROM registration WHERE user_data LIKE '%$like_mail%'");
					if( mysqli_num_rows( $user_reg ) ) {
						$del_user = mysqli_fetch_array( $user_reg , MYSQLI_ASSOC )['id'];
						mysqli_query( $dbConnect , "DELETE FROM registration WHERE id='$del_user'");
					}
					
					$new_key = gen_name(45);
					$check_key = mysqli_query( $dbConnect , "SELECT id FROM registration WHERE user_key='$new_key'");
					while( mysqli_num_rows( $check_key ) ) {
						$new_key = gen_name(45);
						$check_key = mysqli_query( $dbConnect , "SELECT id FROM registration WHERE user_key='$new_key'");
					}
					
					$pass = md5( $pass );
					$repass = md5( $repass );
					
					$array = array();
					foreach($post_array as $item) $array[$item] = $$item;
					
					$data = escaper_mysql( json_encode( $array ) );
					
					mysqli_query( $dbConnect , "INSERT INTO registration ( user_data,user_key ) VALUES ( '$data','$new_key' )" );
					
					$link = _root_.'/php_requests/registration.php?request=1&key='.$new_key ;
						
					if( $global['email_conf'] ) {
						$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
						$headers .= "From: ".$global['name']." < ".$global['mail']." >\r\n";
						
						$tpl = tpl( dirname(__FILE__).'/../themes/classic/tpl/mail_reg.tpl', array( 'link' => $link , 'root' => $global['connection'].$global['host'] , 'name' => $global['name'] ) );				
						
						mail( $mail, "Registration", $tpl, $headers ); 
					} else {
						echo json_encode( [ 0, $link ] );
						exit;
					}
					echo 1;
				} else echo json_encode( [ 1, 'Fill data correctly.'] );
			} else echo json_encode( [ 1, 'The user is already registered.'] );
		break;
		case 1:
			
			$key = $_GET['key'];
			
			$check_key = mysqli_query( $dbConnect , "SELECT * FROM registration WHERE user_key='$key'");
			
			$row = mysqli_fetch_array( $check_key , MYSQLI_ASSOC );
			$data = json_decode( $row['user_data'] , true );
			
			$post_array = array('mail','pass','repass','name','surname','country','city','gender','day','month','year');
				foreach($post_array as $item) $$item = $data[$item];
			
			$check_user = mysqli_query( $dbConnect , "SELECT id FROM network WHERE login='$mail'");
			
			if( !mysqli_num_rows( $check_user ) ) {
			
				if( mysqli_num_rows( $check_key ) ) {
					
					mysqli_query( $dbConnect , "DELETE FROM registration WHERE user_key='$key'" );

					$time = time();
					$img = $gender?2:1;
					$name = $name." ".$surname;
					$birth = $day."-".$month."-".$year;
					
					$key = gen_name(45);
				
					$check_key = mysqli_query( $dbConnect , "SELECT id FROM network WHERE link='$key'");
					
					while( mysqli_num_rows( $check_key ) ) {
						$key = gen_name(45);
						$check_key = mysqli_query( $dbConnect , "SELECT id FROM network WHERE link='$key'");
					}
					
					mysqli_query( $dbConnect , 
						"INSERT INTO network SET 
						
							login='$mail', 
							password='$pass',
							link='$key',
							reg_time='$time',
							name='$name',
							img='$img',
							cover='3',
							country='$country',
							city='$city',
							birth='$birth',
							gender='$gender'
							
						");
					
					$get_id = mysqli_query( $dbConnect , "SELECT id FROM network WHERE link='$key'");
					$id = mysqli_fetch_array( $get_id , MYSQLI_ASSOC )['id'];
					
					setcookie('link',$key,time() + 315360000, '/' );
					setcookie('id',$id,time() + 315360000, '/' );
					setcookie('ch','true',time() + 315360000, '/' );
					header('Location:../id'.$id);
					exit();
					
				}
			}
			
			header('Location:../');
			exit();
			
		break;
	}
	
?>