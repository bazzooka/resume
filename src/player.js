import Positions from './positions';
import Const from './constantes';
let Player = {
	standAnim : [5],
	walkAnim: [12, 20],
	moveVerticalForce: 600,
	moveHorizontalForce: 500,

	touchParams: {
		wasTouched: false,
		start: null,
		end: null,
		deltaTime: 0,
		delta: null,
		speedX: 0
	},
	isInWater: false,
	waterStart: 58,

	callbackOncePosition: [],	// callback to call when positionX > ?
	callbackOnPosition: [],	// callback to call when positionX > ?

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

	touchingDown: function(){
    	var yAxis = p2.vec2.fromValues(0, 1);
    	var result = false;
    	for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        	var c = this.game.physics.p2.world.narrowphase.contactEquations[i];  // cycles through all the contactEquations until it finds our "someone"
    		if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data){
        		var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
        		if (c.bodyA === this.player.body.data) d *= -1;
        		if (d > 0.5) result = true;
    		}
    	}
    	return result;
	},


	update: function(){
		// console.log(this.touchingSide());
		let positionX = this.player.position.x,
			positionY = this.player.position.y,
			isBetweenWaterPosition = positionX > Positions.waterPositions.x1 && positionX < Positions.waterPositions.x2 && positionY > (Const.GROUND - 128);

		// WATER
	    this.player.body.velocity.x=0;  // reset player velocity every step
	    if(!this.isInWater && isBetweenWaterPosition){
	    	this.isInWater = true;
	    	console.log("inWater");
	    } else if(this.isInWater && !isBetweenWaterPosition){
	    	this.isInWater = false;
	    	console.log("!inWater");
	    }


		// TOUCH PARAMS
		if(this.touchParams.wasTouched){
			this.touchParams.wasTouched = false;
			let speedFriction = this.isInWater ? 250 : 500;
			let velocityX = this.touchParams.speedX > 0 ? Math.min(1000, this.touchParams.speedX * speedFriction) : Math.max(-1000, this.touchParams.speedX * speedFriction),
				velocityY = this.touchParams.delta.y * 10;
			this.player.body.moveUp(-velocityY);
			this.player.body.moveLeft(velocityX);
			console.log(velocityX);
		}

		// KEYBOARD
		let waterFriction = this.isInWater ? 0.5: 1;
		if (this.cursors && this.cursors.up.isDown){
			if(!this.isInWater && this.touchingDown()){
				// this.player.body.moveUp(this.moveVerticalForce * waterFriction);
				this.player.body.velocity.y = -this.moveVerticalForce * waterFriction;
			} else if(this.isInWater){
				// this.player.body.moveUp(this.moveVerticalForce * waterFriction);
				this.player.body.velocity.y = -this.moveVerticalForce * waterFriction;
			} 
		}
	    if (this.cursors && this.cursors.left.isDown){
	        // this.player.body.moveLeft(this.moveHorizontalForce * waterFriction);
	        this.player.body.velocity.x = -this.moveHorizontalForce * waterFriction;
	    } else if(this.cursors && this.cursors.right.isDown){
	    	this.player.body.velocity.x = this.moveHorizontalForce * waterFriction;
	    }

	    // CALLBACK ON POSITION
	    
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