import Const from './constantes';
import Positions from './positions';

let BackgroundManager = {
	background: null,
	map: null,
	background_height: 1024,
	tilesetImages: [
		'ground',
		'levels',
		'water'
	],
	layersParams: [{
		"name": "platform",
		"isDefault": true,
		"scrollFactorX": 1
	}, {
		"name": "water",
		"scrollFactorX": 1
	}, {
		"name": "cloud",
		"scrollFactorX": 1.55
	}, {
		"name": "levels",
		"scrollFactorX": 1.05
	}],

	layers: {},

	init: function(game, layers){
		this.game = game;

		// Init background
		this.background = game.add.tileSprite(0, Const.GROUND - this.background_height + 128, Const.BOUNDX, this.background_height, 'background');
		layers.bgLayer.add(this.background);
		this.background.scrollFactorX = 0;

		this.addMasterSectionTitles(layers.bgLayer);


		this.map = game.add.tilemap('map');
		for(let i = 0, l = this.tilesetImages.length; i < l ; i++){
			this.map.addTilesetImage(this.tilesetImages[i], this.tilesetImages[i]);
		}

		for(let i = 0, l = this.layersParams.length; i < l; i++){
			let currentLayerParams = this.layersParams[i],
				currentLayer = this.map.createLayer(currentLayerParams.name, game.width, game.height, layers.mapLayer);
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
		this.js_title = this.game.add.sprite(Positions.jsTitlePosition.x, Positions.jsTitlePosition.y, 'js_resume_title');
		this.js_title.scale.x = 0.5;
		this.js_title.scale.y = 0.5;
		layer.add(this.js_title);

		this.resume_title = this.game.add.sprite(Positions.jsTitlePosition.x + 75, Positions.jsTitlePosition.y + 185, 'resume_title');
		this.resume_title.scale.x = 0.5;
		this.resume_title.scale.y = 0.5;
		layer.add(this.resume_title);

		this.about_title = this.game.add.sprite(Positions.aboutPosition.x, Positions.aboutPosition.y, 'about_title');
		layer.add(this.about_title);

		this.mainExpertise = this.game.add.sprite(Positions.mainExpertisePosition.x, Positions.mainExpertisePosition.y, 'main_expertise');
		layer.add(this.mainExpertise);

		this.programing_title = this.game.add.sprite(Positions.waterPositions.x1, Positions.mainExpertisePosition.y, 'skills'); 
		layer.add(this.programing_title);
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