class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, layer) {
      super(scene, x, y, texture, frame);
        
        //initilizes player
        this.player = scene.physics.add.sprite(x,y,texture).setScale(0.14).setSize(150, 330).setOffset(50, 5);//setSize(left-/right+,up+/down-)
        console.log("player:" + this.player);
        this.playerWalkSound = scene.sound.add('playerWalkSound', { loop: true });

        this.ACCELERATION = 650;
        this.MAX_X_VEL = 350;   // pixels/second
        this.MAX_Y_VEL = 800; // <1000 so player doesn't fall go through platforms
        this.DRAG = 1400;    
        this.JUMP_VELOCITY = -825;

        //for use other than the contructor's
        this.xaxis = x;
        this.yaxis = y;
        this.theTexture = texture;
        this.tiles = layer;
        this.theScene = scene;
    }

    getPlayer(){
        return this.player;
    }
    
    create(){ 
        this.player.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        //this.physics.world.gravity.y = 3000; // i put the physics world gravity in level 1 line 21
        //this.player.body.setDamping(true); // you could turn this back on if you feel comfortable using it
    }

    update() {
        //left/right movement
        if (cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.ACCELERATION);
            this.player.play('playerWalkAnim', true);
            this.player.setFlip(true,false);
        }else if (cursors.right.isDown) {
            this.player.play('playerWalkAnim', true);
            this.player.resetFlip();
            this.player.body.setAccelerationX(this.ACCELERATION);
        }
        else {
            this.player.play('playerIdleAnim',true);
            this.player.body.setAccelerationX(0); //stop accel, initiate drag
            this.player.body.setDragX(this.DRAG); //0-1; smaller = faster deceleration
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.left) || Phaser.Input.Keyboard.JustDown(cursors.right)) { //plays player walking sound if a or d is just down
            this.playerWalkSound.play();
        }
        if(Phaser.Input.Keyboard.JustUp(cursors.left) || Phaser.Input.Keyboard.JustUp(cursors.right)) { // stops if player no longer walking
            this.playerWalkSound.stop();
        }
        //jump
        if (!this.player.body.blocked.down) {
            this.player.anims.play('playerWalkAnim',false); //stops walking anim in the air
        }
        if(this.player.body.blocked.down){
            if(cursors.up.isDown || keySPACE.isDown) {
                this.player.body.setVelocityY(this.JUMP_VELOCITY);
            }
        }   
    }

}