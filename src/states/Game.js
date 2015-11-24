"use strict";

import ResourceLoader from '../resourceLoader';
import Const from '../constantes'; 
import Positions from '../positions';
import Player from '../player';
import BackgroundManager from '../backgroundManager';
import TextManager from '../textManager';
import BackPack from '../backPack';
import WelcomeStep from '../steps/welcomeStep';
import AboutStep from '../steps/aboutStep';
import ExpertiseStep from '../steps/expertiseStep';
import ProgrammingStep from '../steps/programmingStep';
import ToolsStep from '../steps/toolsStep';
import ExperienceStep from '../steps/experienceStep';
import ContactStep from '../steps/contactStep';


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
        
        // Create Layer
        this.bgLayer = this.game.add.group();
        this.textLayer = this.game.add.group();
        this.welcomeLayer = this.game.add.group();
        this.aboutLayer = this.game.add.group();
        this.mapLayer = this.game.add.group();
        this.expertiseLayer = this.game.add.group();
        this.programingLayer = this.game.add.group();
        this.toolsLayer = this.game.add.group();
        this.experienceLayer = this.game.add.group();
        this.contactLayer = this.game.add.group();
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

        // Create Contact Materials
        this.groundMaterial = this.game.physics.p2.createMaterial('ground');
        this.playerMaterial = this.game.physics.p2.createMaterial('player');
        
		this.map.map.setCollisionBetween(0, 200); 
        // LOOK AT http://test.xapient.net/phaser/tilemapexample/index-p2.html
        // http://test.xapient.net/phaser/attm/
       	this.platform = this.game.physics.p2.convertTilemap(this.map.map, BackgroundManager.getLayer('platform'));
        this.collisionsTiles = this.game.physics.p2.convertCollisionObjects(this.map.map, "collision");
        this.game.physics.p2.gravity.y = 1400;
        
	    this.game.physics.p2.enable(this.player.player);
        this.player.player.anchor.setTo(0.5,0.5); 
	    this.player.player.body.setRectangle(50, 140, 0, 50, 0);
        this.player.player.body.fixedRotation = true;
        this.player.player.body.damping = 0.9;

        this.game.physics.p2.createContactMaterial(this.playerMaterial, this.groundMaterial, { friction: 2, restitution: 0 });
        this.player.player.body.setMaterial(this.playerMaterial);

        // Create collision group
        this.groundCG = this.game.physics.p2.createCollisionGroup();
        this.playerCG = this.game.physics.p2.createCollisionGroup();
        this.boxCG = this.game.physics.p2.createCollisionGroup();

        this.player.player.body.setCollisionGroup(this.playerCG);
        
        for(let i = 0, l = this.platform.length; i < l; i++){
            this.platform[i].setMaterial(this.groundMaterial);
            // this.platform[i].debug = true;
            this.platform[i].setCollisionGroup(this.groundCG);
            this.platform[i].collides([this.playerCG, this.boxCG]);
        }

        for(let i = 0, l = this.collisionsTiles.length; i < l; i++){
            this.collisionsTiles[i].setMaterial(this.groundMaterial);
            // this.collisionsTiles[i].debug = true;
            this.collisionsTiles[i].setCollisionGroup(this.groundCG);
            this.collisionsTiles[i].collides([this.playerCG]);
        }

        this.player.player.body.collides([this.groundCG, this.boxCG]);
    } 

    createSteps (){
        // this.textLayer.add(this.aboutLayer);
        // this.aboutLayer.position.x = Positions.aboutLayerPosition.x;
        // this.aboutStep = new AboutStep(
        //     this.game, 
        //     this.aboutLayer, 
        //     this.player.addPositionCallback.bind(this.player),
        //     this.player.player
        // );

        // this.expertiseLayer.position.x = Positions.mainExpertisePosition.x;
        // this.expertiseStep = new ExpertiseStep(
        //     this.game,
        //     this.expertiseLayer,
        //     this.player.addPositionCallback.bind(this.player),
        //     {
        //         group: this.boxCG,
        //         groups: [this.playerCG, this.groundCG, this.boxCG]
        //     }
        // )

        // this.programmingStep = new ProgrammingStep(
        //     this.game, 
        //     this.programingLayer,
        //     this.player.addPositionCallback.bind(this.player)
        // )

        // this.toolsStep = new ToolsStep(
        //     this.game,
        //     this.toolsLayer,
        //     this.player.addPositionCallback.bind(this.player),
        //     {
        //         group: this.boxCG,
        //         groups: [this.playerCG, this.boxCG]
        //     }
        // )

        this.experienceStep = new ExperienceStep(
            this.game,
            this.experienceLayer
        )

        this.contactStep = new ContactStep(
            this.game,
            this.contactLayer,
            this.player
        )
        

        
    }

    initBackPack (){
        this.backPack = BackPack;
        this.backPack.init(this.game, this.backPackLayer);
    }

    animateCameraDeadZone (toTightZone) {
        if(this.deadZoneTween){
            this.deadZoneTween.stop();
        }

        // CAMERA FOLLOW_TOPDOWN_TIGHT
        let  helper = Math.max(this.game.width, this.game.height) / 8,
            defaultDeadzone = {x: (this.game.width - helper) / 2, y: (this.game.height - helper) / 2, width: helper, height: helper},
            flyDeadZone = {x: helper * 6.5, y: (this.game.height - helper) / 2, width: helper, height: helper},
            toDeadZone = toTightZone ? defaultDeadzone : flyDeadZone,
            fromDeadZone = this.game.camera.deadzone;

        this.deadZoneTween = this.game.add.tween(fromDeadZone).to(toDeadZone, 1000, "Quart.easeOut", true)
            .onUpdateCallback(function(){  
                this.game.camera.deadzone = new Phaser.Rectangle(fromDeadZone.x, fromDeadZone.y, fromDeadZone.width, fromDeadZone.height);
            }, this);
    }

    create() {
    	
    	this.initStage();
        this.initBackPack();
    	this.loadMap();
    	this.player = Player.init({game: this.game, layer: this.playerLayer, position: Positions.playerInitial, animateDZ: this.animateCameraDeadZone});
    	this.initPhysics();

        this.game.textManager.addTextCallback(this.createSteps.bind(this));
          
   		this.camera.follow(this.player.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    }

    update () {
    	Player.update();
        this.contactStep && this.contactStep.update();

    }

    render() {

        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");  
        // var zone = this.game.camera.deadzone;
        // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
        // this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);


	    // this.player.player.body.debug = true;

	    // this.game.debug.bodyInfo(this.player, 32, 320);

        //this.game.debug.pointer(this.game.input.activePointer);
	}

}

export default Game;