/*
  
  p: Scops Engine
  a: Gor Arakelyan
  c: All rights reserved (c) 2016
  !: fb: facebook.com/arakelianGor
      mail: gor19973010@gmail.com

*/

  var panelSearch = $('#panels #main-panel .item.search .find');
  var searchForm = $('#search-area #search-form');
  var searchRes = $('#search-result');
  
  searchForm.ajaxForm({
    success: function( data ){
      searchRes.empty();
      switch( searchTab ) {
        case 4:
          generateFeed( _root_ + '/php_requests/search.php',{ name: searchForm.find('#name').val(), type: 'tag' , length: loadContentLengths[0] , last_id: 'NULL' } , $('#search-result') , false , true );
        break;
        case 3:
          var dataJSON = JSON.parse( data );
          var tpl = dataJSON.tpl;
          delete dataJSON.tpl;
          
          $('#search-result').html('<div class="audiolist"></div>');
          
          var elem =   $('#search-result .audiolist');
          elem.html( Mustache.to_html( tpl , $.extend( {} , dataJSON , { langs: langs } ) ) );
          var audioID = '';
              
          for( var i =  0 ; i < elem.find('.audio-object').length ; i++ )
            audioID += elem.find('.audio-object').eq(i).data('id') + '-';
          
          elem.attr( 'id' , audioID );
          
          ajaxScrolling = true;
          canStartScroll = true;
          endOfScroll = false;
        break;
        default:
          var dataJSON = JSON.parse( data );
          var tpl = dataJSON.tpl;
          delete dataJSON.tpl;
          
          $('#search-result').html( Mustache.to_html( tpl , $.extend( {} , dataJSON , { langs: langs } ) ));
          
          ajaxScrolling = true;
          canStartScroll = true;
          endOfScroll = false;
        break;
      }
      
      panelSearch.val( searchForm.find('#name').val() ); 
      
    }
  }).submit;
    
  function changeSearchTab( num ) {
    endOfScroll = false;
    continueWall = false;
    searchTab = num;
    $('.options .option').removeClass('selected');
    $('.options .option').eq(num).addClass('selected');
    $('#search-area #search-form').html( hiddenInputs + getSearchTPL()[num] );
    searchForm.find('#name').val( panelSearch.val() );

    searchForm.submit();
  }
  
  var hiddenInputs = '<input type="hidden" name=" mobile_application" value="true"><input type="hidden" name="log_link" value="' + getCookie('link') + '">';
  
  function getSearchTPL() {
    var searchTPL = new Array(
      '<input type="hidden" name="type" value="people">\
      <input type="hidden" name="last_id" value="NULL">\
      <input type="hidden" name="length" value="' + loadContentLengths[2] + '">\
      <div class="line">\
        <input type="text" id="name" class="input-text-object search-input-text people-name" name="name" autocomplete="off" placeholder="' + langs.name + '..">\
        <input type="text" id="country" name="country" class="input-text-object search-input-text" autocomplete="off" placeholder="' + langs.country + '..">\
        <input type="text" id="city" name="city" class="input-text-object search-input-text" autocomplete="off" placeholder="' + langs.city + '..">\
      </div>\
      <div class="line">\
        <select name="gender" id="gender" class="input-text-object search-input">\
          <option value="-1">' + langs.search_gender + '</option>\
          <option value="0">' + langs.man + '</option>\
          <option value="1">' + langs.woman + '</option>\
        </select>\
        <select name="year-from" id="from" class="input-text-object search-input">\
          <option selected="" value="0">' + langs.search_from + '</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option>\
        </select>\
        <select name="year-to" id="to" class="input-text-object search-input">\
          <option selected="" value="100">' + langs.search_to + '</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option>\
        </select>\
        <label class="input-text-object"><input id="online" class="check" value="0" name="online" type="checkbox">' + langs.online + '</label>\
        <label class="input-text-object"><input id="opened" class="check" value="0" name="opened-profile" type="checkbox">' + langs.search_open + '</label>\
        <input type="submit" id="submit" class="input-btn-object" value="' + langs.find + '">\
      </div>',
      
      '<input type="hidden" name="type" value="clubs">\
      <input type="hidden" name="last_id" value="NULL">\
      <input type="hidden" name="length" value="' + loadContentLengths[3] + '">\
      <input type="text" id="name" class="input-text-object search-input-text media-name" name="name" autocomplete="off" placeholder="' + langs.name + '..">\
      <input type="text" id="descr" name="descr" class="input-text-object search-input-text" autocomplete="off" placeholder="' + langs.search_gr_descr + '..">\
      <input type="submit" id="submit" class="input-btn-object" value="' + langs.find + '">',
      
      '<input type="hidden" name="type" value="videos">\
      <input type="hidden" name="length" value="' + loadContentLengths[4] + '">\
      <input type="hidden" name="last_id" value="NULL">\
      <input type="text" id="name" class="input-text-object search-input-text media-name" name="name" autocomplete="off" placeholder="' + langs.name + '..">\
      <input type="submit" id="submit" class="input-btn-object" value="' + langs.find + '">',
      
      '<input type="hidden" name="type" value="audios">\
      <input type="hidden" name="last_id" value="NULL">\
      <input type="hidden" name="length" value="' + loadContentLengths[8] + '">\
      <input type="text" id="name" class="input-text-object search-input-text media-name" name="name" autocomplete="off" placeholder="' + langs.name + '..">\
      <input type="submit" id="submit" class="input-btn-object" value="' + langs.find + '">',
      
      '<input type="hidden" name="type" value="tag">\
      <input type="hidden" name="dont" value="1">\
      <input type="text" id="name" class="input-text-object search-input-text media-name" name="name" autocomplete="off" placeholder="' + langs.hashtag + '..">\
      <input type="submit" id="submit" class="input-btn-object" value="' + langs.find + '">'
        
      );
      
    return searchTPL;
  }
