{{#user}}
  <div class="content-pages">
    <div class="container">
      <div class="profile"></div>
      <div id="user-content">
        <div id="content-set"></div>
        <div id="content-show"></div>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    var profID = '{{id}}';
    var userContent = '{{section}}';
    
    function startUserPage(){
      if( !$('.profile .empty-object').length && !$('.profile .alert-object-big').length ) changeUserContent( '{{section}}' , 'user' );
    }
    
    fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'user', prof_id: profID },'fillJSON(\'.content-pages .profile\', false , false , false , [ 15 ,1 ,1 ] , \'startUserPage()\' )');
  </script>
  <script type="text/javascript" src="../js/user.js"></script>
{{/user}}
{{#club}}
  <div class="content-pages">
    <div class="container">
      <div class="profile"></div>
      <div id="user-content">
        <div id="content-set"></div>
        <div id="content-show"></div>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    var profID = {{id}};
    var userContent = '{{section}}';
    function startUserPage(){
      if( !$('.profile .empty-object').length && !$('.profile .alert-object-big').length ) changeUserContent( '{{section}}' , 'club' );
    }
    
    fillDataTPL( _root_ + '/php_requests/get_content.php',{ content: 'club', prof_id: profID },'fillJSON(\'.content-pages .profile\', false , false , false , [ 15 ,1 ,1 ] , \'startUserPage()\' )');
  </script>
  <script type="text/javascript" src="../js/user.js"></script>
{{/club}}
{{#news}}
  <div class="content-pages">
    <div class="container">
      <div class="options">
        <div class="material-object author block bl0">
          <div class="option opt1 selected" onclick="modifyFeedWall( 0 , 0 )">
            <div class="icon"></div>
            <div class="title">{{langs.all}}</div>
          </div>
          <div class="option opt2" onclick="modifyFeedWall( 0 , 1 )">
            <div class="icon"></div>
            <div class="title">{{langs.friends}}</div>
          </div>
          <div class="option opt3" onclick="modifyFeedWall( 0 , 2 )">
            <div class="icon"></div>
            <div class="title">{{langs.clubs}}</div>
          </div>
        </div>
        <div class="material-object media block bl1">
          <div class="option selected" onclick="modifyFeedWall( 1 , 0 )">
            <div class="icon"></div>
            <div class="title">{{langs.all}}</div>
          </div>
          <div class="option" onclick="modifyFeedWall( 1 , 1 )">
            <div class="icon"></div>
            <div class="title">{{langs.feed_status}}</div>
          </div>
          <div class="option" onclick="modifyFeedWall( 1 , 2 )">
            <div class="icon"></div>
            <div class="title">{{langs.photos}}</div>
          </div>
          <div class="option" onclick="modifyFeedWall( 1 , 3 )">
            <div class="icon"></div>
            <div class="title">{{langs.video}}</div>
          </div>
          <div class="option" onclick="modifyFeedWall( 1 ,4 )">
            <div class="icon"></div>
            <div class="title">{{langs.audio}}</div>
          </div>
        </div>
      </div>
      
      <div class="content"></div>
    </div>
  </div>
  
  <script type="text/javascript">
      var profID = {{my_id}};
  </script>
  <script type="text/javascript" src="../js/feed.js"></script>
{{/news}}

{{#post}}
  <div class="content-pages">
    <div class="container"></div>
  </div>
  <script type="text/javascript">
    $(document).ready(function(){
      setTimeout( function() { openNews( {{id}} ); } , 200 );
    });
  </script>
{{/post}}


{{#search}}
  <div class="content-pages">
    <div class="container">
      <div class="options">
        <div class="block material-object">
          <div class="option selected" onclick="changeSearchTab(0)">{{langs.people}}</div>
          <div class="option" onclick="changeSearchTab(1)">{{langs.clubs}}</div>
          <div class="option" onclick="changeSearchTab(2)">{{langs.video}}</div>
          <div class="option" onclick="changeSearchTab(3)">{{langs.audio}}</div>
          <div class="option" onclick="changeSearchTab(4)">{{langs.posts}}</div>
        </div>
      </div>
      <div id="search-area">
        <form id="search-form" action="{{root}}/php_requests/search.php" method="post"></form>
      </div>
      <div id="search-result"><div>
    </div>
  </div>
  <script type="text/javascript" src="../js/search.js"></script>
  <script type="text/javascript">
    changeSearchTab( {{search_tab}} );
  </script>
{{/search}}

{{#settings}}
  <div class="content-pages">
    <div class="container"></div>
  </div>
  <script type="text/javascript">    
    fillDataTPL( _root_ + '/php_requests/get_content.php',{'content': 'user_settings'},'fillJSON(\'.content-pages .container\')');
  </script>
{{/settings}}

{{#chat}}
  <div class="content-pages chat">
    <div class="container"></div>
  </div>
  <script type="text/javascript">    
    openChat( {{id}} , false );
  </script>
{{/chat}}

{{#online}}
  <div class="content-pages chat">
    <div class="container">
      <div class="empty-object material-object padding">{{langs.not_available_mob}}</div>
    </div>
  </div>
{{/online}}

{{#top}}
  <div class="content-pages chat">
    <div class="container">
      <div class="empty-object material-object padding">{{langs.not_available_mob}}</div>
    </div>
  </div>
{{/top}}

{{#dating}}
  <div class="content-pages chat">
    <div class="container">
      <div class="empty-object material-object padding">{{langs.not_available_mob}}</div>
    </div>
  </div>
{{/dating}}

{{#games}}
  <div class="content-pages chat">
    <div class="container">
      <div class="empty-object material-object padding">{{langs.not_available_mob}}</div>
    </div>
  </div>
{{/games}}

{{#events}}
  <div class="content-pages chat">
    <div class="container">
      <div class="empty-object material-object padding">{{langs.not_available_mob}}</div>
    </div>
  </div>
{{/events}}
