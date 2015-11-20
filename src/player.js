import Positions from './positions';
import Const from './constantes';
let Player = {
	standAnim : [5],
	walkAnim: [12, 20],
	flyStandAnim: [28, 36],
	flyUpAnim: [12],
	flyDownAnim: [60],
	moveVerticalForce: 600,
	moveHorizontalForce: 500,

	touchParams: {
		wasTouched: false,
		start: null,
		end: null,
		deltaTime: 0,
		delta: null,
		speedX: 0,
		speedY: 0
	},
	isInWater: false,
	waterStart: 58,
	wasInFlyZone: false,

	callbackOncePosition: [],	// callback to call when positionX > ?
	callbackOnPosition: [],	// callback to call when positionX > ?

	init : function(params){
		this.game = params.game;
		this.player = this.game.add.sprite(params.position.x, params.position.y, 'player');
		this.player.animations.add('stand', this.standAnim, 1, false);
		this.player.animations.add('walk', this.walkAnim, 10, true);
		this.player.animations.add('flyStand', this.flyStandAnim, 5, true);
		this.player.animations.add('flyUp', this.flyUpAnim, 0, false);
		this.player.animations.add('flyDown', this.flyDownAnim, 0, false);

		params.layer.add(this.player);


		this.player.animations.play('walk');

		this.animateDZ = params.animateDZ;

		this.cursors = this.game.input.keyboard.createCursorKeys();
    	this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    	this.spaceBar.onDown.add(function(key){
    		isMouseWheel = !isMouseWheel;
    	});

    	//game.input.mouse.mouseWheelCallback = this.onMouseWheel;

    	this.game.input.onUp.add(function(e){
    		this.touchParams.start = e.position;
    		this.touchParams.end = e.positionDown;
    		this.touchParams.deltaTime = e.timeUp - e.timeDown;
    		this.touchParams.delta = {x : e.position.x - e.positionDown.x, y: e.position.y - e.positionDown.y};
    		this.touchParams.speedX = this.touchParams.delta.x / this.touchParams.deltaTime;
    		this.touchParams.speedY = this.touchParams.delta.y / this.touchParams.deltaTime;
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
			isBetweenWaterPosition = positionX > Positions.waterPositions.x1 && positionX < Positions.waterPositions.x2 && positionY > (Const.GROUND - 128),
			canFly = positionX > Positions.flyRegion.x1 && positionX < Positions.flyRegion.x2 && positionY > Positions.flyRegion.y1;

		// WATER
	    if(!this.isInWater && isBetweenWaterPosition){
	    	this.isInWater = true;
	    } else if(this.isInWater && !isBetweenWaterPosition){
	    	this.isInWater = false;
	    }

	    // Can Fly ?
	    if(canFly && !this.wasInFlyZone){
	    	this.player.body.data.gravityScale = 0;
	    	this.wasInFlyZone = true;
	    	this.animateDZ(false);
	    } else if(this.wasInFlyZone && !canFly) {
			this.animateDZ(true);
			this.wasInFlyZone = false;
	    	this.player.body.data.gravityScale = 1;
	    }

		// TOUCH PARAMS
		if(this.touchParams.wasTouched){
			this.touchParams.wasTouched = false;
			let speedFriction = this.isInWater ? 250 : 500;
			let velocityX = this.touchParams.speedX > 0 ? Math.min(1000, this.touchParams.speedX * speedFriction) : Math.max(-1000, this.touchParams.speedX * speedFriction),
				velocityY = Math.max(-1000, this.touchParams.speedY * speedFriction);
			
			if(!canFly){
				if(!this.isInWater && this.touchingDown()){
				this.player.body.moveUp(-velocityY);
				} else if(this.isInWater){
					this.player.body.moveUp(-velocityY);
				} 
				this.player.body.moveLeft(-velocityX);
			} else {
				console.log("Can fly touch device");
			}
		}

		// KEYBOARD
		let waterFriction = this.isInWater ? 0.5: 1,
			airFrictionY = 2.2,
			airFrictionX = 0.2;

		if(!canFly){
			if (this.cursors && this.cursors.up.isDown){
				if(!this.isInWater && this.touchingDown()){
					// this.player.body.moveUp(this.moveVerticalForce * waterFriction);
					this.player.body.velocity.y = -this.moveVerticalForce * waterFriction;
				} else if(this.isInWater){
					// this.player.body.moveUp(this.moveVerticalForce * waterFriction);
					this.player.body.velocity.y = -this.moveVerticalForce * waterFriction;
				}
			}
		} else if (this.cursors && this.cursors.up.isDown){
			this.player.body.velocity.y = -this.moveVerticalForce * airFrictionY;
		} else if (this.cursors && this.cursors.down.isDown){
			this.player.body.velocity.y = this.moveVerticalForce * airFrictionY;
		}
		
		if(!canFly){
			if (this.cursors && this.cursors.left.isDown){
			    // this.player.body.moveLeft(this.moveHorizontalForce * waterFriction);
			    this.player.body.velocity.x = -this.moveHorizontalForce * waterFriction;
			} else if(this.cursors && this.cursors.right.isDown){
				this.player.body.velocity.x = this.moveHorizontalForce * waterFriction;
			}
		} else if (this.cursors && this.cursors.left.isDown){
		    this.player.body.velocity.x = -this.moveHorizontalForce * airFrictionX;
		} else if(this.cursors && this.cursors.right.isDown){
			this.player.body.velocity.x = this.moveHorizontalForce * airFrictionX;
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

	    if(!canFly){
    	    if(velocityX > 5){
    	    	this.player.scale.x = -1;
    	        this.player.play('walk');
    	    } else if(velocityX < -5){
    			this.player.scale.x = 1;
    	        this.player.play('walk');
    	    } else {
    	    	this.player.play('stand');
    	    }
	    } else {
	    	if(velocityX > 2){
    	    	this.player.scale.x = -1;
    	        this.player.play('flyStand');
    	    } else if(velocityX < -2){
    			this.player.scale.x = 1;
    	        this.player.play('flyStand');
    	    } else if(velocityY > 3) {
    	    	this.player.play('flyUp');
    	    } else if(velocityY < -3) {
    	    	this.player.play('flyDown');
    	    } else {
    	    	this.player.play('flyStand');
    	    }
	    }
	    

	}
}

export default Player;