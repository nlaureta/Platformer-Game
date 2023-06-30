class BootState extends Phaser.Scene {
    constructor() {
        super('bootState');
    }
    preload() {
        this.load.image('finalDisk', './assets/Collectable Sprites/Final_disk.png'); 
    }
    create() {
        
        this.scene.start('loadScene');
    }
}