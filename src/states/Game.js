var map = null,
	cloudLayer = null,
	platformLayer = null,
	player = null,
	cursors = null,
	spaceBar = null,
    tiles = [];

let isMouseWheel = false,
	mouseWheeling = false;


class Game {
	preload() {
        //this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png', 128, 128);
        this.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png');

        this.load.spritesheet('player', 'assets/player/spritesheet_players.png', 128, 256);

        this.load.image('background', 'assets/ground/PNG/background-50.png');

        // this.load.image('grass', 'assets/ground/grass_tile.png', 1026, 215);
    }

    create() {
    	this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.backgroundColor = '#00bff3';
        this.game.world.setBounds(0, 0, 100*128, 100*128); 

        // Background
        this.background = this.game.add.tileSprite(0, 0, 1700, 1200, 'background');
        this.background.fixedToCamera = true;

        map = this.game.add.tilemap('map');
        map.addTilesetImage('ground', 'ground');

        cloudLayer = map.createLayer('cloud');
        platformLayer = map.createLayer('platform');

        // this.grass = this.game.add.tileSprite(128, 95.5*128, 100*128, this.game.cache.getImage('grass').height, 'grass');

        map.setLayer(platformLayer); 

	    //  This resizes the game world to match the layer dimensions
	    //level0.debug = true;
	    // cloudLayer.resizeWorld();
	    // cloudLayer.wrap = true;
	    // cloudLayer.scrollFactorX = 1.15;

		//level1.debug = true;
	    platformLayer.resizeWorld();
	    //platformLayer.wrap = true;
	    //level1.scrollFactorX = 1.15;

        map.setCollisionBetween(0, 200);
        // LOOK AT http://test.xapient.net/phaser/tilemapexample/index-p2.html
        tiles = this.game.physics.p2.convertCollisionObjects(map, platformLayer, true);
        this.game.physics.p2.restitution = 0.1;
        this.game.physics.p2.gravity.y = 300;

		//mapGroup.x = -100;
	    player = this.game.add.sprite(128*5, 94*128, 'player', 5);
	    player.frame = 5;

	    this.game.physics.p2.enable(player);
        player.body.fixedRotation = true;

	    // player.body.bounce.y = 0.2;
	    // player.body.bounce.x = 0.2;
	    // player.body.linearDamping = 1;
	    // player.body.collideWorldBounds = true;
	    // player.body.width = 80;
	    // player.body.height = 135;
	    // player.body.offset.x = 20;
	    // player.body.offset.y = 120;
	    // player.body.immovable = true;

    	this.camera.follow(player);

    	cursors = this.game.input.keyboard.createCursorKeys();
    	spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    	spaceBar.onDown.add(function(key){
    		isMouseWheel = !isMouseWheel;
    	});

    	this.game.input.mouse.mouseWheelCallback = this.onMouseWheel;


	    //this.camera.setPosition(128*5, 91*128)
    }

    onMouseWheel (e) {
    	mouseWheeling = true;
    	e.preventDefault();
    }

    update () {
    	//this.physics.arcade.collide(player, platformLayer);

    	// if(isMouseWheel){
    	// 	this.updateWheel();
    	// } else {

	    // 	player.body.velocity.x = 0;

	    	if (cursors && cursors.up.isDown){
                player.body.moveUp(50);
		   //      if (player.body.onFloor())
		   //      {
		   //          player.body.velocity.y = -600;
		   //      }
		    }

		    if (cursors && cursors.left.isDown){
		        player.body.moveLeft(200);
                //player.body.velocity.x = -500;
		        // this.grass.tilePosition.x -= 10;
		    }
		    else if (cursors && cursors.right.isDown){
		        player.body.velocity.x = 500;
		        // this.grass.tilePosition.x += 10;
		    }
    	// }
    }

    updateWheel () {
    // 	let wheel = this.input.mouse.wheelDelta;
    	
    // 	if(wheel && mouseWheeling){
    // 		player.body.velocity.x = 1000 * wheel;
    // 		mouseWheeling = false;
    // 	} else {
    // 		if(wheel === 1){
    // 			player.body.velocity.x = Math.max(0, player.body.velocity.x - 100 );
    // 		} else if(wheel === -1){
				// player.body.velocity.x = Math.min(0, player.body.velocity.x + 100 );
    // 		}
    		
    // 	}

    // 	if(player.body.blocked.right || player.body.blocked.left){
    // 		if(player.body.blocked.right) {
    // 			player.body.velocity.x = -150;
    // 		} else {
    // 			player.body.velocity.x = +150;
    // 		}
    		
    // 		player.body.velocity.y = -350;
    // 	}
    }


    render() {

	    //this.game.debug.body(player);
        if(player)
            player.body.debug = true;
	    // this.game.debug.bodyInfo(player, 32, 320);
	}

}

export default Game;