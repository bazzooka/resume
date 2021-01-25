import Positions from '../positions';

let ToolsStep = function(game, layer, addPositionCallback, groups){
	this.game = game; 
	this.layer = layer;
	this.addPositionCallback = addPositionCallback;
	this.boxes = [];
	this.tools = ["React", "Next", "React Native", "Vue", "Nuxt", "Apollo", "Redux", "Docker",
    "Jenkins", "Ansible", "Kubernetes", "AWS", "Firebase", "OpenCV", "PyTorch"];
	this.groups = groups;
	this.createToolsBox();
}

ToolsStep.prototype.createToolsBox = function(){
	let tools = {

	}
 
	for(var i = 0; i < 15; i++){
		this.createRope(10, Positions.toolsLayerPosition.x + i * 140, Positions.toolsLayerPosition.y - 90, i);
	}
}

 
ToolsStep.prototype.createRope = function(length, xAnchor, yAnchor, frame) {

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
        this.layer.add(newRect);

        //  Enable physicsbody
        this.game.physics.p2.enable(newRect, false);

        //  Set custom rectangle
        newRect.body.setRectangle(width, height);

        if (i === 0) {
            newRect.body.static = true;
        } else {  
            //  Anchor the first one created
            newRect.body.velocity.x = 5;      //  Give it a push :) just for fun
            newRect.body.mass = length / i;     //  Reduce mass for evey rope element
        }

        //  After the first rectangle is created we can add the constraint
        if (lastRect) {
            this.game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
        }

        lastRect = newRect;
        chainElement = newRect;

    }

    let box = this.game.add.sprite(lastRect.x, lastRect.y, 'libraries', frame);
    this.game.physics.p2.enable(box, false);
    box.body.setCollisionGroup(this.groups.group);
    box.body.collides(this.groups.groups);
    // box.body.setRectangle(width, height);
    box.body.velocity.x = 5;      //  Give it a push :) just for fun
    box.body.mass = 10;
    this.layer.add(box);
    
	lastRect.bringToTop();
    let constraint = this.game.physics.p2.createRevoluteConstraint(lastRect, [0, -10], box, [0, -64], maxForce);
    this.boxes.push(box);

    let cloud = this.game.add.sprite(lastRect.x - 64, yAnchor - 45, 'clouds', this.game.rnd.integerInRange(0, 2));
    this.layer.add(cloud);

    this.addPositionCallback(lastRect.x + 64, () =>{
		box.body.data.gravityScale = -1;
		setTimeout(() => {
			this.game.physics.p2.removeConstraint(constraint);
            setTimeout(() => {
                this.game.backPack.addToBackPack(box, frame, this.tools[frame]);
            }, 1500);
            
		}, 1500);
	});


}

export default ToolsStep;