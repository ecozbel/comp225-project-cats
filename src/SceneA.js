import Phaser, { Game } from 'phaser';

// import mainMenuBG from './assets/backgrounds/mainMenuBackground.png';
// import animatedLogo from './assets/menuAssets/logoAnimated.png';
// import buttonFrame from './assets/icons/buttonFrameLarge.png'
// import genericButton from './genericButton';

import * as imports from './importHelperA.js';

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

    }
    create(){

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

           
    }
    update(){
    }

}
export {sceneA};
