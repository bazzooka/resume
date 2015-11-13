let WelcomeStep = function(game, layer){
	this.game = game;
	this.layer = layer;
	this.particles = [];
	this.colors = ['f44336', 'E91E63', '673AB7', '3F51B5', '2196F3', '03A9F4',
	'00BCD4', '009688', '4CAF50', '8BC34A', 'CDDC39', 'FFEB3B', 'FFC107', 'FF9800',
	'FF5722', '795548', '9E9E9E', '607D8B'];

	this.createWelcomeMessage();
}

WelcomeStep.prototype.createWelcomeMessage = function(){
	let bmd = this.game.make.bitmapData(1024, 512);
	bmd.draw(this.game.cache.getImage('welcome'), 0, 0);
	bmd.update();

	for(var x = 0; x < 1024; x+=9){
		for(var y = 0; y < 512; y+=9){
			let pixel = bmd.getPixel32(x, y);
			if(pixel !== 0){
				this.particles.push({
					x: x,
					y: y,
					radius: 20,
					color: this.colors[this.game.rnd.integerInRange(0, this.colors.length - 1)]
				})
			}
		}
	}

	let graphics = this.game.add.graphics();
		graphics.x = 200;
		graphics.y = 128*100 - 500;
		graphics.beginFill("0xF50000", 1);
		graphics.drawCircle(0, 0, 50);
		graphics.endFill();
		graphics.scale.x = 1;
		graphics.scale.y = 1;
	let tween = this.game.add.tween(graphics.scale).to({x: 0.0, y: 0.0}, 500, "Linear", true, 0, -1).yoyo(true, 500);

	
	for(let i = 0, l = this.particles.length; i < l; i++){
		let particle = this.particles[i];
		let graphics = this.game.add.graphics();
		graphics.x = particle.x + 200;
		graphics.y = particle.y + 128*100 - 500;
		graphics.beginFill("0x" + particle.color);
		graphics.drawCircle(0, 0, particle.radius);
		graphics.endFill();
		this.layer.add(graphics);
		// this.game.add.tween(graphics).to({x: 400.0, y: 100*128 - 200}, 5000, "Linear", true);
		//this.game.add.tween(graphics.scale).to({x: 0.0, y: 0.0}, 200, "Linear", true, 0, -1).yoyo(true, 200);
	}

}

WelcomeStep.prototype.update = function(){
}

WelcomeStep.prototype.render = function(){
	
}

export default WelcomeStep;