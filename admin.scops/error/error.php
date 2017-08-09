<!DOCTYPE html>
<html>
<head>
	<title>Admin Panel</title>
	<link rel="shortcut icon" type="image/png" href="../img/main/ico-2.png">
	<link rel="icon" type="image/png" href="../img/main/ico-2.png">
	<meta charset="utf-8">
	<link rel="stylesheet" href="../css/fonts.css" type="text/css">
	<link rel="stylesheet" href="../css/general.css" type="text/css">
	<link rel="stylesheet" href="../css/error.css" type="text/css">
</head>
<body>
	<div class="panel">
		<a href="../"><div class="logo"></div></a>
	</div>
	<div class="content material-object">
		<div class="header"><?php echo $_GET['error']; ?></div>
		<div class="alert-object-big title">
			The page wasn't found.
		<a href="../"><div class="input-btn-object btn">Home</div></a>
		</div>
	</div>
</body>