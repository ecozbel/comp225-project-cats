import Phaser, { Game } from 'phaser';

// import mainMenuBG from './assets/backgrounds/mainMenuBackground.png';
// import animatedLogo from './assets/menuAssets/logoAnimated.png';
// import buttonFrame from './assets/icons/buttonFrameLarge.png'
// import genericButton from './genericButton';

import * as imports from './importHelperA.js';
import * as paletteCreator from './paletteCreator';
var initialSetup = false;

class sceneA extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneA_mainMenu' });
        
    }
    preload ()
    {
        this.load.audio("music",[imports.musicmp3,imports.musicogg ])
        this.load.spritesheet('animatedlogo', imports.animatedLogo, { frameWidth: 800, frameHeight: 800 });
        this.load.image('mainMenuBG',imports.mainMenuBG);
        this.load.audio("buttonClick1Sound", imports.buttonClick1Sound)
        this.load.spritesheet('buttonFrame', imports.buttonFrame, {
            frameWidth: 312,
            frameHeight: 52
        });
        this.load.spritesheet('musicOnButton', imports.musicOnSprite, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.spritesheet('musicOffButton', imports.musicOffSprite, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.image('cat-palette', imports.catPalette);
        this.load.spritesheet('catanimated', imports.catAnimation, {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('catanimated2', imports.catAnimation2, {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('catanimated3', imports.catAnimation3, {
            frameWidth: 64,
            frameHeight: 64
        });

    }
    create(){
        global.soundEffectsOn = true;//eventually, have a button to toggle this. all sound effect sonly play if this===true;
        var background = this.add.image(400,300,'mainMenuBG')
        var logo = this.add.sprite(250,160,'animatedlogo').setDisplaySize(400, 400)
        .setDepth(4);
        const windBlow = this.anims.create({
            key: 'windblowing',
            frames: this.anims.generateFrameNumbers('animatedlogo',{ start: 0, end: 2 }),
            frameRate: 8
        });
        logo.play({key:'windblowing',repeat:-1});
        

        

        var camera = this.cameras.main;
        var self = this;
        if(initialSetup != true){
            paletteCreator.createPalettes(self);
            initialSetup=true;
        }
        //paletteCreator.createPalettes(self);
        let continueButton= new imports.genericButton({scene:self,key:'buttonFrame',x:250,y:400,text:"Start Game"});
        continueButton.on('pointerdown', function(pointer, localX, localY, event){
            camera.fadeOut(1000);    
        },self );
        camera.on('camerafadeoutcomplete', function(){
            startNextScene();

        },self);
        function startNextScene(){
            self.scene.start('sceneB_pickCat');
        }

        global.buttonClickSound1 = this.sound.add("buttonClick1Sound",{ loop: false });
        var backgroundMusic = this.sound.add('music',{ loop: false });
        var mButton= new imports.musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });
        this.game.bgMusic = backgroundMusic;
        mButton.on('pointerdown', function () {
            toggleSound(backgroundMusic)
        },self);

        function toggleSound(givenSound){
            if (givenSound.isPlaying){
                givenSound.stop();
            }
            else{
                givenSound.play();
            }
        }

        let aboutButton= new imports.genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+81,text:"About"});

        var galleryButton= new imports.genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+162,text:"Gallery"});
        galleryButton.on('pointerdown', function(pointer, localX, localY, event){
            self.scene.start('scene_Gallery');
        },self );
           
    }
    update(){
    }

}
export {sceneA};
