{{#user}}
	<div id="user-profile" class="material-object">
		<div id="user-cover" {{^blocked_me}}{{#cover_exist}}onclick="viewCover({{cover_id}} , event)"{{/cover_exist}}{{/blocked_me}} style="{{^blocked_me}}{{#cover_exist}}cursor:pointer;{{/cover_exist}}{{/blocked_me}}background:url('{{main_set.root}}/{{cover}}');background-repeat:no-repeat;background-position: 0% 0%;background-size:cover;"></div>
		<div id="user-profile-options">
			<div class="user-option-object img" {{^blocked_me}}{{#img_exist}}onclick="openNews({{img_id}})"{{/img_exist}}{{/blocked_me}} data-url="{{img}}" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">
				{{#online}}<div class="online"></div>{{/online}}
			</div>
			<div class="user-option-object text name">{{#verified}}<span class="verified"></span>{{/verified}}{{name}}</div>
			<div class="user-option-object text">{{city}} , {{country}}</div>
			<div class="user-option-object text">{{age}} {{langs.year}}</div>
			<div class="user-option-object text">{{langs.last_visit}}:
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
		
	<div id="user-profile-requests">
		{{^me}}
			<div class="request-object round-icon" id="remove-block" onclick="request(0,{{id}})" style="display:{{^blocked}}none{{/blocked}};"></div>
			<div class="request-object round-icon" id="add-block" onclick="request(0,{{id}})" style="display:{{#blocked}}none{{/blocked}};"></div>
			{{^blocked_me}}
				<div class="request-object round-icon" id="remove-follow" style="display:{{^follow}}none{{/follow}};" onclick="request(1,{{id}})"></div>
				<div class="request-object round-icon" id="add-follow" style="display:{{#follow}}none{{/follow}};" onclick="request(1,{{id}})"></div>
				<div class="request-object round-icon" onclick="ajaxQuery( 'chat', false , {{id}}, true , false );"></div>
			{{/blocked_me}}
			{{^list_blocked}}
				{{#friend}}<div class="request-object round-icon" id="remove-friend" onclick="request(2,{{id}})"></div>{{/friend}}
				{{^friend}}
					{{^request}}<div class="request-object round-icon" id="add-friend" onclick="request(2,{{id}})"></div>{{/request}}
					{{#request}}<div class="request-object round-icon" id="add-request" onclick="request(2,{{id}})"></div>{{/request}}
				{{/friend}}
			{{/list_blocked}}
		{{/me}}
		{{#me}}
			<div class="request-object round-icon" id="settings" onclick="ajaxQuery('settings')"></div>
		{{/me}}
	</div>

	{{^blocked_me}}
	<div id="user-profile-controls" class="material-object">
		<div id="user-menu">
			<div class="menu-block" id="wall" onclick="changeUserContent( 'wall' , 'user' )">
				<div class="block-icon"></div>
				<div class="block-name">{{langs.wall}}</div>
				<div class="block-num">{{user_wall}}</div>
			</div>
			<div class="menu-block" id="photos" onclick="changeUserContent( 'photos', 'user' )">
				<div class="block-icon"></div>
				<div class="block-name">{{langs.photos}}</div>
				<div class="block-num">{{user_photos}}</div>
			</div>
			<div class="menu-block" id="friends" onclick="changeUserContent( 'friends', 'user' )">
				<div class="block-icon"></div>
				<div class="block-name">{{langs.friends}}</div>
				<div class="block-num">{{user_friends}}</div>
			</div>
			<div class="menu-block" id="clubs" onclick="changeUserContent( 'clubs', 'user' )">
				<div class="block-icon"></div>
				<div class="block-name">{{langs.clubs}}</div>
				<div class="block-num">{{user_clubs}}</div>
			</div>
			<div class="menu-block" id="videos" onclick="changeUserContent( 'videos', 'user' )">
				<div class="block-icon"></div>
				<div class="block-name">{{langs.video}}</div>
				<div class="block-num">{{user_videos}}</div>
			</div>
			<div class="menu-block" id="music" onclick="changeUserContent( 'music', 'user' )">
				<div class="block-icon"></div>
				<div class="block-name">{{langs.audio}}</div>
				<div class="block-num">{{user_music}}</div>
			</div>
			<div id="scroller"><div id="pointer"></div></div>
		</div>
	</div>
	{{/blocked_me}}
	{{#blocked_me}}
		<div class="alert-object-big">{{langs.privacy}}</div>
	{{/blocked_me}}
{{/user}}