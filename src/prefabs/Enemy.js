class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
        
        this.enemy = scene.physics.add.sprite(x,y,texture).setScale(0.25);

        this.xaxis = x;
        this.yaxis = y;
        this.theTexture = texture;
        this.theScene = scene;
    }

    getEnemy(){
        return this.enemy;
    }
}