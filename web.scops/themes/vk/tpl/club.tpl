{{#club}}
  <div id="user-profile">
    <input type="file" accept=".png, .jpg, .jpeg .jpg" id="upload-from-profile" style="display:none;">
    
    <div class="user-left">
    
      <div id="user-profile-options" class="material-object">
        <div id="user-profile-img" data-url="{{img}}" {{#img_exist}}onclick="openNews({{img_id}})"{{/img_exist}} style="{{#img_exist}}cursor:pointer;{{/img_exist}}background:url('../{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        {{#me_admin}}<div class="input-btn-object upload" onclick="choosePhotoFrom(0,1)"><span></span>{{langs.thumb}}</div>{{/me_admin}}
      </div>
      
      <div id="user-profile-requests" class="material-object">
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
      
      <div id="user-profile-info">
        <div class="info-object material-object">
          <div class="header">{{langs.about}}</div>
          <div class="content">
            <div class="user-form">
              <div class="item">
                <div class="title">{{langs.link}}</div>
                <div class="info link"><a href="../club{{id}}/wall" target="_blank">{{main_set.root}}/club{{id}}</a></div>
              </div>
              <div class="item desc">
                <div class="title">{{langs.about}}</div>
                <div class="info">{{description}}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="user-right">
      <div class="material-object block-right">
      <div id="user-cover" {{^blocked_me}}{{#cover_exist}}onclick="viewCover({{cover_id}} , event)"{{/cover_exist}}{{/blocked_me}} style="{{^blocked_me}}{{#cover_exist}}cursor:pointer;{{/cover_exist}}{{/blocked_me}}background:url('../{{cover}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;">
        {{#me_admin}}<div class="cover-upload" onclick="choosePhotoFrom(1,1)"></div>{{/me_admin}}
      </div>
      <div class="user-name">{{name}}</div>
    
      {{^blocked_me}}
      <div id="user-profile-controls">
        <div id="user-menu">
          <div class="menu-block" id="wall" onclick="changeContent( 'wall', 'club' )">
            <div class="block-num">{{club_wall}}</div>
            <div class="block-name">{{langs.wall}}</div>
          </div>
          <div class="menu-block" id="photos" onclick="changeContent( 'photos', 'club' )">
            <div class="block-num">{{club_photos}}</div>
            <div class="block-name">{{langs.photos}}</div>
          </div>
          <div class="menu-block" id="followers" onclick="changeContent( 'followers', 'club' )">
            <div class="block-num">{{club_followers}}</div>
            <div class="block-name">{{langs.followers}}</div>
          </div>
          <div class="menu-block" id="videos" onclick="changeContent( 'videos', 'club' )">
            <div class="block-num">{{club_videos}}</div>
            <div class="block-name">{{langs.video}}</div>
          </div>
          <div class="menu-block" id="music" onclick="changeContent( 'music', 'club' )">
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
      {{/blocked_me}}
    </div>
    
    {{^blocked_me}}
    <div id="user-content">
      <div id="content-set"></div>
      <div id="content-show"></div>
    </div>
    {{/blocked_me}}
  </div>
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