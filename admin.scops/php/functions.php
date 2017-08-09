<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  function tpl($tpl = '',$vars=array(),$each = false){
    $replace = array();
    $template = $tpl;
    $code = '';
    $eached_code='';
    if(is_file($template) AND $code = file_get_contents($template)){
      if($each){
        if(count($vars)){
          foreach($vars as $row){
            if(is_array($row) AND count($row)){
              $eached_code .= tpl($tpl,$row);
            }
          }
        }
      }else{
        if(count($vars)){
          foreach($vars as $k=>$v){
            $replace['%'.$k.'%'] = $v;
          }
          $code = str_replace(array_keys($replace),array_values($values),$code);
        }
      }
    }
    return $each?$eached_code:$code;
  }

  function escaper_mysql($source){
    
    global $dbConnect;
    return mysqli_real_escape_string( $dbConnect , $source);
    
  }

  function escaper_html( $source ){
    return htmlspecialchars( stripslashes( $source ) );
  }

  function seconds2times($time) {
    
    if($time > 3599) $hour = floor($time/3600); else $hour = 0;
    if($time > 59) $minute = floor(($time - (3600 * $hour))/60); else $minute = 0;
    $second = $time - (3600 * $hour) - (60 * $minute);
    if(strlen($second) == 1) $second = '0'.$second;
    
    if($time > 0) {
        if($time > 3599) return $hour.':'.$minute.':'.$second;
        else {
          if($time > 59) return $minute.':'.$second;
          else return '0:'.$second;
        }
    }
  }

  function birth_to_age( $birth ) {
    
    $year_arr = explode('-', $birth );
    
    if( $year_arr[1] - date('n') > 0 ) $year_res = date('Y') - $year_arr[2] - 1;
    else {
      if( $year_arr[1] - date('n') < 0 ) $year_res = date('Y') - $year_arr[2];
      else {
        if( $year_arr[0] - date('j') > 0 ) $year_res = date('Y') - $year_arr[2] - 1;
        else $year_res = date('Y') - $year_arr[2];
      }
    }
    
    return $year_res;
    
  }

  function img_resize_save( $target, $newcopy, $w, $h, $ext, $direc ) {
    list($w_orig, $h_orig) = getimagesize($target);
    
    if($w_orig > $w || $h_orig > $h){
      
      $scale_ratio = $w_orig / $h_orig;
      if (($w / $h) > $scale_ratio) $w = $h * $scale_ratio;
      else $h = $w / $scale_ratio;
      
      $img = "";
      $ext = strtolower($ext);
      if ($ext == "gif") $img = imagecreatefromgif($target);
      else {
        if($ext =="png") $img = imagecreatefrompng($target);
        else $img = imagecreatefromjpeg($target);
      }
      
      $tci = imagecreatetruecolor($w, $h);
      $white = imagecolorallocate($tci, 255, 255, 255); 
      imagefill($tci, 0, 0, $white);
      imagecopyresampled($tci, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);
      imagejpeg($tci, $newcopy, 80);
    
    }  else {
      
      $img = "";
      $ext = strtolower($ext);
      if ($ext == "gif") $img = imagecreatefromgif($target);
      else {
        if($ext =="png") $img = imagecreatefrompng($target);
        else $img = imagecreatefromjpeg($target);
      }
      
      $tci = imagecreatetruecolor($w_orig, $h_orig);
      $white = imagecolorallocate($tci, 255, 255, 255); 
      imagefill($tci, 0, 0, $white);
      imagecopyresampled($tci, $img, 0, 0, 0, 0, $w_orig, $h_orig, $w_orig, $h_orig);
      imagejpeg($tci, $newcopy, 80);
      
    }
  }

  function get_link( $link ) {
    
    require_once dirname(__FILE__).'/../libs/Curler/curler.class.php';
    require_once dirname(__FILE__).'/../libs/Meta Parser/meta_parser.class.php';

    $curler = ( new Curler() );
    $url = $link;
    $body = $curler->get($url);
    $parser = ( new MetaParser( $body, $url ) );
    $link_data = $parser->getDetails();
      
    $array = array(
      'host' => $link_data['url'],
      'title' => $link_data['title'],
      'favicon' => $link_data['favicon']
    );
    
    return $array ;

  }

  function gen_name( $length ) {
    $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
    $numChars = strlen($chars);
    $string = '';
    for ($i = 0; $i < $length; $i++) {
      $string .= substr($chars, rand(1, $numChars) - 1, 1);
    }
    return $string;
  }

  function check_array( $string , $id ) {
    
    $array = explode( ',' , $string );
    
    if( in_array( $id, $array ) ) array_splice( $array , array_search( $id , $array ) , 1 );
    else array_unshift( $array , $id );
    
    if( end( $array ) == '' ) array_splice( $array , count( $array ) - 1, 1 );
    $result = implode(',', $array);
    
    return $result;

  }

  function search( $needle , $haystack ) {
    $needle = mb_strtolower(preg_replace('/ {2,}/',' ',$needle));
    $haystack = mb_strtolower(preg_replace('/ {2,}/',' ',$haystack));
    
    $needle_array = explode(' ', $needle);
    $needle_length = count( $needle_array );
    $haystack_array = explode(' ', $haystack);
    $haystack_length = count( $haystack_array );
    
    for( $i = 0 ; $i < $needle_length ; $i++ ) {
      $check = false;
      for( $j = 0; $j < $haystack_length ; $j++ ) {
        
          if( $needle_array[$i] == mb_substr($haystack_array[$j],0,strlen($needle_array[$i])) )
            $check = true;
        
      }
      if( !$check ) return 0;
    }
    
    return 1;
  }

  function matrix_compare( $v1 , $v2 ) {
    if( $v1['time'] == $v2['time'] ) return 0;
    return ( $v1['time'] > $v2['time'] )? -1 : 1;
  }

  function unix2date( $time ) {
    $day = floor( ( ( time() - $time ) / ( 3600 * 24 ) ) );
    $hour = floor( ( ( time() - $time - ( 24 * 3600 * $day ) ) / 3600 ) );
    $minute = floor( ( ( time() - $time - ( 24 * 3600 * $day ) - ( 3600 * $hour ) ) / 60 ) );
    
    return [ 0 => $day , 1 => $hour , 2 => $minute , 'day' => $day , 'hour' => $hour , 'minute' => $minute ];
  }

  function in_array_matrix( $needle , $array , $index ) {
    foreach( $array as $val ) 
      if( $val[$index] == $needle ) return true;
    return false;
  }

  function human_date( $date ) {
    
    $real = explode( '.' , $date );
    switch( $real[1] ) {
      case '0': $real[1] = 'Jan'; break;
      case '1': $real[1] = 'Feb'; break;
      case '2': $real[1] = 'March'; break;
      case '3': $real[1] = 'Apr'; break;
      case '4': $real[1] = 'May'; break;
      case '5': $real[1] = 'June'; break;
      case '6': $real[1] = 'July'; break;
      case '7': $real[1] = 'Aug'; break;
      case '8': $real[1] = 'Sep'; break;
      case '9': $real[1] = 'Oct'; break;
      case '10': $real[1] = 'Nov'; break;
      case '11': $real[1] = 'Dec'; break;    
    }
    
    return $real[0] . ' ' . $real[1] . ' ' . $real[2];
  }
  
  function number_search( $needle , $haystack ) {
    
    if( $needle > $haystack ) return false;
    if( !$haystack ) return true;
    
    while( $haystack ) {
      if( $haystack == $needle ) return true;
      if( $haystack < $needle ) return false;
      $haystack = ( $haystack - $haystack%10 ) / 10;
    }
    
    return false;
    
  }
  
  function renderString( $string, array $parameters ) {
    
    $replacer = function ($match) use ($parameters) {
      return isset($parameters[$match[1]]) ? $parameters[$match[1]] : $match[0];
    };

    return preg_replace_callback('/{{\s*(.+?)\s*}}/', $replacer, $string);
    
  }

?>