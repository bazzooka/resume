let Const = {
	TILE_SIZE: 128,  
	ISTOUCHDEVICE: 'ontouchstart' in document.documentElement
}

Const.BOUNDS = 70 * Const.TILE_SIZE;
Const.BOUNDX = 100 * Const.TILE_SIZE;
Const.GROUND = Const.BOUNDS - 11 * Const.TILE_SIZE


export default Const;