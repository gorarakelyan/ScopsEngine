{{#user}}
	<div class="settings material-object">
		<div class="content">
			<div class="header">{{langs.set_account}}</div>
			<form method="post" action="{{main_set.root}}/php_requests/settings.php" class="user-settings-form form-1">
				<input type="hidden" name="query" value="1">
				<div class="set-block">
					<input class="input-text-object" name="name" value="{{name}}">
					<div class="simple">{{langs.name}}</div>
				</div>
				<div class="set-block">
					<input class="input-text-object" name="country" value="{{country}}">
					<div class="simple">{{langs.country}}</div>
				</div>
				<div class="set-block">
					<input class="input-text-object" name="city" value="{{city}}">
					<div class="simple">{{langs.city}}</div>
				</div>
				<div class="set-block birth">
					<select name="day" class="select">
						<option selected disabled value="{{day}}">{{langs.sing_day}}: {{day}}</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>
					<select
					><select name="month" class="select">
						<option selected disabled value="{{month}}">{{langs.month}}: {{month}}</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
					<select
					><select name="year" class="select">
						<option disabled selected value="{{year}}">{{langs.sing_year}}: {{year}}</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option></select>
					</select>
				</div>
				<div class="set-block other">
					<select name="gender" class="select">
						<option selected value="{{gender_opt}}">{{langs.gender}}: {{#gender_man}}{{langs.man}}{{/gender_man}}{{^gender_man}}{{langs.woman}}{{/gender_man}}</option><option value="{{gender_opt_2}}">{{langs.gender}}: {{#gender_man}}{{langs.woman}}{{/gender_man}}{{^gender_man}}{{langs.man}}{{/gender_man}}</option>
					</select
					><select name="privacy" class="select">
						<option selected value="{{privacy_opt}}">{{langs.set_privacy}}: {{#open_privacy}}{{langs.everybody}}{{/open_privacy}}{{^open_privacy}}{{langs.only_friends}}{{/open_privacy}}</option><option value="{{privacy_opt_2}}">{{langs.set_privacy}}: {{#open_privacy}}{{langs.only_friends}}{{/open_privacy}}{{^open_privacy}}{{langs.everybody}}{{/open_privacy}}</option>
					</select>
				</div>
				<div class="set-block other">
					<select name="visits" class="select">
						<option selected value="{{vis_opt}}">{{langs.guests}}: {{#enable_visits}}{{langs.enabled}}{{/enable_visits}}{{^enable_visits}}{{langs.disabled}}{{/enable_visits}}</option><option value="{{vis_opt_2}}">{{langs.guests}}: {{#enable_visits}}{{langs.disabled}}{{/enable_visits}}{{^enable_visits}}{{langs.enabled}}{{/enable_visits}}</option>
					</select
					><select name="dating" class="select">
						<option selected value="{{date_opt}}">{{langs.show_date}}: {{#open_dating}}{{langs.yes}}{{/open_dating}}{{^open_dating}}{{langs.no}}{{/open_dating}}</option><option value="{{date_opt_2}}">{{langs.show_date}}: {{#open_dating}}{{langs.no}}{{/open_dating}}{{^open_dating}}{{langs.y}}{{/open_dating}}</option>
					</select>
				</div>
				<div class="set-block">
					<input type="password" class="input-text-object" name="pass" placeholder="{{langs.curr_pass}}">
				</div>
				<div class="request-status"></div>
				<div class="set-block">
					<div class="input-btn-object submit" onclick="sendSettingsReq( 1 )">{{langs.save_ch}}</div>
				</div>
			</form>
			
			<div class="header">{{langs.gen_set}}</div>
			<form method="post" action="{{main_set.root}}/php_requests/settings.php" class="user-settings-form form-2">
				<input type="hidden" name="query" value="2">
				<div class="set-block pass">
					<input class="input-text-object" name="new_pass" value="">
					<div class="simple"><span class="to-capitalize">{{langs.new_pass}}</span></div>
				</div>
				<div class="set-block pass">
					<input class="input-text-object" name="re_pass" value="">
					<div class="simple"><span class="to-capitalize">{{langs.re_enter_new_pass}}</span></div>
				</div>
				<div class="set-block">
					<input type="password" class="input-text-object" name="current_pass" placeholder="{{langs.curr_pass}}">
				</div>
				<div class="request-status"></div>
				<div class="set-block">
					<div class="input-btn-object submit" onclick="sendSettingsReq( 2 )">{{langs.change_pass}}</div>
				</div>
			</form>
			
			<div class="header">{{langs.del_prof}}</div>
			<form method="post" action="{{main_set.root}}/php_requests/delete.php" class="user-settings-form form-3">
				<input type="hidden" name="act" value="0">
				<div class="set-block">
					<input type="password" class="input-text-object" name="pass" placeholder="{{langs.curr_pass}}">
				</div>
				<div class="request-status"></div>
				<div class="set-block">
					<div class="input-btn-object submit" onclick="sendSettingsReq( 3 )">{{langs.del_prof}}</div>
				</div>
			</form>
		</div>
	</div>
	
	<script src="../js/settings.js" type="text/javascript"></script>
	<script type="text/javascript"> $('.user-settings-form').ajaxForm(); </script>
{{/user}}