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

    this.drawGrue();
}

ExperienceStep.prototype.createExperience = function(experience, index){
    let position = {x: Positions.flyRegion.x1 - 4.5 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 6) - (index * 3) * Const.TILE_SIZE  },
    background_1 = this.game.add.graphics(position.x, position.y),
    background_2 = this.game.add.graphics(position.x, position.y),
    background_link = this.game.add.graphics(position.x, position.y),
    triangle = this.game.add.graphics(position.x, position.y);

    this.layer.add(background_1);
    this.layer.add(background_2);
    this.layer.add(background_link);
    
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
    let position = {x: Positions.flyRegion.x2 + 2 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 23)   },
    motifColumn = this.game.add.graphics(position.x, position.y),
    motifTransvers = this.game.add.graphics(position.x, position.y),

    columnPoints = [],
    transversPoints = [],
    columnNbPoints = 10,
    transversNbPoints = 30,
    height_ = -40,
    width_ = 50;

    // Draw column
    for(let i = 0; i < columnNbPoints; i ++){
        let x = i%2 === 0 ? 0 : width_;
        let y = i * height_;
        columnPoints.push(x);
        columnPoints.push(y);
    }

    columnPoints.push(-2, (columnNbPoints-1) * height_);
    columnPoints.push(-2, 0);
    columnPoints.push(width_ + 5, 0);
    columnPoints.push(width_ + 5, (columnNbPoints-1) * height_ - 2);

    motifColumn.lineStyle(4, 0xffd900);
    motifColumn.drawPolygon(columnPoints);

    // Draw transvers
    for(let i = 0; i < transversNbPoints; i ++){
        let x = i%2 === 0 ? 0 : width_;
        let y = i * height_;
        transversPoints.push(x);
        transversPoints.push(y);
    }

    transversPoints.push(-2, (transversNbPoints-1) * height_);
    transversPoints.push(-2, 0);
    transversPoints.push(width_ + 5, 30);
    transversPoints.push(width_ + 5, (transversNbPoints-1) * height_ - 2);

    motifTransvers.lineStyle(4, 0xffd900);
    motifTransvers.drawPolygon(transversPoints);
    motifTransvers.angle = 90;
    motifTransvers.y += (columnNbPoints) * height_ - 15;
    motifTransvers.x -= motifTransvers.height - Const.TILE_SIZE * 2;


    // Draw transverse

};

export default ExperienceStep;