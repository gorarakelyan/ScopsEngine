<!DOCTYPE html>
<html>
<head>
  <title>Admin Area</title>
  <link rel="shortcut icon" type="image/png" href="../img/main/ico-2.png">
  <link rel="icon" type="image/png" href="../img/main/ico-2.png">
  <meta charset="utf-8">
  <link rel="stylesheet" href="../css/fonts.css" type="text/css">
  <link rel="stylesheet" href="../css/general.css" type="text/css">
  <link rel="stylesheet" href="../css/panels.css" type="text/css">
  <link rel="stylesheet" href="../css/main.css" type="text/css">
  <link rel="stylesheet" href="../libs/Jquery UI/jquery-ui.css" type="text/css">
  <script type="text/javascript" src="../libs/Jquery/jquery.js"></script>
  <script type="text/javascript" src="../js/functions.js"></script>
  <script type="text/javascript" src="../libs/Jquery UI/jquery-ui.js"></script>
  <script type="text/javascript" src="../libs/Mustache/mustache.js"></script>
  <script type="text/javascript" src="../libs/Form/form.js"></script>
  <script type="text/javascript" src="../js/core.js"></script>
  <script type="text/javascript" src="../js/general.js"></script>
  <script type="text/javascript" src="../js/common.js"></script>
</head>
<body>

<nav id="main">
  <div id="pages">
    <div id="pop-up-box">
      <div class="content"></div>
    </div>
    <div id="win-page" class="window-object">
      <div class="shadow-object"></div>
      <div id="win-table-imit">
        <div id="win-centering">
          <div id="win-content"></div>
        </div>
      </div>
    </div>
    <div id="windows-box"></div>
  </div>
  <div id="panels">
    <div id="main-panel">
      <a href="<?php echo _root_;?>" target="_blank"><div class="logo item"></div></a>
      <div class="exit item" onclick="exit()"></div>
      <form method="post" action="../" style="display:none;"><input type="submit" id="exit" name="log_out"></form>
    </div>
  </div>
</nav>

<div id="main-ajax-place">
  <div id="content-positioning">
    <div class="container">
      <div class="left-panel material-object">
        <div class="menu">
          <div class="item users" onclick="ajaxQuery('users')">
            <div class="icon"></div>
            <div class="title">Manage users</div>
          </div>
          <div class="item clubs" onclick="ajaxQuery('clubs')">
            <div class="icon"></div>
            <div class="title">Manage clubs</div>
          </div>
          <div class="item ads" onclick="ajaxQuery('ads')">
            <div class="icon"></div>
            <div class="title">Manage ads</div>
          </div>
          <div class="item announcements" onclick="ajaxQuery('announcements')">
            <div class="icon"></div>
            <div class="title">Announcements</div>
          </div>
          <div class="item statistics" onclick="ajaxQuery('statistics')">
            <div class="icon"></div>
            <div class="title">Statistics</div>
          </div>
          <div class="item games" onclick="ajaxQuery('games')">
            <div class="icon"></div>
            <div class="title">Games</div>
          </div>
          <div class="item stickers" onclick="ajaxQuery('stickers')">
            <div class="icon"></div>
            <div class="title">Stickers</div>
          </div>
          <div class="item gifts" onclick="ajaxQuery('gifts')">
            <div class="icon"></div>
            <div class="title">Gifts</div>
          </div>
          <div class="item langs" onclick="ajaxQuery('langs')">
            <div class="icon"></div>
            <div class="title">Langs</div>
          </div>
          <div class="item settings" onclick="ajaxQuery('settings')">
            <div class="icon"></div>
            <div class="title">Settings</div>
          </div>
          <div class="item themes" onclick="ajaxQuery('themes')">
            <div class="icon"></div>
            <div class="title">Themes</div>
          </div>
          <div class="item admin" onclick="ajaxQuery('admin')">
            <div class="icon"></div>
            <div class="title">Admin</div>
          </div>
        </div>
      </div>
      
      <div class="main-content"></div>
    </div>
  </div>
</div>
