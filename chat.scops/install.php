<?php
/*
  
  $p: Scops Engine
  $a: Gor Arakelyan
  $c: All rights reserved (c) 2016
  $!: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

if( isset( $_POST['install'] ) ) {
  
  $connection = $_POST['connection'];
  $domain = $_POST['domain'];
  
  /* Lock.php */
  
  $file = fopen('config.js' , 'r');
  
  $content = fread( $file , filesize('config.js') );
  
  fclose( $file );
  
  $file = fopen('config.js' , 'w');
  
  fwrite( $file , tpl( $content , array( 'connection' => $connection , 'domain' => $domain ) ) );
  
  fclose( $file );
  
  unlink('install.php');
  
  header('Location: index.html');
  
} else {
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Scops Installation</title>
  <style>
    body, html {
      background: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    form {
      background: #fff;
      box-shadow: 0 0 3px #ccc;
      width: 600px;
      margin: 50px auto 20px;
      padding: 50px 20px;
    }
    form input {
      display: block;
      margin: 10px 0;
      border: 1px solid #2a80ba;
      padding: 10px;
      width: 50%;
    }
    .header {
      font-size: 25px;
      color: #2a80ba;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .button {
      width: 30%;
      background: #2a80ba;
      color: #fff;
      cursor: pointer;
    }
  </style>
</head>
</body>
<form action="install.php" method="POST">
  <div class="header">Installation</div>
  <input name="domain" type="text" placeholder="Domain">
  <input name="connection" type="text" placeholder="Connection">
  <input class="button" name="install" type="submit" value="Install now">
</form>
</body>
</html>
<?php
  
}

  function tpl($tpl = '', $vars=array()){
    $replace = array();
    $code = $tpl;
    $eached_code='';
    
    if( $vars ){
      foreach($vars as $k=>$v){
        $replace['{'.$k.'}'] = $v;
      }
      $code = str_replace(array_keys($replace),array_values($vars),$code);
    }
    
    return $code;
  }

?>