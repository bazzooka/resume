import Positions from '../positions';
import Const from '../constantes';

let ContactStepMobile = function(game, layer, player){
	this.game = game; 
	this.layer = layer;
    this.player = player;
    this.contactWrapper = document.getElementById('contact-wrapper');
    this.position = {x: Positions.flyRegion.x2 + 12 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 25) };

    this.createContactButton();
    this.createDownloadCVButton();

    
}

ContactStepMobile.prototype.createContactButton = function(){
    const offset = -400;
    let position = this.position, 
    background_1 = this.game.add.graphics(position.x + offset, position.y),
    background_2 = this.game.add.graphics(position.x + offset, position.y),
    contactText = this.game.add.text(position.x + 20 + offset, position.y + 50, "MAIL ME HERE");

    background_1.beginFill(0x808080);
    background_1.drawRect(0, 0, 340, 150);
    background_1.endFill();

    background_2.beginFill(0x4E4E4E);
    background_2.drawRect(10, 10, 320, 130);
    background_2.endFill();


    contactText.font = 'Righteous';
    contactText.fontSize = 43;
    contactText.fill = "#FFFFFF";


    this.layer.add(background_1);
    this.layer.add(background_2);
    this.layer.add(contactText);

    contactText.inputEnabled = true;
    contactText.events.onInputDown.add(() => {
        //window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=jonathan.souied+resume@gmail.com&su=Amazing oppportuniy&body=Hello Jo');
        document.getElementById('mail').click();
    }, this);

}


ContactStepMobile.prototype.createDownloadCVButton = function(){
    let position = this.position, 
    background_1 = this.game.add.graphics(position.x, position.y),
    background_2 = this.game.add.graphics(position.x, position.y),
    contactText = this.game.add.text(position.x + 20, position.y + 50, "Download CV");

    background_1.beginFill(0x808080);
    background_1.drawRect(0, 0, 340, 150);
    background_1.endFill();

    background_2.beginFill(0x4E4E4E);
    background_2.drawRect(10, 10, 320, 130);
    background_2.endFill();


    contactText.font = 'Righteous';
    contactText.fontSize = 43;
    contactText.fill = "#FFFFFF";


    this.layer.add(background_1);
    this.layer.add(background_2);
    this.layer.add(contactText);

    contactText.inputEnabled = true;
    contactText.events.onInputDown.add(() => {
        document.getElementById('cv').click()
    }, this);

}



export default ContactStepMobile;
