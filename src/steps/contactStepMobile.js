import Positions from '../positions';
import Const from '../constantes';

let ContactStepMobile = function(game, layer, player){
	this.game = game; 
	this.layer = layer;
    this.player = player;
    this.contactWrapper = document.getElementById('contact-wrapper');
    this.position = {x: Positions.flyRegion.x2 + 12 * Const.TILE_SIZE, y: (Const.GROUND - Const.TILE_SIZE * 25) };

    this.createContactButton();
    this.initializeForm();

    // this.openContactForm();
    
}

ContactStepMobile.prototype.createContactButton = function(){
    let position = this.position, 
    background_1 = this.game.add.graphics(position.x, position.y),
    background_2 = this.game.add.graphics(position.x, position.y),
    contactText = this.game.add.text(position.x + 20, position.y + 50, "MAIL ME HERE");

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
        this.openContactForm();
    }, this);

}

ContactStepMobile.prototype.initializeForm = function(){

    this.contactWrapper.classList.add('hidden');

    // Update FORM
    let form = document.getElementById('contactForm'),
    emailDiv = form.getElementsByClassName('in-email')[0],
    subjectDiv = form.getElementsByClassName('in-subject')[0],
    messageDiv = form.getElementsByClassName('in-message')[0],
    labelEmail = document.createElement("label"),
    labelSubject = document.createElement("label"),
    labelMessage = document.createElement("label");


    labelEmail.innerHTML = "Email : ";
    labelSubject.innerHTML = "Subject : ";
    labelMessage.innerHTML = "Message: ";


    emailDiv.insertBefore(labelEmail, emailDiv.getElementsByTagName('input')[0]);
    subjectDiv.insertBefore(labelSubject, subjectDiv.getElementsByTagName('input')[0]);
    messageDiv.insertBefore(labelMessage, messageDiv.getElementsByTagName('textarea')[0]);

    // ADD TOOLBAR
    this.toolbar = document.createElement('div');
    this.cancelButton = document.createElement('div'),
    this.sendButton = document.createElement('div'),
    this.sendingMessage = document.createElement('div');

    this.cancelButton.innerHTML = "Cancel";
    this.sendButton.innerHTML = "Send";
    this.sendingMessage.innerHTML = "Sending";

    this.cancelButton.classList.add("cancelButton");
    this.sendButton.classList.add("sendButton");
    this.sendingMessage.classList.add("sendingMessage");
    
    this.toolbar.classList.add('toolbar');
    this.toolbar.appendChild(this.cancelButton);
    this.toolbar.appendChild(this.sendButton);
    this.toolbar.appendChild(this.sendingMessage);

    this.contactWrapper.insertBefore(this.toolbar, this.contactWrapper.getElementsByClassName('contact-container')[0]);


    this.contactWrapper.addEventListener('touchmove',function(e){
        e.preventDefault();
    });

    this.cancelButton.addEventListener('click', () => {
        this.contactWrapper.classList.remove("open");
    });

    this.sendButton.addEventListener("touchstart", ()=>{
        let formValid = this.checkForm();

        this.toolbar.classList.add("sending");
        this.displayErrors(formValid);

        if(formValid.length === 0){
            let request = new XMLHttpRequest(),
            me = this,
            data = this.getFormValues();
            request.open('POST', 'http://omegasolutions.fr:3002/mailForm', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(data);

            request.onload = function() {
              if (this.status >= 200 && this.status < 400) {
                let resp = this.response;
                if(resp === "true"){
                    me.sendingMessage.innerHTML = "Message sended";
                    setTimeout(() => {
                        me.contactWrapper.classList.remove("open");
                    }, 2000);
                }
              } else {
                    me.sendingMessage.innerHTML = "Error happen :(";
                    this.contactWrapper.classList.remove("open");
              }
            };
        } else {
            this.toolbar.classList.remove("sending");
        }
    })
}

ContactStepMobile.prototype.getFormValues = function(){
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


ContactStepMobile.prototype.displayErrors = function(formValid){
    let errs = "";

    let formElements = document.getElementById('contactForm').elements;
    for(let i = 0, l = formElements.length; i < l; i++){
        formElements[i].parentNode.setAttribute("data-before", "");
    }

    for(let i = 0, l = formValid.length; i < l; i++){
        formValid[i].field.parentNode.setAttribute("data-before", formValid[i].message);
    }
}

ContactStepMobile.prototype.checkForm = function(){
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

ContactStepMobile.prototype.openContactForm = function(){
    
    if(this.toolbar){
        this.toolbar.classList.remove('sending');
        this.sendingMessage.innerHTML = "Sending";
    }
    this.contactWrapper.classList.add("open");  
}

ContactStepMobile.prototype.update = function(){

}




export default ContactStepMobile;
