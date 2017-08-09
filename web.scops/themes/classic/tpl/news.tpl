
  <div class="news-object" id="news-{{id}}" data-id="{{id}}">
    <div class="news-content material-object">
      
      <div class="post-shadow"></div>
      
      <div class="news-header">
      
        {{#author}}
          {{#me_admin}}
          <div class="remove" onclick="deletePost({{id}})"></div>
          <div class="remove" onclick="editPost({{id}} , true)"></div>
          {{/me_admin}}
        {{/author}}
        {{^author}}
          {{#me}}
          <div class="remove" onclick="deletePost({{id}})"></div>
          <div class="remove" onclick="editPost({{id}} , true)"></div>
          {{/me}}
        {{/author}}
        <a class="prevent-link not-prevented" onclick="ajaxQuery( {{#author}}'club'{{/author}}{{^author}}'user'{{/author}} , 'wall' , {{author_info.id}} , event )" href="../{{#author}}club{{/author}}{{^author}}id{{/author}}{{author_info.id}}/wall">
          <div class="author-img" style="background:url('{{main_set.root}}/{{author_info.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
        </a>
        <div class="header-right">
          <div class="author-name">
            <a class="prevent-link not-prevented" onclick="ajaxQuery( {{#author}}'club'{{/author}}{{^author}}'user'{{/author}} , 'wall' , {{author_info.id}} , event )"  href="../{{#author}}club{{/author}}{{^author}}id{{/author}}{{author_info.id}}/wall">
              <span class="dont-react">{{author_info.name}}</span>
            </a>
          </div>
          <div class="news-time">
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
      </div>
      
      <div class="news-body" onclick="openLedNews({{id}} , event)">
        {{#metetions}}
          <div class="met-box news-cont-object dont-react">
            <span class="met-header">{{langs.with}}:</span>
            {{#met_user}}
              <a class="prevent-link not-prevented" href="../id{{met_id}}/wall">
                <div onclick="ajaxQuery( 'user' , 'wall' , {{met_id}} , event )" class="metetion input-btn-object">
                  {{{met_name}}}
                </div>
              </a>
            {{/met_user}}
          </div>
        {{/metetions}}
        
        
        <div class="text news-cont-object" data-text="{{clean_text}}">{{{text}}}</div>
        {{^mobile}}
        <div class="edit-text news-cont-object dont-react hidden">
          <textarea class="input-textarea-object" rows="4"></textarea>
          <div class="input-btn-object btn" onclick="saveEditedPost({{id}} , true)">Save</div>
        </div>
        {{/mobile}}

        {{#img_big}}
          <img class="img news-cont-object img-elem dont-react" src="{{main_set.root}}/{{.}}" onclick="watchMedia( {{id}} , * , false , 1 , % )">
        {{/img_big}}
        
        {{#box}}
          <div class="img-box news-cont-object dont-react">
          {{#img_box}}
            <div class="img-box-container">
              <div class="img-box-elem img-elem" onclick="watchMedia( {{id}} , * ,false , 1 , % )" style="background:url('{{main_set.root}}/{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
            </div>
          {{/img_box}}
          </div>
        {{/box}}  

        {{#gif}}
          <div class="gif news-cont-object" style="background-image:url('{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: contain;"></div>
        {{/gif}}
        
        {{#audio}}
          <div class="audiolist news-cont-object dont-react" id="{{audio}}"></div>
        {{/audio}}
        
        {{#video_loc}}
          <div class="video-box news-cont-object dont-react" onclick="watchMedia( {{id}} , 0 ,false , 2 , 0 ) ">
            <div class="thumb" style="background-image:url('{{main_set.root}}/{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:contain;"></div>
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
        {{/video_loc}}
        
        {{#video_glob}}
          <div class="video-box news-cont-object" onclick="openNews({{id}})">
            <div class="thumb" style="background-image:url('{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:contain;"></div>
            <div class="video-body">
              <div class="title">{{title}}</div>
              <div class="host">{{provider_name}}</div>
            </div>
          </div>
        {{/video_glob}}
        
        {{#location}}
          <div class="location-box news-cont-object dont-react">
            <div class="view-location" id="view-location-{{id}}"></div>
          </div>
          <script type="text/javascript"> initMap( 'view-location-{{id}}' , '{{{latlng}}}' , true ) </script>
        {{/location}}
        
        {{#link}}
          <div class="link-box news-cont-object dont-react">
            <div class="title">
              <div class="link-favicon" style="background-image:url('{{favicon}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
              <span>{{title}}</span>
            </div>
            <div class="host"><a href="{{host}}" target="_blank">{{host}}</a></div>
          </div>
        {{/link}}
        
        {{#shared}}
          <div class="news-shared"></div>
        {{/shared}}
        
      </div>
      
      <div class="news-footer">
        {{^mobile}}
          <div class="actions">
            <div class="acts liked-users" onclick="showNewsActions( 3 , {{id}})" >
              {{#likes_people}}
                <div class="img" style="background-image:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">              </div>
              {{/likes_people}}
            </div>
            <div class="acts unliked-users" onclick="showNewsActions( 4 , {{id}})">
              {{#unlikes_people}}
                <div class="img" style="background-image:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">              </div>
              {{/unlikes_people}}
            </div>
          </div>
        {{/mobile}}
        <div class="btn like {{#liked}}check{{/liked}}" onclick="request( 3 , {{id}})" title="{{langs.dbl_like}}">
          <div class="icon item"></div>
          <div class="text item">{{likes}}</div>
        </div>
        <div class="btn unlike {{#unliked}}check{{/unliked}}" onclick="request( 4 , {{id}})" title="{{langs.dbl_unlike}}">
          <div class="icon item"></div> 
          <span class="text item">{{unlikes}}</span>
        </div>
        <div class="btn" onclick="openNews({{id}})">
          <div class="icon item"></div> 
          <div class="text item">{{langs.to_comment}}</div>
        </div>
        <div class="btn" onclick="openNews({{id}})">
          <div class="icon item"></div> 
          <div class="text item">{{views}}</div>
        </div>
        {{#shareable}}
          <div class="btn share" onclick="request(5 , {{id}})">
            <div class="icon item"></div> 
            <div class="text item">{{langs.to_share}}</div>
          </div>
        {{/shareable}}
      </div>
      
    </div>
  </div>