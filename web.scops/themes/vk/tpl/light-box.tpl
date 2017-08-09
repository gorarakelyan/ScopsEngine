{{#audio_attach_chat}}
	<div class="box attach">
		<div class="about">
			<div>{{langs.attach_aud}}</div>
			<div class="close" onclick="closeChatAttach()">{{langs.close}}</div>
		</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.attach_aud_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">0</div
				><button class="input-btn-object item button" onclick="sendChatAttached(1)">{{langs.send}}</button>
			</div>
			<div class="content">
				{{#item}}
					<div class="item simple audio" data-id="{{id}}" id="item-{{id}}" onclick="selectChatAttach( 1 , {{id}} )">
						{{description}}
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/audio_attach_chat}}

{{#video_attach_chat}}
	<div class="box attach">
		<div class="about">
			<div>{{langs.attach_vid}}</div>
			<div class="close" onclick="closeChatAttach()">{{langs.close}}</div>
		</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.attach_vid_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">-</div
				><button class="input-btn-object item button" onclick="sendChatAttached(2)">{{langs.send}}</button>
			</div>
			<div class="content">
				{{#item}}
					<div class="item simple video" data-id="{{video_id}}" id="item-{{video_id}}" onclick="selectChatAttach( 2 , {{video_id}} )">
						<div class="icon" style="background:url('{{main_set.root}}/{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						<div class="name">{{#description}}{{.}}{{/description}}{{^description}}{{name}}{{/description}}</div>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/video_attach_chat}}

{{#audio_attach}}
	<div class="box attach">
		<div class="about">
			<div>{{langs.attach_aud}}</div>
			<div class="close" onclick="closeAttach('audio')">{{langs.close}}</div>
		</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.attach_aud_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">0</div
				><button class="input-btn-object item button" onclick="displayMediaAttach('audio')">{{langs.attach}}</button>
			</div>
			<div class="content">
				{{#item}}
					<div class="item simple audio" id="item-{{id}}" onclick="selectAttach( 1 , {{id}} )">
						{{description}}
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/audio_attach}}

{{#video_attach}}
	<div class="box attach">
		<div class="about">
			<div>{{langs.attach_vid}}</div>
			<div class="close" onclick="closeAttach('video')">{{langs.close}}</div>
		</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.attach_vid_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">-</div
				><button class="input-btn-object item button" onclick="displayMediaAttach('videoLoc')">{{langs.attach}}</button>
			</div>
			<div class="content">
				{{#item}}
					<div class="item simple video" id="item-{{video_id}}" onclick="selectAttach( 2 , {{video_id}} )">
						<div class="icon" style="background:url('{{main_set.root}}/{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						<div class="name">{{#description}}{{.}}{{/description}}{{^description}}{{name}}{{/description}}</div>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/video_attach}}

{{#people_attach}}
	<div class="box attach">
		<div class="about">
			<div>{{langs.attach_people}}</div>		
			<div class="close" onclick="closeAttach( 'people' )">{{langs.close}}</div>
		</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.attach_people_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">0</div
				><button class="input-btn-object item button" onclick="displayMediaAttach('people')">{{langs.tag}}</button>
			</div>
			<div class="content">
				{{#item}}
					<div class="item simple people" id="item-{{id}}" onclick="selectAttach( 3 , {{id}} )">
						<div class="icon" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						<div class="name">{{name}}</div>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/people_attach}}

{{#people_invite}}
	<div class="box attach">
		<div class="about">{{langs.inv_people}}</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.inv_people_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">0</div
				><button class="input-btn-object item button" onclick="sendGroupInvitation( {{club}} )">{{langs.invite}}</button>
			</div>
			<div class="content">
				{{#item}}
					<div class="item simple people" id="item-{{id}}" onclick="selectInvPeople( {{id}} )">
						<div class="icon" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						<div class="name">{{name}}</div>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/people_invite}}

{{#mutual_friends}}
	<div class="box attach">
		<div class="about">{{langs.mutual_friends}}</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="content">
				{{#item}}
					<div class="item simple people" id="item-{{id}}" onclick="viewProfWin( {{id}} )">
						<a class="prevent-link not-prevented" href="../id{{id}}/wall">
							<div class="icon" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
							<div class="name">{{name}}</div>
						</a>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/mutual_friends}}

{{#user_followers}}
	<div class="box attach">
		<div class="about">{{langs.followers}}</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="content">
				{{#item}}
					<div class="item simple people" id="item-{{id}}" onclick="viewProfWin( {{id}} )">
						<a class="prevent-link not-prevented" href="../id{{id}}/wall">
							<div class="icon" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
							<div class="name">{{name}}</div>
						</a>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/user_followers}}

{{#news_people}}
	<div class="box attach">
		<div class="about">{{#likes}}{{langs.people_who_likes}}{{/likes}}{{^likes}}{{langs.people_who_unlikes}}{{/likes}}</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.box_people_empy}}</div>
		{{/exist}}
		{{#exist}}
			<div class="content">
				{{#item}}
					<div class="item simple people" id="item-{{id}}" onclick="viewProfWin( {{id}} )">
						<a class="prevent-link not-prevented" href="../id{{id}}/wall">
							<div class="icon" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
							<div class="name">{{name}}</div>
						</a>
					</div>
				{{/item}}
			</div>
		{{/exist}}
	</div>
{{/news_people}}

{{#question_form}}
	{{#user}}
		{{^blocked_me}}
		<div class="quest-form">
			<div class="light-box-header">{{langs.ask_header}}</div>
			<div class="body">
				<div class="receiver">{{langs.to}}: {{name}}</div>
				<textarea rows="3" class="question"></textarea>
				<button class="input-btn-object" onclick="request( 17 , {{id}})">{{langs.ask}}</button>
			</div>
		</div>
		{{/blocked_me}}
	{{/user}}
{{/question_form}}

{{#stickers_store}}
	<div class="stickers-store media-store">
		<div class="media-cover" style="background:url('{{main_set.root}}/img/otherImages/stickers_bg.jpg');background-repeat:no-repeat;background-position:0% 100%;background-size:100%;"></div>
		<div class="media-text"><span class="to-capitalize">{{langs.st_header}}</span></div>
		<div class="header"><span class="to-capitalize">{{langs.st_my_st}}</span></div>
		
		<div class="media-box my-box">
			{{#my_sticker}}
				<div class="st-pack sticker-{{id}}">
					<div class="st-cover" style="background:url('{{main_set.root}}/{{cover}}');background-repeat:no-repeat;background-position:50% 50%;background-size:cover;"></div>
					<div class="st-info">
						<div class="st-name">{{name}}</div>
						<div class="input-btn-object btn" onclick="request( 15 , {{id}} )">{{langs.remove}}</div>
					</div>
				</div>
			{{/my_sticker}}
			{{^my_sticker}}
				<div class="alert-object-small">{{langs.st_empty}}</div>
			{{/my_sticker}}
		</div>
		
		<div class="header">{{langs.all_st}}</div>
		<div class="media-box other-box">
			{{#all_sticker}}
				<div class="st-pack sticker-{{id}}">
					<div class="st-cover" style="background:url('{{main_set.root}}/{{cover}}');background-repeat:no-repeat;background-position:50% 50%;background-size:cover;"></div>
					<div class="st-info">
						<div class="st-name">{{name}}</div>
						<div class="input-btn-object btn" onclick="request( 15 , {{id}} )">{{#added}}{{langs.remove}}{{/added}}{{^added}}{{langs.add}}{{/added}}</div>
					</div>
				</div>
			{{/all_sticker}}
		</div>
	</div>
{{/stickers_store}}

{{#gifts_store}}
	<div class="gifts-store media-store">
		<div class="media-cover" style="background:url('{{main_set.root}}/img/otherImages/gifts_bg.jpg');background-repeat:no-repeat;background-position:0% 100%;background-size:100%;"></div>
		<div class="media-text"><span class="to-capitalize">{{langs.gf_header}}</span></div>
		
		<div class="media-box">
			{{#gifts}}
				<div class="gf-pack gift-{{id}}">
					<div class="thumb-frame">
						<div class="gf-cover" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position:50% 50%;background-size: contain;"></div>
					</div>
					<div class="gf-info">
						<div class="gf-name">{{name}}</div>
						<div class="to-friend" data-id="{{friend}}">
							<div class="input-btn-object btn" onclick="request( 35 , {{id}} , event )">{{langs.send}}</div>
						</div>
					</div>
				</div>
			{{/gifts}}
			{{^gifts}}
				<div class="alert-object-small">{{langs.empty}}</div>
			{{/gifts}}
		</div>
		
	</div>
{{/gifts_store}}

{{#event_form}}
	<div class="event-form">
		<div class="about"><span class="to-capitalize">{{langs.event_form}}</span></div>
		<div class="form">
			<form action="../php_requests/request.php" method="post" enctype="multipart/form-data" id="new-event-form">
				<input type="hidden" value="21" name="type">
				<textarea name="title" class="input" rows="2" placeholder="{{langs.ev_title}}.."></textarea>
				<textarea name="about" class="input" rows="3" placeholder="{{langs.ev_about}}.."></textarea>
				<textarea name="place" class="input" rows="1" placeholder="{{langs.ev_place}}"></textarea>
				<textarea name="time" class="input" rows="1" placeholder="{{langs.ev_start}}"></textarea>
				<label class="check"><input type="checkbox" name="closed" class="checkbox" value="1">{{langs.private_ev}}</label>
				<div class="media">
					<div class="select cover">
						<div class="title">{{langs.ev_cover}}</div>
						<div class="cover-choose"></div>
						<input name="cover" type="file" style="display:none;" accept=".png, .jpg, .jpeg .jpg" class="cover-file">
					</div>
					<div class="select">
						<div class="title">{{langs.ev_date}}</div>
						<div class="new-cal">
							<div class="cal-btn elem option"></div>
							<div class="cal elem"></div>
							<div class="cal-btn elem option"></div>
						</div>
						<input name="date" type="hidden" class="date-input">
					</div>
				</div>
				<div class="input-btn-object" onclick="sendEventForm()">{{langs.create}}</div>
			</form>
		</div>
	</div>
{{/event_form}}

{{#event_invitation}}
	<div class="box attach">
		<div class="about">{{langs.attach_people}}</div>
		{{^exist}}
				<div class="alert-object-big">{{langs.attach_people_empty}}</div>
		{{/exist}}
		{{#exist}}
			<div class="options">
				<div class="item count">0</div
				><button class="input-btn-object item button" onclick="sendInvitation( {{event.id}} )">{{langs.attach_people}}</button>
			</div>
			<div class="content">
				{{#user}}
					<div class="item simple people" id="item-{{id}}" onclick="addPeopleEvent( {{id}} )">
						<div class="icon" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						<div class="name">{{name}}</div>
					</div>
				{{/user}}
			</div>
		{{/exist}}
	</div>
{{/event_invitation}}
