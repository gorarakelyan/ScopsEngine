{{#game}}
  {{^empty}}
    <div class="game">
      <div class="info">
        <div class="icon"></div>
        <div class="name">{{name}}</div>
        <div class="about">{{about}}</div>
      </div>
      <div class="resize" onclick="game.change( event )" onmousedown="game.down()">
        <div class="size-bar"></div>
      </div>
      <div class="game-html" data-prop="{{prop}}">{{{link}}}</div>
    </div>
  {{/empty}}
  {{#empty}}<div class="empty-object padding"> {{langs.error_404}} </div>{{/empty}}
{{/game}}