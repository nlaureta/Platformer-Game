class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene');
    }
    create() {
        this.add.text(game.config.width / 2- 120, game.config.height / 2 - 100, 'PAUSED', {fontSize: 70});
        this.add.image(game.config.width/2 - 60, game.config.height/2 + 20, 'playButton').setScale(0.3).setInteractive() //resume game
        .on('pointerdown', () => {
            if(currentScene == 1) {
                this.scene.resume('Level1Scene');
            }else if(currentScene == 2)
                this.scene.resume('Level2Scene');
            this.scene.stop();
        });
        this.add.image(game.config.width/2 + 80, game.config.height/2 + 20, 'restartButton').setScale(0.3).setInteractive() // restart game
        .on('pointerdown', () => {
            if(currentScene == 1)
                this.scene.start('Level1Scene');
            else if(currentScene == 2) {
                this.scene.start('Level2Scene');
            }    
        });
        this.add.text(game.config.width/2 - 40, game.config.height/2 + 80, 'Menu', {fontSize:40, fontFamily: 'Comic Sans MS'}).setInteractive() // go to menu
        .on('pointerdown', () => {
            this.scene.start('menuScene');
            if(currentScene == 1)
                this.scene.stop('Level1Scene');
            else if(currentScene == 2) {
                this.scene.stop('Level2Scene');
            }
        });
    }
  
}

