import {bounds} from './constantes';

let BackgroundManager = {
	background: null,
	map: null,
	background_height: 1024,
	tilesetImages: [
		'ground',
		'decors'
	],
	layersParams: [{
		"name": "platform",
		"isDefault": true,
		"scrollFactorX": 1
	}, {
		"name": "cloud",
		"scrollFactorX": 1.55
	}, {
		"name": "decors_1",
		"scrollFactorX": 1.20
	}],
	layers: {},

	init: function(game){

		// Init background
		this.background = game.add.tileSprite(0, bounds - this.background_height, bounds, this.background_height, 'background');
		this.background.scrollFactorX = 0;

		this.map = game.add.tilemap('map');
		for(let i = 0, l = this.tilesetImages.length; i < l ; i++){
			this.map.addTilesetImage(this.tilesetImages[i], this.tilesetImages[i]);
		}

		for(let i = 0, l = this.layersParams.length; i < l; i++){
			let currentLayerParams = this.layersParams[i],
				currentLayer = this.map.createLayer(currentLayerParams.name);
			this.layers[currentLayerParams.name] = currentLayer;
			currentLayer.scrollFactorX = currentLayerParams.scrollFactorX;
			if(currentLayerParams.isDefault){
				this.map.setLayer(currentLayer); 
				currentLayer.resizeWorld();
			}
		}
		return this.map;
	},

	getLayer: function(name){
		return this.layers[name];
	},

	update: function(){

	}
};

export default BackgroundManager;