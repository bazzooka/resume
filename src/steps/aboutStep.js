import Const from '../constantes';
import Positions from '../positions';
import Baby from '../baby';

const triangleSize = {w: 10, h: 14};
const signSize = {w: 10, h: 10};

let AboutStep = function(game, layer, addPositionCallback, player){
	this.game = game;
	this.layer = layer;
	this.repeatCounter = 1;
	this.addPositionCallback = addPositionCallback;
	this.player = player;
	this.reponseHobbies = null;
	this.createName();
	this.createMarried();
	this.createBabies();
	this.createHobbies();
};

AboutStep.prototype.oldTech = function(){
	var text = null, grd = null;
	text = this.game.add.text(500, Const.BOUNDS - 300, "NAME");
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
	var position = {x: 1000, y: Const.GROUND - 350};
	var reponsePosition = {x: 1025, y: Const.GROUND - 100};
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
	var signFoot = this.game.add.tileSprite(reponsePosition.x + reponse.getLocalBounds().width /2, reponsePosition.y + signSize.h, signSize.w, Const.BOUNDS - reponsePosition.y - 128, "sign_foot");
	

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
	var position = {x: 1300, y: Const.GROUND - 350};
	var reponsePosition = {x: 1380, y: Const.GROUND - 70};
	var intituleBG = this.game.add.graphics(position.x, position.y);
	var intitule = this.game.add.text(position.x, position.y, "Marital status");
	var single = this.game.add.text(position.x, position.y, "Single");
	var buttonRed = this.game.add.sprite(reponsePosition.x, reponsePosition.y, "buttonRed");

	this.layer.add(buttonRed);


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

	this.addPositionCallback(this.layer.position.x + reponsePosition.x, function(){
		buttonRed.frame = 1;
		var reponse = this.game.add.text(position.x + 20, position.y + 150, "Married");
		reponse.angle = -45;
		reponse.font = 'Reenie Beanie';
		reponse.fontSize = 50;
		reponse.fill = "#FF0000";
		this.layer.add(reponse);
	}.bind(this));
	
	this.baby3 = new Baby(this.game, {x: this.layer.position.x + reponsePosition.x + intitule.getLocalBounds().width, y: Const.GROUND - this.game.height - 3*75}, this.layer, 3);

	this.addPositionCallback(this.layer.position.x + reponsePosition.x, () => {
		this.baby3.createSpring(this.player);
	}.bind(this));



	this.layer.add(intituleBG);
	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule); 
} 
  
AboutStep.prototype.createBabies = function(){
	var position = {x: 1700, y: Const.GROUND - 350};
	var reponsePosition = {x: 1750, y: Const.BOUNDS - 128 - 70};
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

	let startPosition = {x: this.layer.position.x + position.x + intitule.getLocalBounds().width /2, y: position.y + 200};
	this.baby1 = new Baby(this.game, startPosition, this.layer, 1);
	this.baby2 = new Baby(this.game, startPosition, this.layer, 2);

	this.addPositionCallback(startPosition.x, () => {
		this.baby1.createSpring(this.player);
		this.baby2.createSpring(this.player);
	}.bind(this));

	this.addPositionCallback(Positions.mainExpertisePosition.x + 500, () => {
		this.game.physics.p2.removeSpring(this.baby1.spring);
		this.game.physics.p2.removeBody(this.baby1.sprite.body);
		this.game.physics.p2.removeSpring(this.baby2.spring);
		this.game.physics.p2.removeBody(this.baby2.sprite.body);
		this.game.physics.p2.removeSpring(this.baby3.spring);
		this.game.physics.p2.removeBody(this.baby3.sprite.body);

		this.game.backPack.add(this.baby3.sprite, null, true, true, "Wife");
		this.game.backPack.add(this.baby2.sprite, null, true, true, "Troll 1");
		this.game.backPack.add(this.baby1.sprite, null, true, true, "Troll 2");
	}.bind(this));


	this.layer.add(intituleBG);
	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule);
}

AboutStep.prototype.createHobbies = function(){
	var position = {x: 2200, y: Const.GROUND - 350};
	var reponsePosition = {x: 2200, y: Const.GROUND - 100};
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
	var signFoot = this.game.add.tileSprite(reponsePosition.x + this.reponseHobbies.getLocalBounds().width /2, reponsePosition.y + signSize.h, signSize.w, Const.BOUNDS - reponsePosition.y - 128, "sign_foot");

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