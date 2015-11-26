import Boot from './states/Boot';
import Preload from './states/Preload';
import Game from './states/Game';

var game, App = {};

App.start = function() {
    game = new Phaser.Game(
        window.innerWidth , window.innerHeight,
        Phaser.CANVAS,
        'content'
    );

    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('game', Game);

    game.state.start('boot');

    return game;
};

window.WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() {
        //console.log(me.createText);
        //game.time.events.add(Phaser.Timer.SECOND, me.createText, me);
        console.log("Start Game");
        window.GAME = App.start();
    },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Righteous', 'Reenie Beanie']
    }
};
//window.GAME = App.start();


