{{#users}}
	<div class="user-object" data-id="{{id}}">
		<a href="{{root}}id{{id}}" target="_blank">
			<div class="thumb" style="background:url('{{root}}{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: cover;"></div>
		</a>
		<div class="info">
			<div class="name">
				<a href="{{root}}id{{id}}" target="_blank">
					<div class="link-object">{{name}}</div>
				</a>
				<div class="loc">#{{id}}</div>
			</div>
			<div class="opt">
				<div class="input-btn-object" data-admin="{{set_admin}}" data-host="{{host}}" onclick="delUser({{id}} , event , 0 )">Delete</div>
				<div class="input-btn-object verified {{^verified}}not{{/verified}}" data-admin="{{set_admin}}" data-host="{{host}}" onclick="verifyUser({{id}} , event)">Verify</div>
			</div>
		</div>
	</div>
{{/users}}

{{#clubs}}
	<div class="user-object" data-id="{{id}}">
		<a href="{{root}}club{{id}}" target="_blank">
			<div class="thumb" style="background:url('{{root}}{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: cover;"></div>
		</a>
		<div class="info">
			<div class="name">
				<a href="{{root}}club{{id}}" target="_blank">
					<div class="link-object">{{name}}</div>
				</a>
				<div class="loc">#{{id}}</div>
			</div>
			<div class="opt">
				<div class="input-btn-object" data-admin="{{set_admin}}" data-host="{{host}}" onclick="delUser({{id}} , event , 1 )">Delete</div>
			</div>
		</div>
	</div>
{{/clubs}}

{{#ads}}
	<div class="ads-get user-object" data-id="{{id}}">
		{{#img}}
		<a href="{{url}}" target="_blank">
			<div class="thumb" style="background:url('{{host}}{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: cover;"></div>
		</a>
		{{/img}}
		<div class="info {{^img}}no-margin{{/img}}">
			<div class="name">
				<a href="{{url}}" target="_blank">
					<div class="link-object">{{title}}</div>
				</a>
				<div class="loc">{{description}}</div>
				<div class="limit">{{limit}}</div>
			</div>
			<div class="opt">
				<div class="input-btn-object" onclick="delAD({{id}} , event )">Delete</div>
			</div>
		</div>
	</div>
{{/ads}}

{{#games}}
	<div class="user-object game" data-id="{{id}}">
		<a href="{{root}}game{{id}}" target="_blank">
			<div class="thumb" style="background:url('{{root}}{{cover}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: cover;"></div>
		</a>
		<div class="info">
			<div class="name">
				<a href="{{root}}game{{id}}" target="_blank">
					<div class="link-object">{{name}}</div>
				</a>
				<div class="loc">{{about}}</div>
			</div>
			<div class="opt">
				<div class="input-btn-object" onclick="delGame({{id}})">Delete</div>
			</div>
		</div>
	</div>
{{/games}}

{{#stickers}}
	<div class="user-object st" data-id="{{id}}">
		<div class="thumb" style="background:url('{{root}}{{thumb}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: contain;"></div>
		<div class="info">
			<div class="name">{{name}}</div>
			<div class="opt">
				<div class="input-btn-object" onclick="delStickerPack({{id}})">Delete</div>
			</div>
		</div>
	</div>
{{/stickers}}

{{#gifts}}
	<div class="user-object st" data-id="{{id}}">
		<div class="thumb" style="background:url('{{root}}{{img}}');background-repeat:no-repeat;background-position: 50% 50%;background-size: contain;"></div>
		<div class="info">
			<div class="name">{{name}}</div>
			<div class="opt">
				<div class="input-btn-object" onclick="delGift({{id}})">Delete</div>
			</div>
		</div>
	</div>
{{/gifts}}

{{#reports}}
	<div class="user-object report" data-id="{{extra_column_2}}">
		<div class="info">
			<div class="name">
				<span class="icon"></span>{{extra_column_1}}
			</div>
			<div class="opt">
				<div class="input-btn-object" onclick="delAnnounce( {{extra_column_2}} )">Delete</div>
			</div>
		</div>
	</div>
{{/reports}}

{{#langs}}
	<div class="user-object lang" data-id="{{id}}">
		<div class="info">
			<div class="name">
				<span class="icon"></span>{{title}}
			</div>
			<div class="opt">
				<div class="input-btn-object" onclick="delLange( {{id}} )">Delete</div>
			</div>
		</div>
	</div>
{{/langs}}
