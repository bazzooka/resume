import Positions from '../positions';

let ExpertiseStep = function(game, layer, addPositionCallback, collisionsCG){
	this.game = game; 
	this.layer = layer;
	this.addPositionCallback = addPositionCallback;
	this.boxes = [];
	
	this.collisionsCG = collisionsCG;
	this.expertises = ["NodeJS", "JS", "CSS3", "HTML5", "Typescript"];
	this.createExpertiseBox();
}

ExpertiseStep.prototype.createExpertiseBox = function(){
	for(var i = 0; i < this.expertises.length; i++){
		let box = this.game.add.sprite(Positions.mainExpertisePosition.x + Positions.expertiseBox.x, Positions.expertiseBox.y - i * 256, 'boxExpertise');
		box.frame = i;
		this.game.physics.p2.enable(box);
		box.body.offset.x = 100;
		box.body.setCollisionGroup(this.collisionsCG.group);
        box.body.collides(this.collisionsCG.groups);
		this.boxes.push(box);
	}
	let buggyBox = this.game.add.sprite(4080 + Positions.mainExpertisePosition.x + Positions.expertiseBox.x , 7600, 'rock');
	// buggyBox.frame = 0;
	this.game.physics.p2.enable(buggyBox);
	buggyBox.body.offset.x = 0;
	buggyBox.body.immovable = true;
	buggyBox.body.gravity = 0;
	buggyBox.body.mass = 1000;
	buggyBox.body.setCollisionGroup(this.collisionsCG.group);
	buggyBox.body.collides(this.collisionsCG.groups);

	this.addPositionCallback(Positions.waterPositions.x1 - 200, () => {
		var boxTweens = [];
		for(var i = 0; i < this.boxes.length; i++){
			this.game.physics.p2.removeBody(this.boxes[i].body);
			this.game.backPack.add(this.boxes[i], i, true, true, this.expertises[i])
			this.game.add.tween(this.boxes[i].scale).to( { x: 0.5, y: 0.5 }, 5000, "Quart.easeOut", true);
		}
	});
}

export default ExpertiseStep;