{{#user}}
	<div class="container">
		<div id="user-header"></div>
		<div id="user-content">
			<div id="content-set"></div>
			<div id="content-show"></div>
		</div>
	</div>
	<script type="text/javascript" src="../js/user.js"></script>
	<script type="text/javascript">
		var profID = {{id}};
		var userContent = '{{section}}';
		
		fillDataTPL('../php_requests/get_content.php',{'content': 'user', 'prof_id': profID },'fillUSER(\'user\')');
	</script>
{{/user}}

{{#club}}
	<div class="container">
		<div id="user-header"></div>
		<div id="user-content">
			<div id="content-set"></div>
			<div id="content-show"></div>
		</div>
	</div>
	<script type="text/javascript" src="../js/user.js"></script>
	<script type="text/javascript">
		var profID = {{id}};
		var userContent = '{{section}}';
		
		fillDataTPL('../php_requests/get_content.php',{'content': 'club', 'prof_id': profID },'fillUSER(\'club\')');
	</script>
{{/club}}

{{#online}}
	<div class="container">
		<div id="online-page" class="content-pages"></div>
	</div>
	<script type="text/javascript">
		fillDataTPL('../php_requests/get_content.php',{'content': 'online' },'fillJSON(\'#online-page\')');
	</script>
{{/online}}

{{#settings}}
	<div class="container">
		<div id="settings-page" class="content-pages"></div>
	</div>
	<script type="text/javascript">		
		fillDataTPL('../php_requests/get_content.php',{'content': 'user_settings'},'fillJSON(\'#settings-page\')');
	</script>
{{/settings}}

{{#news}}
	<div class="container">
		<div id="news-page" class="content-pages">
			<div class="feed-options options">
				<div class="author block bl0">
					<div class="header-object">{{langs.content_author}}:</div>
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
				<div class="media block bl1">
					<div class="header-object">{{langs.content_cont}}:</div>
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
			<div class="feed-menu material-object">
				<div class="ads"></div>
				<div class="suggestions">
					<div class="title">{{langs.suggested_fr}}</div>
					<div class="s-content fr"></div>
					<div class="title">{{langs.suggested_cl}}</div>
					<div class="s-content cl"></div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var profID = {{my_id}};	
		fillDataTPL('../php_requests/get_content.php',{ 'content': 'ads', length: 2 }, 'fillJSON( \'.content-pages#news-page .feed-menu .ads\')');
		fillDataTPL('../php_requests/get_content.php',{ 'content': 'suggestion', type : 'clubs' , length: 3 }, 'fillJSON( \'.content-pages#news-page .feed-menu .suggestions .s-content.cl\')');
		fillDataTPL('../php_requests/get_content.php',{ 'content': 'suggestion', type : 'friends' , length: 5 }, 'fillJSON( \'.content-pages#news-page .feed-menu .suggestions .s-content.fr\')');
	</script>
	<script type="text/javascript" src="../js/feed.js"></script>
{{/news}}

{{#search}}
	<div class="container">
		<div id="search-columns">
			<div class="tab input-btn-object" onclick="changeSearchTab(0)">{{langs.people}}</div>
			<div class="tab simple-btn-object" onclick="changeSearchTab(1)">{{langs.clubs}}</div>
			<div class="tab simple-btn-object" onclick="changeSearchTab(2)">{{langs.video}}</div>
			<div class="tab simple-btn-object" onclick="changeSearchTab(3)">{{langs.audio}}</div>
			<div class="tab simple-btn-object" onclick="changeSearchTab(4)">{{langs.posts}}</div>
		</div>
		<div id="search-area">
			<form id="search-form" action="../php_requests/search.php" method="post"></form>
		</div>
		<div id="search-result"><div>
	</div>
	<script type="text/javascript" src="../js/search.js"></script>
	<script type="text/javascript">
		changeSearchTab( {{search_tab}} );
	</script>
{{/search}}

{{#top}}
	<div class="container">
		<div id="top-page" class="content-pages">
			<div class="top-content material-object">
					<div class="top-start"><span class="to-capitalize">{{langs.top_header}}</span></div>
				<div class="content">
					<div class="top-result"></div>
					<div class="top-user">
						<div class="end item"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">		
		fillDataTPL('../php_requests/get_content.php',{ content : 'top'},'fillJSON(\'#top-page .top-content .content .top-result\')');
	</script>
{{/top}}

{{#dating}}
	<div class="container">
		<div id="dating-page" class="content-pages">
			<div class="dating-block">
				<div class="user-view-block">
					<div class="info">	
						<a class="prevent-link not-prevented" id="name">
							<span class="user-a"></span> 
						</a>
						<span class="user-index"></span>
					</div>
					<div class="table-imit">
						<div class="dating-user-img">
							<a class="prevent-link not-prevented" id="img">
								<img>
							<a>
						</div>
					</div>
				</div>
				<div class="dating-options">
					<div class="btn like"></div>
					<div class="btn skip" onclick="getNewDating()"></div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="../js/dating.js"></script>	
{{/dating}}

{{#games}}
	<div class="container">
		<div id="games-page">
			<div class="games-cover">
				<div class="title">{{langs.games_header}}</div>
				<div class="opt">{{langs.games_title}}</div>
			</div>
		
			<div class="my header material-object">
				<div class="title">{{langs.my_games_header}}</div>
			</div>
			<div class="my-games material-object"></div>
			
			<div class="genres header">
				<div class="games-menu material-object">
					<div class="item" onclick="selGamesTab(0)">{{langs.games_genres.1}}</div>
					<div class="item" onclick="selGamesTab(1)">{{langs.games_genres.2}}</div>
					<div class="item" onclick="selGamesTab(2)">{{langs.games_genres.3}}</div>
					<div class="item" onclick="selGamesTab(3)">{{langs.games_genres.4}}</div>
					<div class="item" onclick="selGamesTab(4)">{{langs.games_genres.5}}</div>
				</div>
			</div>
			<div class="all-games"></div>
		</div>
	</div>
	<script type="text/javascript" src="../js/games.js"></script>	
	<script type="text/javascript">
	
		fillDataTPL('../php_requests/get_content.php',{ content: 'games', act: 0 },'fillJSON(\'.container #games-page .my-games\' , false , false , false , false , [ 12 , true , false ] )');
	</script>
{{/games}}

{{#game}}
	<div class="container">
		<div id="game-page" class="content-pages">
			<div class="content material-object"></div>
		</div>
	</div>
	<script type="text/javascript" src="../js/games.js"></script>	
	<script type="text/javascript">		
		fillDataTPL('../php_requests/get_content.php',{ content : 'game' , id: {{id}} },'game.load( \'.content-pages#game-page .content\' , true )');
	</script>
{{/game}}

{{#events}}
	<div class="container">
		<div id="events-page">
			<div class="header">
				<div class="bg">
					<div class="title"><span class="to-capitalize">{{langs.events_header}}</span></div>
					<div class="create-event" onclick="createNewEvent()">+ {{langs.create}}</div>
				</div>
			</div>
			<div class="cal-box">
				<div class="cal-prev item btn"><span class="to-capitalize">{{langs.prev_month}}</span></div
				><div class="events-calendar item"></div
				><div class="cal-next item btn"><span class="to-capitalize">{{langs.next_month}}</span></div>
			</div>
			<div class="content">
				<div class="column">
					<div class="box-header my"></div>
					<div class="box my-events"></div>
				</div>
				<div class="column">
					<div class="box-header all"></div>
					<div class="box all-events"></div>
				</div>
			</div>
		</div>
	</div>
	{{#id}} <script type="text/javascript"> var issetSetDate = '{{.}}'; </script> {{/id}}
	<script type="text/javascript" src="../js/events.js"></script>
{{/events}}

{{#post}}
	<div class="container">
		<div id="post-page" class="content-pages">
		</div>
	</div>
	<script type="text/javascript">
		$(document).ready(function(){
			setTimeout( function() { openNews( {{id}} ); } , 200 );
		});
	</script>
{{/post}}