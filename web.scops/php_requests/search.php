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
	
	if( isset( $_POST['length'] ) ) $length = escaper_mysql( $_POST['length'] );
	if( isset( $_POST['last_id'] ) ) $last_id = escaper_mysql( $_POST['last_id'] );
	
	switch( $_POST['type'] ) {
	
		case 'people':
			$name = escaper_mysql( $_POST['name'] );
			$country = escaper_mysql( $_POST['country'] );
			$city = escaper_mysql( $_POST['city'] );
			$year_f = escaper_mysql( $_POST['year-from'] );
			$year_t = escaper_mysql( $_POST['year-to'] );
			$gender = escaper_mysql( $_POST['gender'] );
			
			$resArr = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			
			$people_row = mysqli_query( $dbConnect, "SELECT * FROM network ".$query." ORDER BY id DESC LIMIT $length" );
			
			for( $i = 0 ; $i < $length ; ) {
				if( $people = mysqli_fetch_array( $people_row , MYSQLI_ASSOC ) ) {
					if(
							search( $name , $people['name'] ) && search( $country , $people['country'] ) && search( $city , $people['city'] )
							&& ( $year_f <= birth_to_age( $people['birth'] ) && $year_t >= birth_to_age( $people['birth'] ) )
							&& ( ( $people['gender'] == $gender ) || $gender == -1 ) && ( ( $people['online'] > time() - 60 ) || !isset( $_POST['online'] ) )
							&& ( ( $people['secret'] == $_POST['opened-profile'] ) || !isset( $_POST['opened-profile'] ) )
					)	{
						$resArr[$i] = get_user( $people['id'] , 0 , 0);
						$i++;
					}
				} else break;
			}
			
			$dataArr = array( 'friend' => $resArr , 'end' => ( $i < $length - 1 ? true : false ) );
			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
			
		break;
		case 'clubs':
			$name = escaper_mysql( $_POST['name'] );
			$about = escaper_mysql( $_POST['descr'] );
			
			$resArr = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			
			$clubs_row = mysqli_query( $dbConnect, "SELECT * FROM clubs ".$query." ORDER BY id DESC LIMIT $length" );
			
			for( $i = 0 ; $i < $length ; ) {
				if( $club = mysqli_fetch_array( $clubs_row , MYSQLI_ASSOC ) ) {
					if( search( $name , $club['name'] ) && search( $about , $club['description'] ) )	{
						$resArr[$i] = get_club( $club['id'] , 0 , 1 );
						$i++;
					}
				} else break;
			}
			
			$dataArr = array( 'club' => $resArr , 'end' => ( $i < $length - 1 ? true : false ) );
			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
			
		break;
		case 'videos':
			$name = escaper_mysql( $_POST['name'] );
			
			$resArr = array();
			$i = 0;
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			
			$post_row = mysqli_query( $dbConnect, "SELECT * FROM videos ".$query." ORDER BY id DESC LIMIT $length " );
			
			for( $i = 0 ; $i < $length ; ) {
				if( $post = mysqli_fetch_array( $post_row , MYSQLI_ASSOC ) ) {
					$video_name = json_decode( $post['video'], true);
					if( search( $name , $video_name['name'] ) || search( $name , $video_name['description'] ) ) {	
						$resArr[$i] = get_video( $post['id'] , NULL );
						$i++;
					}
				} else break;
			}
			
			$dataArr = array( 'video' => $resArr , 'end' => ( $i < $length - 1 ? true : false ) );
			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../'.( _mobile_ ? 'tpl_app' : 'themes/'._theme_.'/tpl' ).'/content.tpl');
			
		break;
		case 'audios':
			$name = escaper_mysql( $_POST['name'] );
			
			$resArr = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			
			$audio_row = mysqli_query( $dbConnect, "SELECT * FROM audios ".$query." ORDER BY id DESC LIMIT $length " );
			
			for( $i = 0 ; $i < $length ; ) {
				if( $get = mysqli_fetch_array( $audio_row , MYSQLI_ASSOC ) ) {
					$audio = json_decode( $get['audio'], true);
					if( search( $name , $audio['description'] ) )	{
						$resArr[$i] = get_music( $get['id'] , 0 , 1);
						$i++;
					}
				} else break;
			}
			
			$dataArr = array( 'music' => $resArr , 'end' => ( $i < $length - 1 ? true : false ) );
			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/audio.tpl');
			
		break;
		case 'tag':
			if( !isset( $_POST['dont'] ) && $_POST['dont'] != 1 ) {
				$name = mb_strtolower( preg_replace( '/ {2,}/',' ', escaper_mysql( $_POST['name'] ) ) );
				$hash_array = explode(' ', escaper_mysql( $_POST['name'] ) );
				
				$query = '';
				
				foreach( $hash_array as $val ) {
					if( substr( $val , 0 , 1 ) != '#' ) $val = '#'.$val;
					if( $query != '' ) $query .= " AND ( text LIKE '% ".$val."%' OR text LIKE '".$val."%' )";
					else $query .= "( text LIKE '% ".$val."%' OR text LIKE '".$val."%' )";
				}
				
				if( $query != '' ) $query .= $last_id != 'NULL' ? " AND id < '$last_id' " : "" ;
				else $query = $last_id != 'NULL' ? " id < '$last_id' " : "" ;

				$resArr = array();
				$i = 0;
				
				$news_row = mysqli_query( $dbConnect, "SELECT * FROM news WHERE ".$query." ORDER BY id DESC limit $length" );
				while( $news = mysqli_fetch_array( $news_row , MYSQLI_ASSOC ) )
					$resArr[$i++] = get_news( $news['id'] );
				
				
				$dataArr = array( 'news' => $resArr , 'end' => ( mysqli_num_rows( $news_row ) < $length ) ? true : false );
				$dataArr['tpl'] = tpl(dirname(__FILE__).'/../themes/'._theme_.'/tpl/news.tpl');
			}
		break;
	}
	
	if( !isset( $dataArr ) ) $dataArr = array();
	
	$dataArr['langs'] = $langs;
	$dataArr['main_set'] = $global;
	$dataArr['main_set']['root'] = _root_;
	
	echo json_encode( $dataArr );
	
?>