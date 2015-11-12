let ProgramingStep = function(game, layer, addPositionCallback){
	this.game = game;
	this.layer = layer;
	this.addPositionCallback = addPositionCallback;

	this.createLevels();
}

ProgramingStep.prototype.createLevels = function(){
	this.switch = this.game.add.sprite(10, 128*100 - 500, 'switch');
	this.switch .animations.add('middle', [0], 1, false);
	this.switch .animations.add('right', [2], 1, false);
	this.switch .animations.play('middle');

	this.layer.add(this.switch);

	this.addPositionCallback(2000, function(){
		this.switch.play('right');
	}.bind(this));


}



export default ProgramingStep;