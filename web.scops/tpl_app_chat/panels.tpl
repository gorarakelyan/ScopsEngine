{{#panel_user}}
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
  
  <div id="panel-page" onscroll="getNewNotifs()">
    <div class="panel-header">
      <div class="cell name"></div>
      <div class="cell close" onclick="closeNotif()">{{langs.close}}</div>
    </div>
    <div id="panel-content"></div>
  </div>
  <div id="windows-box"></div>
</div>
<div id="panels">

  <div class="top-panel">
    <div class="container">
      <div class="item sms" onclick="notification( 'msg' )">
        <div class="icon">
          <span></span>
          <div class="new"></div>
        </div>
      </div>
      <div class="item" onclick="notification( 'friends' )">
        <div class="icon"></div>
      </div>
      <div class="item" onclick="logOut()">
        <div class="icon"></div>
      </div>
      <form method="post" action="../" style="display:none;"><input type="submit" id="exit" name="log_out"></form>
    </div>
  </div>
  
  <div id="main-panel" style="display: none;">
    <div class="item" id="sms-icon">
      <div class="extra">0</div>
    </div>
    <div class="item" id="req-icon">
      <div class="extra">0</div>
    </div>
    <div class="item"id="notif-icon">
      <div class="extra">0</div>
    </div>
    <div class="item" id="visits-icon">
      <div class="extra">0</div>
    </div>
  </div>  
  
</div>
{{/panel_user}}