//var map;
//var layer;
//var cursors;
//var enemyFire;
//var shootTime = 0;
class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1Scene");

    }
    preload() {
        this.load.tilemapTiledJSON('map', './assets/level1tilemap.json'); // temporary 
    }
    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('Level1Scene')
            })
        })

        this.ROOMWIDTH = 960;
        this.ROOMHEIGHT = 540;

        currentScene = 1; // sets current scene (1 for level 1)

        this.physics.world.gravity.y = 2000;//sets the gravity of the world

        this.diskStack = [];//stack array for disks 

        //this.background = this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width, game.config.height + 321, 'background');

        //temporary tilemap, will change using tilemap editor
        const map = this.make.tilemap({ key: 'map' }); //makes tilemap from json above
        const tileset = map.addTilesetImage('neonTiles', 'level1tiles'); // test_tiles sets the position of the tiles from level1tilemap.json and ground_1x1 are the tiles
        const backgroundSet = map.addTilesetImage('l1_background','level1background') //l1_background is from Tiled in the Tilesets. level1background is from Load.js.
        const backgroundLayer = map.createLayer("Background", backgroundSet,0,0); // "Background" is the name of the layer in Tiled
        this.layer = map.createLayer('Ground', tileset); // 'Ground' is the name of the Tile Layer from Tiled. Also in level1tilemap.json
        

        this.layer.setCollisionByProperty({ collides: true }); // sets tile custom properties 'collides' to true 

        // set world bounds (so collideWorldBounds works)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels); // sets bounds of world based on map size

        //collision debugger(comment this all out to remove the colors)
        // const debugGraphics = this.add.graphics().setAlpha(0.45); // collision debugger for tilemap
        // this.layer.renderDebug(debugGraphics, {
        //     tileColor: new Phaser.Display.Color(40, 255, 48, 255), // Color of non-colliding tiles (green)
        //     collidingTileColor: new Phaser.Display.Color(90), // Color of colliding tiles (the platforms, red)
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

        //tween system
        let gfx = this.make.graphics().fillStyle(0x0000ff).fillRect(0, 0, -w, h/4);
        gfx.generateTexture('bluerect', -w, h/4);

        gfx = this.make.graphics().fillStyle(0xffffff).fillRect(0, 0, w, h / 8);
        gfx.generateTexture('whiterect');
        gfx.destroy();

        //level 1 tween
        // let whiteRect = this.add.image(w, h /2 , 'whiterect').setOrigin(0);
        // let rectRightTween = this.tweens.add({
        //     delay: 375,
        //     targets: whiteRect,
        //     x: w-390,
        //     ease: 'Linear',
        //     duration: 250,
        //     repeat: 0,
        //     yoyo: true,
        //     hold: 1650,
        //     paused: true,
        //     onComplete: function () {
        //         whiteRect.destroy();

        //     },
        //     onCompleteScope: this   // maintain scene context
        // });
        
        let topText = this.add.text(w + 300, h / 2 , "Level 1", { fontfamily: 'papyrus', fontSize: 40, color: 'black' }).setOrigin(1, 0);
        topText.setShadow(0, 3, '#FF47B6', true, true);
        topText.setStroke('#10F9F9', 2);
        let topTextTween = this.tweens.add({
            delay: 375,
            targets: topText,
            x: w-220,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 1650,
            paused: true,
            onComplete: function () {
                topText.destroy();
                this.tweenPlay = false;
            },
            onCompleteScope: this   // maintain scene context
        });
        topTextTween.play(); //plays tween "Level 1"
        //rectRightTween.play();
        this.tweenPlay = true;
    
        //initilizes songs
        this.song_01 = this.sound.add('lvl1_01', { loop: false });
        this.song_02 = this.sound.add('lvl1_02', { loop: false });
        this.song_03 = this.sound.add('lvl1_03', { loop: false });
        this.song_04 = this.sound.add('lvl1_04', { loop: false });
        this.song_05 = this.sound.add('lvl1_05', { loop: false });
        this.song_full = this.sound.add('lvl1_full', { loop: false });

        //initilizes SFX
        this.selectSound = this.sound.add('selectSound', { loop: false });
        this.collectSound = this.sound.add('collectSound', {loop: false});
        this.stopMusicSound = this.sound.add('stopMusicSound', { loop: false });
        this.enemyShootSound = this.sound.add('EnemyShootSound', {loop: false});

        //initilizes Animations
        this.anims.create({ 
            key: 'crosshairAnim', 
            frames: this.anims.generateFrameNames('crosshair', {      
                prefix: 'crosshair',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 2,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'enemyAnim', 
            frames: this.anims.generateFrameNames('enemyRange', {      
                prefix: 'mute shooter',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'playerIdleAnim', 
            frames: this.anims.generateFrameNames('playerIdle', {      
                prefix: 'stand_by',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'playerWalkAnim', 
            frames: this.anims.generateFrameNames('playerWalk', {      
                prefix: 'walk right',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'mutemanAnim', 
            frames: this.anims.generateFrameNames('enemyMeleeShoot', {      
                prefix: 'muteman',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 15,
            repeat: -1 
        });

        const p1Spawn = map.findObject("Object Layer 1", obj => obj.name === "playerSpawn"); // gets player spawn from tiled
        this.player = new Player(this, p1Spawn.x, p1Spawn.y, 'sprite', 0, this.layer);//put in new player (scene,x,y,image, frame, layer)
        this.player.getPlayer().setCollideWorldBounds(true);
        this.player.create(); // sets velocity
        this.player.getPlayer().anims.play('playerIdleAnim');

        this.crosshair = this.add.sprite(this.player.getPlayer().x, this.player.getPlayer().y, 'crosshair'); // crosshair for range enemy
        this.crosshair.play('crosshairAnim');
        this.crosshair.setVisible(false);

        //puts in enemy (scene,x,y,image,frame)
        this.enemy = new Enemy(this, 663, 33, 'enemyRange', 0);
        this.enemy.getEnemy().play('enemyAnim');

        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.75);

        //second enemy but in sentry mode
        this.enemy2 = this.add.path(1980, 249);// makes square path
        this.enemy2.lineTo(2152,249);
        this.enemy2.lineTo(1980,249);
        //this.enemy2.draw(graphics); // to see the path (draws the white lines)
        let s = this.enemy2.getStartPoint();
        this.enemy2 = this.add.follower(this.enemy2,s.x,s.y,'enemyMelee2').setScale(0.3);
        this.physics.world.enable(this.enemy2);
        this.enemy2.body.setAllowGravity(false);
        this.enemy2.body.setSize(160, 250).setOffset(50, 10);
        this.enemy2.startFollow({
            from: 0,         
            to: 1,
            delay: 0,
            duration: 2000,
            ease: 'Quad',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: false
        });

        this.enemy3 = new Enemy(this, 3830, 477, 'enemyRange', 0);
        this.enemy3.getEnemy().play('enemyAnim');

        this.enemy4 = this.add.path(4476, 503);// makes square path
        this.enemy4.lineTo(4476,133);
        this.enemy4.lineTo(4390,197);
        this.enemy4.lineTo(4398,209);
        this.enemy4.lineTo(4292,115);
        this.enemy4.lineTo(4192,345);
        this.enemy4.lineTo(4092,277);
        this.enemy4.lineTo(4092,503);
        this.enemy4.lineTo(4476,503);
        //this.enemy4.draw(graphics); // to see the path (draws the white lines)
        s = this.enemy4.getStartPoint();
        this.enemy4 = this.add.follower(this.enemy4,s.x,s.y,'enemyMeleeShoot').setScale(0.23);
        this.enemy4.play('mutemanAnim')
        this.physics.world.enable(this.enemy4);
        this.enemy4.body.setAllowGravity(false);
        this.enemy4.body.setSize(160, 300).setOffset(50, 10);
        this.enemy4.startFollow({
            from: 0,         
            to: 1,
            delay: 0,
            duration: 8000,
            ease: 'Quint.easeInOut',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: false
        });

        this.enemy6 = this.add.path(2334, 489);// makes square path
        this.enemy6.lineTo(2460,489);
        this.enemy6.lineTo(2334,489);
        //this.enemy6.draw(graphics); // to see the path (draws the white lines)
        s = this.enemy6.getStartPoint();
        this.enemy6 = this.add.follower(this.enemy6,s.x,s.y,'enemyMelee2').setScale(0.3);
        this.physics.world.enable(this.enemy6);
        this.enemy6.body.setAllowGravity(false);
        this.enemy6.body.setSize(160, 250).setOffset(50, 10);
        this.enemy6.startFollow({
            from: 0,         
            to: 1,
            delay: 0,
            duration: 3000,
            ease: 'Expo.easeIn',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: false
        });

        this.enemy7 = this.add.path(2542, 207);// makes square path
        this.enemy7.lineTo(2382,207);
        this.enemy7.lineTo(2542,207);
        //this.enemy7.draw(graphics); // to see the path (draws the white lines)
        s = this.enemy7.getStartPoint();
        this.enemy7 = this.add.follower(this.enemy7,s.x,s.y,'enemyMelee').setScale(0.3);
        this.physics.world.enable(this.enemy7);
        this.enemy7.body.setAllowGravity(false);
        this.enemy7.body.setSize(160, 250).setOffset(50, 10);
        this.enemy7.startFollow({
            from: 0,         
            to: 1,
            delay: 0,
            duration: 4000,
            ease: 'Quart.easeInOut',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: false
        });

        this.enemy8 = new Enemy(this, 3422, 495, 'enemyRange', 0);
        this.enemy8.getEnemy().play('enemyAnim');

        //this.pauseScene = new Pause(this, 'Level1Scene');
        this.pauseButton = this.add.image(game.config.width /2 + 410, game.config.height/2 - 240, 'pauseButton').setScale(1.5).setInteractive()
        .on('pointerdown', () => {
            this.checkMusicPlayer();
            this.scene.launch('pauseScene');
            this.scene.pause();
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
        }); 
        this.pauseButton.scrollFactorX = 0;
        this.pauseButton.scrollFactorY = 0;

        //enemy shooting system
        this.enemyFire = this.physics.add.group();
        //this.enemyFire = new ProjectilesGroup(this);
        this.enemyFire.createMultiple({
            frameQuantity: 50,
            active: false,
            visible: false,
            key: 'enemyShoot'
        })

        this.fireRate = 0;
        this.hitRate = 0;
        this.nextFire = 0;

        //disk collection numbers
        this.numDiskCollected = 0;
        this.maxDisktoCollect = 5;

        //disks
        this.disk = this.physics.add.sprite(726, 347, 'blueDisc').setScale(0.03).setCircle(600, 300,290);
        this.disk2 = this.physics.add.sprite(1552, 303, 'greenDisc').setScale(0.03).setCircle(600, 300,290);
        this.disk3 = this.physics.add.sprite(2526,207, 'pinkDisk').setScale(0.03).setCircle(600, 300,290);
        this.disk4 = this.physics.add.sprite(3795, 221, 'turquioseDisc').setScale(0.03).setCircle(600, 300,290);
        this.disk5 = this.physics.add.sprite(4392, 183, 'redDisc').setScale(0.03).setCircle(600, 300,290);
        this.diskCompleted = this.physics.add.sprite(4924, 485, 'finalDisk').setScale(0.04).setSize(1200,1200);
        this.diskCompleted.setActive(false);
        this.diskCompleted.setVisible(false);

        //Displays if level 1 completed
        this.level1CompletedText = this.add.text(game.config.width / 2 - 150, game.config.height / 2, 'Level 1 Completed!', { fontFamily: 'Courier', fontSize: '25px', color: 'white', align: 'left' })
        this.level1CompletedText.setShadow(0, 3, '#FF47B6', true, true);
        this.level1CompletedText.setStroke('#10F9F9', 2);
        this.level1CompletedText.scrollFactorX = 0;
        this.level1CompletedText.scrollFactorY = 0;
        this.level1CompletedText.setVisible(false);
        this.nextLevelText = this.add.text(game.config.width / 2 - 100, game.config.height / 2 + 50, 'Next Level!', { fontFamily: 'Courier', fontSize: '25px', color: 'black', align: 'left' }).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Level2Scene');
                this.song_full.stop();
            })
            .on('pointerover', () => {
                this.nextLevelText.setStyle({ fill: 'white' });
            })
            .on('pointerout', () => {
                this.nextLevelText.setStyle({ fill: 'black' })
            });;
        this.nextLevelText.setShadow(0, 3, '#FF47B6', true, true);
        this.nextLevelText.setStroke('#10F9F9', 2);
        this.nextLevelText.scrollFactorX = 0;
        this.nextLevelText.scrollFactorY = 0;
        this.nextLevelText.setVisible(false);

        //text UI (it is in text for now, will implement a bar later in the future)
        // this.progressUI = this.add.text(game.config.width/2 +150, game.config.height/2 - 260, 'Disk Collected ' + this.numDiskCollected, {fontFamily: 'Courier',fontSize: '25px',color: 'red',align: 'left'});

        // // keeps text on top right when player is moving
        // this.progressUI.scrollFactorX = 0; 
        // this.progressUI.scrollFactorY = 0;

        //particle system
        this.collectVfxManager = this.add.particles('notes');
        this.collectVfxEffect = this.collectVfxManager.createEmitter({
            follow: this.player.getPlayer(),
            quantity: 7,
            scale: { start: 1.5, end: 0.0 },  // start big, end small
            speed: { min: 50, max: 100 }, // speed up
            lifespan: 800,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });

        this.loseDiskVfxManager = this.add.particles('blueDisc');
        this.loseDiskVfxEffect = this.loseDiskVfxManager.createEmitter({
            follow: this.player.getPlayer(),
            quantity: 1,
            scale: { start: 0.06, end: 0.0 },  // start big, end small
            speed: { min: 50, max: 100 }, // speed up
            lifespan: 900,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });
        this.loseDisk2VfxManager = this.add.particles('greenDisc');
        this.loseDisk2VfxEffect = this.loseDisk2VfxManager.createEmitter({
            follow: this.player.getPlayer(),
            quantity: 1,
            scale: { start: 0.06, end: 0.0 },  // start big, end small
            speed: { min: 50, max: 100 }, // speed up
            lifespan: 900,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });
        this.loseDisk3VfxManager = this.add.particles('pinkDisk');
        this.loseDisk3VfxEffect = this.loseDisk3VfxManager.createEmitter({
            follow: this.player.getPlayer(),
            quantity: 1,
            scale: { start: 0.06, end: 0.0 },  // start big, end small
            speed: { min: 50, max: 100 }, // speed up
            lifespan: 900,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });
        this.loseDisk4VfxManager = this.add.particles('turquioseDisc');
        this.loseDisk4VfxEffect = this.loseDisk4VfxManager.createEmitter({
            follow: this.player.getPlayer(),
            quantity: 1,
            scale: { start: 0.06, end: 0.0 },  // start big, end small
            speed: { min: 50, max: 100 }, // speed up
            lifespan: 900,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });
        this.loseDisk5VfxManager = this.add.particles('redDisc');
        this.loseDisk5VfxEffect = this.loseDisk5VfxManager.createEmitter({
            follow: this.player.getPlayer(),
            quantity: 1,
            scale: { start: 0.06, end: 0.0 },  // start big, end small
            speed: { min: 50, max: 100 }, // speed up
            lifespan: 900,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });

        //camera settings
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //this.cameras.main.setZoom(1.2);
        this.cameras.main.startFollow(this.player.getPlayer());
    
        //progress bar
        this.progressText = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 250, 'Progress ', { fontFamily: 'Courier', fontSize: '25px', color: 'white', align: 'left' });
        this.progressText.setShadow(0, 3, '#FF47B6', true, true);
        this.progressText.setStroke('#10F9F9', 2);
        this.progressText.scrollFactorX = 0;
        this.progressText.scrollFactorY = 0;

        //controls
        cursors = this.input.keyboard.createCursorKeys();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L); // for next level (debugging)

        //collisions
        this.tilesCollide = this.physics.add.collider(this.player.getPlayer(), this.layer);
        this.physics.add.collider(this.disk, this.layer);
        this.physics.add.collider(this.disk2, this.layer);
        this.physics.add.collider(this.disk3, this.layer);
        this.physics.add.collider(this.disk4, this.layer);
        this.physics.add.collider(this.disk5, this.layer);
        this.physics.add.collider(this.diskCompleted, this.layer);
        this.physics.add.collider(this.enemy.getEnemy(), this.layer);
        this.physics.add.collider(this.enemy2, this.layer);
        this.physics.add.collider(this.enemy3.getEnemy(), this.layer);
        this.physics.add.collider(this.enemy8.getEnemy(), this.layer);

        this.gameComplete = false;
    }
    
    update() {
        if (!this.tweenPlay) { // if tween isnt playing
            this.player.update(); // allows player movement
            if (!this.gameComplete) {
                if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy.getEnemy().x, this.enemy.getEnemy().y) < 200) { // gets distance of player and enemy
                    //this.enemyFollows(this.enemy.getEnemy(), this.player.getPlayer(), 100); // if player is in range of enemy, enemy starts following player
                    this.enemyHit(this.enemy.getEnemy(),400) //melee and range enemy
                    this.enemyShoot(this.enemy.getEnemy(),1000, 300);
                    this.crosshair.setPosition(this.player.getPlayer().x, this.player.getPlayer().y).setScale(0.17); // crosshair to indicate enemy is aiming at player
                } else if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy3.getEnemy().x, this.enemy3.getEnemy().y) < 150) {
                    //this.enemyFollows(this.enemy.getEnemy(), this.player.getPlayer(), 100); // if player is in range of enemy, enemy starts following player
                    this.enemyHit(this.enemy3.getEnemy(), 400) //melee and range enemy
                    this.enemyShoot(this.enemy3.getEnemy(),2000, 300);
                    this.crosshair.setPosition(this.player.getPlayer().x, this.player.getPlayer().y).setScale(0.17); // crosshair to indicate enemy is aiming at player
                } else if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy4.x, this.enemy4.y) < 150) {
                    this.enemyHit(this.enemy4, 200) //melee and range enemy
                    this.enemyShoot(this.enemy4, 2000,500);
                    this.crosshair.setPosition(this.player.getPlayer().x, this.player.getPlayer().y).setScale(0.17); // crosshair to indicate enemy is aiming at player
                } else if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy8.getEnemy().x, this.enemy8.getEnemy().y) < 350) {
                    //this.enemyFollows(this.enemy.getEnemy(), this.player.getPlayer(), 100); // if player is in range of enemy, enemy starts following player
                    this.enemyHit(this.enemy8.getEnemy(),400) //melee and range enemy
                    this.enemyShoot(this.enemy8.getEnemy(),2000,300);
                    this.crosshair.setPosition(this.player.getPlayer().x, this.player.getPlayer().y).setScale(0.17); // crosshair to indicate enemy is aiming at player
                } else {
                    this.crosshair.setVisible(false); //if out of range crosshair invisible again
                    //console.log('in range');
                }
            
                if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy2.x, this.enemy2.y) < 200) { // gets distance of player and enemy
                    this.enemyHit(this.enemy2, 300) // melee enemy
                    //console.log('in range');
                }
                if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy6.x, this.enemy6.y) < 200) { // gets distance of player and enemy
                    this.enemyHit(this.enemy6, 400) // melee enemy
                    //console.log('in range');
                }
                if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy7.x, this.enemy7.y) < 200) { // gets distance of player and enemy
                    this.enemyHit(this.enemy7, 300) // melee enemy
                    //console.log('in range');
                }
            }
        }

        //progress bar options
        //display appropriate progress sprite with opacity animation and destroy previous
        //sprites on screen to save memory
        if (this.numDiskCollected == 5) {
            this.progSprite1 = this.add.sprite(game.config.width / 2 + 240, 33, 'progress_atlas', 'progress_0006').setScale(.75, .5);
            this.progSprite1.scrollFactorX = 0;
            this.progSprite1.scrollFactorY = 0;
            this.progSprite1.setAlpha(0.1);
            this.progSprite2.destroy();
            this.diskCompleted.setActive(true);
            this.diskCompleted.setVisible(true);
        } else if (this.numDiskCollected == 4) {
            this.progSprite2 = this.add.sprite(game.config.width / 2 + 240, 33, 'progress_atlas', 'progress_0005').setScale(.75, .5);
            this.progSprite2.scrollFactorX = 0;
            this.progSprite2.scrollFactorY = 0;
            this.progSprite2.setAlpha(0.1);
            this.progSprite3.destroy();
        } else if (this.numDiskCollected == 3) {
            this.progSprite3 = this.add.sprite(game.config.width / 2 + 240, 33, 'progress_atlas', 'progress_0004').setScale(.75, .5);
            this.progSprite3.scrollFactorX = 0;
            this.progSprite3.scrollFactorY = 0;
            this.progSprite3.setAlpha(0.1);
            this.progSprite4.destroy();
        } else if (this.numDiskCollected == 2) {
            this.progSprite4 = this.add.sprite(game.config.width / 2 + 240, 33, 'progress_atlas', 'progress_0003').setScale(.75, .5);
            this.progSprite4.scrollFactorX = 0;
            this.progSprite4.scrollFactorY = 0;
            this.progSprite4.setAlpha(0.1);
            this.progSprite5.destroy();
        } else if (this.numDiskCollected == 1) {
            this.progSprite5 = this.add.sprite(game.config.width / 2 + 240, 33, 'progress_atlas', 'progress_0002').setScale(.75, .5);
            this.progSprite5.scrollFactorX = 0;
            this.progSprite5.scrollFactorY = 0;
            this.progSprite5.setAlpha(0.1);
            this.progSprite0.destroy();
        } else {
            this.progSprite0 = this.add.sprite(game.config.width / 2 + 240, 33, 'progress_atlas', 'progress_0001').setScale(.75, .5);
            this.progSprite0.scrollFactorX = 0;
            this.progSprite0.scrollFactorY = 0;
            this.progSprite0.alpha = 0.1;
        }


        if (this.checkOverlap(this.player.getPlayer(), this.disk)) { // if collided with first song, plays and destroys
            this.diskStack.push(this.song_01); //pushes first song into stack array
            //console.log(this.diskStack);
            this.checkPlayInc();
            //console.log(this.numDiskCollected);
            //console.log("collided"); //increments collected
            //console.log(this.diskStack);
            this.song_01.play();
            this.disk.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk2)) { // if collided with second song, plays and destroys
            this.diskStack.push(this.song_02); //pushes second song into stack array
            //console.log(this.diskStack);
            this.checkPlayInc();
            //console.log(this.numDiskCollected);
            //console.log("collided");
            //console.log(this.diskStack);
            this.song_02.play();
            this.disk2.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk3)) { // if collided with third song, plays and destroys
            this.diskStack.push(this.song_03); //pushes second song into stack array
            //console.log(this.diskStack);
            this.checkPlayInc();
            //console.log(this.numDiskCollected);
            //console.log("collided");
            //console.log(this.diskStack);
            this.song_03.play();
            this.disk3.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk4)) { // if collided with forth song, plays and destroys
            this.diskStack.push(this.song_04); //pushes second song into stack array
            //console.log(this.diskStack);
            this.checkPlayInc();
            //console.log(this.numDiskCollected);
            //console.log("collided");
            //console.log(this.diskStack);
            this.song_04.play();
            this.disk4.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk5)) { // if collided with fifth song, plays and destroys
            this.diskStack.push(this.song_05); //pushes second song into stack array
            //console.log(this.diskStack);
            this.checkPlayInc();
            //console.log(this.numDiskCollected);
            //console.log("collided");
            //console.log(this.diskStack);
            this.song_05.play();
            this.disk5.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.diskCompleted) && this.numDiskCollected == this.maxDisktoCollect) { // if collided with fifth song, plays and destroys
            this.checkMusicPlayer();
            this.song_full.play();
            this.diskCompleted.destroy();
            this.level1CompletedText.setVisible(true);
            this.nextLevelText.setVisible(true);
            this.collectSound.play();
            this.enemy.getEnemy().destroy();
            this.collectVfxEffect.explode();
            this.enemy2.destroy();
            level1Completed = true;
            this.gameComplete = true;
            this.pauseButton.destroy();

        }
        if (this.checkOverlap(this.player.getPlayer(), this.enemyFires)) { // if collided with enemy projectile, destroys projectile and spawns disk at spot
            this.enemyFires.destroy();
            // if(this.numDiskCollected > 0)
            //     this.loseDiskVfxEffect.explode();
            this.addColliders();
        }
        if (this.numDiskCollected < this.maxDisktoCollect) { // if less than max disk to collect, locks final disk again
            this.diskCompleted.setActive(false);
            this.diskCompleted.setVisible(false);
        }

        if (keyL.isDown) {
            this.scene.start('Level2Scene');
        }

        //this.progressUI.text = 'Disk Collected: ' + this.numDiskCollected + ' / ' + this.maxDisktoCollect; //updates numCollected text
    }

    // ----------helper functions-----------

    checkPlayInc() { //checks and stops last song, plays collection sound, and increments
        this.checkMusicPlayer();
        this.collectSound.play();
        this.collectVfxEffect.explode();
        this.numDiskCollected++;
    }

    addColliders() { //calls checkPlaying() and adds collisions to the disk so they don't fall off the map
        this.checkPlaying();
        //console.log('collided with enemy');
        if (this.numDiskCollected > 0)
            this.stopMusicSound.play();
        this.physics.add.collider(this.disk, this.layer);
        this.physics.add.collider(this.disk2, this.layer);
        this.physics.add.collider(this.disk3, this.layer);
        this.physics.add.collider(this.disk4, this.layer);
        this.physics.add.collider(this.disk5, this.layer);
        //console.log(this.diskStack);
        //console.log(this.numDiskCollected);
    }
    
    checkOverlap(object1, object2) { // checks overlaps of two objects
        return this.physics.overlap(object1, object2);
    }

    enemyFollows(enemy, player, speed) { // enemy follows the player
        this.physics.moveToObject(enemy, player, speed);
    }
    enemyShoot(enemy, firerate, speed) { // enemy shoots at player (only for range enemies)
        if (this.time.now > this.fireRate) {
            this.fireRate = this.time.now + firerate; // time until enemy shoots again (1 second = 1000ms)
            this.enemyFires = this.enemyFire.getFirstDead();
            this.enemyFires.setScale(0.7).setSize(45, 45).setOffset(5, 5);//setSize(left-/right+,up+/down-)
            if (this.enemyFires) {
                this.crosshair.setVisible(true);
                //console.log('fire');
                this.enemyShootSound.play();
                this.enemyFires.body.reset(enemy.x, enemy.y);
                this.enemyFires.setVisible(true);
                this.physics.moveToObject(this.enemyFires, this.player.getPlayer(), speed);
                this.enemyFires.body.gravity.y = -2000;
            }
        }
    }
    enemyHit(enemy, firerate) { // enemy hits player (for melee or range of player walks towards them)
        if (this.time.now > this.hitRate) {
            this.hitRate = this.time.now + firerate; // time until enemy hits again (1 second = 1000ms)
            if (this.checkOverlap(this.player.getPlayer(), enemy)) { // checks if player collided with enemy
                    //console.log('hit');
                    // if(this.numDiskCollected > 0)
                    //     this.loseDiskVfxEffect.explode();
                    this.addColliders();
            }
        }
    }
    getDistance(x1, y1, x2, y2) { // checks if enemy is in range of player
        return Phaser.Math.Distance.Between(x1, y1, x2, y2);
    }

    checkPlaying() { // song popping system. pops and places disk back to it's original location
        this.songPopped = this.diskStack.pop(); // pops song and sets to this.songPopped
        if (this.songPopped === this.song_01) { // if song popped is first song
            //console.log('disk 1 taken from enemy');
            this.loseDiskVfxEffect.explode();
            this.song_01.stop();
            this.disk = this.physics.add.sprite(726, 347, 'blueDisc').setScale(0.03).setCircle(600, 300,290);
        }
        if (this.songPopped === this.song_02) {// if song popped is second song
            //console.log('disk 2 taken from enemy');
            this.loseDisk2VfxEffect.explode();
            this.song_02.stop();
            this.disk2 = this.physics.add.sprite(1552, 303, 'greenDisc').setScale(0.03).setCircle(600, 300,290);
        }
        if (this.songPopped === this.song_03) {// if song popped is third song
            //console.log('disk 3 taken from enemy');
            this.loseDisk3VfxEffect.explode();
            this.song_03.stop();
            this.disk3 = this.physics.add.sprite(2526,207, 'pinkDisk').setScale(0.03).setCircle(600, 300,290);
        }
        if (this.songPopped === this.song_04) {// if song popped is forth song
            //console.log('disk 4 taken from enemy');
            this.loseDisk4VfxEffect.explode();
            this.song_04.stop();
            this.disk4 = this.physics.add.sprite(3795, 221, 'turquioseDisc').setScale(0.03).setCircle(600, 300,290);
        }
        if (this.songPopped === this.song_05) {// if song popped is fifth song
            //console.log('disk 5 taken from enemy');
            this.loseDisk5VfxEffect.explode();
            this.song_05.stop();
            this.disk5 = this.physics.add.sprite(4392, 183, 'redDisc').setScale(0.03).setCircle(600, 300,290);
        }
        if (this.numDiskCollected > 0)
            this.numDiskCollected--;
    }
    checkMusicPlayer() { // stops last song if a new disk is picked up
        if (this.song_01.isPlaying) {
            //console.log('music 1 is playing');
            this.song_01.stop();
        }
        if (this.song_02.isPlaying) {
            //console.log('music 2 is player');
            this.song_02.stop();
        }
        if (this.song_03.isPlaying) {
            //console.log('music 3 is player');
            this.song_03.stop();
        }
        if (this.song_04.isPlaying) {
            //console.log('music 4 is player');
            this.song_04.stop();
        }
        if (this.song_05.isPlaying) {
            //console.log('music 5 is player');
            this.song_05.stop();
        }
    }

}