import ResourceLoader from '../resourceLoader';
import {tile_size, bounds} from '../constantes';
import Player from '../Player';
import BackgroundManager from '../BackgroundManager';



var 
	cloudLayer = null,
	platformLayer = null,
	flatLayer = null,
	// player = null,
	cursors = null,
	spaceBar = null,
    tiles = [];

let isMouseWheel = false,
	mouseWheeling = false;
 

class Game {
	preload() {
		ResourceLoader.preload(this.game);
    }

    initStage (){ 
    	this.game.stage.backgroundColor = '#d0f4f7';
    	this.game.physics.startSystem(Phaser.Physics.P2JS);
    	this.game.world.setBounds(0, 0, bounds, bounds); 
    }
  
    loadMap () {  
    	
        this.map  = BackgroundManager.init(this.game);
    }
 
    initPhysics (){  
		this.map.setCollisionBetween(0, 200);
        // LOOK AT http://test.xapient.net/phaser/tilemapexample/index-p2.html
       	this.game.physics.p2.convertTilemap(this.map, BackgroundManager.getLayer('platform'));
        this.game.physics.p2.convertCollisionObjects(this.map, "collision");
        this.game.physics.p2.restitution = 0.1;
        this.game.physics.p2.gravity.y = 2000;

	    this.game.physics.p2.enable(this.player);
	    this.player.body.setRectangle(100, 140, 0, 50, 0);
        this.player.body.fixedRotation = true;
    }

    create() {
    	
    	this.initStage();
    	this.loadMap();
    	this.player = Player.init(this.game, {x: tile_size * 5 , y: tile_size * 94});
    	this.initPhysics();
          
   		this.camera.follow(this.player);
    }

    update () {
    	Player.update();

    }

    render() {

	    //this.game.debug.body(player);
        // this.player.body.debug = true;
	    // this.game.debug.bodyInfo(this.player, 32, 320);
	}

}

export default Game;