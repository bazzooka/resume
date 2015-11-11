import {bounds} from './constantes';
import Positions from './positions';

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
		"scrollFactorX": 1.05
	}],

	layers: {},

	init: function(game, layer){

		// Init background
		this.background = game.add.tileSprite(0, bounds - this.background_height, bounds, this.background_height, 'background');
		layer.add(this.background);
		this.background.scrollFactorX = 0;

		this.about_title = game.add.sprite(500, bounds - 500, 'about_title');
		layer.add(this.about_title);

		game.textManager.addTextCallback(function(){
			var intitule = game.add.text(2000, bounds - 375, "DON'T TOUCH THE RED BUTTON");
			intitule.font = 'Righteous';
			intitule.fontSize = 15;
			intitule.fill = "#FFFFFF";
		}.bind(this));

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
		this.getLayer('platform').resize(w, h);
	},

	getLayer: function(name){
		return this.layers[name];
	},

	update: function(){

	}
};

export default BackgroundManager;