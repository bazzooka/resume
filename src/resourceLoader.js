import TextManager from './TextManager';

let ResourceLoader = {

	preload: function(game){
                game.textManager = new TextManager(game);

                game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js');
                game.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
                game.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png');
                game.load.spritesheet('decors', 'assets/decoration/decor.png');

                game.load.spritesheet('player', 'assets/player/spritesheet_players.png', 128, 256);

                // game.load.image('background', 'assets/ground/PNG/background-50.png');
                game.load.image('background', 'assets/ground/Backgrounds/colored_grass.png');

                game.load.image('about_title', 'assets/decoration/about.png', 1115, 783);
                game.load.image('triangle', 'assets/textures/triangle1.gif', 35, 35);
	}

}

export default ResourceLoader;