"use strict";

import ResourceLoader from '../resourceLoader';
import Const from '../constantes';
import Positions from '../positions';
import Player from '../Player';
import BackgroundManager from '../BackgroundManager';
import TextManager from '../TextManager';
import BackPack from '../BackPack';
import WelcomeStep from '../steps/welcomeStep';
import AboutStep from '../steps/aboutStep';
import ExpertiseStep from '../steps/expertiseStep';
import ProgrammingStep from '../steps/programmingStep';


let isMouseWheel = false,
	mouseWheeling = false; 
 

class Game {
	preload() {
		ResourceLoader.preload(this.game);

        this.game.time.advancedTiming = true;
    }

    initStage (){ 
    	this.game.stage.backgroundColor = '#d0f4f7';
    	this.game.world.setBounds(0, 0, Const.BOUNDS, Const.BOUNDS); 
        this.bgLayer = this.game.add.group();
        this.textLayer = this.game.add.group();
        this.welcomeLayer = this.game.add.group();
        this.aboutLayer = this.game.add.group();
        this.mapLayer = this.game.add.group();
        this.expertiseLayer = this.game.add.group();
        this.programingLayer = this.game.add.group();
        this.playerLayer = this.game.add.group(); 
        this.backPackLayer = this.game.add.group();
        window.addEventListener("resize", function() {
            let w = this.game.width,
                h = this.game.height;
            this.map.onResize(w, h);
        }.bind(this));
    }
  
    loadMap () {  
        this.map  = BackgroundManager.init(this.game, {bgLayer : this.bgLayer, mapLayer: this.mapLayer});
    }
  
    initPhysics (){

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
		this.map.map.setCollisionBetween(0, 200); 
        // LOOK AT http://test.xapient.net/phaser/tilemapexample/index-p2.html
       	this.platform = this.game.physics.p2.convertTilemap(this.map.map, BackgroundManager.getLayer('platform'));
        this.collisionsTiles = this.game.physics.p2.convertCollisionObjects(this.map.map, "collision");
        // this.game.physics.p2.restitution = 0.0;
        this.game.physics.p2.gravity.y = 1400;
        for(let i = 0, l = this.platform.length; i < l; i++){
            this.platform[i].data.damping = 0;
            this.platform[i].data.angularDamping = 0;
            
        }

	    this.game.physics.p2.enable(this.player.player);
        this.player.player.anchor.setTo(0.5,0.5); 
	    this.player.player.body.setRectangle(100, 140, 0, 50, 0);
        this.player.player.body.fixedRotation = true;
        this.player.player.body.inertia = 1;
    } 

    createSteps (){
        // this.textLayer.add(this.aboutLayer);
        this.aboutLayer.position.x = Positions.aboutLayerPosition.x;
        this.aboutStep = new AboutStep(
            this.game, 
            this.aboutLayer, 
            this.player.addPositionCallback.bind(this.player),
            this.player.player
        );

        this.expertiseLayer.position.x = Positions.mainExpertisePosition.x;
        this.expertiseStep = new ExpertiseStep(
            this.game,
            this.expertiseLayer,
            this.player.addPositionCallback.bind(this.player)
        )

        this.programmingStep = new ProgrammingStep(
            this.game, 
            this.programingLayer,
            this.player.addPositionCallback.bind(this.player)
        )
        

        
    }

    initBackPack (){
        this.backPack = BackPack;
        this.backPack.init(this.game, this.backPackLayer);
    }

    create() {
    	
    	this.initStage();
        this.initBackPack();
    	this.loadMap();
    	this.player = Player.init(this.game, this.playerLayer, {x: Const.TILE_SIZE * 5 , y: Const.GROUND - Const.TILE_SIZE * 5});
    	this.initPhysics();

        this.game.textManager.addTextCallback(this.createSteps.bind(this));


        // this.nameText = new WebText(this.game, "NAME", {x: 500, y: Const.BOUNDS - 300});
          
   		this.camera.follow(this.player.player, Phaser.Camera.FOLLOW_TOPDOWN);
    }

    update () {
    	Player.update();

    }

    render() {

        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");   

	    this.player.player.body.debug = true;
        this.platform.debugBody = true;
        //this.map.body.debug = true;
	    // this.game.debug.bodyInfo(this.player, 32, 320);

        //this.game.debug.pointer(this.game.input.activePointer);
	}

}

export default Game;