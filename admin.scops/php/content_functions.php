<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

function get_user( $id ) {
  
  global $dbConnect;
  
  $get_prof = mysqli_query($dbConnect, "SELECT * FROM network WHERE id='$id' ");  
  $prof = mysqli_fetch_array( $get_prof, MYSQLI_ASSOC );
  
  if( !mysqli_num_rows( $get_prof ) ) return array( 'isset' => false );
  
  $array = $prof;
  $array['isset'] = true;
  $array['root'] = _root_;
  
  $img = $prof['img'];
  $cover = $prof['cover'];
  
  $img_res = mysqli_query($dbConnect, " SELECT img_clip, id FROM news WHERE id='$img'");
  $img = mysqli_fetch_array($img_res, MYSQLI_ASSOC);
  $img_id = $img['id'];
  $img = json_decode( $img['img_clip'] , true)[0];
  
  $cover_res = mysqli_query($dbConnect, " SELECT cover_clip , id FROM news WHERE id='$cover'");
  $cover = mysqli_fetch_array($cover_res, MYSQLI_ASSOC);
  $cover_id = $cover['id'];
  $cover = json_decode( $cover['cover_clip'] , true )[1];
  
  $array['img'] = $img;
  $array['cover'] = $cover;  
  $array['verified'] = $prof['verified'] ? true : false ;  
  
  return $array;
  
}

function get_club( $id ) {
  
  global $dbConnect;
  
  $get_club = mysqli_query($dbConnect, "SELECT * FROM clubs WHERE id='$id' ");  
  $club = mysqli_fetch_array( $get_club, MYSQLI_ASSOC );
  
  if( !mysqli_num_rows( $get_club ) ) return array( 'isset' => false );
  
  $array = $club;
  $array['isset'] = true;
  $array['root'] = _root_;
  
  $img = $club['img'];
  $cover = $club['cover'];
  
  $img_res = mysqli_query($dbConnect, " SELECT img_clip, id FROM news WHERE id='$img'");
  $img = mysqli_fetch_array($img_res, MYSQLI_ASSOC);
  $img_id = $img['id'];
  $img = json_decode( $img['img_clip'] , true)[0];
  
  $cover_res = mysqli_query($dbConnect, " SELECT cover_clip , id FROM news WHERE id='$cover'");
  $cover = mysqli_fetch_array($cover_res, MYSQLI_ASSOC);
  $cover_id = $cover['id'];
  $cover = json_decode( $cover['cover_clip'] , true )[1];
  
  $array['img'] = $img;
  $array['cover'] = $cover;  
  
  return $array;
  
}

function get_report( $num ) {
  
  global $dbConnect;
  
  $get_rep = mysqli_query( $dbConnect, "SELECT * FROM notif WHERE type='12' AND extra_column_2='$num' ORDER BY id DESC LIMIT 1 ");  
  $report = mysqli_fetch_array( $get_rep, MYSQLI_ASSOC );
  
  if( !mysqli_num_rows( $get_rep ) ) return array( 'isset' => false );
  
  $array = $report;
  $array['isset'] = true;
  
  return $array;
  
}

function get_game( $id ) {
  
  global $dbConnect;
  
  $game_res = mysqli_query( $dbConnect, "SELECT * FROM games WHERE id='$id' ORDER BY id DESC LIMIT 1 ");  
  $game = mysqli_fetch_array( $game_res, MYSQLI_ASSOC );
  
  if( !mysqli_num_rows( $game_res ) ) return array( 'isset' => false );
  
  $array = $game;
  $array['isset'] = true;
  $array['root'] = _root_;
  
  return $array;
  
}

function get_sticker( $id ) {
  
  global $dbConnect;
  
  $st_res = mysqli_query( $dbConnect, "SELECT * FROM stickers WHERE id='$id' ORDER BY id DESC LIMIT 1 ");  
  $sticker = mysqli_fetch_array( $st_res, MYSQLI_ASSOC );
  
  if( !mysqli_num_rows( $st_res ) ) return array( 'isset' => false );
  
  $array = $sticker;
  $array['isset'] = true;
  $array['root'] = _root_;
  
  return $array;
  
}

function get_gift( $id ) {
  
  global $dbConnect;
  
  $st_res = mysqli_query( $dbConnect, "SELECT * FROM gifts WHERE id='$id' ORDER BY id DESC LIMIT 1 ");  
  $gift = mysqli_fetch_array( $st_res, MYSQLI_ASSOC );
  
  if( !mysqli_num_rows( $st_res ) ) return array( 'isset' => false );
  
  $array = $gift;
  $array['isset'] = true;
  $array['root'] = _root_;
  
  return $array;
  
}

?>