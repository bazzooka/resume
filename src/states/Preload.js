import ResourceLoader from '../resourceLoader';

class Preload {

    constructor() {
        this.messages = [
            "640K ought to be enough for anybody",
            "the architects are still drafting",
            "the bits are breeding",
            "we're building the buildings as fast as we can",
            "while the little elves draw your map",
            "a few bits tried to escape, but we caught them",
            "and dream of faster computers",
            "checking the gravitational constant in your locale",
            "hum something loud while others stare",
            "the server is powered by a lemon and two electrodes",
            "we love you just the way you are",
            "we're testing your patience",
            "as if you had any other choice",
            "follow the white rabbit",
            "while the satellite moves into position",
            "the bits are flowing slowly today",    
            "it's still faster than you could draw it"
        ]
    }

    preload() {
        // Show the preloader here (example preloader sprite below)
        /*
        this.loadingSprite = this.add.sprite(320, 480, 'preloader');
        this.loadingSprite.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadingSprite);
         */

        // Load game assets here (example below)
        /*
        this.load.image('logo', 'assets/logo.png');
         */

        //this.loadingSprite = this.add.sprite(320, 480, 'preloader');
        
        this.loadingText = this.add.text(80, this.game.world.centerY - 50, "Please wait " + this.messages[this.game.rnd.integerInRange(0, this.messages.length - 1)], {font: "20px Arial", fill: "#FFFFFF"});
        this.loadingText.x = (this.game.width - this.loadingText.getLocalBounds().width) / 2;



        this.loaderBg = this.add.sprite(this.game.world.centerX - 206, this.game.world.centerY, 'loaderBg');
        this.loaderActive = this.add.sprite(this.game.world.centerX - 206, this.game.world.centerY, 'loaderActive');

        this.loaderMask = this.game.add.graphics(this.game.world.centerX - 206, this.game.world.centerY);
        this.loaderMask.beginFill("0xF5000");
        this.loaderMask.drawCircle(0, 0, 425*2);

        this.loaderActive.mask = this.loaderMask;

        this.percentText = this.add.text(this.game.world.centerX, this.game.world.centerY, "Hallo", {font: "20px Arial", fill: "#FFFFFF"});

        ResourceLoader.preload(this.game);
    }

    create() {
        // (optionally) show the splash page or menu when the load completes
        console.log("Hello");
        this.game.state.start('game', true, false);
    }

    loadUpdate () {
        this.percentText.text = this.load.progress + "%";

        this.loaderMask.scale.x = this.load.progress /100;
        this.loaderMask.scale.y = this.load.progress /100;
    }

}

export default Preload;