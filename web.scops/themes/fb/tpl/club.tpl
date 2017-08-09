{{#club}}
  <div id="user-profile" class="material-object">
    <input type="file" accept=".png, .jpg, .jpeg .jpg" id="upload-from-profile" style="display:none;">
    <div id="user-cover" {{^blocked_me}}{{#cover_exist}}onclick="viewCover({{cover_id}} , event)"{{/cover_exist}}{{/blocked_me}} style="{{^blocked_me}}{{#cover_exist}}cursor:pointer;{{/cover_exist}}{{/blocked_me}}background:url('../{{cover}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;">
      {{#me_admin}}<div class="cover-upload" onclick="choosePhotoFrom(1,1)"></div>{{/me_admin}}
    </div>
    <div id="user-profile-options">
      <div class="user-option-object img" id="img">
        <div id="user-profile-img" data-url="{{img}}" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">
          {{^blocked_me}}
            <div class="user-img-options {{#me_admin}}nemp{{/me_admin}} {{#img_exist}}nemp{{/img_exist}}">
              {{#me_admin}}<div class="upload" onclick="choosePhotoFrom(0,1)"></div>{{/me_admin}}
              {{#img_exist}}<div class="view" onclick="openNews({{img_id}})"></div>{{/img_exist}}
            </div>
          {{/blocked_me}}
        </div>
      </div>
      <div class="user-option-object text">{{name}}</div>
    </div>
    
    <div id="user-profile-requests">
      {{^me_admin}}
        {{^list_blocked}}
          {{#follow}}<div class="request-object" id="remove-follow" onclick="request(9,{{id}})"></div>{{/follow}}
          {{^follow}}
            {{^request}}<div class="request-object" id="add-follow" onclick="request(9,{{id}})"></div>{{/request}}
            {{#request}}<div class="request-object" id="add-request" onclick="request(9,{{id}})"></div>{{/request}}
          {{/follow}}
        {{/list_blocked}}
      {{/me_admin}}
      {{#me_admin}}
        <div class="request-object" id="settings" onclick="changeContent( 'settings', 'club' )"></div>
      {{/me_admin}}
      <div class="din-obj-adding"></div>
    </div>

  {{^blocked_me}}
    <div id="user-profile-controls">
      <div id="user-menu">
        <div class="menu-block" onclick="openForm( {{id}} , 1 )">
          <div class="block-num"></div>
          <div class="block-name">{{langs.about}}</div>
        </div>
        <div class="menu-block" id="wall" onmouseover="menuTransition( 'wall' )" onclick="changeContent( 'wall', 'club' )" onmouseout="endMenuTransition()">
          <div class="block-num">{{club_wall}}</div>
          <div class="block-name">{{langs.wall}}</div>
        </div>
        <div class="menu-block" id="photos" onmouseover="menuTransition( 'photos' )" onclick="changeContent( 'photos', 'club' )" onmouseout="endMenuTransition()">
          <div class="block-num">{{club_photos}}</div>
          <div class="block-name">{{langs.photos}}</div>
        </div>
        <div class="menu-block" id="followers" onmouseover="menuTransition( 'followers' )" onclick="changeContent( 'followers', 'club' )" onmouseout="endMenuTransition()">
          <div class="block-num">{{club_followers}}</div>
          <div class="block-name">{{langs.followers}}</div>
        </div>
        <div class="menu-block" id="videos" onmouseover="menuTransition( 'videos' )" onclick="changeContent( 'videos', 'club' )" onmouseout="endMenuTransition()">
          <div class="block-num">{{club_videos}}</div>
          <div class="block-name">{{langs.video}}</div>
        </div>
        <div class="menu-block" id="music" onmouseover="menuTransition( 'music' )" onclick="changeContent( 'music', 'club' )" onmouseout="endMenuTransition()">
          <div class="block-num">{{club_music}}</div>
          <div class="block-name">{{langs.audio}}</div>
        </div>
        {{#me_admin}}
        <div class="menu-block" id="settings" onmouseover="menuTransition( 'settings' )" onclick="changeContent( 'settings', 'club' )" onmouseout="endMenuTransition()">
          <div class="block-num"><span class="icon"></span></div>
          <div class="block-name">{{langs.settings}}</div>
        </div>
        {{/me_admin}}
        <div id="scroller"><div id="pointer"></div></div>
      </div>
    </div>
  </div>
  {{/blocked_me}}
  {{#blocked_me}}
    <div class="alert-object-big">{{langs.privacy}}</div>
  {{/blocked_me}}
{{/club}}

{{#form}}
  <div class="user-form">
    <div class="item">
      <div class="icon"></div>
      <div class="info">{{description}}</div>
    </div>
  </div>
{{/form}}