import {bounds} from '../constantes';

let WelcomeStep = function(game, layer){

}

WelcomeStep.prototype.createWelcomeMessage = function(){
	this.js = this.game.add.sprite(500, bounds - 500, 'js_resume_title');
	this.js.scale.setTo(0.5, 0.5);
	this.layer.add(this.js);

}

export default WelcomeStep;