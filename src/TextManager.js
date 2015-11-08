import {bounds} from './constantes';

let TextManager = function(game, texting, position){
	var me = this;
	this.game = game;
	this.callbackCreateText = [];
	this.wasAlreadyLoaded = false;
	WebFontConfig = {

	    //  'active' means all requested fonts have finished loading
	    //  We set a 1 second delay before calling 'createText'.
	    //  For some reason if we don't the browser cannot render the text the first time it's created.
	    active: function() {
	    	console.log("Active");
    		game.time.events.add(Phaser.Timer.SECOND, TextManager.createText, me);
    	},

	    //  The Google Fonts we want to load (specify as many as you like in the array)
	    google: {
	      families: ['Righteous']
	    }
	};
}

TextManager.prototype.addTextCallback = function(callback){
	if(!this.wasAlreadyLoaded){
		this.callbackCreateText.push(callback);
	} else {
		callback();
	}
}

TextManager.createText = function(){
	for(let i = 0, l = this.callbackCreateText.length; i <l; i++){
		this.callbackCreateText[i]();
	}
	this.wasAlreadyLoaded = true;
}


export default TextManager;