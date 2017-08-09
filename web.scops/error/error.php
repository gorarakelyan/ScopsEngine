<?php include_once dirname(__FILE__).'/../php_main/lock.php';
      include_once dirname(__FILE__).'/../php_main/connect_user.php'; ?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $global['name'];?></title>
	<link rel="shortcut icon" type="image/png" href="../img/main/ico-2.png">
	<link rel="icon" type="image/png" href="../img/main/ico-2.png">
	<meta charset="utf-8">
	<link rel="stylesheet" href="../themes/<?php echo _theme_;?>/css/fonts.css" type="text/css">
	<link rel="stylesheet" href="../themes/<?php echo _theme_;?>/css/general.css" type="text/css">
	<link rel="stylesheet" href="../themes/<?php echo _theme_;?>/css/error.css" type="text/css">
</head>
<body>
	<div class="panel">
		<a href="../"><div class="logo"></div></a>
	</div>
	<div class="content material-object">
		<div class="header"><?php echo $_GET['error']; ?></div>
		<div class="alert-object-big title">
			<?php

				include_once dirname(__FILE__).'/../php_main/functions.php';
				
				if( isset( $_COOKIE['link'] ) ) {
					
					$user_link = $_COOKIE['link'];
					$user_res = mysqli_query($dbConnect , "SELECT * FROM network WHERE link='$user_link'");
					$user_row = mysqli_fetch_array( $user_res , MYSQLI_ASSOC );
					$my_id = $user_row['id'];
					
					include_once dirname(__FILE__).'/../langs/'. $_COOKIE['langs'] .'.php';
					
				} else include_once dirname(__FILE__).'/../langs/en.php';
				
				echo $langs['error_404'];
				
			?>
		<a href="../"><div class="input-btn-object btn"><?php echo $langs['home']; ?></div></a>
		</div>
	</div>
</body>