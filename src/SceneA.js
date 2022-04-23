import Phaser, { Game } from 'phaser';



//import * as imports from './importHelperA.js';
import * as paletteCreator from './paletteCreator';

import * as utilities from "./utilities.js";
var initialSetup = false;

var aboutBoxShowing = false;

class sceneA extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneA_mainMenu' });
        
    }
    preload ()
    {
        // this.load.audio("music",[imports.musicmp3,imports.musicogg ])
        // this.load.spritesheet('animatedlogo', imports.animatedLogo, { frameWidth: 800, frameHeight: 800 });
        // this.load.image('mainMenuBG',imports.mainMenuBG);
        // this.load.spritesheet('buttonFrame', imports.buttonFrame, {
        //     frameWidth: 312,
        //     frameHeight: 52
        // });
        // this.load.spritesheet('musicOnButton', imports.musicOnSprite, {
        //     frameWidth: 52,
        //     frameHeight: 52
        // });
        // this.load.spritesheet('musicOffButton', imports.musicOffSprite, {
        //     frameWidth: 52,
        //     frameHeight: 52
        // });
        // this.load.image('cat-palette', imports.catPalette);
        // this.load.spritesheet('catanimated', imports.catAnimation, {
        //     frameWidth: 64,
        //     frameHeight: 64
        // });
        // this.load.spritesheet('catanimated2', imports.catAnimation2, {
        //     frameWidth: 64,
        //     frameHeight: 64
        // });
        // this.load.spritesheet('catanimated3', imports.catAnimation3, {
        //     frameWidth: 64,
        //     frameHeight: 64
        // });

    }
    create(){
        global.soundEffectsOn = true;
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
        let continueButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:250,y:400,text:"Start Game"});
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
        var mButton= new utilities.musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });
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

        var aboutButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+162,text:"About"});
        aboutButton.on('pointerdown', function(){
            //self.toggleAboutBox(aboutBoxShowing);
            console.log("click")
        },self );


        const aboutContent = "Welcome to Cat Town! In Cats wih Jobs, you get assigned a Cat Pal and your job is to help them get ready for their day. Each resident comes with a story, but your Cat Pal's looks for the day are ultimately up to you. You can view the last ten Cat Pals you have helped in the gallery."
        
        var aboutBox = this.add.image(continueButton.x + 300,continueButton.y+162, 'promptBoard')
            .setDepth(4)
            .setDisplaySize(150,250);
            
        var aboutText = this.add.text(aboutBox.x,aboutBox.y-52,aboutContent,{
			fontFamily: 'Courier New',
			fontSize: '18px',
			color: '#000000',
			resolution: 1,
            wordWrap : {width : 370, padding:9, useAdvancedWrap : true},
		})
        .setOrigin(0.5)
        .setDepth(4);


        var galleryButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+81,text:"Gallery"});
        galleryButton.on('pointerdown', function(pointer, localX, localY, event){
            self.scene.start('scene_Gallery');
        },self );
        
        function toggleAboutBox(aboutBoxShowing){
            if(aboutBoxShowing == true){
                aboutBoxShowing=false;
                aboutBox.setVisible(false);
                aboutText.setVisible(false);
            }
            else{
                aboutBoxShowing = true;
                aboutBox.setVisible(true);
                aboutText.setVisible(true);
            }
        }
           
    }
    update(){
    }

}
export {sceneA};
