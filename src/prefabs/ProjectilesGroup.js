//unused, will probably figure out a use for this later
class Projectiles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'enemyShoot');
        this.theScene = scene;
    }
    fire(x,y, enemyFire, player){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);

        //this.theScene.physics.moveToObject(enemyFire, player, 50);
        //if(playerX >)
          //  this.setVelocityX(500);
       
            //this.setVelocityX(-500);
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        if(this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class ProjectilesGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world,scene);
        
        this.createMultiple({
            classType: Projectiles,
            //frameQuantity: 30,
            active: false,
            visible: false,
            key: 'enemyShoot'
        })

        
    }
    fireBullets(x,y, enemyFire, player){
        const enemyShoot = this.getFirstDead();
        if(enemyShoot) {
            enemyShoot.fire(x,y, enemyFire, player);
            
        }
    }
}