import ResourceLoader from '../resourceLoader';
import {tile_size, bounds, isTouchDevice} from '../constantes';
import Player from '../Player';
import BackgroundManager from '../BackgroundManager';
import TextManager from '../TextManager';
import AboutStep from '../steps/aboutStep';


let isMouseWheel = false,
	mouseWheeling = false;
 

class Game {
	preload() {
		ResourceLoader.preload(this.game);

        this.game.time.advancedTiming = true;
    }

    initStage (){ 
    	this.game.stage.backgroundColor = '#d0f4f7';
    	this.game.world.setBounds(0, 0, bounds, bounds); 
        this.bgLayer = this.game.add.group();
        this.textLayer = this.game.add.group();
        this.aboutLayer = this.game.add.group();
        this.playerLayer = this.game.add.group();
        window.addEventListener("resize", function() {
            let w = window.innerWidth,
                h = window.innerHeight;
            this.map.onResize(w, h);
        }.bind(this));
    }
  
    loadMap () {  
        this.map  = BackgroundManager.init(this.game, this.bgLayer);
    }
  
    initPhysics (){

        if(isTouchDevice){ 
            this.game.physics.startSystem(Phaser.Physics.P2JS);
        } else {
            this.game.physics.startSystem(Phaser.Physics.P2JS);
        } 
		this.map.map.setCollisionBetween(0, 200); 
        // LOOK AT http://test.xapient.net/phaser/tilemapexample/index-p2.html
       	this.game.physics.p2.convertTilemap(this.map.map, BackgroundManager.getLayer('platform'));
        this.game.physics.p2.convertCollisionObjects(this.map.map, "collision");
        this.game.physics.p2.restitution = 0.1;
        this.game.physics.p2.gravity.y = 2000;

	    this.game.physics.p2.enable(this.player.player); 
	    this.player.player.body.setRectangle(100, 140, 0, 50, 0);
        this.player.player.body.fixedRotation = true;
    } 

    createAboutText (){
        this.textLayer.add(this.aboutLayer);
        this.aboutLayer.position.x = 2000;
        this.aboutStep = new AboutStep(
            this.game, 
            this.aboutLayer, 
            this.player.addPositionCallback.bind(this.player),
            this.player.setStartingBabiesPosition.bind(this.player),
            this.player.setStartingWifePosition.bind(this.player)
        );

        
    }

    create() {
    	
    	this.initStage();
    	this.loadMap();
    	this.player = Player.init(this.game, this.playerLayer, {x: tile_size * 5 , y: tile_size * 94});
    	this.initPhysics();

        this.game.textManager.addTextCallback(this.createAboutText.bind(this));


        // this.nameText = new WebText(this.game, "NAME", {x: 500, y: bounds - 300});
          
   		this.camera.follow(this.player.player);
    }

    update () {
    	Player.update();

    }

    render() {

        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");   

	    //this.game.debug.body(player);
        // this.player.body.debug = true;
	    // this.game.debug.bodyInfo(this.player, 32, 320);

        //this.game.debug.pointer(this.game.input.activePointer);
	}

}

export default Game;