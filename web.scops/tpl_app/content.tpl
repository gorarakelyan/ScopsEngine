{{#friend}}
  {{^list_blocked}}
  <div class="friend-object material-object" id="frid-{{id}}" onclick="ajaxQuery('user','wall',{{id}} , event)" data-id="{{id}}">
    <a class="prevent-link not-prevented" href="../id{{id}}/wall">
      <div class="table">
        <div class="col friend-img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        <div class="col about">
          <div class="name">{{name}}</div>
          <div class="age">{{age}} {{langs.year}}{{#online}} | {{langs.online}}{{/online}}</div>
          <div class="city">{{city}}</div>
        </div>
      </div>
    </a>
  </div>
  {{/list_blocked}}
  {{#list_blocked}}
  <div class="friend-object block material-object" >
    <div class="content">
      <div class="alert-object-small">{{langs.privacy}}</div>
    </div>
  </div>
  {{/list_blocked}}
{{/friend}}

{{#club}}
  {{^list_blocked}}
  <div class="club-object material-object" onclick="ajaxQuery('club','wall',{{id}} , event)" data-id="{{id}}">
    <a class="prevent-link not-prevented" href="../club{{id}}/wall">
      <div class="table">
        <div class="col club-img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        <div class="col about">
          <div class="name">{{name}}</div>
          <div class="desc">{{description}}</div>
        </div>
      </div>
    </a>
  </div>
  {{/list_blocked}}
  {{#list_blocked}}
  <div class="club-object block material-object" >
    <div class="content">
      <div class="alert-object-small">{{langs.privacy}}</div>
    </div>
  </div>
  {{/list_blocked}}
{{/club}}

{{#photo}}
  <div class="photo-object" id="img-{{id}}">
    <div class="post-shadow"></div>
    <div class="img" onclick="openNews({{id}})" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
  </div>
{{/photo}}

{{#video}}
  <div class="video-object" id="vid-{{id}}" data-id="{{id}}" data-video="{{video_id}}">
    <div class="post-shadow"></div>
    {{#video_admin}}<div class="option" onclick="deletePost({{id}})"><span></span>{{langs.remove}}</div>{{/video_admin}}
    <div class="thumb"  onclick="watchMedia( {{id}} , 0 , false , 2 , 0 )" style="background-image:url('{{main_set.root}}/{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:contain;"></div>
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
