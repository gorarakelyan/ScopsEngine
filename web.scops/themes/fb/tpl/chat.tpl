{{#chat}}
<div class="chat-object material-object panel-chat-{{id}}" onclick="openChatFromPanel( {{id}} )" data-user="{{id}}">
	<div class="chat-img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">
		<div class="online"></div>
	</div>
	<div class="chat-name">{{name}}</div>
</div>
{{/chat}}

{{#chat_empty}}
<div class="chat-empty material-object">
	<div class="chat-name">{{langs.empty_chat}}</div>
</div>
{{/chat_empty}}

{{#sms}}
	<div class="sms-object sms-{{id}}" data-id="{{id}}" >
		<div class="sms-cont {{author}}">
			<div class="sms-icon" style="background-image:url('{{main_set.root}}/{{author_img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
			<div class="arrow {{#sticker}}hide{{/sticker}}"></div>
			<div class="sms-text material-object {{#sticker}}no-bg{{/sticker}}">{{#videos}}<div class="video-object" id="vid-{{id}}" data-id="{{id}}" data-video="{{video_id}}">
					<div class="thumb"  onclick="watchMedia( {{id}} , 0 , false , 2 , 0 )" style="background-image:url('{{main_set.root}}/{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:contain;"></div>
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
			</div>{{/videos}}{{#audio_count}}<div class="audiolist"></div>{{/audio_count}}{{{text}}}{{#gif}}<div class="sms-img" onclick="openChatImg(event , 1)" data-url="{{.}}" style="background:url('{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: contain;"></div>{{/gif}}{{#img}}<div class="sms-img" onclick="openChatImg(event)" data-url="{{main_set.root}}/{{img_big}}" style="background:url('{{main_set.root}}/{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>{{/img}}{{#sticker}}<div class="sms-sticker" style="background:url('{{main_set.root}}/img/stickers/{{sticker_pack}}/{{sticker_index}}.{{sticker_format}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:contain;"></div>{{/sticker}}{{^sticker}}<div><span class="time">{{time}}</span><span class="delete" onclick="deleteSMS( {{id}} , {{author_id}} )"></span></div>{{/sticker}}</div>		
		</div>
	</div>
{{/sms}}

{{#window}}
	<div class="chat-window simple" id="chat-{{id}}" data-id="{{id}}">
		{{^mobile}}
		<div class="chat-header simple">
			<div class="name item"><span onclick="ajaxQuery('user','wall','{{id}}',event)">{{name}}</span></div>
			{{^me}}<div class="online item icon" onclick="videoCall.makeCall({{id}})"></div>{{/me}}
			{{#me}}<div class="online item icon"></div>{{/me}}
			<div class="drag item icon"></div>
			<div class="open item icon" onclick="ajaxQuery('chat' , 0 , {{id}})"></div>
			<div class="close item icon" onclick="closeChat({{id}})"></div>
		</div>
		{{/mobile}}
		<div class="chat-place" onclick="setChatFocus( {{id}} , true )">
			<div class="table">
				<div class="chat-content"></div>
				<div class="chat-seen-scroller">
					<div class="seen" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
				</div>
			</div>
			<div class="get-height" style="display:none;"></div>
		</div>
		<div class="chat-controls blur" onclick="setChatFocus( {{id}} , true )">
			<textarea class="chat-form blur" onkeydown="sendActivate(event , {{id}})" placeholder="{{langs.write_msg}}.."></textarea>
			<input type="file" id="chat-send-img-{{id}}" onchange="imgSend({{id}})" style="display:none">
			<div class="attach">
				<div class="chat-icon send" onclick="sendMSG({{id}})"></div>
				<div class="chat-icon simple" onclick="openStickers({{id}})"></div>
				<div class="chat-icon simple" onclick="openAttachOpt({{id}})"></div>
			</div>
		</div>
	</div>
	{{#mobile}}
	<div class="chat-header simple">
		<div class="friend-object material-object" id="frid-{{id}}" {{^app_chat}}onclick="ajaxQuery('user','wall',{{id}} , event)"{{/app_chat}} data-id="{{id}}">
			{{^app_chat}}<a class="prevent-link not-prevented" href="../id{{id}}/wall">{{/app_chat}}
				<div class="table">
					<div class="col friend-img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;">
						<div class="online item icon"></div>
					</div>
					<div class="col about">
						<div class="name">{{name}}</div>
						<div class="age">{{age}} {{langs.year}}</div>
						<div class="city">{{city}}</div>
					</div>
				</div>
			{{^app_chat}}</a>{{/app_chat}}
		</div>
	</div>
	{{/mobile}}
{{/window}}

{{#stickers}}
	<div id="sticker-box"></div>
	<div id="stickers-transition">
		<div id="sticker-scroll-left" onclick="scrollStickers( 1 )"></div>
		<div id="stickers-scroll">
			<div id="stickers-scrolling-area">
				{{^empty}}
					{{#pack}}
						<div class="st-pack" id="stpack{{id}}" data-format="{{format}}" data-length="{{length}}" onclick="getStickerPack( {{friend}} ,{{id}} )" data-id="{{id}}">
							<div class="st-img" style="background:url('{{main_set.root}}/{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: contain;"></div>
						</div>
					{{/pack}}
				{{/empty}}
			</div>
		</div>
		<div id="sticker-scroll-right" onclick="scrollStickers( 2 )"></div>
		<div class="st-pack" id="shop" onclick="openStickersShop()"></div>
	</div>
{{/stickers}}

{{#msg}}
	<div class="dial material-object" data-id="{{author.id}}" onclick="openChatFromDials( event , {{author.id}} )">
		<div class="user-img dont-react">	
			<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{author.id}} , event )" href="../id{{author.id}}/wall">
				<div class="img" style="background:url('{{main_set.root}}/{{author.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
			</a>
		</div>
		<div class="title">
			{{#new}}<div class="new">{{langs.unseen}}</div>{{/new}}
			<div class="user-name dont-react">
				<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{author.id}} , event )" href="../id{{author.id}}/wall">
					{{author.name}}
				</a>
			</div>
			{{#text}}
				<div class="msg-text">{{.}}</div>
			{{/text}}
			{{#sticker}}
				<div class="msg-text"><span class="icon"></span>{{langs.sticker}}</div>
			{{/sticker}}
			{{#media}}
				<div class="msg-text"><span class="icon"></span>{{langs.media}}</div>
			{{/media}}
			{{#img}}
				<div class="msg-text"><span class="icon"></span>{{langs.photo}}</div>
			{{/img}}
		</div>
	</div>
{{/msg}}