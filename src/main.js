// global variables
let cursors;
let currentScene = 0;
let level1Completed = false;
let level2Completed = false;

//main game object
let config = {
    type: Phaser.AUTO,
    width: 960,//840
    height: 540,//525
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [BootState,Load, Start, Menu, Tutorial, LevelChoose, Level1, Level2, Pause, Credits]
};

let game = new Phaser.Game(config);

let keyA, keyS, keyD, keyW, keySPACE, keyF, keyL;