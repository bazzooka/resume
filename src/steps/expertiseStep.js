import Positions from '../positions';

let ExpertiseStep = function(game, layer, addPositionCallback){
	this.game = game; 
	this.layer = layer;
	this.addPositionCallback = addPositionCallback;
	this.boxes = [];
	this.createExpertiseBox();
}

ExpertiseStep.prototype.createExpertiseBox = function(){
	for(var i = 0; i < 4; i++){
		let box = this.game.add.sprite(Positions.mainExpertisePosition.x + Positions.expertiseBox.x, Positions.expertiseBox.y - i * 256, 'boxExpertise');
		box.frame = i;
		this.game.physics.p2.enable(box);
		box.body.offset.x = 100;
		this.boxes.push(box);
	}

	this.addPositionCallback(Positions.waterPositions.x1 - 200, () => {
		var boxTweens = [];
		for(var i = 0; i < this.boxes.length; i++){
			this.game.physics.p2.removeBody(this.boxes[i].body);
			this.game.backPack.add(this.boxes[i], i, true, true)
			this.game.add.tween(this.boxes[i].scale).to( { x: 0.5, y: 0.5 }, 5000, "Quart.easeOut", true);
		}
	});
}

export default ExpertiseStep;