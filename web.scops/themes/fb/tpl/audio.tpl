
{{#music}}
	<div class="audio-object material-object mus-{{id}}" data-src="{{name}}" data-id="{{id}}">

			<div class="audio-body">
				<div class="audio-func">
						<div class="play" onclick="playAudio( {{id}} , event , false )"></div>
						<div class="pause" onclick="playAudio( {{id}} , event , false )"></div>
				</div>
				<div class="audio-info">
					<div class="name">{{description}}</div>
					<div class="adding-options">
						<div class="opt" onclick="request( 14 , {{id}})">{{#added}}{{/added}}{{^added}}{{/added}}</div>
					</div>
					<div class="dur"></div>
				</div>
			</div>
			<div class="options">
				<div class="volume">
					<div class="icon"></div>
					<div class="option">
						<div class="pointer"></div>
						<div class="line"></div>
						<div class="load"></div>
					</div>
				</div>
				<div class="loop" onclick="changeLoop(0)">
					<div class="icon"></div>
					<span class="name">{{langs.audio_once}}</span>
				</div>
				<div class="loop" onclick="changeLoop(1)">
					<div class="icon"></div>
					<span class="name">{{langs.audio_repeat}}</span>
				</div>
				<div class="loop" onclick="changeLoop(2)">
					<div class="icon"></div>
					<span class="name">{{langs.audio_all}}</span>
				</div>
			</div>
		
			<div class="audio-line">
				<div class="loader"></div>
				<div class="seek" onmousedown="seekAudio( event , {{id}} )" data-check="1"></div>
			</div>
			
	</div>
{{/music}}
