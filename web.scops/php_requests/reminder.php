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
	
	$mail = $_POST['mail'];
	$check_user = mysqli_query( $dbConnect , "SELECT id FROM network WHERE login='$mail'");
	if( mysqli_num_rows( $check_user ) ) {
		$id = mysqli_fetch_array( $check_user , MYSQLI_ASSOC )['id'];
		
		$new_pass = gen_name( 15 );
		$new_pass_md = md5( $new_pass );
		
		$check_user = mysqli_query( $dbConnect , "UPDATE network SET password='$new_pass_md' WHERE id='$id'");
		
		$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
		$headers .= "From: ".$global['name']." < ".$global['mail']." >\r\n";
		
		$message = tpl( dirname(__FILE__).'/../themes/classic/tpl/mail_remind.tpl' , array('pass' => $new_pass, 'root' => $global['connection'].$global['host'] , 'name' => $global['name'] ) );
		
		mail( $mail, "Password change" , $message, $headers ); 		
		
		echo 1;
	} else echo 0;
	
?>