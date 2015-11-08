import {bounds} from '../constantes';

let AboutStep = function(game){
	this.game = game;
	this.createName();
};

AboutStep.prototype.oldTech = function(){
	var text = null, grd = null;
	text = this.game.add.text(500, bounds - 300, "NAME");
	//text.anchor.setTo(0.5);

	text.font = 'Righteous';
	text.fontSize = 60;

	//  x0, y0 - x1, y1
	//grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
	grd = text.context.createPattern(this.game.cache.getImage('wood1'), 'repeat'); 
	// grd.addColorStop(0, '#8ED6FF');   
	// grd.addColorStop(1, '#004CB3');
	text.fill = grd;

	// text.align = 'center';
	//text.stroke = '#FFFFFF';
	// text.strokeThickness = 2;
	text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

	text.inputEnabled = true;
	text.input.enableDrag();
}

AboutStep.prototype.createName = function(){
	//var background = this.game.add.sprite(490, bounds - 500, 'wood2');
	var position = {x: 500, y: bounds - 500};
	var background = this.game.add.graphics(position.x, position.y);
	

	var text = this.game.add.text(position.x, position.y, "NAME");

	text.font = 'Righteous';
	text.fontSize = 50;
	text.fill = "#FFFFFF";
	// text.setInnerShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

	background.beginFill(0xf50000);
	background.drawRect(0, 0, text.getLocalBounds().width, text.getLocalBounds().height);
	background.endFill();
	
	this.game.add.tileSprite(position.x, position.y, 10, text.getLocalBounds().height, 'triangle');
	this.game.add.tileSprite(position.x + text.getLocalBounds().width, position.y, 10, text.getLocalBounds().height, 'triangle');

	text.inputEnabled = true;
	text.input.enableDrag();
}

export default AboutStep;