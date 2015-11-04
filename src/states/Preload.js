class Preload {

    constructor() {

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
    }

    create() {
        // (optionally) show the splash page or menu when the load completes
        this.game.state.start('game', true, false);
    }

}

export default Preload;