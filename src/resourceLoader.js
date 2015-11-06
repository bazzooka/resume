let ResourceLoader = {

	preload: function(game){
		//game.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png', 128, 128);
        game.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png');
        game.load.spritesheet('decors', 'assets/decoration/decor.png');

        game.load.spritesheet('player', 'assets/player/spritesheet_players.png', 128, 256);

        // game.load.image('background', 'assets/ground/PNG/background-50.png');
        game.load.image('background', 'assets/ground/Backgrounds/colored_grass.png');

        // game.load.image('grass', 'assets/ground/grass_tile.png', 1026, 215);
	}

}

export default ResourceLoader;