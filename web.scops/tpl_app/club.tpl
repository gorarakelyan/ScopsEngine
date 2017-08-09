{{#club}}
  <div id="user-profile" class="material-object">
    <div id="user-cover" {{^blocked_me}}{{#cover_exist}}onclick="viewCover({{cover_id}} , event)"{{/cover_exist}}{{/blocked_me}} style="{{^blocked_me}}{{#cover_exist}}cursor:pointer;{{/cover_exist}}{{/blocked_me}}background:url('{{main_set.root}}/{{cover}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;"></div>
    <div id="user-profile-options">
      <div class="user-option-object img" {{^blocked_me}}{{#img_exist}}onclick="openNews({{img_id}})"{{/img_exist}}{{/blocked_me}} data-url="{{img}}" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">
        {{#online}}<div class="online"></div>{{/online}}
      </div>
      <div class="user-option-object text name">{{name}}</div>
      <div class="user-option-object text">{{description}}</div>
    </div>
  </div>
    
  <div id="user-profile-requests">
    {{^me_admin}}
      {{^list_blocked}}
        {{#follow}}<div class="request-object round-icon" id="remove-follow" onclick="request(9,{{id}})"></div>{{/follow}}
        {{^follow}}
          {{^request}}<div class="request-object round-icon" id="add-follow" onclick="request(9,{{id}})"></div>{{/request}}
          {{#request}}<div class="request-object round-icon" id="add-request" onclick="request(9,{{id}})"></div>{{/request}}
        {{/follow}}
      {{/list_blocked}}
    {{/me_admin}}
    {{#me_admin}}
      <br>
    {{/me_admin}}
  </div>

  {{^blocked_me}}
  <div id="user-profile-controls" class="material-object">
    <div id="user-menu">
      <div class="menu-block" id="wall" onclick="changeUserContent( 'wall' , 'club' )">
        <div class="block-icon"></div>
        <div class="block-name">{{langs.wall}}</div>
        <div class="block-num">{{club_wall}}</div>
      </div>
      <div class="menu-block" id="photos" onclick="changeUserContent( 'photos', 'club' )">
        <div class="block-icon"></div>
        <div class="block-name">{{langs.photos}}</div>
        <div class="block-num">{{club_photos}}</div>
      </div>
      <div class="menu-block" id="followers" onclick="changeUserContent( 'followers', 'club' )">
        <div class="block-icon"></div>
        <div class="block-name">{{langs.followers}}</div>
        <div class="block-num">{{club_followers}}</div>
      </div>
      <div class="menu-block" id="videos" onclick="changeUserContent( 'videos', 'club' )">
        <div class="block-icon"></div>
        <div class="block-name">{{langs.video}}</div>
        <div class="block-num">{{club_videos}}</div>
      </div>
      <div class="menu-block" id="music" onclick="changeUserContent( 'music', 'club' )">
        <div class="block-icon"></div>
        <div class="block-name">{{langs.audio}}</div>
        <div class="block-num">{{club_music}}</div>
      </div>
      <div id="scroller"><div id="pointer"></div></div>
    </div>
  </div>
  {{/blocked_me}}
  {{#blocked_me}}
    <div class="alert-object-big">{{langs.privacy}}</div>
  {{/blocked_me}}
{{/club}}