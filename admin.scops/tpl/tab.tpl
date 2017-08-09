<div class="content-pages material-object">
  {{#users}}
    <div class="header">
      <div class="header-object">Manage Users</div>
      <div class="form">
        <input type="text" class="input-text-object" placeholder="Search by ID.." onkeydown="findManageUp( event , 0 )">
        <button class="input-btn-object" onclick="findManage( 0 )">Find</button>
      </div>
    </div>
    <div class="list"></div>
    <script type="text/javascript"> findManage( 0 ); </script>
  {{/users}}
  
  {{#clubs}}
    <div class="header">
      <div class="header-object">Manage Clubs</div>
      <div class="form">
        <input type="text" class="input-text-object" placeholder="Search by ID.." onkeydown="findManageUp( event , 1 )">
        <button class="input-btn-object" onclick="findManage( 1 )">Find</button>
      </div>
    </div>
    <div class="list"></div>
    <script type="text/javascript"> findManage( 1 ); </script>
  {{/clubs}}
  
  {{#ads}}
    <div class="header">
      <div class="header-object">Manage Ads</div>
      <div class="form ads">
        <form method="post" action="{{root}}/php_main/admin.php" enctype="multipart/form-data" id="new-ads-form" >
          <div class="title">Add New Advertisement</div>
          <input type="hidden" name="action" value="create_ads">
          <input type="hidden" name="admin" value="{{admin_link}}">
          <textarea rows="1" name="title" class="input-textarea-object required" placeholder="Name.."></textarea>
          <textarea rows="2" name="description" class="input-textarea-object required" placeholder="Description.."></textarea>
          <textarea rows="1" name="url" class="input-textarea-object required" placeholder="URL.."></textarea>
          <div class="simple-btn-object cover">Select Image</div>
          <div class="limit-type">
            <span>Set Limitation: </span>
            <label><input type="radio" name="limit_type" value="limit_clicks" onclick="showLimitRow( 'views' )">By clicks</label>
            <label><input type="radio" name="limit_type" value="limit_views" onclick="showLimitRow( 'clicks' )">By views</label> 
            <label><input checked type="radio" name="limit_type" value="no_limit" onclick="showLimitRow( 'hide' )">Infinite</label>
            <input name="limit_views" class="input-text-object views hidden" placeholder="Set number of views">
            <input name="limit_clicks" class="input-text-object clicks hidden" placeholder="Set number of clicks">
          </div>
          <input style="display: none;" type="file" name="img" class="cover-input" accept=".png, .jpg, .jpeg .jpg">
          <button class="input-btn-object btn">Create Ads</button>
        </form>
      </div>
    </div>
    <div class="list"></div>
    <script type="text/javascript">
      $('#new-ads-form').ajaxForm({ 
      beforeSubmit: function(){ 
        var filled = true;        
        $('.ads .required').each(function(){
          if( !$(this).val() ) filled = false;
        });
        
        if( filled ) addAlert( 0 );
      },
      success: function( data ){
        if( data == 1 ) {
          addAlert(1);
          $('#new-ads-form').trigger('reset');
          showLimitRow( 'hide' );
          fillDataTPL('../php/get_content.php' , { content: 'ads_get' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 6 , true , false ] )' );
        } else addAlert('Error. Please fill in all fields.');
      } });
      $('.header form .simple-btn-object.cover').click(function(){ $('.header form .cover-input').trigger('click'); });
      fillDataTPL('../php/get_content.php' , { content: 'ads_get' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 6 , true , false ]  )' );    
    </script>
  {{/ads}}
  
  {{#announcements}}
    <div class="header">
      <div class="header-object">Announcements</div>
      <div class="form">
        <textarea rows="3" class="input-textarea-object" placeholder="Create new report..HTML is available"></textarea>
        <button class="input-btn-object" onclick="newAnnounce()">Create</button>
      </div>
    </div>
    <div class="list"></div>
    <script type="text/javascript"> 
      fillDataTPL('../php/get_content.php' , { content: 'manage_reports' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 2 , true , false ] )' );
    </script>
  {{/announcements}}
  
  {{#statistics}}
    <div class="header">
      <div class="header-object">Statistics</div>
    </div>
    <div class="stat-list"></div>
    <script type="text/javascript">
      fillDataTPL('../php/get_content.php' , { content: 'statistics' } , 'fillJSON(\'.content-pages .stat-list\' , false , true )' );
    </script>
  {{/statistics}}
  
  {{#games}}
    <div class="header">
      <div class="header-object">Games</div>
      <div class="form game">
        <form method="post" action="{{root}}/php_main/admin.php" enctype="multipart/form-data" id="new-game-form" >
          <div class="title">Add New Game</div>
          <input type="hidden" name="action" value="create_game">
          <input type="hidden" name="admin" value="{{admin_link}}">
          <textarea rows="1" name="name" class="input-textarea-object" placeholder="Name.."></textarea>
          <textarea rows="2" name="desc" class="input-textarea-object" placeholder="Description.."></textarea>
          <textarea rows="2" name="html" class="input-textarea-object" placeholder="HTML code.."></textarea>
          <input name="prop" class="input-text-object" placeholder="Aspect ratio">
          <input name="genre" class="input-text-object" placeholder="Genre ( Number of Tab in 'Games' )">
          <div class="simple-btn-object cover">Select Cover</div>
          <input style="display: none;" type="file" name="photoimg" class="cover-input" accept=".png, .jpg, .jpeg .jpg">
          <button class="input-btn-object btn">Add Game</button>
        </form>
      </div>
    </div>
    <div class="list"></div>
    <script type="text/javascript">
      $('#new-game-form').ajaxForm({ beforeSubmit: function(){ addAlert(0); }, success: function(data){ 
        if( data == 1 ) {
          addAlert(1);
          $('#new-game-form').trigger('reset');
          fillDataTPL('../php/get_content.php' , { content: 'games' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' ,false , true , true , [ 3 , true , false ] )' );
        } else addAlert('Error. Please try again');
      } });
      $('.header form .simple-btn-object.cover').click(function(){ $('.header form .cover-input').trigger('click'); });
      fillDataTPL('../php/get_content.php' , { content: 'games' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 3 , true , false ]  )' );
    </script>
  {{/games}}
  
  {{#stickers}}
    <div class="header">
      <div class="header-object">Stickers</div>
      <div class="form sticker">
        <form method="post" action="{{root}}/php_main/admin.php" enctype="multipart/form-data" id="new-pack-form" >
          <div class="title">Add New Pack</div>
          <input type="hidden" name="action" value="create_sticker">
          <input type="hidden" name="admin" value="{{admin_link}}">
          <textarea rows="1" name="name" class="input-textarea-object" placeholder="Name.."></textarea>
          <div>
            <div class="simple-btn-object cover">Select Cover</div>
            <input style="display: none;" type="file" name="photocover" class="cover-input" accept=".gif , .png, .jpg, .jpeg">
            <div class="simple-btn-object thumb">Select Thumbnail</div>
            <input style="display: none;" type="file" name="photothumb" class="thumb-input" accept=".gif , .png, .jpg, .jpeg">
            <div class="simple-btn-object st">Select Stickers</div>
            <input style="display: none;" type="file" name="photosticker[]" class="st-input" accept=".gif , .png, .jpg, .jpeg" multiple>
          </div>
          <button class="input-btn-object btn">Add Pack</button>
        </form>
      </div>
    </div>
    <div class="st-delete-header">Be attentive when deleting sticker pack , errors can occur in dialogues if someone has already used the deleted pack.</div>
    <div class="list"></div>
    <script type="text/javascript">
      $('#new-pack-form').ajaxForm({ beforeSubmit: function(){ addAlert(0); }, success: function(data){ 
        
        addAlert(1);
        $('#new-pack-form').trigger('reset');
        fillDataTPL('../php/get_content.php' , { content: 'stickers' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 4 , true , false ] )' );
        
      } });
      $('.header form .simple-btn-object.cover').click(function(){ $('.header form .cover-input').trigger('click'); });
      $('.header form .simple-btn-object.thumb').click(function(){ $('.header form .thumb-input').trigger('click'); });
      $('.header form .simple-btn-object.st').click(function(){ $('.header form .st-input').trigger('click'); });
      fillDataTPL('../php/get_content.php' , { content: 'stickers' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 4 , true , false ]  )' );
    </script>
  {{/stickers}}
  
  {{#gifts}}
    <div class="header">
      <div class="header-object">Gifts</div>
      <div class="form sticker">
        <form method="post" action="{{root}}/php_main/admin.php" enctype="multipart/form-data" id="new-pack-form" >
          <div class="title">Add New Gift</div>
          <input type="hidden" name="action" value="create_gift">
          <input type="hidden" name="admin" value="{{admin_link}}">
          <textarea rows="1" name="name" class="input-textarea-object" placeholder="Name.."></textarea>
          <div>
            <div class="simple-btn-object cover">Select Thumb</div>
            <input style="display: none;" type="file" name="photoimg" class="cover-input" accept=".gif , .png, .jpg, .jpeg">
          </div>
          <button class="input-btn-object btn">Add Gift</button>
        </form>
      </div>
    </div>
    <div class="list"></div>
    <script type="text/javascript">
      $('#new-pack-form').ajaxForm({ beforeSubmit: function(){ addAlert(0); }, success: function(data){ 
        
        addAlert(1);
        $('#new-pack-form').trigger('reset');
        fillDataTPL('../php/get_content.php' , { content: 'gifts' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 5 , true , false ] )' );
        
      } });
      $('.header form .simple-btn-object.cover').click(function(){ $('.header form .cover-input').trigger('click'); });
      fillDataTPL('../php/get_content.php' , { content: 'gifts' , length: loadContentLengths , last_id: 'NULL' } , 'fillJSON(\'.content-pages .list\' , false , true , true , [ 5 , true , false ]  )' );
    </script>
  {{/gifts}}
  
  {{#langs}}
    <div class="header">
      <div class="header-object">Languages</div>
      <div class="form langs">
        <form method="post" action="{{root}}/php_main/admin.php" enctype="multipart/form-data" id="new-pack-form" >
          <div class="title">Add New Language</div>
          <input type="hidden" name="action" value="new_lang">
          <input type="hidden" name="admin" value="{{admin_link}}">
          <textarea rows="1" name="name" class="input-textarea-object" placeholder="Language.."></textarea>
          <div class="simple-btn-object lang">Select Language</div>
          <input style="display: none;" type="file" name="lang" class="lang-input" accept=".php">
          <button class="input-btn-object btn">Add</button>
        </form>
      </div>
    </div>
    <div class="st-delete-header">Don't delete *.php file of any language manually , even if the language pack has been deleted , it can cause errors.</div>
    <div class="list"></div>
    <script type="text/javascript">
      $('#new-pack-form').ajaxForm({ beforeSubmit: function(){ addAlert(0); }, success: function(data){ 
        if( data == 1 ) {
          addAlert(1);
          $('#new-pack-form').trigger('reset');
          fillDataTPL('../php/get_content.php' , { content: 'langs' } , 'fillJSON(\'.content-pages .list\')' );
        } else addAlert('Error..Please try again.');
      } });
      $('.header form .simple-btn-object.lang').click(function(){ $('.header form .lang-input').trigger('click'); });
      fillDataTPL('../php/get_content.php' , { content: 'langs' } , 'fillJSON(\'.content-pages .list\')')
    </script>
  {{/langs}}
  
  {{#admin}}
    <div class="header">
      <div class="header-object">Admin Settings</div>
      <div class="form admin">
        <div class="title">Reset admin key. The page will be refreshed.</div>  
        <button class="input-btn-object btn" onclick="resetKey()">Reset key</button>

        <div class="title title-sec">Login and password of admin can be changed only manually in "php/general.php".</div>
      </div>
    </div>
  {{/admin}}
  
  {{#themes}}
    <div class="header">
      <div class="header-object">Themes</div>
      <div class="form">
        <div class="theme-header">Choose design theme for your social network.</div>  
        <select class="theme-select" class="select">
          {{#themes_row}}<option {{selected}} value="{{key}}">Theme: {{title}}</option>{{/themes_row}}
        </select>
        <br>
        <button class="input-btn-object" onclick="changeTheme()">Update theme</button>
      </div>
    </div>
  {{/themes}}
  
  {{#settings}}
    <div class="header">
      <div class="header-object">General Settings</div>
      <div class="form set">
        <form method="post" action="../php/request.php" id="new-set-form" >
          <input type="hidden" name="type" value="6">
          <textarea rows="2" name="name" class="input-textarea-object" placeholder="Site name..">{{main.name}}</textarea>
          <textarea rows="1" name="host" class="input-textarea-object" placeholder="Host..">{{main.host}}</textarea>
          <textarea rows="1" name="connection" class="input-textarea-object" placeholder="Connection..">{{main.connection}}</textarea>
          <textarea rows="1" name="mail" class="input-textarea-object" placeholder="Mail..">{{main.mail}}</textarea>
          <label class="email-conf">Email confirmation<input name="email_conf" {{#main.email_conf}}checked{{/main.email_conf}} type="checkbox"></label>
          <label class="email-conf">Let users choose their design themes<input name="user_theme" {{#main.user_theme}}checked{{/main.user_theme}} type="checkbox"></label>
          <button class="input-btn-object btn">Save</button>
        </form>
      </div>
    </div>
    <script type="text/javascript">
      $('#new-set-form').ajaxForm({ beforeSubmit: function(){ addAlert(0); }, success: function(data){ 
        if( data == 1 ) addAlert(1);
        else addAlert('Error..Please try again.');
      } });
    </script>
  {{/settings}}
  
</div>