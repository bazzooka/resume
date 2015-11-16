import Const from '../constantes';
import Positions from '../positions';
const triangleSize = {w: 10, h: 14};

let ProgramingStep = function(game, layer, addPositionCallback){
	this.game = game;
	this.layer = layer;
	this.addPositionCallback = addPositionCallback;
	this.x = Positions.waterPositions.x1 - 200;
	this.y = Positions.waterPositions.y;
	this.createLevels();
}

ProgramingStep.prototype.createLevels = function(){
	let skills = [{
		name: "Javascript",
		position: {
			x: this.x + 700,
			y: this.y - 70
		},
		level: 5
	}, {
		name: "PHP",
		position: {
			x: this.x + 900,
			y: this.y - 70
		},
		level: 4
	}, {
		name: "JAVA",
		position: {
			x: this.x + 1100,
			y: this.y - 70
		},
		level: 3
	}, {
		name: "C++",
		position: {
			x: this.x + 1300,
			y: this.y - 70
		},
		level: 3
	}, {
		name: "PHOTOSHOP",
		position: {
			x: this.x + 1500,
			y: this.y - 70
		},
		level: 3
	}, {
		name: "C++",
		position: {
			x: this.x +1800,
			y: this.y - 70
		},
		level: 3
	}, {
		name: "NO SQL",
		position: {
			x: this.x +2000,
			y: this.y - 70
		},
		level: 3
	}, {
		name: "MOBILE",
		position: {
			x: this.x +2200,
			y: this.y - 70
		},
		level: 5
	}];

	for(let i = 0, l = skills.length; i < l; i++){
		this.addSkill(skills[i]);	
	}

	
}

ProgramingStep.prototype.addSkill = function(skill){
	let position = skill.position,
		level = skill.level,
		mySwitch = this.game.add.sprite(position.x, position.y, 'switch');

	mySwitch.frame = 0;

	this.layer.add(mySwitch);

	this.addSkillLabel(skill);
	this.addPositionCallback(position.x, () =>{
		mySwitch.frame = 2;
		for(let i = 0, l = level; i < l; i++){
			let gem = this.game.add.sprite(position.x + 10, this.y, "gem_yellow");
			this.layer.add(gem);
			this.game.add.tween(gem).to({y: this.y - (i + 1) * 50 - 70}, 1000, Phaser.Easing.Elastic.Out, true);
		}
	});
}

ProgramingStep.prototype.addSkillLabel = function(skill){
	let position = skill.position,
	 positionY = position.y - 7 * 50,
	 intituleBG = this.game.add.graphics(position.x, positionY),
	 intitule = this.game.add.text(position.x, positionY, skill.name);

	intitule.font = 'Righteous';
	intitule.fontSize = 35;
	intitule.fill = "#FFFFFF";

	let intituleSize = {w: intitule.getLocalBounds().width, h: intitule.getLocalBounds().height},
		intituleXPosition = intitule.position.x - intituleSize.w / 4;

	intitule.position.x = intituleXPosition;

	intituleBG.beginFill(0xf58500);
	intituleBG.drawRect(0, 0, intituleSize.w, intituleSize.h);
	intituleBG.endFill();
	intituleBG.position.x = intituleXPosition;

	let leftBorder = 	this.game.add.tileSprite(intituleXPosition - triangleSize.w, positionY, triangleSize.w, intituleSize.h, 'triangle');
	let rightBorder = 	this.game.add.tileSprite(intituleXPosition + intituleSize.w + triangleSize.w, positionY, triangleSize.w, intituleSize.h, 'triangle');
	rightBorder.scale.x = -1;

	this.layer.add(leftBorder);
	this.layer.add(rightBorder);
	this.layer.add(intituleBG);
	this.layer.add(intitule);
	
	
}



export default ProgramingStep;