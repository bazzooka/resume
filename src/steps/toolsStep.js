import Positions from '../positions';

let ToolsStep = function(game, layer, addPositionCallback){
	this.game = game; 
	this.layer = layer;
	this.addPositionCallback = addPositionCallback;
	this.boxes = [];
	this.createToolsBox();
}

ToolsStep.prototype.createToolsBox = function(){
	let tools = {

	}

	for(var i = 0; i < 15; i++){
		let box = this.game.add.sprite(0 +  i * 130, Positions.expertiseBox.y, 'libraries');
		box.frame = i;
		// this.game.physics.p2.enable(box);
		// box.body.offset.x = 100;
		// box.body.setCollisionGroup(this.collisionsCG.group);
  //       box.body.collides(this.collisionsCG.groups);
		this.boxes.push(box);
	}

	// this.addPositionCallback(Positions.waterPositions.x1 - 200, () => {
	// 	var boxTweens = [];
	// 	for(var i = 0; i < this.boxes.length; i++){
	// 		this.game.physics.p2.removeBody(this.boxes[i].body);
	// 		this.game.backPack.add(this.boxes[i], i, true, true)
	// 		this.game.add.tween(this.boxes[i].scale).to( { x: 0.5, y: 0.5 }, 5000, "Quart.easeOut", true);
	// 	}
	// });

	this.createRope(10, 500, Positions.expertiseBox.y - 100);
}

 
ToolsStep.prototype.createRope = function(length, xAnchor, yAnchor) {

    var lastRect;
    var height = 20;        //  Height for the physics body - your image height is 8px
    var width = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
    var maxForce = 20000;   //  The force that holds the rectangles together.
    var chainElement = null;

    for (var i = 0; i <= length; i++){
        var x = xAnchor;                    //  All rects are on the same x position
        var y = yAnchor + (i * height);     //  Every new rect is positioned below the last
        let newRect = null;

        if (i % 2 === 0){
            //  Add sprite (and switch frame every 2nd time)
            newRect = this.game.add.sprite(x, y, 'chain', 1);
        } else {
            newRect = this.game.add.sprite(x, y, 'chain', 0);
            lastRect.bringToTop();
        }

        //  Enable physicsbody
        this.game.physics.p2.enable(newRect, false);

        //  Set custom rectangle
        newRect.body.setRectangle(width, height);

        if (i === 0) {
            newRect.body.static = true;
        } else {  
            //  Anchor the first one created
            newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
            newRect.body.mass = length / i;     //  Reduce mass for evey rope element
        }

        //  After the first rectangle is created we can add the constraint
        if (lastRect) {
            this.game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
        }

        lastRect = newRect;
        chainElement = newRect;

    }

    let box = this.game.add.sprite(chainElement.x, chainElement.y, 'libraries');
    box.frame = 1;
    this.game.physics.p2.createRevoluteConstraint(chainElement, [0, -10], box, [0, 10], maxForce);

}

export default ToolsStep;