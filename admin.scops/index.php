<?php include_once 'login.php'; ?>

<!DOCTYPE html>
<html>
<head>
	<title>Admin Area</title>
	<link rel="shortcut icon" type="image/png" href="../img/main/ico-2.png">
	<link rel="icon" type="image/png" href="../img/main/ico-2.png">
	<link rel="stylesheet" href="css/fonts.css">
	<link rel="stylesheet" href="style.css">
	<script type="text/javascript" src="libs/Jquery/jquery.js"></script>
	<script type="text/javascript" src="libs/Form/form.js"></script>
	<script type="text/javascript" src="js/functions.js"></script>	
	<script type="text/javascript">
		
		if( getCookie('admin') ) window.location = '/users';
		
	</script>	
</head>
<body>

<div class="layer">
	<div class="content-block">
		<div class="login-box">
			<div class="logo"></div>
			<form method="post" id="login-form" action="index.php">
			<header class="item">Admin Area</header>
				<input type="text" placeholder="Admin Login.." name="login" class="item input" autocomplete="off">
				<input type="password" placeholder="Admin Password.." name="password" class="item input">
				<button id="login-btn" name="log_in" class="item submit-button">Login</button>
			</form>
		</div>
	</div>
</div>
	
</body>
</html>