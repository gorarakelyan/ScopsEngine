
	{{#statistics}}
		<div class="stat">
			<div class="time-title header-object onl">Active Users</div>
			<div class="date onl">
				<div class="item">
					<div class="num">{{now.online}}</div>
					<div class="title">Now</div>
				</div
				><div class="item">
					<div class="num">{{today.online}}</div>
					<div class="title">Today</div>
				</div
				><div class="item">
					<div class="num">{{week.online}}</div>
					<div class="title">Week</div>
				</div
				><div class="item">
					<div class="num">{{month.online}}</div>
					<div class="title">Month</div>
				</div>
			</div>
			<div class="time-title header-object">Today</div>
			<div class="date">
				<div class="item user">
					<div class="num">{{today.users}}</div>
					<div class="title">Registrations</div>
				</div
				><div class="item club">
					<div class="num">{{today.clubs}}</div>
					<div class="title">New Clubs</div>
				</div
				><div class="item post">
					<div class="num">{{today.posts}}</div>
					<div class="title">New Posts</div>
				</div
				><div class="item comm">
					<div class="num">{{today.comments}}</div>
					<div class="title">New Comments</div>
				</div>
			</div>
			<div class="time-title header-object week">Week</div>
			<div class="date week">
				<div class="item user">
					<div class="num">{{week.users}}</div>
					<div class="title">Registrations</div>
				</div
				><div class="item club">
					<div class="num">{{week.clubs}}</div>
					<div class="title">New Clubs</div>
				</div
				><div class="item post">
					<div class="num">{{week.posts}}</div>
					<div class="title">New Posts</div>
				</div
				><div class="item comm">
					<div class="num">{{week.comments}}</div>
					<div class="title">New Comments</div>
				</div>
			</div>
			<div class="time-title header-object month">Month</div>
			<div class="date month">
				<div class="item user">
					<div class="num">{{month.users}}</div>
					<div class="title">Registrations</div>
				</div
				><div class="item club">
					<div class="num">{{month.clubs}}</div>
					<div class="title">New Clubs</div>
				</div
				><div class="item post">
					<div class="num">{{month.posts}}</div>
					<div class="title">New Posts</div>
				</div
				><div class="item comm">
					<div class="num">{{month.comments}}</div>
					<div class="title">New Comments</div>
				</div>
			</div>
		</div>
	{{/statistics}}
