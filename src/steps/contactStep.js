import Positions from '../positions';
import Const from '../constantes';

let ContactStep = function(game, layer, player){
	this.game = game; 
	this.layer = layer;
    this.player = player;
    this.triggerPositionX = 128* Const.TILE_SIZE;
    this.defaultCameraPositionY = 0;
    this.contactWrapper = document.getElementById('contact-wrapper');

    this.position = {x: Positions.flyRegion.x2 + 12 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 23)- this.game.cache.getImage('canette').height   };

    this.canette = this.game.add.sprite(this.position.x, this.position.y, "canette");
    this.canetteBut = this.game.add.sprite(this.position.x + 75, this.position.y + 250, "canette-but");

    this.errBg = this.game.add.graphics(this.position.x, this.position.y);
    this.errBg.beginFill(0xae7640);
    this.errBg.drawRect(-20, 0, 200, 100);
    this.errBg.endFill();

    this.errBulle = this.game.add.graphics(this.position.x, this.position.y);
    this.errBulle.beginFill(0xae7640);
    this.errBulle.moveTo(50, 100);
    this.errBulle.bezierCurveTo(60, 105, 70, 120, 50, 130);
    this.errBulle.bezierCurveTo(70, 120, 80, 105, 80, 100);
    this.errBg.endFill();

    this.errTxt = this.game.add.text(player.player.x, player.player.y, "");
    this.errTxt.font = 'Righteous';
    this.errTxt.fontSize = 20;
    this.errTxt.width = 200;
    this.errTxt.lineSpacing = -10;

    this.layer.add(this.canette);
    this.layer.add(this.canetteBut);
    this.layer.add(this.errBg);
    this.layer.add(this.errTxt);
    this.layer.add(this.errBulle);


    this.errBg.alpha = 0;
    this.errTxt.alpha = 0;
    this.errBulle.alpha = 0;



    this.canetteBut.inputEnabled = true;
    this.canetteBut.input.useHandCursor = true; //if you want a hand cursor
    this.canetteBut.events.onInputDown.add(() => {
        let formValid = this.checkForm();

        this.displayErrors(formValid);

        if(formValid.length === 0){
            let request = new XMLHttpRequest(),
            data = this.getFormValues();
            request.open('POST', 'http://omegasolutions.fr:3002/mailForm', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(data);

            request.onload = function() {
              if (this.status >= 200 && this.status < 400) {
                let resp = this.response;
                if(resp === "true"){
                    this.errBg.alpha = 1;
                    this.errTxt.alpha = 1;
                    this.errBulle.alpha = 1;
                    this.errTxt.text = "Well done !\nI'll keep you update..."
                }
              } else {
                this.errBg.alpha = 1;
                this.errTxt.alpha = 1;
                this.errBulle.alpha = 1;
                this.errTxt.text = "An error happen :(\nSend me an email @\njonathan.souied@gmail.com"

              }
            };
        }
    }, this);
}

ContactStep.prototype.getFormValues = function(){
    let form = document.getElementById('contactForm'),
        elements = form.elements,
        datas = "";

    for(let i = 0, l = elements.length; i < l; i++){
        let inputElt = elements[i],
        name = inputElt.name,
        value = inputElt.value;

        datas += name + "="+ JSON.stringify(value) + "&";
    }
    return datas;
}

ContactStep.prototype.displayErrors = function(formValid){
    let errs = "";
    for(let i = 0, l = formValid.length; i < l; i++){
        errs += "-" + formValid[i].message + "\n";
    }
    this.errTxt.text = errs;

    if(formValid.length === 0){
        this.errBg.alpha = 0;
        this.errBulle.alpha = 0;
    } else {
        this.errBg.alpha = 1;
        this.errTxt.alpha = 1;
        this.errBulle.alpha = 1;
    }
}

ContactStep.prototype.checkForm = function(){
    let form = document.getElementById('contactForm'),
        elements = form.elements,
        errors = [],
        re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    for(let i = 0, l = elements.length; i < l; i++){
        let inputElt = elements[i],
        name = inputElt.name,
        value = inputElt.value;

        if(("message" === name || "email" === name || "subject" === name) && !value){
            errors.push({"message": name + " must be fill", field: inputElt});
        } else if("email" === name && !re.test(value)){
            errors.push({"message": "invalid mail", field: inputElt});
        }
    }
    return errors;
}

ContactStep.prototype.update = function(){
    let deadzone = this.game.camera.deadzone,
    cameraPos = this.game.camera.position,
    view = this.game.camera.view;

    if(view.x + view.width > this.position.x){
        let deplacementX = -view.x + this.position.x + 235,
            deplacementY = -view.y + this.position.y + 43;
        this.contactWrapper.style = "transform: translate3d(" + deplacementX + "px, " + deplacementY+"px, 0)";
    } else if(this.player.player.position.x < Positions.flyRegion.x1){
        this.errTxt.alpha = 0;
        this.errBg.alpha = 0;
        this.errBulle.alpha = 0;
    }
    this.errTxt.position.x = this.player.player.position.x + 50;
    this.errTxt.position.y = this.player.player.position.y - 100;

    this.errBg.position.x = this.player.player.position.x + 50;
    this.errBg.position.y = this.player.player.position.y - 110;

    this.errBulle.position.x = this.player.player.position.x + 15;
    this.errBulle.position.y = this.player.player.position.y - 115;
}


export default ContactStep;
