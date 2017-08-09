<?php
/*
	
	$p: Scops Engine
	$a: Gor Arakelyan
	$c: All rights reserved (c) 2016
	$!: fb: facebook.com/arakelianGor
			mail: gor19973010@gmail.com

*/

	include_once dirname(__FILE__).'/../php/lock.php';
	include_once dirname(__FILE__).'/../php/connect.php';
	include_once dirname(__FILE__).'/../php/functions.php';
	include_once 'content_functions.php';
	
	if( isset( $_POST['prof_id'] ) ) $id = escaper_mysql( $_POST['prof_id'] );
	if( isset( $_POST['from'] ) ) $from = escaper_mysql( $_POST['from'] );
	if( isset( $_POST['length'] ) ) $length = escaper_mysql( $_POST['length'] );
	if( isset( $_POST['last_id'] ) ) $last_id = escaper_mysql( $_POST['last_id'] );
	if( isset( $_POST['key'] ) ) $key = escaper_mysql( $_POST['key'] );
	
	switch( $_POST['content'] ) {
		case 'manage_users':
			
			$array = array();
			
			$query = $last_id != 'NULL' ? " AND id < '$last_id' " : "";
			$users_res = mysqli_query($dbConnect, "SELECT id FROM network WHERE id LIKE '$key%' ".$query." ORDER BY id DESC LIMIT $length ");

			for( $i = 0 ; $i < $length ; ) {
				if( $prof = mysqli_fetch_array( $users_res, MYSQLI_ASSOC ) ) {
					$array[$i] = get_user( $prof['id'] );
					$array[$i]['set_admin'] = md5( $general_row['admin'] );
					$array[$i++]['host'] = _root_;
				} else break;
			}
			
			$dataArr = array( 'users' => $array , 'end' => ( $i < $length - 1 ? true : false ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'manage_clubs':
		
			$array = array();
			
			$query = $last_id != 'NULL' ? " AND id < '$last_id' " : "";
			$clubs_res = mysqli_query($dbConnect, "SELECT id FROM clubs WHERE id LIKE '$key%' ".$query." ORDER BY id DESC LIMIT $length ");

			for( $i = 0 ; $i < $length ; ) {
				if( $club = mysqli_fetch_array( $clubs_res, MYSQLI_ASSOC ) ) {
					$array[$i] = get_club( $club['id'] );
					$array[$i]['set_admin'] = md5( $general_row['admin'] );
					$array[$i++]['host'] = _root_;
				}	else break;
			}
			
			$dataArr = array( 'clubs' => $array , 'end' => ( $i < $length - 1 ? true : false ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'ads_get':
			
			$array = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			$ads_res = mysqli_query($dbConnect, "SELECT * FROM ads ".$query." ORDER BY id DESC LIMIT $length ");

			for( $i = 0 ; $i < $length ; ) {
				if( $ad = mysqli_fetch_array( $ads_res, MYSQLI_ASSOC ) ) {
					$array[$i] = $ad;
					$array[$i]['limit'] = 'Infinite';
					
					if( $ad['limit_views'] != -1 || $ad['limit_clicks'] != -1 ) {
						if( $ad['limit_views'] ) $array[$i]['limit'] = $ad['limit_views'] . ' Views Left';
						if( $ad['limit_clicks'] ) $array[$i]['limit'] = $ad['limit_clicks'] . ' Clicks Left';
					}
					
					$array[$i++]['host'] = _root_;
				} else break;
			}
			
			$dataArr = array( 'ads' => $array , 'end' => ( $i < $length - 1 ? true : false ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'manage_reports':
			
			$array = array();
			$j = 0;
			
			if( $last_id == 'NULL' ) {
				
				$find_last = mysqli_query( $dbConnect , "SELECT * FROM notif WHERE type='12' ORDER BY id DESC LIMIT 1" );			
				if( mysqli_num_rows( $find_last ) ) $last_id = mysqli_fetch_array( $find_last , MYSQLI_ASSOC )['extra_column_2'];
				else $last_id = 'NULL';
				
			} else $last_id--;
			
			$notif_condition = $last_id != 'NULL' || $last_id < 0 ? true : false ;
			
			for( $i = $last_id ; $notif_condition ; $i-- ) {
				
				$notif = mysqli_query( $dbConnect , "SELECT id FROM notif WHERE type='12' AND extra_column_2='$i' ORDER BY id DESC LIMIT 1" );		
				if( mysqli_num_rows( $notif ) )
					$array[count( $array )] = get_report( $i );
				
				$j++;
				$notif_condition = $j < $length && $i >= 0 ? true : false ;
				
			}
			
			$dataArr = array( 'reports' => $array , 'end' => ( $j == $length ? false : true ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'games':
		
			$array = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			$games_res = mysqli_query($dbConnect, "SELECT id FROM games ".$query." ORDER BY id DESC LIMIT $length ");

			for( $i = 0 ; $i < $length ; ) {
				if( $game = mysqli_fetch_array( $games_res, MYSQLI_ASSOC ) )
					$array[$i++] = get_game( $game['id'] );
				else break;
			}
			
			$dataArr = array( 'games' => $array , 'end' => ( $i < $length - 1 ? true : false ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'stickers':
		
			$array = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			$st_res = mysqli_query($dbConnect, "SELECT id FROM stickers ".$query." ORDER BY id DESC LIMIT $length ");

			for( $i = 0 ; $i < $length ; ) {
				if( $st = mysqli_fetch_array( $st_res, MYSQLI_ASSOC ) )
					$array[$i++] = get_sticker( $st['id'] );
				else break;
			}
			
			$dataArr = array( 'stickers' => $array , 'end' => ( $i < $length - 1 ? true : false ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'gifts':
		
			$array = array();
			
			$query = $last_id != 'NULL' ? " WHERE id < '$last_id' " : "";
			$st_res = mysqli_query($dbConnect, "SELECT id FROM gifts ".$query." ORDER BY id DESC LIMIT $length ");

			for( $i = 0 ; $i < $length ; ) {
				if( $st = mysqli_fetch_array( $st_res, MYSQLI_ASSOC ) )
					$array[$i++] = get_gift( $st['id'] );
				else break;
			}
			
			$dataArr = array( 'gifts' => $array , 'end' => ( $i < $length - 1 ? true : false ) );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'langs':
		
			$array = array();
			
			$lang_res = mysqli_query($dbConnect, "SELECT * FROM langs ORDER BY id DESC" );
			
			$i = -1;
			
			while( $lang = mysqli_fetch_array( $lang_res , MYSQLI_ASSOC ) )
				$array[++$i] = $lang;
			
			$dataArr = array( 'langs' => $array );

			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/content.tpl');
			
		break;
		case 'statistics':
			
			$time = time() - 3600 * 24;
			
			$query = mysqli_query( $dbConnect , "SELECT id FROM comments WHERE time > '$time' " );
			$array['today']['comments'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM news WHERE time > '$time' " );
			$array['today']['posts'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE reg_time > '$time' " );
			$array['today']['users'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM clubs WHERE reg_time > '$time' " );
			$array['today']['clubs'] = mysqli_num_rows( $query );
			
			$time = time() - 3600 * 24 * 7;
			
			$query = mysqli_query( $dbConnect , "SELECT id FROM comments WHERE time > '$time' " );
			$array['week']['comments'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM news WHERE time > '$time' " );
			$array['week']['posts'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE reg_time > '$time' " );
			$array['week']['users'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM clubs WHERE reg_time > '$time' " );
			$array['week']['clubs'] = mysqli_num_rows( $query );
			
			$time = time() - 3600 * 24 * 31;
			
			$query = mysqli_query( $dbConnect , "SELECT id FROM comments WHERE time > '$time' " );
			$array['month']['comments'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM news WHERE time > '$time' " );
			$array['month']['posts'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE reg_time > '$time' " );
			$array['month']['users'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM clubs WHERE reg_time > '$time' " );
			$array['month']['clubs'] = mysqli_num_rows( $query );
			
			$time = time() - 3600 * 24 * 365;
			
			$query = mysqli_query( $dbConnect , "SELECT id FROM comments WHERE time > '$time' " );
			$array['year']['comments'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM news WHERE time > '$time' " );
			$array['year']['posts'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE reg_time > '$time' " );
			$array['year']['users'] = mysqli_num_rows( $query );
			$query = mysqli_query( $dbConnect , "SELECT id FROM clubs WHERE reg_time > '$time' " );
			$array['year']['clubs'] = mysqli_num_rows( $query );
			
			$time = time() - 60;
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE online > '$time' " );
			$array['now']['online'] = mysqli_num_rows( $query );
			
			$time = time() - 24 * 3600;
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE online > '$time' " );
			$array['today']['online'] = mysqli_num_rows( $query );
			
			$time = time() - 24 * 3600 * 7;
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE online > '$time' " );
			$array['week']['online'] = mysqli_num_rows( $query );
			
			$time = time() - 24 * 3600 * 31;
			$query = mysqli_query( $dbConnect , "SELECT id FROM network WHERE online > '$time' " );
			$array['month']['online'] = mysqli_num_rows( $query );
			
			$dataArr = array( 'statistics' => $array );
			$dataArr['tpl'] = tpl(dirname(__FILE__).'/../tpl/statistics.tpl');
		break;
	}
	
	if( !isset( $dataArr ) ) $dataArr = array();
	echo json_encode( $dataArr );
	
?>