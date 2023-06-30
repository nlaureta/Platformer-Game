class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload() {
        //load atlases
        this.load.atlas('progress_atlas', './assets/UI/progressBar.jpg', './assets/UI/progressBar.json'); // level 1 progress bar
        this.load.atlas('rockProg_atlas', './assets/UI/rock_progBar.jpg', './assets/UI/rock_progBar.json'); // level 2 progress bar
        this.load.atlas('crosshair', './assets/UI/crosshairSprite.png', './assets/UI/crosshairAnim.json'); 
        this.load.atlas('playerIdle', './assets/Player Sprites/stand_by.png', './assets/Player Sprites/stand_by.json');
        this.load.atlas('playerWalk', './assets/Player Sprites/walk_right.png', './assets/Player Sprites/walk_right.json' );
        this.load.atlas('enemyRange', './assets/Enemy Sprites/muteshooter.png', './assets/Enemy Sprites/muteshooter.json');
        this.load.atlas('enemyMeleeShoot', './assets/Enemy Sprites/muteman.png', './assets/Enemy Sprites/muteman1.json');

        //loads all sprites and background
        this.load.image('menuBackground', './assets/Menu Assets/MenuBackground.png');//menu background
        this.load.image('level1background', './assets/Tilemaps/lvl1_Background.png'); 
        this.load.image('level2background', './assets/Tilemaps/Level_2_Background.png'); 
        this.load.image('level2backgroundOrange', './assets/Tilemaps/Level_2_Background_Orange.png'); 
        this.load.image('level1tiles', './assets/Tilemaps/level1tiles.png'); 
        this.load.image('level2tiles', './assets/Tilemaps/level2tiles.png'); 
        this.load.image('notes', './assets/UI/noteParticle1.png');
        this.load.image('notes2', './assets/UI/noteParticle2.png');

        this.load.image('blueDisc', './assets/Collectable Sprites/blue_disc.png'); 
        this.load.image('redDisc', './assets/Collectable Sprites/disc.png'); 
        this.load.image('greenDisc', './assets/Collectable Sprites/green_disc.png'); 
        this.load.image('pinkDisk', './assets/Collectable Sprites/pink_disc.png'); 
        this.load.image('turquioseDisc', './assets/Collectable Sprites/turquoise_disc.png'); 
        this.load.image('yellowDisc', './assets/Collectable Sprites/yellow_disc.png'); 

        //loads pause UI
        this.load.image('pauseButton', './assets/UI/PauseButton.png');
        this.load.image('restartButton', './assets/UI/restartButton.png');
        this.load.image('playButton', './assets/UI/playButton.png');

        //loads enemy sprites
        this.load.image('enemyMelee', './assets/Enemy Sprites/melee_muteman_2.png'); 
        this.load.image('enemyMelee2', './assets/Enemy Sprites/melee_muteman_right.png'); 
        this.load.image('enemyShoot', './assets/Enemy Sprites/mute_2.png'); 
        
        //music may take a while to load due to uncompressed wav format
        //dialogue music
        this.load.audio('dialogueMusic', './assets/Menu Assets/Menu_music 1.wav');
        this.load.audio('menuMusic', './assets/Menu Assets/Menu_music_fixed.wav');

        //level 1 music 
        this.load.audio('lvl1_01', './assets/Level1Music/TechnoLVL1_01_fixed.wav');
        this.load.audio('lvl1_02', './assets/Level1Music/TechnoLVL1_02_fixed.wav');
        this.load.audio('lvl1_03', './assets/Level1Music/TechnoLVL1_03_fixed.wav');
        this.load.audio('lvl1_04', './assets/Level1Music/TechnoLVL1_04_fixed.wav');
        this.load.audio('lvl1_05', './assets/Level1Music/TechnoLVL1_05_fixed.wav');
        this.load.audio('lvl1_full', './assets/Level1Music/TechnoLVL1_full_fixed.wav');

        //level 2 music
        this.load.audio('lvl2_01', './assets/Level2Music/RockLVL2_01_fixed.wav');
        this.load.audio('lvl2_02', './assets/Level2Music/RockLVL2_02_fixed.wav');
        this.load.audio('lvl2_03', './assets/Level2Music/RockLVL2_03_fixed.wav');
        this.load.audio('lvl2_04', './assets/Level2Music/RockLVL2_04_fixed.wav');
        this.load.audio('lvl2_05', './assets/Level2Music/RockLVL2_05_fixed.wav');
        this.load.audio('lvl2_full', './assets/Level2Music/RockLVL2_full_fixed.wav');

        //SFX
        this.load.audio('collectSound', './assets/SFX/Collection_sfx.wav');
        this.load.audio('EnemyShootSound', './assets/SFX/Enemy_shoot_sfx.wav');
        this.load.audio('EnemyWalkSound', './assets/SFX/Enemy_walk.wav');
        this.load.audio('stopMusicSound', './assets/SFX/Music_stop_sfx.wav');
        this.load.audio('playerWalkSound', './assets/SFX/Player_walk.wav');
        this.load.audio('selectSound', './assets/SFX/select_sound.wav');

        this.add.sprite(game.config.width/2, game.config.height/2, 'finalDisk').setScale(0.85);
        //prints message indicating player that game is loading
        this.add.text(game.config.width/2 -5, game.config.height/2, 'Loading...', { fontFamily: 'Segoe Script', fontSize: '30px', color: 'white', align: 'left' });
        
    }

    create(){
        this.scene.start('startScene');
    }
}