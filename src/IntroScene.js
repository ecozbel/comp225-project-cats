import Phaser, { Game } from 'phaser';
import * as paletteCreator from './paletteCreator';
import * as utilities from "./utilities.js";
var initialSetup = false;

class IntroScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'IntroScene' });
    }
    preload () 
    {
    }
    create(){
        //Set up background and animated logo
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
        //If first time being in main menu, build cat palettes in preparation
        if(initialSetup != true){
            paletteCreator.createPalettes(self);
            initialSetup=true;
        }
        //Button to progress to next scene
        let continueButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:250,y:400,text:"Start Game"});
        continueButton.on('pointerdown', function(pointer, localX, localY, event){
            let camera = this.cameras.main;
            camera.fadeOut(1000);
            camera.on('camerafadeoutcomplete', function(){
                startNextScene()
            },self);
        },self );
        function startNextScene(){
            self.scene.start('PickCatScene');
        }
        global.buttonClickSound1 = this.sound.add("buttonClick1Sound",{ loop: false });
        //General utility music button
        var mButton= new utilities.musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });
        var backgroundMusic = this.game.bgMusic;
        mButton.on('pointerdown', function () {
            toggleSound(backgroundMusic)
        },self);
        //plays the music if its not playing already, otherwise, just toggles the sound of the music.
        //so it doesn't play from the beginning every time.
        function toggleSound(givenSound){
            if (!givenSound.isPlaying){
                givenSound.play()
            }
            if (global.soundEffectsOn == true){
                givenSound.volume = 1;
            } else {
                givenSound.volume = 0;
            }
        }
        //Content for about text box
        const aboutContent = "Welcome to Cat Town! In Cats with Jobs, you get assigned a Cat Pal and your job is to help them get ready for their day. Each resident comes with a story, but your Cat Pal's looks for the day are ultimately up to you. Memories of the last ten Cat Pals you have helped will be stored in the gallery. Original artwork and music created by Ceyhun, Ifraah, Nawal and Jarett. With thanks to Richard Davey's phaser template."
        //About text box background
        var aboutBox = this.add.image(continueButton.x + 360,continueButton.y+20, 'promptBoard')
            .setDepth(4)
            .setDisplaySize(350,350)
            .setVisible(false);
        //About text
        var aboutText = this.add.text(aboutBox.x,aboutBox.y-10,aboutContent,{
			fontFamily: 'Courier New',
			fontSize: '18px',
			color: '#000000',
			resolution: 1,
            wordWrap : {width : 320, padding:4, useAdvancedWrap : true},
		})
        .setOrigin(0.5)
        .setDepth(4)
        .setVisible(false);
        //Button to toggle about box
        var aboutButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+162,text:"About"});
        aboutButton.on('pointerdown', function(){
            toggleAboutBox(aboutBox,aboutText);
        },self );
        aboutBox.showing = false;
        //Button to progress to gallery scene
        var galleryButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+81,text:"Gallery"});
        galleryButton.on('pointerdown', function(pointer, localX, localY, event){
            let camera = this.cameras.main;
            camera.fadeOut(1000);
            camera.on('camerafadeoutcomplete', function(){
                startGalleryScene()

            },self);
        },self );
        function startGalleryScene(){
            self.scene.start('scene_Gallery');
        }
        //Toggles the visibility of about box
        function toggleAboutBox(aboutBox,aboutText){
            if(aboutBox.showing == true){
                aboutBox.showing=false;
                aboutBox.setVisible(false);
                aboutText.setVisible(false);
            }
            else{
                aboutBox.showing = true;
                aboutBox.setVisible(true);
                aboutText.setVisible(true);
            }
        } 
    }
    update()
    {
    }
}
export {IntroScene};
