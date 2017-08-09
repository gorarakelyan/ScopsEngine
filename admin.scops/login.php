<?php
/*
	
	$p: Scops Engine
	$a: Gor Arakelyan
	$c: All rights reserved (c) 2016
	$!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	include_once 'php/lock.php';
	include_once 'php/functions.php';
	
	if( isset( $_COOKIE['admin'] ) && str_replace( " ", "", $_COOKIE['admin'] ) != '' ) {
		
		if( isset( $_POST['log_out'] ) ) {
			setcookie('admin','',time() - 1 );
		} else {
			
			$link = $_COOKIE['admin'];
			if( str_replace( " ", "", $link ) != '' ) {
				$check_admin = mysqli_num_rows( mysqli_query( $dbConnect, "SELECT * FROM main WHERE admin='$link'" ) );
				if( $check_admin ) {
					header('Location:users');
					exit();
				} else setcookie('admin','',time() - 1 );
			} else setcookie('admin','',time() - 1 );
			
		}
		
	} else {
		
		if( isset( $_POST['log_in'] ) ) {
		
			$login = mb_strtoupper( escaper_mysql( $_POST['login'] ) );
			$password = escaper_mysql( $_POST['password'] );
			
			if( str_replace( " ", "", $login ) != '' && str_replace( " ", "", $password ) != '' ) {
				include_once 'php/general.php';
				if( $login == mb_strtoupper( $admin_login ) && $password == $admin_password ) {
					
					$check_admin_row = mysqli_fetch_array( mysqli_query( $dbConnect, "SELECT * FROM main" ) , MYSQLI_ASSOC );
					setcookie( 'admin' , $check_admin_row['admin'] );
					header('Location:users');
					exit();
					
				}
			}
		}
		
	}
	
?>