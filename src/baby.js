let Baby = function(game, position, layer, numero){
	this.game = game;
	this.follow = false;

	let offsetY = (numero - 1 ) * 75;

	this.sprite = this.game.add.sprite(position.x, position.y + offsetY, "baby" + numero);

	this.game.physics.p2.enable(this.sprite); 
	this.sprite.body.data.gravityScale = 0;;
}

Baby.prototype.createSpring = function(player){
	this.game.physics.p2.createSpring(player, this.sprite, 100, 10, 10);
}

export default Baby;