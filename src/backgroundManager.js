import {bounds} from './constantes';
import Positions from './positions';

let BackgroundManager = {
	background: null,
	map: null,
	background_height: 1024,
	tilesetImages: [
		'ground',
		'levels'
	],
	layersParams: [{
		"name": "platform",
		"isDefault": true,
		"scrollFactorX": 1
	}, {
		"name": "cloud",
		"scrollFactorX": 1.55
	}, {
		"name": "levels",
		"scrollFactorX": 1.05
	}],

	layers: {},

	init: function(game, layer){
		this.game = game;

		// Init background
		this.background = game.add.tileSprite(0, bounds - this.background_height, bounds, this.background_height, 'background');
		layer.add(this.background);
		this.background.scrollFactorX = 0;

		this.addMasterSectionTitles(layer);


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

	addMasterSectionTitles: function(layer){
		this.about_title = this.game.add.sprite(Positions.aboutPosition.x, Positions.aboutPosition.y, 'about_title');
		layer.add(this.about_title);

		this.mainExpertise = this.game.add.sprite(Positions.mainExpertisePosition.x, Positions.mainExpertisePosition.y, 'main_expertise');
		layer.add(this.mainExpertise);
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