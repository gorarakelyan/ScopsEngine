{{#friend}}
  {{^list_blocked}}
  <div class="friend-object material-object" id="frid-{{id}}" onclick="openChatFromPanel( {{id}} )" data-id="{{id}}">
    <div class="table">
      <div class="col" ><div class="friend-img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div></div>
      <div class="col about">
        <div class="name">{{name}}</div>
        <div class="age">{{age}} {{langs.year}}{{#online}} | {{langs.online}}{{/online}}</div>
        <div class="city">{{city}}</div>
      </div>
    </div>
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