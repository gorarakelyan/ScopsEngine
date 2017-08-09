<?php include_once dirname(__FILE__).'/../php_main/lock.php'; ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title><?php echo $global['name'];?></title>
  <link rel="shortcut icon" type="image/png" href="../img/main/ico-2.png">
  <link rel="icon" type="image/png" href="../img/main/ico-2.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
  <meta charset="utf-8">
  <link rel="stylesheet" href="../css/fonts.css" type="text/css">
  <link rel="stylesheet" href="../css/general.css" type="text/css">
  <link rel="stylesheet" href="../css/error.css" type="text/css">
  <script type="text/javascript">
    var _root_ = '<?php echo _root_;?>';
  </script>
  <script type="text/javascript" src="<?php echo _root_;?>/libs/Jquery/jquery.js"></script>
  <script type="text/javascript" src="../js/functions.js"></script>
  <script type="text/javascript" src="../js/langs.js"></script>
</head>
<body>
  <div class="panel">
    <a href="../"><div class="logo"></div></a>
  </div>
  <div class="content material-object">
    <div class="header"><?php echo $_GET['error']; ?></div>
    <div class="alert-object-big title"></div>
    <a href="../"><div class="input-btn-object btn"></div></a>
    </div>
  </div>
  
  <script type="text/javascript">
  fill();
  function fill() {
    if( typeof( langs.home ) == 'undefined' ) setTimeout( 'fill()' , 100 );
    else {
      $('.content .alert-object-big').text( langs.error_404 );
      $('.content .input-btn-object.btn').text( langs.home );
    }
  }
  </script>
</body>