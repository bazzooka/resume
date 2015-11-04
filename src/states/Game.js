var map = null,
mapGroup = null,
level0 = null,
level1 = null,
player = null,
cursors = null;


class Game {
	preload() {
        //this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png', 128, 128);
        this.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png');

        this.load.spritesheet('player', 'assets/player/spritesheet_players.png', 128, 256);
    }

    create() {
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#787878';
        this.game.world.setBounds(0, 0, 100*128, 100*128);

        map = this.game.add.tilemap('map');
        map.addTilesetImage('ground', 'ground');

        //level0 = map.createLayer('level0');
        level1 = map.createLayer('level1');
        mapGroup = this.add.group();

        //mapGroup.add(level0);
        mapGroup.add(level1);

        map.setLayer(level1);
        map.setCollisionBetween(1, 16);

	    //  This resizes the game world to match the layer dimensions
	    //level0.debug = true;
	    // level0.resizeWorld();
	    // level0.wrap = true;

		//level1.debug = true;
	    level1.resizeWorld();
	    level1.wrap = true;

		//mapGroup.x = -100;
	    player = this.game.add.sprite(128*5, 92*128, 'player', 5);
	    player.frame = 5;

	    this.game.physics.enable(player);
	    this.physics.arcade.gravity.y = 1000;

	    player.body.bounce.y = 0.2;
	    player.body.linearDamping = 1;
	    player.body.collideWorldBounds = true;
	    player.body.width = 80;
	    player.body.height = 150;
	    player.body.offset.x = 20;
	    player.body.offset.y = 100;

	    console.log(player.body)

    	this.camera.follow(player);

    	cursors = this.game.input.keyboard.createCursorKeys();

	    //this.camera.setPosition(128*5, 91*128)
    }

    update () {
    	this.physics.arcade.collide(player, level1);

    	player.body.velocity.x = 0;

    	if (cursors.up.isDown){
	        if (player.body.onFloor())
	        {
	            player.body.velocity.y = -800;
	        }
	    }

	    if (cursors.left.isDown){
	        player.body.velocity.x = -150;
	    }
	    else if (cursors.right.isDown){
	        player.body.velocity.x = 150;
	    }
    	//
    }

    render() {

	    this.game.debug.body(player);
	    this.game.debug.bodyInfo(player, 32, 320);
	}

}

export default Game;