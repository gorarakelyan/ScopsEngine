{{#media}}
  {{^empty}}
    {{#photo}}
      <div class="content media-view photo">
        <div class="header">
          <div class="options">
            <div class="count">{{count}}</div>
            <div class="close"></div>
          </div>
          <div class="body">
            {{^one}}<div class="prev item"></div>{{/one}}
            <div class="img item"></div>
            {{^one}}<div class="next item"></div>{{/one}}
          </div>
        </div>
        <div class="footer">
          <div class="author">
            <div class="auth-img" style="background:url('{{main_set.root}}/{{author.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
            <div class="auth-name">{{author.name}}</div>
          </div>
          <div class="info">
            <div class="title">{{langs.photo_from}}:</div>
            <div class="about"><span class="open-post" data-id="{{id}}">{{langs.post}} #{{id}}</span></div>
          </div>
          <div class="info">
            <div class="title">{{langs.im_count}}</div>
            <div class="about">{{count}}</div>
          </div>
          <div class="info">
            <div class="title">{{langs.curr_photo}}</div>
            <div class="about current"></div>
          </div>
          <div class="info">
            <div class="title">{{langs.curr_link}}</div>
            <div class="about current-link"></div>
          </div>
          <div class="info">
            <div class="title">{{langs.im_host}}</div>
            <div class="about">{{main_set.name}}</div>
          </div>
        </div>
      </div>
    {{/photo}}
    {{#video}}
      <div class="content media-view video">
        <div class="header">
          <div class="options">
            <div class="name">{{#description}}{{.}}{{/description}}{{^description}}{{name}}{{/description}}</div>
            <div class="close"></div>
          </div>
          <div class="body">
            <div class="video item">
              <div class="video-container"></div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="author">
            <div class="auth-img" style="background:url('{{main_set.root}}/{{author.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
            <div class="auth-name">{{author.name}}</div>
          </div>
          <div class="info">
            <div class="title">{{langs.vid_name}}</div>
            <div class="about">{{#description}}{{.}}{{/description}}{{^description}}{{name}}{{/description}}</div>
          </div>
          <div class="info">
            <div class="title">{{langs.views}}</div>
            <div class="about">{{views}}</div>
          </div>
          <div class="info">
            <div class="title">{{langs.vid_length}}</div>
            <div class="about">{{length}} {{langs.sec}}</div>
          </div>
          <div class="info">
            <div class="title">{{langs.vid_from}}</div>
            <div class="about"><span class="open-post" data-id="{{id}}">{{langs.post}} #{{id}}</span></div>
          </div>
          <div class="info">
            <div class="title">{{langs.vid_host}}</div>
            <div class="about">{{main_set.name}}</div>
          </div>
        </div>
      </div>
    {{/video}}
  {{/empty}}
  {{#empty}}
    <div class="alert-object-small">{{langs.privacy}}</div>
  {{/empty}}
{{/media}}