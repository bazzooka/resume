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

	init: function(game, layer){

		// Init background
		this.background = game.add.tileSprite(0, bounds - this.background_height, bounds, this.background_height, 'background');
		layer.add(this.background);
		this.background.scrollFactorX = 0;

		this.about_title = game.add.sprite(500, bounds - 500, 'about_title');
		layer.add(this.about_title);

		this.map = game.add.tilemap('map');
		for(let i = 0, l = this.tilesetImages.length; i < l ; i++){
			this.map.addTilesetImage(this.tilesetImages[i], this.tilesetImages[i]);
		}

		for(let i = 0, l = this.layersParams.length; i < l; i++){
			let currentLayerParams = this.layersParams[i],
				currentLayer = this.map.createLayer(currentLayerParams.name, game.width, game.height, layer);
			this.layers[currentLayerParams.name] = currentLayer;
			currentLayer.scrollFactorX = currentLayerParams.scrollFactorX;
			if(currentLayerParams.isDefault){
				this.map.setLayer(currentLayer); 
				currentLayer.resizeWorld();
			}
		}
		return this;
	},

	onResize: function(w, h){
		for(var layer in this.layers){
			if(this.layers.hasOwnProperty(layer) && "platform" === layer){
				this.layers[layer].resize(w, h);
				break;
			}
		}
	},

	getLayer: function(name){
		return this.layers[name];
	},

	update: function(){

	}
};

export default BackgroundManager;