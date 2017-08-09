<?php
/*
	
	$p: Scops Engine
	$a: Gor Arakelyan
	$c: All rights reserved (c) 2016
	$!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	include_once 'lock.php';
	include_once 'functions.php';
	
	$http_origin = $_SERVER['HTTP_ORIGIN'];
	if( strripos( $http_origin , 'admin.' ._host_ ) )
		header( 'Access-Control-Allow-Origin: ' . $http_origin );
	
	$admin_link = mysqli_fetch_array( mysqli_query($dbConnect , "SELECT admin FROM main") , MYSQLI_ASSOC )['admin'];
	$global['admin'] = $admin_link;
	
	if( $global['demo'] ) exit();
	
	if( !isset( $_POST['admin'] ) || $_POST['admin'] != md5( $global['admin'] ) ) exit();
	
	switch( $_POST['action'] ) {
		case 'create_ads':
			
		$title = escaper_mysql( $_POST['title'] );
		$description = escaper_mysql( $_POST['description'] );
		$limit_views = escaper_mysql( $_POST['limit_views'] );
		$limit_clicks = escaper_mysql( $_POST['limit_clicks'] );
		$limit_type = escaper_mysql( $_POST['limit_type'] );
		$url = escaper_mysql( $_POST['url'] );
		$img = '';
			
		if( !$title || !$description || !$url || !$limit_type ) {
			echo 0;
			exit;
		}
		
		if( $limit_type == 'limit_views' ) {
			if( !$limit_views ) {
				echo 0;
				exit;
			}
			else $limit_clicks = 0;
		} elseif( $limit_type == 'limit_clicks' ) {
			if( !$limit_clicks ) {
				echo 0;
				exit;
			}
			else $limit_views = 0;
		} else {
			$limit_views = -1;
			$limit_clicks = -1;
		}
		
		if( isset( $_FILES['img'] ) &&  str_replace( " ", "", $_FILES['img']['name'] ) ) {
			
			$valid_formats = array("jpg", "png", "gif", "jpeg"); 
			$ext = strtolower( end( explode( "." , $_FILES['img']['name'] ) ) );
			
			if( in_array( $ext , $valid_formats ) ) {
					
				$actual_image_name = gen_name( 10 ).".".$ext ; 
				$tmp = $_FILES['img']['tmp_name'];
				
				if( move_uploaded_file( $tmp, '../img/ads/'.$actual_image_name ) ) {

					$adress ='../img/ads/'.$actual_image_name;
					$folder ='../img/ads';
					
					img_resize_save($adress, $folder.'/ad'.$actual_image_name, 500, 500, $ext, $folder);
					
					$img = 'img/ads/ad'.$actual_image_name;
					unlink( $adress );
					
				}
			}
			
		}
		
		$q = mysqli_query( $dbConnect , "INSERT INTO ads ( title, description, img, limit_views, limit_clicks, url ) VALUES ( '$title', '$description', '$img', '$limit_views', '$limit_clicks', '$url')");
		echo $q ? 1 : 0;
		
		break;
		case 'create_game':
			
		$name = escaper_mysql( $_POST['name'] );
		$about = escaper_mysql( $_POST['desc'] );
		$html = escaper_mysql( $_POST['html'] );
		$prop = escaper_mysql( $_POST['prop'] );
		$genre = escaper_mysql( $_POST['genre'] );
		$cover = '';
		
		if( isset( $_FILES['photoimg'] ) &&  str_replace( " ", "", $_FILES['photoimg']['name'] ) ) {
			
			$valid_formats = array("jpg", "png", "gif", "jpeg"); 
			$ext = strtolower( end( explode( "." , $_FILES['photoimg']['name'] ) ) );
			
			if( in_array( $ext , $valid_formats ) ) {
					
				$actual_image_name = gen_name( 10 ).".".$ext ; 
				$tmp = $_FILES['photoimg']['tmp_name'];
				
				if( move_uploaded_file( $tmp, '../img/games/'.$actual_image_name ) ) {

					$adress ='../img/games/'.$actual_image_name;
					$folder ='../img/games';
					
					img_resize_save($adress, $folder.'/g'.$actual_image_name, 500, 500, $ext, $folder);
					
					$cover = 'img/games/g'.$actual_image_name;
					unlink( $adress );
					
				}
			}
			
		}
		
		$q = mysqli_query( $dbConnect , "INSERT INTO games ( name, about, link, cover, prop, genre ) VALUES ( '$name', '$about', '$html', '$cover', '$prop', '$genre')");
		echo $q ? 1 : 0;
		
		break;
		case 'create_gift':
			
		$name = escaper_mysql( $_POST['name'] );
		$img = '';
		
		if( isset( $_FILES['photoimg'] ) &&  str_replace( " ", "", $_FILES['photoimg']['name'] ) ) {
			
			$valid_formats = array("jpg", "png", "gif", "jpeg"); 
			$ext = strtolower( end( explode( "." , $_FILES['photoimg']['name'] ) ) );
			
			if( in_array( $ext , $valid_formats ) ) {
					
				$actual_image_name = gen_name( 10 ).".".$ext ; 
				$tmp = $_FILES['photoimg']['tmp_name'];
				
				if( move_uploaded_file( $tmp, '../img/gifts/'.$actual_image_name ) ) {

					$adress ='../img/gifts/'.$actual_image_name;
					$folder ='../img/gifts';
					
					img_resize_save($adress, $folder.'/g'.$actual_image_name, 500, 500, $ext, $folder);
					
					$img = 'img/gifts/g'.$actual_image_name;
					unlink( $adress );
					
				}
			}
			
		}
		
		$q = mysqli_query( $dbConnect , "INSERT INTO gifts ( name, img ) VALUES ( '$name', '$img' )");
		echo $q ? 1 : 0;
		
		break;
		case 'create_sticker':
			
		$name = escaper_mysql( $_POST['name'] );
		$cover = '';
		$thumb = '';
		
		mysqli_query( $dbConnect , "INSERT INTO stickers ( name ) VALUES ( '$name' )");
		$id = mysqli_fetch_array( mysqli_query( $dbConnect , "SELECT id FROM stickers ORDER BY id DESC LIMIT 1" ) , MYSQLI_ASSOC )['id'];
		
		mkdir( '../img/stickers/' . $id );
		
		if( isset( $_FILES['photocover'] ) &&  str_replace( " ", "", $_FILES['photocover']['name'] ) ) {
			$valid_formats = array("jpg", "png", "gif", "jpeg"); 
			$ext = strtolower( end( explode( "." , $_FILES['photocover']['name'] ) ) );
			
			if( in_array( $ext , $valid_formats ) ) {
				$actual_image_name = gen_name( 10 ).".".$ext ; 
				$tmp = $_FILES['photocover']['tmp_name'];
				
				if( move_uploaded_file( $tmp, '../img/stickers/'.$id.'/'.$actual_image_name ) ) {
					$adress ='../img/stickers/'.$id.'/'.$actual_image_name;
					$folder ='../img/stickers/'.$id;
					
					img_resize_save($adress, $folder.'/sc'.$actual_image_name, 700, 700, $ext, $folder);
					$cover = 'img/stickers/'.$id.'/sc'.$actual_image_name;
					unlink( $adress );
				}
			}
		}
		
		if( isset( $_FILES['photothumb'] ) &&  str_replace( " ", "", $_FILES['photothumb']['name'] ) ) {
			$valid_formats = array("jpg", "png", "gif", "jpeg"); 
			$ext = strtolower( end( explode( "." , $_FILES['photothumb']['name'] ) ) );
			
			if( in_array( $ext , $valid_formats ) ) {
				$actual_image_name = gen_name( 10 ).".".$ext ; 
				$tmp = $_FILES['photothumb']['tmp_name'];
				
				if( move_uploaded_file( $tmp, '../img/stickers/'.$id.'/'.$actual_image_name ) ) {
					$adress ='../img/stickers/'.$id.'/'.$actual_image_name;
					$folder ='../img/stickers/'.$id;
					
					img_resize_save($adress, $folder.'/st'.$actual_image_name, 60, 60, $ext, $folder);
					$thumb = 'img/stickers/'.$id.'/st'.$actual_image_name;
					unlink( $adress );
				}
			}
		}
		
		$i = 0;
		
		foreach( $_FILES['photosticker']['name'] as $val ) {
			$valid_formats = array("jpg", "png", "gif", "jpeg"); 
			$ext = strtolower( end( explode( "." , $val ) ) );
			
			if( in_array( $ext , $valid_formats ) ) {
				move_uploaded_file( $_FILES['photosticker']['tmp_name'][$i], '../img/stickers/'.$id.'/'.++$i.'.'.$ext );
			}
		}
		$format = $ext;
		
		mysqli_query( $dbConnect , "UPDATE stickers SET cover='$cover', thumb='$thumb' , length = '$i' , format = '$format' WHERE id='$id'" );
		
		break;
		case 'new_lang':
			
		if( isset( $_FILES['lang'] ) &&  str_replace( " ", "", $_FILES['lang']['name'] ) ) {
			
			$name = escaper_mysql( $_POST['name'] );
			$abb = gen_name( 5 ).time();
		
			$tmp = $_FILES['lang']['tmp_name'];
			move_uploaded_file( $tmp, '../langs/'.$abb.'.php' );
			
			$res = mysqli_query( $dbConnect , "INSERT INTO langs SET name='$abb', title='$name'" );
			
			echo $res ? 1 : 0;
			
		} else echo 0;

		break;
		case 'del_club':
			
			include_once '../php_requests/content_functions.php';
			echo delete_club( array( escaper_mysql( $_POST['id'] ) , $_POST['admin'] ) );
			
		break;
		case 'del_user':
			
			include_once '../php_requests/content_functions.php';
			echo delete_user( escaper_mysql( $_POST['id'] ) );
			
		break;
	}
	
?>