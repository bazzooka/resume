import Const from './constantes';

let BackPack = {
	game: null, 
	layer: null,
	space: 65,
	nbElement: 0,
}

BackPack.init = function(game, layer){
	this.game = game;
	this.layer = layer;

	
	this.layer.position.x = 0;
	this.layer.position.y = 0;
	this.layer.fixedToCamera = true;

	this.backpack = this.game.add.sprite(0, 0, "backpack");
	this.backpack.fixedToCamera = true;
	this.nbElement++;

	this.game.backPack = this;
}

BackPack.add = function(sprite, frame = null, useBody = false, animate = true){
	let toMove = useBody ? sprite.body: sprite;

	if(animate){
		let tween = this.game.add.tween(toMove).to({y:Const.GROUND - this.game.height - sprite.height}, 1000, "Linear", true);
		tween.onComplete.add(() => {
			this.addToBackPack(sprite, frame);
		}, this);
	}
	
}

BackPack.addToBackPack = function(sprite, frame){
	let item = this.game.add.sprite(this.nbElement++ * this.space, 0, sprite.key),
		ratio = item.width / item.height,
		oldLayer = sprite.parent;

	oldLayer && oldLayer.remove(sprite);
	item.fixedToCamera = true;
	item.width = 60;
	item.height = item.width * ratio;
	if(frame){
		item.frame = frame;
	}
}

export default BackPack;