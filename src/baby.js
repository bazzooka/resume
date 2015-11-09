let Baby = function(game, position, layer, numero){
	this.game = game;
	console.log(position.y + Math.random()*20);
	this.sprite = this.game.add.sprite(position.x, position.y + numero * 75, "baby" + numero);
}

Baby.prototype.moveTo = function(position){
	this.sprite.position.x = player.position.x;
}

Baby.prototype.stand = function(){
	// this.sprite.position.x = this.sprite.position.x + Math.random()
}

export default Baby;