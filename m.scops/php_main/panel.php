<?php include_once 'lock.php';?>

<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title><?php echo $global['name'];?></title>
	
	<link rel="shortcut icon" type="image/png" href="../img/main/ico-2.png">
	<link rel="icon" type="image/png" href="../img/main/ico-2.png">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
	<meta charset="utf-8">
	
	<script type="text/javascript"> var _root_ = '<?php echo _root_;?>'; </script>
	<script type="text/javascript" src="<?php echo _root_;?>/libs/Jquery/jquery.js"></script>
	<script type="text/javascript" src="<?php echo _root_;?>/js/functions.js"></script>
	<script type="text/javascript" src="../js/langs.js"></script>
	
	<link rel="stylesheet" href="../css/fonts.css" type="text/css">
	<link rel="stylesheet" href="../css/general.css" type="text/css">
	<link rel="stylesheet" href="../css/main.css" type="text/css">
	<link rel="stylesheet" href="../css/news.css" type="text/css">
	<link rel="stylesheet" href="../css/screen.css" type="text/css">
	
	<script type="text/javascript" src="<?php echo _root_;?>/libs/Jquery Mobile/jquery.mobile.custom.js"></script>
	<script type="text/javascript" src="<?php echo _root_;?>/libs/Mustache/mustache.js"></script>
	<script type="text/javascript" src="<?php echo _root_;?>/libs/Form/form.js"></script>
	
	<script type="text/javascript" src="../js/core.js"></script>
	<script type="text/javascript" src="../js/general.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/screen.js"></script>
	<script type="text/javascript" src="../js/news.js"></script>
	<script type="text/javascript" src="../js/chat.js"></script>
	<script type="text/javascript" src="../js/audioPlayer.js"></script>
	<script type="text/javascript" src="../js/videoPlayer.js"></script>
	<script type="text/javascript" src="../js/postForm.js"></script>
	<script type="text/javascript" src="<?php echo _root_;?>/js/geolocation.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyARocg9jlP3LK6pOjeBZtCra8A69D7zTng&callback=initMap"></script>
</head>
<body>

<nav id="main"></nav>
<nav id="chat-window-box"></nav>

<div id="main-ajax-place">
	<div id="content-positioning">
		<div class="main-content"></div>
	</div>
</div>

<script type="text/javascript">
	fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'panel' },'fillJSON(\'nav#main\')');
</script>