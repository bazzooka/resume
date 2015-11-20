import Positions from '../positions';
import Const from '../constantes';

let ContactStep = function(game, layer){
	this.game = game; 
	this.layer = layer;
    this.triggerPositionX = 128* Const.TILE_SIZE;
    this.defaultCameraPositionY = 0;
    this.contactContainer = document.getElementById('contact-wrapper');

    let position = {x: Positions.flyRegion.x2 + 2 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 23)   };

   
}

ContactStep.prototype.update = function(player){
    let deadzone = this.game.camera.deadzone,
    cameraPos = this.game.camera.position,
    view = this.game.camera.view;

    if(view.x + view.width > this.triggerPositionX){
        let deplacementX = -(view.x - this.triggerPositionX),
        deplacementY = this.defaultCameraPositionY -this.game.camera.view.y + 3 * Const.TILE_SIZE; 

        console.log(deplacementX);


        this.contactContainer.style = "transform: translate3d(" + deplacementX + "px, " + deplacementY+"px, 0)";
    } else {
        this.defaultCameraPositionY = this.game.camera.view.y;
    }



//     if(this.graphicAnchor.position.x < player.position.x){
//         let deplacementX = this.game.width - Math.min(this.game.width*2, player.position.x - this.graphicAnchor.worldPosition.x),
//         deplacementY = this.defaultCameraPositionY -this.game.camera.view.y; 
// console.log(deplacementX);
//         this.contactContainer.style = "transform: translate3d(" + deplacementX + "px, " + deplacementY+"px, 0)";
//     } else {
//         this.defaultCameraPositionY = this.game.camera.view.y;
//     }
}



export default ContactStep;