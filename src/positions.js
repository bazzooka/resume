import Const from './constantes';

let Positions = {
	playerInitial: {x: Const.TILE_SIZE * 25, y: Const.GROUND - Const.TILE_SIZE * 5 },
	Levels: {
		Level1 : {x: 1200, y: Const.GROUND - 384},
		Level2 : {x: 4700, y: Const.GROUND - 384},
		Level3 : {x: 6800, y: Const.GROUND - 384},
		Level4 : {x: 11200, y: Const.GROUND - 3 * Const.TILE_SIZE - 384},
		Level5 : {x: 15300, y: Const.GROUND - 23 * Const.TILE_SIZE - 384},
	},
	jsTitlePosition : {x: Const.TILE_SIZE * 3, y : Const.GROUND - 255},
	aboutPosition : {x: 1500, y : Const.GROUND - 275},
	aboutLayerPosition: {x: 2000},
	mainExpertisePosition : {x: 4800, y : Const.GROUND - 275},
	expertiseBox: {x: 1800, y: Const.GROUND - 256},
	waterPositions: {x1: 58 * Const.TILE_SIZE, x2: 79 * Const.TILE_SIZE, y: Const.GROUND + 4 * Const.TILE_SIZE},
	toolsLayerPosition: {x: 94 * Const.TILE_SIZE, y: Const.GROUND - 5 * Const.TILE_SIZE},
	flyRegion: {x1: 115 * Const.TILE_SIZE, x2: 116 * Const.TILE_SIZE, y1: Const.GROUND - 25 * Const.TILE_SIZE}
}
 
export default Positions;
