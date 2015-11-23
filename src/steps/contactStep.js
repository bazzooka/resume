import Positions from '../positions';
import Const from '../constantes';

let ContactStep = function(game, layer){
	this.game = game; 
	this.layer = layer;
    this.triggerPositionX = 128* Const.TILE_SIZE;
    this.defaultCameraPositionY = 0;
    this.contactWrapper = document.getElementById('contact-wrapper');

    this.position = {x: Positions.flyRegion.x2 + 12 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 23)- this.game.cache.getImage('canette').height   };

    this.canette = this.game.add.sprite(this.position.x, this.position.y, "canette");
    this.canetteBut = this.game.add.sprite(this.position.x + 75, this.position.y + 250, "canette-but");

    this.layer.add(this.canette);
    this.layer.add(this.canetteBut);

    this.canetteBut.inputEnabled = true;
    this.canetteBut.input.useHandCursor = true; //if you want a hand cursor
    this.canetteBut.events.onInputDown.add(() => {
        console.log("OK");
    }, this);

   
}

ContactStep.prototype.update = function(player){
    let deadzone = this.game.camera.deadzone,
    cameraPos = this.game.camera.position,
    view = this.game.camera.view;

    if(view.x + view.width > this.position.x){
        let deplacementX = -view.x + this.position.x + 235,
            deplacementY = -view.y + this.position.y + 43;
        this.contactWrapper.style = "transform: translate3d(" + deplacementX + "px, " + deplacementY+"px, 0)";
    }
}


export default ContactStep;