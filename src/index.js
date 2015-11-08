import Boot from './states/Boot';
import Preload from './states/Preload';
import Game from './states/Game';

var game, App = {};

App.start = function() {
    game = new Phaser.Game(
        960, 640,
        Phaser.CANVAS,
        'content'
    );

    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('game', Game);

    game.state.start('boot');

    return game;
};

window.WebFontConfig = {};
window.GAME = App.start();