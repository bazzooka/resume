import Const from './constantes';

let BackPack = {
	game: null, 
	layer: null,
	space: 65,
	nbElement: 0,
	itemWidth: 60,
	legends: []
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

BackPack.add = function(sprite, frame = null, useBody = false, animate = true, name){
	let toMove = useBody ? sprite.body: sprite;

	if(animate){
		let tween = this.game.add.tween(toMove).to({y:Const.GROUND - this.game.height - sprite.height}, 1000, "Linear", true);
		tween.onComplete.add(function() {
			this.addToBackPack(sprite, frame, name);
		}, this);
	}
	
}

BackPack.addToBackPack = function(sprite, frame, title){
	let me = this,
		positionX = 0,
		positionY = 0,
		nbElemPerRow = (this.game.width - this.itemWidth) / this.space;

	

	positionX = (this.nbElement * this.space) % (this.game.width - this.itemWidth);
	positionY = 80 * Math.floor(this.nbElement / nbElemPerRow);

	this.nbElement++;

	let item = this.game.add.sprite(positionX, positionY, sprite.key),
		ratio = item.width / item.height,
		oldLayer = sprite.parent;

	

	oldLayer && oldLayer.remove(sprite);
	item.fixedToCamera = true;
	item.width = this.itemWidth;
	item.height = item.width * ratio;
	if(frame){
		item.frame = frame;
	}

	item.inputEnabled = true;
	if(title){
		let text = me.game.add.text(positionX, positionY + 60, title);
		text.font = 'Righteous';
		text.fontSize = 15;
		text.fill = "#FFFFFF";

		text.x += (this.itemWidth -text.getLocalBounds().width) / 2;
		text.y = positionY + this.itemWidth;
				text.fixedToCamera = true;
		// this.layer.add(text);
		// text.alpha = 0;
		// item.events.onInputOver.add(() => {
		// 	text.alpha = 1;
		// }, this);
	}
	
}

export default BackPack;