{{#comment}}
  <div class="comment" id="comm-{{id}}" data-id="{{id}}">
    <div onclick="linkFromNews( {{user.id}} , 0 )" class="comm-img" style="background:url('{{main_set.root}}/{{user.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
    <div class="comm-name" onclick="linkFromNews( {{user.id}} , 0 )"><a class="prevent-link not-prevented" href="../id{{user.id}}/wall">{{user.name}}</a></div>
    <div class="comm-time">{{time}}</div>
    <div class="comm-action like {{#me_liked}}active{{/me_liked}}" onclick="request( 37 , {{id}} )">
      <span class="icon"></span>
    </div>
    <div class="comm-action like-counter" {{^mobile}}onclick="showCommentsActions( 0 , {{id}} )"{{/mobile}}>
      <span class="counter">{{likes}}</span>
    </div>
    <div class="comm-action unlike {{#me_unliked}}active{{/me_unliked}}" onclick="request( 38 , {{id}} )">
      <span class="icon"></span>
    </div>
    <div class="comm-action unlike-counter" {{^mobile}}onclick="showCommentsActions( 1 , {{id}} )"{{/mobile}}>
      <span class="counter">{{unlikes}}</span>
    </div>
    <br>
    {{#removeable}}
      <div class="comm-action" onclick="request( 30 , {{id}} )">
        <span class="icon"></span>
        <span>{{langs.remove}}</span>
      </div>
    {{/removeable}}
    <div class="comm-content">{{text}}</div>
  </div>
{{/comment}}