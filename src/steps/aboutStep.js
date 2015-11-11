import {bounds} from '../constantes';

const triangleSize = {w: 10, h: 14};
const signSize = {w: 10, h: 10};

let AboutStep = function(game, layer, addPositionCallback, setStartingBabiesPosition, setStartingWifePosition){
	this.game = game;
	this.layer = layer;
	this.repeatCounter = 1;
	this.addPositionCallback = addPositionCallback;
	this.setStartingBabiesPosition = setStartingBabiesPosition;
	this.setStartingWifePosition = setStartingWifePosition;
	this.reponseHobbies = null;
	this.createName();
	this.createMarried();
	this.createBabies();
	this.createHobbies();
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
	var position = {x: 500, y: bounds - 500};
	var reponsePosition = {x: 530, y: bounds - 250};
	var intituleBG = this.game.add.graphics(position.x, position.y);
	var intitule = this.game.add.text(position.x, position.y, "Name");
	var reponseBG = this.game.add.graphics(reponsePosition.x, reponsePosition.y);
	var reponse = this.game.add.text(reponsePosition.x, reponsePosition.y, "Joe");

	var signLayer = this.game.add.group();
	var signFootLayer = this.game.add.group();
	
	

	intitule.font = 'Righteous';
	intitule.fontSize = 35;
	intitule.fill = "#FFFFFF";

	intituleBG.beginFill(0xf58500);
	intituleBG.drawRect(0, 0, intitule.getLocalBounds().width, intitule.getLocalBounds().height);
	intituleBG.endFill();
	
	var leftBorder = this.game.add.tileSprite(position.x - triangleSize.w, position.y, triangleSize.w, intitule.getLocalBounds().height, 'triangle');
	var rightBorder = this.game.add.tileSprite(position.x + intitule.getLocalBounds().width + triangleSize.w, position.y, 10, intitule.getLocalBounds().height, 'triangle');
	rightBorder.scale.x = -1;


	reponse.font = 'Righteous';
	reponse.fontSize = 30;
	reponse.fill = "#FFFFFF";

	reponseBG.beginFill(0xae7640);
	reponseBG.drawRect(-20, 0, reponse.getLocalBounds().width + 40, reponse.getLocalBounds().height);
	reponseBG.endFill();


	var sign_tr = this.game.add.sprite(reponsePosition.x + reponse.getLocalBounds().width + signSize.w + 10, reponsePosition.y, 'sign_round');
	var sign_br = this.game.add.sprite(reponsePosition.x + reponse.getLocalBounds().width + signSize.w + 10, reponsePosition.y + reponse.getLocalBounds().height, 'sign_round');
	var sign_tl = this.game.add.sprite(reponsePosition.x - signSize.w - 10, reponsePosition.y, 'sign_round');
	var sign_bl = this.game.add.sprite(reponsePosition.x - signSize.w - 10, reponsePosition.y + reponse.getLocalBounds().height, 'sign_round');
	sign_br.scale.y = -1;
	sign_tl.scale.x = -1;
	sign_bl.scale.x = -1;
	sign_bl.scale.y = -1;

	var signFillLeft = this.game.add.tileSprite(reponsePosition.x - signSize.w - 20, reponsePosition.y + signSize.h, signSize.w, reponse.getLocalBounds().height - 2 *signSize.h, "sign_fill");
	var signFillRight = this.game.add.tileSprite(reponsePosition.x + reponse.getLocalBounds().width + signSize.w + 10, reponsePosition.y + signSize.h, signSize.w, reponse.getLocalBounds().height - 2 *signSize.h, "sign_fill");
	var signFoot = this.game.add.tileSprite(reponsePosition.x + reponse.getLocalBounds().width /2, reponsePosition.y + signSize.h, signSize.w, bounds - reponsePosition.y - 128, "sign_foot");
	

	this.layer.add(intituleBG);
	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule);

	signFootLayer.add(signFoot);
	signLayer.add(reponseBG);
	signLayer.add(sign_tr);
	signLayer.add(sign_br);
	signLayer.add(sign_tl);
	signLayer.add(sign_bl);
	signLayer.add(signFillLeft);
	signLayer.add(signFillRight);
	signLayer.add(reponse);



	this.layer.add(signFootLayer);
	this.layer.add(signLayer);
	

	// this.game.add.sprite(position.x, position.y, 'sign');
}

AboutStep.prototype.createMarried = function(){
	var position = {x: 900, y: bounds - 500};
	var reponsePosition = {x: 980, y: bounds - 128 - 70};
	var intituleBG = this.game.add.graphics(position.x, position.y);
	var intitule = this.game.add.text(position.x, position.y, "Marital status");
	var single = this.game.add.text(position.x, position.y, "Single");
	var buttonRed = this.game.add.sprite(this.layer.position.x + reponsePosition.x, reponsePosition.y, "buttonRed");

	intitule.font = 'Righteous';
	intitule.fontSize = 35;
	intitule.fill = "#FFFFFF";

	single.font = 'Reenie Beanie';
	single.fontSize = 50;
	single.fill = "#FFFFFF";
	single.position.y = position.y + 100;
	single.position.x = position.x + 50;
	this.layer.add(single);

	intituleBG.beginFill(0xf58500);
	intituleBG.drawRect(0, 0, intitule.getLocalBounds().width, intitule.getLocalBounds().height);
	intituleBG.endFill();
	
	var leftBorder = this.game.add.tileSprite(position.x - triangleSize.w, position.y, triangleSize.w, intitule.getLocalBounds().height, 'triangle');
	var rightBorder = this.game.add.tileSprite(position.x + intitule.getLocalBounds().width + triangleSize.w, position.y, 10, intitule.getLocalBounds().height, 'triangle');
	rightBorder.scale.x = -1;

	this.addPositionCallback(this.layer.position.x + position.x, function(){
		buttonRed.frame = 1;
		var reponse = this.game.add.text(position.x + 20, position.y + 150, "Married");
		reponse.angle = -45;
		reponse.font = 'Reenie Beanie';
		reponse.fontSize = 50;
		reponse.fill = "#FF0000";
		this.layer.add(reponse);
	}.bind(this));

	this.setStartingWifePosition({x: this.layer.position.x + position.x + intitule.getLocalBounds().width, y: position.y - 400}, {x: this.layer.position.x + reponsePosition.x, y: position.y + 200});
	this.layer.add(intituleBG);
	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule); 
} 
  
AboutStep.prototype.createBabies = function(){
	var position = {x: 1400, y: bounds - 500};
	var reponsePosition = {x: 950, y: bounds - 128 - 70};
	var intituleBG = this.game.add.graphics(position.x, position.y);
	var intitule = this.game.add.text(position.x, position.y, "Domestic babies");

	intitule.font = 'Righteous';
	intitule.fontSize = 35;
	intitule.fill = "#FFFFFF";

	intituleBG.beginFill(0xf58500);
	intituleBG.drawRect(0, 0, intitule.getLocalBounds().width, intitule.getLocalBounds().height);
	intituleBG.endFill();
	
	var leftBorder = this.game.add.tileSprite(position.x - triangleSize.w, position.y, triangleSize.w, intitule.getLocalBounds().height, 'triangle');
	var rightBorder = this.game.add.tileSprite(position.x + intitule.getLocalBounds().width + triangleSize.w, position.y, 10, intitule.getLocalBounds().height, 'triangle');
	rightBorder.scale.x = -1;

	this.setStartingBabiesPosition({x: this.layer.position.x + position.x + intitule.getLocalBounds().width /2, y: position.y + 200});


	this.layer.add(intituleBG);
	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule);
}

AboutStep.prototype.createHobbies = function(){
	var position = {x: 2000, y: bounds - 500};
	var reponsePosition = {x: 1950, y: bounds - 250};
	var intituleBG = this.game.add.graphics(position.x, position.y);
	var intitule = this.game.add.text(position.x, position.y, "Hobbies");
	var reponseBG = this.game.add.graphics(reponsePosition.x, reponsePosition.y);
	this.reponseHobbies = this.game.add.text(reponsePosition.x, reponsePosition.y, "Software development");

	var signLayer = this.game.add.group();
	var signFootLayer = this.game.add.group();
	var textLayer = this.game.add.group();
	

	intitule.font = 'Righteous';
	intitule.fontSize = 35;
	intitule.fill = "#FFFFFF";

	intituleBG.beginFill(0xf58500);
	intituleBG.drawRect(0, 0, intitule.getLocalBounds().width, intitule.getLocalBounds().height);
	intituleBG.endFill();
	
	var leftBorder = this.game.add.tileSprite(position.x - triangleSize.w, position.y, triangleSize.w, intitule.getLocalBounds().height, 'triangle');
	var rightBorder = this.game.add.tileSprite(position.x + intitule.getLocalBounds().width + triangleSize.w, position.y, 10, intitule.getLocalBounds().height, 'triangle');
	rightBorder.scale.x = -1;


	this.reponseHobbies.font = 'Righteous';
	this.reponseHobbies.fontSize = 30;
	this.reponseHobbies.fill = "#FFFFFF";

	reponseBG.beginFill(0xae7640);
	reponseBG.drawRect(-20, 0, this.reponseHobbies.getLocalBounds().width + 40, this.reponseHobbies.getLocalBounds().height);
	reponseBG.endFill();


	var sign_tr = this.game.add.sprite(reponsePosition.x + this.reponseHobbies.getLocalBounds().width + signSize.w + 10, reponsePosition.y, 'sign_round');
	var sign_br = this.game.add.sprite(reponsePosition.x + this.reponseHobbies.getLocalBounds().width + signSize.w + 10, reponsePosition.y + this.reponseHobbies.getLocalBounds().height, 'sign_round');
	var sign_tl = this.game.add.sprite(reponsePosition.x - signSize.w - 10, reponsePosition.y, 'sign_round');
	var sign_bl = this.game.add.sprite(reponsePosition.x - signSize.w - 10, reponsePosition.y + this.reponseHobbies.getLocalBounds().height, 'sign_round');
	sign_br.scale.y = -1;
	sign_tl.scale.x = -1;
	sign_bl.scale.x = -1;
	sign_bl.scale.y = -1;

	var signFillLeft = this.game.add.tileSprite(reponsePosition.x - signSize.w - 20, reponsePosition.y + signSize.h, signSize.w, this.reponseHobbies.getLocalBounds().height - 2 *signSize.h, "sign_fill");
	var signFillRight = this.game.add.tileSprite(reponsePosition.x + this.reponseHobbies.getLocalBounds().width + signSize.w + 10, reponsePosition.y + signSize.h, signSize.w, this.reponseHobbies.getLocalBounds().height - 2 *signSize.h, "sign_fill");
	var signFoot = this.game.add.tileSprite(reponsePosition.x + this.reponseHobbies.getLocalBounds().width /2, reponsePosition.y + signSize.h, signSize.w, bounds - reponsePosition.y - 128, "sign_foot");

	//this.swapHobbies();
	this.game.time.events.loop(Phaser.Timer.SECOND * 1, function(){
		let hobbies = ["Software development", "digital experiences", "IoT", "game development", "technological watch", ""],
			colors = ["#f44336", "#E91E63", "#673AB7", "#2196F3", "#4CAF50", "#FF5722"];
		// Set text
		this.reponseHobbies.setText(hobbies[(this.repeatCounter++)%(hobbies.length - 1)]);
		this.reponseHobbies.fill = colors[this.game.rnd.integerInRange(0, colors.length - 1)];
		// remove old bg
		//reponseBG.destroy();
		// redraw it
		//reponseBG = this.game.add.graphics(reponsePosition.x, reponsePosition.y);
		reponseBG.clear();
		reponseBG.beginFill(0xae7640);
		reponseBG.drawRect(-20, 0, this.reponseHobbies.getLocalBounds().width + 40, this.reponseHobbies.getLocalBounds().height);
		reponseBG.endFill();
		signLayer.add(reponseBG);
		signFoot.position.x = reponsePosition.x + this.reponseHobbies.getLocalBounds().width /2;

		// fill right
		signFillRight.position.x = reponsePosition.x + this.reponseHobbies.getLocalBounds().width + signSize.w + 10;

		// round_sign
		sign_tr.position.x = reponsePosition.x + this.reponseHobbies.getLocalBounds().width + signSize.w + 10;
		sign_br.position.x = reponsePosition.x + this.reponseHobbies.getLocalBounds().width + signSize.w + 10;

	}, this);
	
	this.layer.add(intituleBG);
	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule);

	signFootLayer.add(signFoot);
	signLayer.add(reponseBG);
	signLayer.add(sign_tr);
	signLayer.add(sign_br);
	signLayer.add(sign_tl);
	signLayer.add(sign_bl);
	signLayer.add(signFillLeft);
	signLayer.add(signFillRight);
	signLayer.add(this.reponseHobbies);



	this.layer.add(signFootLayer);
	this.layer.add(signLayer);
}

export default AboutStep;