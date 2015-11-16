import TextManager from './TextManager';

let ResourceLoader = { 

	preload: function(game){
                game.textManager = new TextManager(game);

                game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js');
                game.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
                game.load.spritesheet('ground', 'assets/ground/spritesheet_ground.png');
                game.load.spritesheet('levels', 'assets/decoration/levels.png');
                game.load.spritesheet('water', 'assets/decoration/liquidWater.png');

                game.load.spritesheet('player', 'assets/player/spritesheet_players.png', 128, 256);

                // game.load.image('background', 'assets/ground/PNG/background-50.png');
                game.load.image('background', 'assets/ground/Backgrounds/colored_grass.png');

                game.load.image('js_resume_title', 'assets/decoration/JS-Resume.png', 1525, 934);
                game.load.image('resume_title', 'assets/decoration/Resume.png', 1245, 783);

                game.load.image('about_title', 'assets/decoration/about.png', 1115, 783);
                game.load.image('triangle', 'assets/decoration/triangle.png', 10, 14);
                game.load.image('sign', 'assets/decoration/sign.png', 70, 70);
                game.load.image('sign_round', 'assets/decoration/sign_round.png', 10, 10);
                game.load.image('sign_fill', 'assets/decoration/sign_fill.png', 10, 10);
                game.load.image('sign_foot', 'assets/decoration/sign_foot.png', 10, 10);
                game.load.spritesheet('buttonRed', 'assets/decoration/buttonRed.png', 70, 70);
                game.load.spritesheet('baby1', 'assets/decoration/baby1.png', 50, 50);
                game.load.spritesheet('baby2', 'assets/decoration/baby2.png', 50, 50);
                game.load.spritesheet('baby3', 'assets/decoration/baby3.png', 50, 50);

                game.load.spritesheet('level1', 'assets/decoration/level1.png', 512, 384);

                game.load.image('welcome', 'assets/decoration/welcome.png', 1024, 512);

                game.load.image('backpack', 'assets/decoration/backpack.png', 68, 60);
                game.load.image('main_expertise', 'assets/decoration/mainExpertise.png', 1537, 926);
                game.load.spritesheet('boxExpertise', 'assets/decoration/boxExpertise.png', 128, 128);


                game.load.spritesheet('switch', 'assets/decoration/switch.png', 70, 70);
                game.load.image('gem_yellow', 'assets/decoration/hud_gem_yellow.png', 46, 36);
	}

}

export default ResourceLoader;