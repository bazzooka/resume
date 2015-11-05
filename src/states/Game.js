var map = null,
	level0 = null,
	level1 = null,
	player = null,
	cursors = null,
	spaceBar = null;

let isMouseWheel = true,
	mouseWheeling = false;


class Game {
	preload() {
        //this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png', 128, 128);
        this.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png');

        this.load.spritesheet('player', 'assets/player/spritesheet_players.png', 128, 256);
    }

    create() {
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#00bff3';
        this.game.world.setBounds(0, 0, 100*128, 100*128);

        map = this.game.add.tilemap('map');
        map.addTilesetImage('ground', 'ground');

        //level0 = map.createLayer('level0');
        level1 = map.createLayer('level1');

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
	    player.body.bounce.x = 0.2;
	    player.body.linearDamping = 1;
	    player.body.collideWorldBounds = true;
	    player.body.width = 80;
	    player.body.height = 135;
	    player.body.offset.x = 20;
	    player.body.offset.y = 120;
	    player.body.tilePadding.set(50,50);

	    console.log(player.body)

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
    	this.physics.arcade.collide(player, level1);

    	if(isMouseWheel){
    		this.updateWheel();
    	} else {

	    	player.body.velocity.x = 0;

	    	if (cursors.up.isDown){
		        if (player.body.onFloor())
		        {
		            player.body.velocity.y = -600;
		        }
		    }

		    if (cursors.left.isDown){
		        player.body.velocity.x = -500;
		    }
		    else if (cursors.right.isDown){
		        player.body.velocity.x = 500;
		    }
    	}
    }

    updateWheel () {
    	let wheel = this.input.mouse.wheelDelta;
    	
    	if(wheel && mouseWheeling){
    		player.body.velocity.x = 1000 * wheel;
    		mouseWheeling = false;
    	} else {
    		if(wheel === 1){
    			player.body.velocity.x = Math.max(0, player.body.velocity.x - 100 );
    		} else if(wheel === -1){
				player.body.velocity.x = Math.min(0, player.body.velocity.x + 100 );
    		}
    		
    	}

    	if(player.body.blocked.right || player.body.blocked.left){
    		if(player.body.blocked.right) {
    			player.body.velocity.x = -150;
    		} else {
    			player.body.velocity.x = +150;
    		}
    		
    		player.body.velocity.y = -350;
    	}
    }


    render() {

	    this.game.debug.body(player);
	    this.game.debug.bodyInfo(player, 32, 320);
	}

}

export default Game;