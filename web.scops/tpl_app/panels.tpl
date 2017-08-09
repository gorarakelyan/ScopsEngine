{{#panel_user}}
<div id="pages">

  <div id="audioplayer">
    <div class="content">
      <div class="header">
        <div class="box">
          <div class="panel-header">
            <div class="cell">
              <input type="text" class="input input-text-object" placeholder="{{langs.search}}.." onkeyup="searchAudio( event )">
            </div>
            <div class="cell close" onclick="closePlayer()">{{langs.close}}</div>
          </div>
          <div class="player"></div>
        </div>
      </div>      
      <div class="playlist">
        <header></header>
        <div class="list">
          <div class="empty alert-object-small material-object">{{langs.a_player_empty}}</div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="pop-up-box">
    <div class="content"></div>
  </div>
  <div id="pop-page" class="window-object">
    <div class="shadow-object" onclick="closeNews()"></div>
    <div id="page-content"></div>
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
      <div class="item menu" onclick="openMenu()">
        <div class="icon"></div>
      </div>
      <div class="item logo" onclick="ajaxQuery( 'user', 'wall' , {{id}} )">
        <div class="logo"></div>
      </div>
      <div class="item name" onclick="ajaxQuery( 'user' , 'wall' , {{id}} )">
        <div class="name">{{main_set.name}}</div>
      </div>
    </div>
  </div>
  
  <div id="main-panel" class="material-object">
    <div class="box">
      <div class="item search">
          <input class="find" placeholder="{{langs.search}}.." onkeydown="goToSearch( event )">
      </div>
      <a class="prevent-link not-prevented" onclick="closeMenu();ajaxQuery( 'user' , 'wall' , {{id}} )" href="../id{{id}}">
        <div class="item account">
          <div class="cell">
            <div class="icon">
              <div class="img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;""></div>
            </div>
            <div class="title">{{name}}</div>
          </div>
        </div>
      </a>
      <div class="item" onclick="closeMenu();ajaxQuery('news')">        
        <div class="cell">
          <div class="icon"></div>
          <div class="title">{{langs.news}}</div>
        </div>
      </div>
      <div class="item" onclick="closeMenu();openPlayer()">
        <div class="cell">
            <div class="icon"></div>
            <div class="title">{{langs.audioplayer}}</div>
          </div>
      </div>
      <div class="item" onclick="closeMenu();notification( 'msg' )" id="sms-icon">
        <div class="cell">
          <div class="icon"></div>
          <div class="title">{{langs.messages}}</div>
          <div class="extra">0</div>
        </div>
      </div>
      <div class="item" onclick="closeMenu();notification( 'notif' )" id="notif-icon">
        <div class="cell">
          <div class="icon"></div>
          <div class="title">{{langs.notifications}}</div>
          <div class="extra">0</div>
        </div>
      </div>
      <div class="item" onclick="closeMenu();notification( 'requests' )" id="req-icon">
        <div class="cell">
          <div class="icon"></div>
          <div class="title">{{langs.requests}}</div>
          <div class="extra">0</div>
        </div>
      </div>
      <div class="item" onclick="closeMenu();notification( 'visits' )" id="visits-icon">
        <div class="cell">
          <div class="icon"></div>
          <div class="title">{{langs.visitors}}</div>
          <div class="extra">0</div>
        </div>
      </div>
      <div class="item">
        <a class="prevent-link not-prevented" onclick="closeMenu();ajaxQuery( 'user' , 'friends' , {{id}} )" href="../id{{id}}/friends">
          <div class="cell">
            <div class="icon"></div>
            <div class="title">{{langs.my_friends}}</div>
          </div>
        </a>
      </div>
      <div class="item">
        <a class="prevent-link not-prevented" onclick="closeMenu();ajaxQuery( 'user' , 'photos' , {{id}} )" href="../id{{id}}/photos">
          <div class="cell">
            <div class="icon"></div>
            <div class="title">{{langs.my_photos}}</div>
          </div>
        </a>
      </div>
      <div class="item">
        <a class="prevent-link not-prevented" onclick="closeMenu();ajaxQuery( 'user' , 'clubs' , {{id}} )" href="../id{{id}}/clubs">
          <div class="cell">
            <div class="icon"></div>
            <div class="title">{{langs.my_clubs}}</div>
          </div>
        </a>
      </div>
      <div class="item">
        <a class="prevent-link not-prevented" onclick="closeMenu();ajaxQuery( 'settings' )" href="../settings">
          <div class="cell">
            <div class="icon"></div>
            <div class="title">{{langs.settings}}</div>
          </div>
        </a>
      </div>
      <div class="item" onclick="logOut()">
        <div class="cell">
          <div class="icon"></div>
          <div class="title">{{langs.exit}}</div>
        </div>
      </div>
      
      <form method="post" action="../" style="display:none;"><input type="submit" id="exit" name="log_out"></form>
    </div>
    
    <div class="footer">
      <div class="name">{{main_set.name}} &copy; {{date}}</div>
      {{#lang}}
        <div class="lang" onclick="changeLang( '{{name}}' )">{{title}}</div>
      {{/lang}}
      </div>
    </div>
  </div>
</div>
{{/panel_user}}