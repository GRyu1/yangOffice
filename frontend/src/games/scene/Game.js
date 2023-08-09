import Phaser, { Scene } from "phaser";
import { createCharacterAnims } from "../anims/CharacterAnims";
import PlayerController from "../characters/PlayerController";
import MyPlayer from "../characters/Myplayer";

export default class Game extends Scene {
    constructor() {
        super('game')
        this.map = null;
        this.network = null;
        this.cursors = null;
        this.keyA = null;
        this.keyS = null;
        this.myPlayer = null;
        this.controller = null;
        this.otherPlayers = null;
        this.otherPlayerMap = new Map();
        this.computerMap = new Map();
        this.whiteboardMap = new Map();
        this.playerTexture = 'adam'
    }


    preload() {
        this.load.tilemapTiledJSON('map', 'assets/maps/fianl.json')
        this.load.spritesheet('basement', 'assets/tilesets/Basement.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('classroom', 'assets/tilesets/Classroom_and_library.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('floorAndGround', 'assets/tilesets/FloorAndGround.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('generic', 'assets/tilesets/Generic.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('modern_office_black_shadow', 'assets/tilesets/Modern_Office_Black_Shadow.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('adam', 'assets/character/adam.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
        this.load.spritesheet('ash', 'assets/character/ash.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
        this.load.spritesheet('lucy', 'assets/character/lucy.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
        this.load.spritesheet('nancy', 'assets/character/nancy.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
    }

    create() {
        // Load Map
        this.map = this.make.tilemap({ key: 'map' });
        const tileset = this.map.addTilesetImage('FloorAndGround', 'floorAndGround')
        // Tile Layer
        const groundLayer = this.map.createLayer('ground', tileset);
        groundLayer.setCollisionByProperty({ collides: true });
        // Object Layer
        this.addGroupFromTiled('carpet', 'generic', 'Generic', false);
        this.addGroupFromTiled('wall', 'floorAndGround', 'FloorAndGround', true);
        this.addGroupFromTiled('office', 'modern_office_black_shadow', 'Modern_Office_Black_Shadow', false);
        this.addGroupFromTiled('officeOnCollides', 'modern_office_black_shadow', 'Modern_Office_Black_Shadow', true);
        this.addGroupFromTiled('generic', 'generic', 'Generic', false);
        this.addGroupFromTiled('genericOnCollides', 'generic', 'Generic', true);
        this.addGroupFromTiled('classRoom', 'classroom', 'Classroom_and_library', false);
        this.addGroupFromTiled('classRoomOnCollides', 'classroom', 'Classroom_and_library', true);
        this.addGroupFromTiled('basement', 'basement', 'Basement', false);
        this.addGroupFromTiled('basementOnCollides', 'basement', 'Basement', true);
        // Loader Player
        createCharacterAnims(this.anims)
        
        // , this.network.mySessionId
        this.myPlayer = this.physics.add.sprite(800, 500, 'adam')
        this.controller = new PlayerController(this, 0, 0, 16, 16)

        this.cameras.main.zoom = 1.3
        this.cameras.main.startFollow(this.myPlayer, true);

        this.registerKeys()
        

        
    }

    update() {
        if (this.myPlayer) {
            const speed = 200;
            let vx=0;
            let vy=0;
            if(this.cursors.left.isDown){
              vx-=speed
            }
            else if(this.cursors.right.isDown){
              vx+=speed
            }

            if(this.cursors.up.isDown){
              vy-=speed
              this.myPlayer.setDepth(this.myPlayer.y)
            } else if(this.cursors.down.isDown){
              vy+=speed
              this.myPlayer.setDepth(this.myPlayer.y)
            }

            this.myPlayer.setVelocity(vx , vy)
            this.myPlayer.body.velocity.setLength(speed);
            // this.myPlayer.playContainerBody.setVelocity(vx , vy)
            // this.myPlayer.playContainerBody.setLength(speed)
            console.log(vx,vy)

            if (vx > 0) {
                this.myPlayer.anims.play(`${this.playerTexture}_run_right`, true)
            } else if (vx < 0) {
                this.myPlayer.anims.play(`${this.playerTexture}_run_left`, true)
            } else if (vy > 0) {
                this.myPlayer.anims.play(`${this.playerTexture}_run_down`, true)
            } else if (vy < 0) {
                this.myPlayer.anims.play(`${this.playerTexture}_run_up`, true)
            } else {
                this.myPlayer.anims.play(`${this.playerTexture}_idle_down`, true)
            //   const parts = this.myPlayer.anims.currentAnim.key.split('_')
            //   parts[1] = 'idle'
            //   const newAnim = parts.join('_')
            //   // this prevents idle animation keeps getting called
            //   if (this.anims.currentAnim.key !== newAnim) {
            //     this.play(parts.join('_'), true)
            //     // send new location and anim to server
            //     // network.updatePlayer(this.x, this.y, this.anims.currentAnim.key)
            //   }
            }



        }
    }

    registerKeys() {
        this.cursors = {
            ...this.input.keyboard.createCursorKeys()
        }

        // maybe we can have a dedicated method for adding keys if more keys are needed in the future
        this.keyA = this.input.keyboard.addKey('A')
        this.keyS = this.input.keyboard.addKey('S')
        this.input.keyboard.disableGlobalCapture()
        // this.input.keyboard.on('keydown-ENTER', (event) => {
        //     store.dispatch(setShowChat(true))
        //     store.dispatch(setFocused(true))
        // })
        // this.input.keyboard.on('keydown-ESC', (event) => {
        //     store.dispatch(setShowChat(false))
        // })
    }

    addGroupFromTiled(objectLayerName, key, tilesetName, collidable) {
        const group = this.physics.add.staticGroup();
        const objectLayer = this.map.getObjectLayer(objectLayerName);
        objectLayer.objects.forEach((object) => {
            const actualX = object.x + object.width * 0.5;
            const actualY = object.y - object.height * 0.5;

            const tileset = this.map.getTileset(tilesetName);
            const tileIndex = object.gid - tileset.firstgid;

            const tile = group
                .get(actualX, actualY, key, tileIndex)
                .setDepth(actualY);

            // Check if flipping horizontal is true and flip the image accordingly
            if (object.flippedHorizontal) {
                tile.flipX = true;
            }
        });

        if (this.myPlayer && collidable) {
            this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group);
        }
    }

    disableKeys() {
        this.input.keyboard.enabled = false
    }

    enableKeys() {
        this.input.keyboard.enabled = true
    }

}