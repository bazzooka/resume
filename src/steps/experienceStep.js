import Positions from '../positions';
import Const from '../constantes';
import Experiences from '../data/experiences'; 

let ExperienceStep = function(game, layer, addPositionCallback, groups){
	this.game = game; 
	this.layer = layer;
    this.experienceLimit = 7;
	this.addPositionCallback = addPositionCallback;

    for(var i = 0; i < this.experienceLimit; i++){
        this.createExperience(Experiences[i], i);
    }
}

ExperienceStep.prototype.createExperience = function(experience, index){
    let position = {x: Positions.flyRegion.x1 - 4.5 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 6) - (index * 4) * Const.TILE_SIZE  },
    background_1 = this.game.add.graphics(position.x, position.y),
    background_2 = this.game.add.graphics(position.x, position.y),
    background_link = this.game.add.graphics(position.x, position.y);

    this.layer.add(background_1);
    this.layer.add(background_2);
    this.layer.add(background_link);
    
    let dates = this.game.add.text(position.x + 20, position.y + 20, experience.start + " - " + experience.end);
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

    let link = this.game.add.text(position.x + 20, position.y + 150, "Click to launch");
    link.font = 'Righteous';
    link.fontSize = 20;
    link.fill = "#FFFFFF";
    link.inputEnabled = true;
    link.events.onInputOver.add(() => {
        console.log(experience.link);
    }, this);


    background_1.beginFill(0x808080);
    background_1.drawRect(0, 0, 400, 200);
    background_1.endFill();

    background_2.beginFill(0x4E4E4E);
    background_2.drawRect(10, 10, 380, 180);
    background_2.endFill();

    background_link.beginFill(0xf58500);
    background_link.drawRect(10, 150, 200, 30);
    background_link.endFill();
}

export default ExperienceStep;