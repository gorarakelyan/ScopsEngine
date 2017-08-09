{{#visitor}}
	<div class="notification-object" data-id="{{id}}">
		<div class="notif-content">
			<div class="first-line">
				<div class="row">
					<div class="content-img item author" onclick="closeNotif()">	
						<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{id}} , event )" href="../id{{id}}/wall">
							<div class="img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						</a>
					</div>
					<div class="content-header item">
						<div class="link-object" onclick="closeNotif()">
							<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{id}} , event )" href="../id{{id}}/wall">
								{{name}}
							</a>
						</div>
					</div>
					{{#new_vis}}<div class="content-new item"> <div class="new-notif"></div> </div>{{/new_vis}}
				</div>
			</div>
		</div>
	</div>
{{/visitor}}

{{#msg}}
	<div class="notification-object msg-notif" data-id="{{author.id}}" id="notif-msg-{{author.id}}">
		<div class="notif-content">
			<div class="first-line">
				<div class="row">
					<div class="content-img item author" {{^app_chat}}onclick="closeNotif()"{{/app_chat}}{{#app_chat}}onclick="openChatFromPanel({{author.id}})"{{/app_chat}}>	
						{{^app_chat}}<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{author.id}} , event )" href="../id{{author.id}}/wall">{{/app_chat}}
							<div class="img" style="background:url('{{main_set.root}}/{{author.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						{{^app_chat}}</a>{{/app_chat}}
					</div>
					<div class="content-header item" onclick="openChatFromPanel({{author.id}})" >
						{{^app_chat}}
						<div class="link-object break">
							<a class="prevent-link not-prevented" href="../id{{author.id}}/wall">
						{{/app_chat}}
						{{#app_chat}}
							<div class="break app-vers-chat-name">
						{{/app_chat}}
							{{author.name}}
						{{#app_chat}}
							</div>
						{{/app_chat}}
						{{^app_chat}}
							</a>
						</div>
						{{/app_chat}}
					</div>
					{{#text}}
						<div class="content-body item" onclick="openChatFromPanel({{author.id}})" >
							<div class="sent-msg-text"><div class="break">{{.}}</div></div>
						</div>
					{{/text}}
					{{#sticker}}
						<div class="content-body item" onclick="openChatFromPanel({{author.id}})" >
							<div class="sent-msg-text"><div class="break">{{langs.sticker}}</div></div>
						</div>
					{{/sticker}}
					{{#media}}
						<div class="content-body item" onclick="openChatFromPanel({{author.id}})" >
							<div class="sent-msg-text"><div class="break">{{langs.media}}</div></div>
						</div>
					{{/media}}
					{{#img}}
					<div class="content-footer item" onclick="openChatFromPanel({{author.id}})" >
						<div class="sent-msg-img" style="background:url('{{main_set.root}}/{{.}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
					</div>
					{{/img}}
					{{#new}}<div class="content-new item" onclick="openChatFromPanel({{author.id}})" > <div class="new-notif"></div> </div>{{/new}}
				</div>
			</div>
		</div>
	</div>
{{/msg}}

{{#request}}
	<div class="notification-object" id="notif-req-{{id}}" data-id="{{id}}">
		<div class="notif-content">
			<div class="first-line">
				<div class="row">
					<div class="content-img item author" onclick="closeNotif()">	
						<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{id}} , event )" href="../id{{id}}/wall">
							<div class="img" style="background:url('{{main_set.root}}/{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
						</a>
					</div>
					<div class="content-header item">
						<div class="link-object" onclick="closeNotif()">
							<a class="prevent-link not-prevented" onclick="ajaxQuery( 'user' , 'wall' , {{id}} , event )" href="../id{{id}}/wall">
								{{name}}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="second-line">
				<div class="content-form">
					<input type="button" class="input-btn-object" value="{{langs.accept_fr}}" onclick="reqNotif({{id}},1)"
					><input type="button" class="simple-btn-object" value="{{langs.remove}}" onclick="reqNotif({{id}},0)">
				</div>
			</div>
		</div>
	</div>
{{/request}}

{{#notif}}
	<div class="notification-object" id="notif-{{id}}" data-id="{{id}}">
		<div class="notif-content">
			<div class="first-line">
				<div class="row">
					{{#show_author}}
						<div class="content-img item author" onclick="closeNotif()">	
							<a class="prevent-link not-prevented" onclick="ajaxQuery( {{#author_type}}'club'{{/author_type}}{{^author_type}}'user'{{/author_type}} , 'wall' , {{author.id}} , event )" href="../{{#author_type}}club{{/author_type}}{{^author_type}}id{{/author_type}}{{author.id}}/wall">
								<div class="img" style="background:url('{{main_set.root}}/{{author.img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size:cover;"></div>
							</a>
						</div>
					{{/show_author}}
					<div class="content-header item">
						{{#show_author}}
						<div class="break">
							<span>
								<span class="link-object" onclick="closeNotif()">
									<a class="prevent-link not-prevented" onclick="ajaxQuery( {{#author_type}}'club'{{/author_type}}{{^author_type}}'user'{{/author_type}} , 'wall' , {{author.id}} , event )" href="../{{#author_type}}club{{/author_type}}{{^author_type}}id{{/author_type}}{{author.id}}/wall">
										{{author.name}}
									</a>
								</span>
								{{#other_count}}
									{{langs.notif_others}} {{.}}
								{{/other_count}}
							</span>
						</div>
						{{/show_author}}
						{{#type_5}}
							<div class="type-info">{{langs.notif_question}}:</div>
							{{question}}
						{{/type_5}}
						{{#type_12}}
							<div class="type-info">{{langs.announcement}}:</div>
							{{{announcement}}}
						{{/type_12}}
					</div>
					{{^hide_body}}
						<div class="content-body item">
							{{#type_1}}
								{{#other_count}}
									{{langs.notif_like_plural}}
								{{/other_count}}
								{{^other_count}}
									{{#author.gender}}{{langs.notif_like_woman}}{{/author.gender}}
									{{^author.gender}}{{langs.notif_like_man}}{{/author.gender}}
								{{/other_count}}
							{{/type_1}}
							{{#type_2}}
								{{#other_count}}
									{{langs.notif_unlike_plural}}
								{{/other_count}}
								{{^other_count}}
									{{#author.gender}}{{langs.notif_unlike_woman}}{{/author.gender}}
									{{^author.gender}}{{langs.notif_unlike_man}}{{/author.gender}}
								{{/other_count}}
							{{/type_2}}
							{{#type_3}}
								{{#author.gender}}{{langs.notif_share_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_share_man}}{{/author.gender}}
							{{/type_3}}
							{{#type_4}}
								{{#author.gender}}{{langs.notif_comm_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_comm_man}}{{/author.gender}}
							{{/type_4}}
							{{#type_6}}
								<div class="type-info">
									{{#author.gender}}{{langs.notif_answer_woman}}{{/author.gender}}
									{{^author.gender}}{{langs.notif_answer_man}}{{/author.gender}}
								</div>
								{{question}}
								<div class="type-info">{{langs.notif_answer}}:</div>
								{{answer}}
							{{/type_6}}
							{{#type_7}}
								{{#author.gender}}{{langs.notif_date_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_date_man}}{{/author.gender}}
								<span onclick="closeNotif()"><span onclick="ajaxQuery('dating')" class="link-object">( {{langs.datings_app}} )</span></span>.
							{{/type_7}}
							{{#type_8}}
								{{#author.gender}}{{langs.notif_tag_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_tag_man}}{{/author.gender}}
							{{/type_8}}
							{{#type_9}}
								{{#author.gender}}{{langs.notif_inv_ev_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_inv_ev_man}}{{/author.gender}}
							{{/type_9}}
							{{#type_10}}
								{{#author.gender}}{{langs.notif_inv_cl_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_inv_cl_man}}{{/author.gender}}
							{{/type_10}}
							{{#type_11}}
								{{#author.gender}}{{langs.notif_frreq_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_frreq_man}}{{/author.gender}}
							{{/type_11}}
							{{#type_13}}
								{{#author.gender}}{{langs.notif_gift_woman}}{{/author.gender}}
								{{^author.gender}}{{langs.notif_gift_man}}{{/author.gender}}
							{{/type_13}}
						</div>
					{{/hide_body}}
					{{#post_footer}}
						<div class="content-footer item">
							<span class="link-object" onclick="openNews({{.}})">#{{.}}</span>
						</div>
					{{/post_footer}}
					{{#new_notif}}<div class="content-new item"> <div class="new-notif"></div> </div>{{/new_notif}}
				</div>
			</div>
			{{#form}}
				<div class="second-line">
				{{#type_5}}
					<div class="content-form no-padding">
						<textarea rows="1" placeholder="{{langs.notif_type_an}}.." class="answer"></textarea>
						<input type="button" class="input-btn-object" value="{{langs.answer}}" onclick="request( 18 , {{id}})"
						><input type="button" class="simple-btn-object" value="{{langs.remove}}" onclick="request( 19 , {{id}})">
					</div>
				{{/type_5}}
				{{#type_9}}
					<div class="content-form">
						<div class="form-descr">
							{{#event.full_title}}
							<div class="descr-item">
								<span class="icon"></span>
								<span class="text">{{.}}</span>
							</div>
							{{/event.full_title}}
							{{#event.about}}
							<div class="descr-item">
								<span class="icon"></span>
								<span class="text">{{.}}</span>
							</div>
							{{/event.about}}
							{{#event.place}}
							<div class="descr-item">
								<span class="icon"></span>
								<span class="text">{{.}}</span>
							</div>
							{{/event.place}}
							<div class="descr-item">
								<span class="icon"></span>
								<span class="text">{{event.human_date}}</span>
							</div>
							<div class="descr-item link-object" onclick="closeNotif()">
								<span class="link-object" onclick="ajaxQuery( 'events' , false , '{{event.date}}' )">{{langs.events_more}}</span>
							</div>
						</div>
						<input type="button" class="input-btn-object" value="{{langs.accept}}" onclick="request( 24 , {{event.id}} , event )"
						><input type="button" class="simple-btn-object" value="{{langs.remove}}" onclick="request( 25 , {{event.id}} , event )">
					</div>
				{{/type_9}}	
				{{#type_10}}
					<div class="content-form" onclick="closeNotif()">
						<a class="prevent-link not-prevented" onclick="ajaxQuery( 'club' , 'wall' , {{club.id}} , event )" href="../club{{author.id}}/wall">
							<div class="form-descr club">
								<div class="descr-item">
									<span class="icon"></span>
									<span class="text">{{club.name}}</span>
								</div>
								<div class="descr-item">
									<span class="icon"></span>
									<span class="text">{{club.description}}</span>
								</div>
							</div>
						</a>
						<input type="button" class="input-btn-object" value="{{langs.accept}}" onclick="request( 32 , {{club.id}} , event )"
						><input type="button" class="simple-btn-object" value="{{langs.remove}}" onclick="request( 33 , {{club.id}} , event )">
					</div>
				{{/type_10}}
				</div>
			{{/form}}
		</div>
	</div>
{{/notif}}