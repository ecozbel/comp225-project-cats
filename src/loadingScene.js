import Phaser, { Game } from 'phaser';
import * as importsA from './importHelperA.js';

import * as paletteCreator from './paletteCreator';

class loadingScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'loadingScene' });
    }
    preload ()
    {
        this.cameras.main.setBackgroundColor('#63d9f0');
        global.soundEffectsOn = false;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle( 0xb25ae8, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentage = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentage.setOrigin(0.5, 0.5);
        var assetInfo = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetInfo.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            percentage.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xFF9999, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        this.load.on('fileprogress', function (file) {
            assetInfo.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentage.destroy();
            assetInfo.destroy();
        });
        this.load.audio("music",[importsA.musicmp3,importsA.musicogg ])
        this.load.spritesheet('animatedlogo', importsA.animatedLogo, { frameWidth: 800, frameHeight: 800 });
        this.load.image('mainMenuBG',importsA.mainMenuBG);
        this.load.image('galleryBG',importsA.galleryBG);
        this.load.spritesheet('buttonFrame', importsA.buttonFrame, {
            frameWidth: 312,
            frameHeight: 52
        });
        this.load.spritesheet('musicOnButton', importsA.musicOnSprite, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.spritesheet('musicOffButton', importsA.musicOffSprite, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.spritesheet('leftButton', importsA.leftButton, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.spritesheet('rightButton', importsA.rightButton, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.scenePlugin({
            key: 'rexgesturesplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
            sceneKey: 'rexGestures'
        });  
        this.load.image('cat-palette', importsA.catPalette);
        this.load.spritesheet('catanimated', importsA.catAnimation, {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('catanimated2', importsA.catAnimation2, {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('cameraAnim', importsA.cameraAnim, {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet('catanimated3', importsA.catAnimation3, {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image('innerBG',importsA.innerBG);
        this.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);

        this.load.plugin('rexoutlinepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js', true);      //this.load.plugin('rexglowfilter2pipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilter2pipelineplugin.min.js', true);
        this.load.image('outerBG',importsA.outerBG)
        this.load.image('ribbon',importsA.ribbonFrame)
        this.load.spritesheet('door', importsA.door, {
            frameWidth: 300,
            frameHeight: 425
        });
        this.load.spritesheet('doorClosing', importsA.doorClosing, {
            frameWidth: 300,
            frameHeight: 425
        });
        this.load.spritesheet('catReroll', importsA.catRerollButton, {
            frameWidth: 52,
            frameHeight: 52
        });
        this.load.json('prompts','src/assets/prompts.json');
        this.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);
        this.load.image('promptBoard',importsA.promptBg);
        this.load.image('innerBG',importsA.innerBG);

        this.load.image('closet',importsA.closetimg);
        this.load.image('background', importsA.backgroundTest);
        this.load.image('background2', importsA.backgroundImg2);
        this.load.image('backgroundnew', importsA.backgroundNew);
  
        this.load.image('hatSilhoette', importsA.hatSilhoetteimg);
        this.load.image('shirtSilhoette', importsA.shirtSilhoetteimg);
        this.load.image('shoeSilhoette', importsA.shoeSilhoetteimg);
        this.load.image('pantsSilhoette', importsA.pantsSilhoetteimg);

        this.load.image('hatSilhoetteOver', importsA.hatSilhoetteOverimg);
        this.load.image('shirtSilhoetteOver', importsA.shirtSilhoetteOverimg);
        this.load.image('shoeSilhoetteOver', importsA.shoeSilhoetteOverimg);
        this.load.image('pantsSilhoetteOver', importsA.pantsSilhoettOverimg);
        loadClothing(this,importsA);
        //helper function to organize better
        function loadClothing(scene,imports){
            scene.load.image('hat1',imports.hat1img);
            scene.load.image('hat2',imports.hat2img);
            scene.load.image('hat3',imports.hat3img);
            scene.load.image('hat4',imports.hat4img);
            scene.load.image('hat5',imports.hat5img);
            scene.load.image('hat6',imports.hat6img);
            scene.load.image('hat7',imports.hat7img);
            scene.load.image('hat8',imports.hat8img);
            scene.load.image('hat9',imports.hat9img);
            scene.load.image('hat10',imports.hat10img);
            scene.load.image('hat11',imports.hat11img);
            scene.load.image('hat12',imports.hat12img);
            scene.load.image('hat13',imports.hat13img);
            scene.load.image('hat14',imports.hat14img);
            scene.load.image('hat15',imports.hat15img);
            scene.load.image('hat16',imports.hat16img);
            scene.load.image('shoe1',imports.shoe1img);
            scene.load.image('shoe2',imports.shoe2img);
            scene.load.image('shoe3',imports.shoe3img);
            scene.load.image('shoe4',imports.shoe4img);
            scene.load.image('shoe5',imports.shoe5img);
            scene.load.image('shoe6',imports.shoe6img);
            scene.load.image('shoe7',imports.shoe7img);
            scene.load.image('shoe8',imports.shoe8img);
            scene.load.image('shoe9',imports.shoe9img);
            scene.load.image('shoe10',imports.shoe10img);
            scene.load.image('shoe11',imports.shoe11img);
            scene.load.image('shoe12',imports.shoe12img);
            scene.load.image('shoe13',imports.shoe13img);
            scene.load.image('shoe14',imports.shoe14img);
            scene.load.image('shoe15',imports.shoe15img);
            scene.load.image('shirt1', imports.shirt1img);
            scene.load.image('shirt2', imports.shirt2img);
            scene.load.image('shirt3', imports.shirt3img);
            scene.load.image('shirt4', imports.shirt4img);
            scene.load.image('shirt5', imports.shirt5img);
            scene.load.image('shirt6', imports.shirt6img);
            scene.load.image('shirt7', imports.shirt7img);
            scene.load.image('shirt8', imports.shirt8img);
            scene.load.image('shirt9', imports.shirt9img);
            scene.load.image('shirt10', imports.shirt10img);
            scene.load.image('shirt11', imports.shirt11img);
            scene.load.image('shirt12', imports.shirt12img);
            scene.load.image('shirt13', imports.shirt13img);
            scene.load.image('shirt14', imports.shirt14img);
            scene.load.image('shirt15', imports.shirt15img);
            scene.load.image('shirt16', imports.shirt16img);
            scene.load.image('pants1', imports.pants1);
            scene.load.image('pants2', imports.pants2);
            scene.load.image('pants3', imports.pants3);
            scene.load.image('pants4', imports.pants4);
            scene.load.image('pants5', imports.pants5);
            scene.load.image('pants6', imports.pants6);
            scene.load.image('pants7', imports.pants7);
            scene.load.image('pants8', imports.pants8);
            scene.load.image('pants9', imports.pants9);
            scene.load.image('pants10', imports.pants10);
            scene.load.image('pants11', imports.pants11);
            scene.load.image('pants12', imports.pants12);
            scene.load.image('pants13', imports.pants13);
            scene.load.image('pants14', imports.pants14);
            scene.load.image('pants15', imports.pants15);
            scene.load.image('pants16', imports.pants16);
        }
        this.load.image('polaroid', importsA.polaroidImg);
        this.load.image('scenery1',importsA.scenery1);
        this.load.image('scenery2',importsA.scenery2);
        this.load.image('scenery3',importsA.scenery3);
        this.load.image('scenery4',importsA.scenery4);
        this.load.audio("printSound",[importsA.polaroidPrintSound,importsA.polaroidPrintSoundOGG ])
        this.load.audio("shutterSound",[importsA.cameraShutterSound,importsA.cameraShutterSoundOGG])
        this.load.image('itemFrame',importsA.itemFrame);
        this.load.audio("buttonClick1Sound", importsA.buttonClick1Sound)
        this.load.image('polaroidBack',importsA.polaroidBack);
        loadSoundEffects(this);
        function loadSoundEffects(scene){
            scene.load.audio("clothingPickup1",importsA.clothingPickup1Sound);
            scene.load.audio("clothingRussle5",importsA.clothingRussle5Sound);
            scene.load.audio("clothingRussle4",importsA.clothingRussle4Sound);
            scene.load.audio("clothingRussle3",importsA.clothingRussle3Sound);
            scene.load.audio("clothingRussle2",importsA.clothingRussle2Sound);
            scene.load.audio("clothingRussle1",importsA.clothingRussle1Sound);
            scene.load.audio("doorOpenSound1",importsA.doorOpenSound1);
            scene.load.audio("doorOpenSound2",importsA.doorOpenSound2);
            scene.load.audio("doorOpenSound3",importsA.doorOpenSound3);
            scene.load.audio("keyBoardTypeLoop",importsA.keyboardTypingSound);
        }
    }
    create(){
        var backgroundMusic = this.sound.add('music',{ loop: true });
        this.game.bgMusic = backgroundMusic;
        this.scene.start('IntroScene');
    }
}

export {loadingScene};