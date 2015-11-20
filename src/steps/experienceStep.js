import Positions from '../positions';
import Const from '../constantes';
import Experiences from '../data/experiences'; 

let ExperienceStep = function(game, layer, addPositionCallback, groups){
	this.game = game; 
	this.layer = layer;
    this.experienceLimit = 7;
	this.addPositionCallback = addPositionCallback;

    for(var i = 0; i < this.experienceLimit; i++){
        this.createExperience(Experiences[i], i, i === this.experienceLimit - 1);
    }

    this.drawGrue();
}

ExperienceStep.prototype.createExperience = function(experience, index, isLast){
    let position = {x: Positions.flyRegion.x1 - 4.5 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 6) - (index * 3) * Const.TILE_SIZE  },
    attachesChain = this.game.add.graphics(position.x, position.y),
    background_1 = this.game.add.graphics(position.x, position.y),
    background_2 = this.game.add.graphics(position.x, position.y),
    background_link = this.game.add.graphics(position.x, position.y),
    triangle = this.game.add.graphics(position.x, position.y),
    circleChain = this.game.add.graphics(position.x, position.y);


    this.layer.add(attachesChain);
    this.layer.add(circleChain);

    this.layer.add(background_1);
    this.layer.add(background_2);
    this.layer.add(background_link);
    this.layer.add(triangle);
    
    let dates = this.game.add.text(position.x + 20, position.y + 20, experience.start + (experience.end ? " - " + experience.end : ""));
    dates.font = 'Righteous';
    dates.fontSize = 25;
    dates.fill = "#FFFFFF";

    let company = this.game.add.text(position.x + 20, position.y + 50, experience.company);
    company.font = 'Righteous';
    company.fontSize = 43;
    company.fill = "#FFFFFF";

    let role = this.game.add.text(position.x + 20, position.y + 110, experience.title);
    role.font = 'Righteous';
    role.fontSize = 25;
    role.fill = "#FFFFFF";

    let link = this.game.add.text(position.x + 25, position.y + 150, "Click to launch");
    link.font = 'Reenie Beanie';
    link.fontSize = 25;
    link.fill = "#FFFFFF";
    link.inputEnabled = true;
    link.events.onInputDown.add(() => {
        window.open(experience.link);
    }, this);
    link.input.useHandCursor = true;


    background_1.beginFill(0x808080);
    background_1.drawRect(0, 0, 400, 200);
    background_1.endFill();

    background_2.beginFill(0x4E4E4E);
    background_2.drawRect(10, 10, 380, 180);
    background_2.endFill();

    background_link.beginFill(0xf58500);
    background_link.drawRect(10, 150, 185, 30);
    background_link.endFill();

    circleChain.beginFill(0x000000, 0);
    circleChain.lineStyle(5, 0x4E4E4E);
    circleChain.drawCircle(190, -100, 20);
    circleChain.endFill();

    attachesChain.beginFill(0x000000, 0);
    attachesChain.lineStyle(3, 0x4E4E4E);
    attachesChain.drawPolygon([190, -100, 5, 5, 390, 5, 190, -100, 190, -200]);
    attachesChain.endFill();

    let trianglePosition = {x: link.getLocalBounds().width + 40, y:157 };
    triangle.beginFill(0xFFFFFF);
    triangle.moveTo(trianglePosition.x, trianglePosition.y);
    triangle.lineTo(trianglePosition.x + 10, trianglePosition.y + 7);
    triangle.lineTo(trianglePosition.x, trianglePosition.y + 14);
    triangle.endFill();

    background_link.inputEnabled = true;
    background_link.events.onInputDown.add(() => {
        window.open(experience.link);
    }, this);

    background_link.input.useHandCursor = true;
}

ExperienceStep.prototype.drawGrue = function(){
    // Freely inspired by http://fr.freepik.com/vecteurs-libre/chantier-de-construction_795668.htm
    let position = {x: Positions.flyRegion.x2 + 2 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 23)   };

    this.game.add.sprite(position.x - this.game.cache.getImage('grue').width + Const.TILE_SIZE * 2 + 20, position.y - this.game.cache.getImage('grue').height, "grue");

};

export default ExperienceStep;