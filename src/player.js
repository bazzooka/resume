import {tile_size, isTouchDevice} from './Constantes';

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

	init : function(game, position){
		this.game = game;
		this.player = game.add.sprite(position.x, position.y, 'player');
		this.player.animations.add('stand', this.standAnim, 1, false);
		this.player.animations.add('walk', this.walkAnim, 10, true);



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

		return this.player; 
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
        	this.player.body.moveUp(200);
		}

	    if (this.cursors && this.cursors.left.isDown){
	        this.player.body.moveLeft(400);
	        this.player.scale.x = -1;
	        this.player.play('walk');
	        console.log(this.player.position.x);
	    }
	    else if (this.cursors && this.cursors.right.isDown){
	        this.player.body.moveRight(400);
	        this.player.scale.x = 1;
	        this.player.play('walk');
	    } else {
	    	this.player.play('stand');
	    }
	}
}

export default Player;