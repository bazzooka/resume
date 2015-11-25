class Boot {

    preload() {
        //this.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png', 128, 128);
        this.load.image('loaderBg', "assets/decoration/loader.png");
        this.load.image('loaderActive', "assets/decoration/loaderF.png");
    }

    create() {
        // max number of fingers to detect
        this.input.maxPointers = 1;

        // auto pause if window looses focus
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.stage.scale.pageAlignHorizontally = true;
        }

        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // this.stage.scale.setScreenSize(true);
        //   this.game.scale.setScreenSize(true);
        

        this.game.state.start('preload', true, false);
    }

}

export default Boot;