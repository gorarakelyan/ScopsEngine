
<div class="news-panel" data-id="{{id}}">
  
  <div onclick="closeNews()" class="icon" id="close"></div>
  
  {{#prev}}<div onclick="openNews({{.}})" class="icon" id="prev"></div>{{/prev}}
  {{#next}}<div onclick="openNews({{.}})" class="icon" id="next"></div>{{/next}}
  
  {{#author}}
    {{#me_admin}}
    <div onclick="deletePost({{id}})" class="icon" id="trash"></div>
    <div onclick="editPost({{id}} , false )" class="icon"></div>
    {{/me_admin}}
  {{/author}}
  {{^author}}
    {{#me}}
    <div onclick="deletePost({{id}})" class="icon" id="trash"></div>
    <div onclick="editPost({{id}} , false)" class="icon"></div>
    {{/me}}
  {{/author}}
  
</div>
<table>
  <tr>
  <td id="left-block" class="page-block">
    <div>
      <div class="news-object view-news material-object">
        <div class="news-content">
        
          <div class="news-header">
              
            <div onclick="linkFromNews({{author_info.id}} , {{author}})" class="author-img" style="background:url('../{{author_info.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
              
            <div class="header-right">
              <div class="author-name">
                <a target="_blank" href="../{{#author}}club{{/author}}{{^author}}id{{/author}}{{author_info.id}}/wall">{{author_info.name}}</a>
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
          
          <div class="news-body">
          
            {{#metetions}}
              <div class="met-box news-cont-object dont-react">
                <span class="met-header">{{langs.with}}:</span>
                {{#met_user}}
                  <div onclick="linkFromNews( {{met_id}} , 0 )" class="metetion input-btn-object">
                    <a class="prevent-link not-prevented" href="../id{{met_id}}/wall">{{{met_name}}}</a>
                  </div>
                {{/met_user}}
              </div>
            {{/metetions}}
                        
            <div class="text news-cont-object" data-text="{{clean_text}}">{{{text}}}</div>
            <div class="edit-text news-cont-object dont-react hidden">
              <textarea class="input-textarea-object" rows="5"></textarea>
              <div class="input-btn-object btn" onclick="saveEditedPost({{id}} , false)">Save</div>
            </div>
            
            {{#img_big}}
              <img class="img news-cont-object img-elem" src="../{{.}}" onclick="watchMedia( {{id}} , * , true , 1 , % )">
            {{/img_big}}
              
            {{#box}}
              <div class="img-box news-cont-object">
              {{#img_box}}
                <div class="img-box-container">
                  <div class="img-box-elem img-elem" onclick="watchMedia( {{id}} , * , true , 1 , % )" style="background:url('../{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
                </div>
              {{/img_box}}
              </div>
            {{/box}}      

            {{#gif}}
              <div class="gif news-cont-object" style="background-image:url('{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: contain;"></div>
            {{/gif}}            
            
            {{#audio}}
              <div class="audiolist news-cont-object" id="{{audio}}"></div>
            {{/audio}}
            
            {{#video_loc}}
              <div class="video-container news-cont-object"></div>
              <script type="text/javascript"> startVideo('../{{{name}}}'); </script>
            {{/video_loc}}
            
            {{#video_glob}}
              <div class="video-player-glob news-cont-object">{{{html}}}</div>
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
          
        </div>
      </div>
    </div>
  </td>
  <td  id="right-block" class="page-block">
  
    <div id="news-{{id}}">
      
      <div class="news-footer view-controls">
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
        <div class="btn like {{#liked}}check{{/liked}}" onclick="request(3 , {{id}})" title="{{langs.dbl_like}}">
          <div class="icon item"></div>
          <div class="text item">{{likes}}</div>
        </div>
        <div class="btn unlike {{#unliked}}check{{/unliked}}" onclick="request(4 , {{id}})" title="{{langs.dbl_unlike}}">
          <div class="icon item"></div> 
          <span class="text item">{{unlikes}}</span>
        </div>
        
        {{#shareable}}
          <div class="btn share" onclick="request(5 , {{id}})">
            <div class="icon item"></div> 
            <div class="text item">{{langs.to_share}}</div>
          </div>
        {{/shareable}}
        
        <div class="btn">
          <div class="icon item"></div> 
          <div class="text item">{{views}}</div>
        </div>
        
        {{#type_img}}      
          {{^author}}
            {{#me}}
              <div class="btn" onclick="makeProfPic({{id}} , 0 , 0)">
                <div class="icon item"></div> 
                <div class="text item">{{langs.to_prof_pic}}</div>
              </div>
              <div class="btn" onclick="makeProfPic({{id}} , 1 , 0)">
                <div class="icon item"></div> 
                <div class="text item">{{langs.to_cover_pic}}</div>
              </div>
            {{/me}}
          {{/author}}
          
          {{#author}}
            {{#me_admin}}
              <div class="btn" onclick="makeProfPic({{id}} , 0 , 1)">
                <div class="icon item"></div> 
                <div class="text item">{{langs.to_gr_prof_pic}}</div>
              </div>
              <div class="btn" onclick="makeProfPic({{id}} , 1 , 1)">
                <div class="icon item"></div> 
                <div class="text item">{{langs.to_gr_cover_pic}}</div>
              </div>
            {{/me_admin}}
          {{/author}}
        {{/type_img}}
        
      </div>
            
      <div class="comments-show-area">
        <div class="new-comment-form">
          <form>
            <textarea rows="3" class="comment-input" onkeydown="sendComm( event , {{id}} )" placeholder="{{langs.write_comm}}.."></textarea>
          </form>
        </div>
        <div class="comments-box"></div>
      </div>
      
    </div>
    
  </td>
</tr>
</table>