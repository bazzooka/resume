import Const from './constantes';

let Positions = {
	playerInitial: {x: Const.TILE_SIZE * 120, y: Const.GROUND - Const.TILE_SIZE * 25 },
	jsTitlePosition : {x: 0, y : Const.GROUND - 275},
	aboutPosition : {x: 1500, y : Const.GROUND - 275},
	aboutLayerPosition: {x: 2000},
	mainExpertisePosition : {x: 4800, y : Const.GROUND - 275},
	expertiseBox: {x: 1800, y: Const.GROUND - 256},
	waterPositions: {x1: 58 * Const.TILE_SIZE, x2: 79 * Const.TILE_SIZE, y: Const.GROUND + 4 * Const.TILE_SIZE},
	toolsLayerPosition: {x: 94 * Const.TILE_SIZE, y: Const.GROUND - 5 * Const.TILE_SIZE},
	flyRegion: {x1: 115 * Const.TILE_SIZE, x2: 116 * Const.TILE_SIZE, y1: Const.GROUND - 25 * Const.TILE_SIZE}
}
 
export default Positions;
