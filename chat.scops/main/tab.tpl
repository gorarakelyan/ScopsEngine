{{#chat}}
	<div class="content-pages chat">
		<div class="container"></div>
	</div>
	<script type="text/javascript">		
		openChat( {{id}} , false );
	</script>
{{/chat}}
{{^chat}}
	<div class="content-pages chat">
		<div class="container">
			<div class="empty-object material-object padding">{{langs.not_available_mob}}</div>
		</div>
	</div>
{{/chat}}