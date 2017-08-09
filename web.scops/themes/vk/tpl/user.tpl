{{#user}}
  <div id="user-profile">
    <input type="file" accept=".png, .jpg, .jpeg .jpg" id="upload-from-profile" style="display:none;">
    
    <div class="user-left">
    
      <div id="user-profile-options" class="material-object">
        <div id="user-profile-img" data-url="{{img}}" {{#img_exist}}onclick="openNews({{img_id}})"{{/img_exist}} style="{{#img_exist}}cursor:pointer;{{/img_exist}}background:url('../{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        {{#me}}<div class="upload input-btn-object" onclick="choosePhotoFrom(0,0)"><span></span>{{langs.thumb}}</div>{{/me}}
      </div>
      
      <div id="user-profile-requests" class="material-object">
        {{^me}}
          <div class="request-object" id="remove-block" onclick="request(0,{{id}})" style="display:{{^blocked}}none{{/blocked}};"></div>
          <div class="request-object" id="add-block" onclick="request(0,{{id}})" style="display:{{#blocked}}none{{/blocked}};"></div>
          {{^blocked_me}}
            <div class="request-object" id="remove-follow" style="display:{{^follow}}none{{/follow}};" onclick="request(1,{{id}})"></div>
            <div class="request-object" id="add-follow" style="display:{{#follow}}none{{/follow}};" onclick="request(1,{{id}})"></div>
          {{/blocked_me}}
          {{^list_blocked}}
            {{#friend}}<div class="request-object" id="remove-friend" onclick="request(2,{{id}})"></div>{{/friend}}
            {{^friend}}
              {{^request}}<div class="request-object" id="add-friend" onclick="request(2,{{id}})"></div>{{/request}}
              {{#request}}<div class="request-object" id="add-request" onclick="request(2,{{id}})"></div>{{/request}}
            {{/friend}}
          {{/list_blocked}}
        {{/me}}
        {{#me}}
          <div class="request-object" id="settings" onclick="ajaxQuery('settings')"></div>
        {{/me}}
        <div class="din-obj-adding"></div>
      </div>
  
      <div id="user-profile-info" style="display: block;">
      {{#user_info}}
        <div class="info-object material-object">
          <div class="header">{{langs.about}}</div>
          <div class="content">
            <div class="user-form">
              <div class="item">
                <div class="title">{{langs.link}}</div>
                <div class="info link"><a href="../id{{id}}/wall" target="_blank">{{user_link}}</a></div>
              </div>
              <div class="item">
                <div class="title">{{langs.rat}}</div>
                <div class="info">{{rating}}</div>
              </div>
              <div class="item">
                <div class="title">{{langs.last_visit}}</div>
                <div class="info">
                  {{#real_day}}{{.}} {{langs.day}}{{/real_day}}
                  {{^real_day}}
                    {{#real_hour}}{{.}} {{langs.hour}}{{/real_hour}}
                    {{^real_hour}}
                      {{#real_min}}{{.}} {{langs.min}}{{/real_min}}
                      {{^real_min}}{{langs.now}}{{/real_min}}
                    {{/real_hour}}
                  {{/real_day}}
                </div>
              </div>
              <div class="item">
                <div class="title">{{langs.guests}}</div>
                <div class="info">{{#vis_enabled}}{{langs.enabled}}{{/vis_enabled}}{{^vis_enabled}}{{langs.disabled}}{{/vis_enabled}}</div>
              </div>
              {{^me}}<div class="item">
                <div class="title">{{langs.mutual_friends}}</div>
                <div class="info link" onclick="viewUserFriends('mutual_friends' , {{id}})">{{mutual_friends}}</div>
              </div>{{/me}}
              <div class="item">
                <div class="title">{{langs.followers}}</div>
                <div class="info link" onclick="viewUserFriends('user_followers' , {{id}})">{{user_followers}}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="info-object material-object">
          <div class="header">{{langs.gifts}}</div>
          <div class="content no-bord">
            {{#gifts}}
              <div class="block">
                <div class="img" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 0% 0%;background-size: contain;"></div>
              </div>
            {{/gifts}}
            {{#more_gifts}}
              <div class="block">
                <div class="more {{#more_zero_gifts}}zero{{/more_zero_gifts}}">{{.}}</div>
              </div>
            {{/more_gifts}}
          </div>
        </div>
          
        <div class="info-object material-object">
          <div class="header">{{langs.friends}}</div>
            <div class="content act">
            {{#friends}}
              <div class="block" onclick="ajaxQuery('user' , 'wall' , {{id}})">
                <a class="prevent-link not-prevented" href="../id{{id}}/wall">
                  <div class="img" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;"></div>
                </a>
              </div>
            {{/friends}}
            {{#more_friends}}
              <div class="block">
                <div class="more {{#more_zero_friends}}zero{{/more_zero_friends}}">{{.}}</div>
              </div>
            {{/more_friends}}
          </div>
        </div>
        
        <div class="info-object material-object">
          <div class="header">{{langs.clubs}}</div>
          <div class="content act">
            {{#clubs}}
              <div class="block" onclick="ajaxQuery('club' , 'wall' , {{id}})">
                <a class="prevent-link not-prevented" href="../club{{id}}/wall">
                  <div class="img" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;"></div>
                </a>
              </div>
            {{/clubs}}
            {{#more_clubs}}
              <div class="block">
                <div class="more {{#more_zero_clubs}}zero{{/more_zero_clubs}}">{{.}}</div>
              </div>
            {{/more_clubs}}
          </div>
        </div>
        
        <div class="info-object">
          <div class="ads-section"></div>
        </div>
        <script type="text/javascript">fillDataTPL('../php_requests/get_content.php',{ 'content': 'ads', length: 1 }, 'fillJSON( \'#user-profile .ads-section\')');</script>
        
      </div>
      {{/user_info}}
    </div>
    
    <div class="user-right">
      <div class="material-object block-right">
        <div id="user-cover" {{^blocked_me}}{{#cover_exist}}onclick="viewCover({{cover_id}} , event)"{{/cover_exist}}{{/blocked_me}} style="{{^blocked_me}}{{#cover_exist}}cursor:pointer;{{/cover_exist}}{{/blocked_me}}background:url('../{{cover}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;">
          {{#me}}<div class="cover-upload" onclick="choosePhotoFrom(1,0)"></div>{{/me}}
        </div>
        <div class="user-name">{{#online}}<div class="online"></div>{{/online}}{{name}}{{#verified}}<span class="verified"></span>{{/verified}}</div>
    
        {{^blocked_me}}
          <div id="user-profile-controls">
            <div id="user-menu">
              <div class="menu-block" id="wall" onclick="changeContent( 'wall' , 'user' )">
                <div class="block-num">{{user_wall}}</div>
                <div class="block-name">{{langs.wall}}</div>
              </div>
              <div class="menu-block" id="photos" onclick="changeContent( 'photos', 'user' )">
                <div class="block-num">{{user_photos}}</div>
                <div class="block-name">{{langs.photos}}</div>
              </div>
              <div class="menu-block" id="friends" onclick="changeContent( 'friends', 'user' )">
                <div class="block-num">{{user_friends}}</div>
                <div class="block-name">{{langs.friends}}</div>
              </div>
              <div class="menu-block" id="clubs" onclick="changeContent( 'clubs', 'user' )">
                <div class="block-num">{{user_clubs}}</div>
                <div class="block-name">{{langs.clubs}}</div>
              </div>
              <div class="menu-block" id="videos" onclick="changeContent( 'videos', 'user' )">
                <div class="block-num">{{user_videos}}</div>
                <div class="block-name">{{langs.video}}</div>
              </div>
              <div class="menu-block" id="music" onclick="changeContent( 'music', 'user' )">
                <div class="block-num">{{user_music}}</div>
                <div class="block-name">{{langs.audio}}</div>
              </div>
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
{{/user}}