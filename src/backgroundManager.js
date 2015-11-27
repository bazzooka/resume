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
	}],

	layers: {},

	init: function(game, layers){
		this.game = game;
		this.groupLayers = layers;

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
		this.addLevelsTitles(layers.levelLayer);
		return this;
	},

	addLevelsTitles: function(layer){
		this.level1 = this.game.add.sprite(Positions.Levels.Level1.x, Positions.Levels.Level1.y, 'levels');
		this.level1.frame = 0;
		layer.add(this.level1);

		this.level2 = this.game.add.sprite(Positions.Levels.Level2.x, Positions.Levels.Level2.y, 'levels');
		this.level2.frame = 1;
		layer.add(this.level2);

		this.level3 = this.game.add.sprite(Positions.Levels.Level3.x, Positions.Levels.Level3.y, 'levels');
		this.level3.frame = 2;
		layer.add(this.level3);

		this.level4 = this.game.add.sprite(Positions.Levels.Level4.x, Positions.Levels.Level4.y, 'levels');
		this.level4.frame = 3;
		layer.add(this.level4);

		this.level5 = this.game.add.sprite(Positions.Levels.Level5.x, Positions.Levels.Level5.y, 'levels');
		this.level5.frame = 4;
		layer.add(this.level5);
	},

	addMasterSectionTitles: function(layer){
		this.js_title = this.game.add.sprite(Positions.jsTitlePosition.x, Positions.jsTitlePosition.y, 'js_resume_title');
		layer.add(this.js_title);

		this.about_title = this.game.add.sprite(Positions.aboutPosition.x, Positions.aboutPosition.y, 'about_title');
		layer.add(this.about_title);

		this.mainExpertise = this.game.add.sprite(Positions.mainExpertisePosition.x, Positions.mainExpertisePosition.y, 'main_expertise');
		layer.add(this.mainExpertise);

		this.programing_title = this.game.add.sprite(Positions.waterPositions.x1, Positions.mainExpertisePosition.y, 'skills'); 
		layer.add(this.programing_title);
	},

	onResize: function(w, h){
		this.background.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
		this.background.position.y = Const.GROUND - (this.background_height * this.game.scaleFactor) + 128;

		this.getLayer('platform').resize(w, h);

		if(this.game.scaleFactor < 1){
			this.level1.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.level1.y = Positions.Levels.Level1.y + 384 - 384 * this.game.scaleFactor;

			this.level2.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.level2.y = Positions.Levels.Level2.y + 384 - 384 * this.game.scaleFactor;

			this.level3.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.level3.y = Positions.Levels.Level3.y + 384 - 384 * this.game.scaleFactor;

			this.level4.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.level4.y = Positions.Levels.Level4.y + 384 - 384 * this.game.scaleFactor;

			this.level5.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.level5.y = Positions.Levels.Level5.y + 384 - 384 * this.game.scaleFactor;

			this.js_title.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.js_title.y = Positions.jsTitlePosition.y + 255 - 255 * this.game.scaleFactor;

			this.about_title.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
			this.about_title.y = Positions.jsTitlePosition.y + 275 - 275 * this.game.scaleFactor;
		}
		

		// for(let layer in this.layers){
		// 	if(this.layers.hasOwnProperty(layer)){
		// 		if("levels" === layer){
		// 			this.layers[layer].setScale(0.7, 0.7);
		// 			this.layers[layer].resize(w, h);
		// 			// this.layers[layer].anchor.y = this.game.scaleFactor;
					
		// 			//this.layers[layer].cameraOffset.y += 200;
		// 			// this.layers[layer].resize(w, h);
		// 		}
				
		// 		// this.layers[layer].setScale(1.1, 1.1);
		// 		// this.layers[layer].anchor.y = 0.5;
		// 	}
		// }
	},

	getLayer: function(name){
		return this.layers[name];
	},

	update: function(){

	}
};

export default BackgroundManager;