import {tile_size, isTouchDevice} from './Constantes';
import Baby from './baby';

let Player = {
	standAnim : [5],
	walkAnim: [12, 20],

	touchParams: {
		wasTouched: false,
		start: null,
		end: null,
		deltaTime: 0,
		delta: null,
		speedX: 0
	},

	baby1: null,
	baby2: null,
	baby3: null,

	callbackOncePosition: [],	// callback to call when positionX > ?

	init : function(game, layer, position){
		this.game = game;
		this.player = game.add.sprite(position.x, position.y, 'player');
		this.player.animations.add('stand', this.standAnim, 1, false);
		this.player.animations.add('walk', this.walkAnim, 10, true);	

		layer.add(this.player);


		this.player.animations.play('stand');

		this.cursors = game.input.keyboard.createCursorKeys();
    	this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    	this.spaceBar.onDown.add(function(key){
    		isMouseWheel = !isMouseWheel;
    	});

    	//game.input.mouse.mouseWheelCallback = this.onMouseWheel;

    	game.input.onUp.add(function(e){
    		this.touchParams.start = e.position;
    		this.touchParams.end = e.positionDown;
    		this.touchParams.deltaTime = e.timeUp - e.timeDown;
    		this.touchParams.delta = {x : e.position.x - e.positionDown.x, y: e.position.y - e.positionDown.y};
    		this.touchParams.speedX = this.touchParams.delta.x / this.touchParams.deltaTime;
			this.touchParams.wasTouched = true;	
    	}, this);

		return this; 
	},

	addPositionCallback: function(position, callback, isOnce = true){
		if(isOnce){
			this.callbackOncePosition.push({positionX: position, callback: callback});
		}
	},

	setStartingBabiesPosition: function(startPosition){
		this.baby1 = new Baby(this.game, startPosition, this.layer, 1);
		this.baby2 = new Baby(this.game, startPosition, this.layer, 2);

		this.addPositionCallback(startPosition.x, () => {
			this.baby1.createSpring(this.player);
			this.baby2.createSpring(this.player);
		}.bind(this));
	},

	setStartingWifePosition: function(startPosition, capturePosition){
		this.baby3 = new Baby(this.game, startPosition, this.layer, 3);

		this.addPositionCallback(capturePosition.x, () => {
			this.baby3.createSpring(this.player);
		}.bind(this));
	},

	update: function(){

		if(this.touchParams.wasTouched){
			this.touchParams.wasTouched = false;
			let velocityX = this.touchParams.speedX > 0 ? Math.min(1000, this.touchParams.speedX * 500) : Math.max(-1000, this.touchParams.speedX * 500),
				velocityY = this.touchParams.delta.y * 10;
			this.player.body.moveUp(-velocityY);
			this.player.body.moveLeft(velocityX);
		}


		if (this.cursors && this.cursors.up.isDown){
        	this.player.body.moveUp(5000);
		}

	    if (this.cursors && this.cursors.left.isDown){
	        this.player.body.moveLeft(400);
	    }
	    else if (this.cursors && this.cursors.right.isDown){ 
	        this.player.body.moveRight(400);
	    }

	    let positionX = this.player.position.x;
	    for(let i = 0, l = this.callbackOncePosition.length; i < l; i++){
	    	if(positionX > this.callbackOncePosition[i].positionX){
	    		this.callbackOncePosition[i].callback();
	    		this.callbackOncePosition.splice(i, 1);
	    		break;
	    	}
	    }

	    let velocityX = Math.round(this.player.body.velocity.destination[0]),
	    	velocityY = Math.round(this.player.body.velocity.destination[1]);

	    if(velocityX > 5){
	    	this.player.scale.x = -1;
	        this.player.play('walk');
	    } else if(velocityX < -5){
			this.player.scale.x = 1;
	        this.player.play('walk');
	    } else {
	    	this.player.play('stand');
	    }

	}
}

export default Player;