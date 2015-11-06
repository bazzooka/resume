import {tile_size} from './Constantes';

let Player = {
	standAnim : [5],
	walkAnim: [12, 20],

	init : function(game, position){
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

		return this.player; 
	},

	update: function(){
		if (this.cursors && this.cursors.up.isDown){
        	this.player.body.moveUp(150);
		}

	    if (this.cursors && this.cursors.left.isDown){
	        this.player.body.moveLeft(400);
	        this.player.scale.x = -1;
	        this.player.play('walk');
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