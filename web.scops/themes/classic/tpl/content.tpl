{{#friend}}
  {{^list_blocked}}
  <div class="friend-object" id="frid-{{id}}" onclick="ajaxQuery('user','wall',{{id}} , event)" data-id="{{id}}">
    <a class="prevent-link not-prevented" href="../id{{id}}/wall">
      <div class="friend-cover" style="background:url('../{{cover}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
      <div class="friend-img" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
      <div class="friend-name">{{name}}</div>
      <div class="friend-age">{{age}} {{langs.year}}{{#online}} | {{langs.online}}{{/online}}</div>
      <div class="friend-city">{{city}}</div>
    </a>
  </div>
  {{/list_blocked}}
  {{#list_blocked}}
  <div class="friend-object block" id="frid-{{id}}" data-id="{{id}}">
    <div class="content">
      <div class="alert-object-small">{{langs.privacy}}</div>
    </div>
  </div>
  {{/list_blocked}}
{{/friend}}

{{#club}}
  {{^list_blocked}}
  <div class="club-object" onclick="ajaxQuery('club','wall',{{id}} , event)" data-id="{{id}}">
    <a class="prevent-link not-prevented" href="../club{{id}}/wall">
      <div class="club-cover" style="background:url('../{{cover}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
      <div class="club-img" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
      <div class="club-name">{{name}}</div>
    </a>
  </div>
  {{/list_blocked}}
  {{#list_blocked}}
  <div class="club-object block" data-id="{{id}}">
    <div class="content">
      <div class="alert-object-small">{{langs.privacy}}</div>
    </div>
  </div>
  {{/list_blocked}}
{{/club}}

{{#ads}}
<a href="{{url}}" target="_blank" onclick="request( 39 , {{id}} )">
  <div class="ads-object">
    {{#img}}<div class="thumb" style="background-image:url('../{{.}}')"></div>{{/img}}
    <div class="info">
      <div class="title">{{title}}</div>
      <div class="description">{{description}}</div>
    </div>
  </div>
</a>
{{/ads}}

{{#photo}}
    {{^line_exist}}
      <div class="photo-block">
        <div class="photo-thumb-big photo-column" onclick="openNews({{big_thumb.id}})" id="img-{{big_thumb.id}}">
          <div class="post-shadow"></div>
          <div class="photo-content" style="background:url('../{{big_thumb.img_medium}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        </div>
        <div class="photo-thumb-box photo-column">
          {{#thumb_box}}
            <div class="photo-thumb-small" onclick="openNews({{#.}}{{id}}{{/.}})" id="img-{{#.}}{{id}}{{/.}}">
              <div class="post-shadow"></div>
              <div class="photo-content" style="background:url('../{{#.}}{{img_medium}}{{/.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
            </div>
          {{/thumb_box}}
        </div>
      </div>
    {{/line_exist}}
    
    {{#line_exist}}
      <div class="line-thumbs-box">
      {{#last_thumbs}}
        <div class="line-thumb" onclick="openNews( {{#.}}{{id}}{{/.}} )" id="img-{{#.}}{{id}}{{/.}}">
          <div class="post-shadow"></div>
          <div class="photo-content" style="background:url('../{{#.}}{{img_medium}}{{/.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        </div>
      {{/last_thumbs}}
      </div>
    {{/line_exist}}
{{/photo}}

{{#video}}
  <div class="video-object" id="vid-{{id}}" data-id="{{id}}" data-video="{{video_id}}">
    <div class="post-shadow"></div>
    {{#video_admin}}<div class="option" onclick="deletePost({{id}})"><span></span>{{langs.remove}}</div>{{/video_admin}}
    <div class="option views"><span></span>{{views}}</div>
    <div class="thumb"  onclick="watchMedia( {{id}} , 0 , false , 2 , 0 )" style="background-image:url('../{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:contain;"></div>
    <div class="video-body">
      <div class="title">
        {{#description}}
          {{.}}
        {{/description}}
        {{^description}}
          {{name}}
        {{/description}}
      </div>
      <div class="host">{{main_set.name}}</div>
    </div>
  </div>
{{/video}}

{{#top}}
  <div class="top-user">
    <div class="top-user-index item">{{index}}</div>
    <a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{id}} , event )" href="../id{{id}}/wall" >
      <div class="top-user-img item" style="background:url('../{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
    </a>
    <div class="top-user-name item">
      <span class="link-object">
        <a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{id}} , event )" href="../id{{id}}/wall" >
          {{name}}
        </a>
      </span> 
      <span class="top-user-rating">{{langs.rat}}: {{rating}}</span>
    </div>
  </div>
{{/top}}

{{#game}}
  <div class="game-object" data-id="{{id}}">
    <a class="prevent-link not-prevented" href="../game{{id}}">
      <div class="game-view  material-object" onclick="ajaxQuery( 'game' , 0 , {{id}} , false , event )">
        <div class="thumb" style="background:url('../{{cover}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        <div class="round-icon icon"></div>
        <div class="name">{{name}}</div>
        <div class="about">{{about}}</div>
      </div>
    </a>
  </div>
{{/game}}

{{#inline_game}}
  <div class="inline-game-object">
    <a class="prevent-link not-prevented" href="../game{{id}}">
      <div class="game-view" onclick="ajaxQuery( 'game' , 0 , {{id}} , false , event )">
        <div class="thumb" style="background:url('../{{cover}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        <div class="name input-btn-object">{{name}}</div>
      </div>
    </a>
  </div>
{{/inline_game}}

{{#event}}
  <div class="event-object material-object ev-{{id}}" data-id="{{id}}">
    <div class="thumb" style="background:url('../{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
    <div class="body">
      <div class="author">
        <a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{author.id}} , event )" href="../id{{author.id}}/wall" >
          <div class="img" style="background:url('../{{author.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
          <div class="name">{{author.name}}</div>
        </a>
      </div>
      {{#full_title}}
      <div class="info">
        <span class="icon"></span>
        <span class="text">{{.}}</span>
      </div>
      {{/full_title}}
      {{#about}}
      <div class="info">
        <span class="icon"></span>
        <span class="text">{{.}}</span>
      </div>
      {{/about}}
      {{#place}}
      <div class="info">
        <span class="icon"></span>
        <span class="text">{{.}}</span>
      </div>
      {{/place}}
      {{#start}}
      <div class="info">
        <span class="icon"></span>
        <span class="text">{{.}}</span>
      </div>
      {{/start}}
      <div class="options">
        {{#me_creator}}
          <div class="input-btn-object btn" onclick="eventInvite( {{id}} )">{{langs.invite_fr}}</div
          ><div class="simple-btn-object btn" onclick="request( 22 , {{id}} )">{{langs.remove}}</div>
        {{/me_creator}}
        {{^me_creator}}
          {{#access}}
            <div class="input-btn-object btn" onclick="eventInvite( {{id}} )">{{langs.invite_fr}}</div>
            {{#me_inv}}<div class="input-btn-object btn" onclick="request( 24 , {{id}} )">{{langs.accept_inv}}</div>{{/me_inv}}
            {{#me_inv}}<div class="simple-btn-object btn" onclick="request( 25 , {{id}} )">{{langs.remove_inv}}</div>{{/me_inv}}
            {{^me_inv}}{{^me_go}}<div class="input-btn-object btn" onclick="request( 24 , {{id}} )">{{langs.will_go}}</div>{{/me_go}}{{/me_inv}}
            {{^me_inv}}{{#me_go}}<div class="simple-btn-object btn" onclick="request( 25 , {{id}} )">{{langs.wont_go}}</div>{{/me_go}}{{/me_inv}}
          {{/access}}
        {{/me_creator}}
      </div>
    </div>
  </div>
{{/event}}