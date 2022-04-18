import Phaser, { Game } from 'phaser';

import door from './assets/menuAssets/door.png';
import doorClosing from './assets/menuAssets/doorClosing.png';
import innerBG from './assets/backgrounds/catChoose_inner_background.png'
import outerBG from './assets/backgrounds/catChooseScene_outer_background.png'

import musicOnSprite from './assets/icons/musicOn.png'
import musicOffSprite from './assets/icons/musicOff.png'

import buttonFrame from './assets/icons/buttonFrameLarge.png'
import ribbonFrame from './assets/icons/catNameField.png'

import catRerollButton from './assets/icons/catRerollButton.png'
import musicButton from './musicButton.js'

import * as imports from "./importHelperA.js"
import * as paletteCreator from './paletteCreator';
class pickCatScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'pickCatScene' });
    }
    preload ()
    {
        this.load.image('innerBG',innerBG)
        this.load.plugin('rexoutlinepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js', true);      //this.load.plugin('rexglowfilter2pipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilter2pipelineplugin.min.js', true);
        this.load.image('outerBG',outerBG)
        this.load.image('ribbon',ribbonFrame)
        this.load.spritesheet('door', door, {
            frameWidth: 300,
            frameHeight: 425
        });
        this.load.spritesheet('doorClosing', doorClosing, {
            frameWidth: 300,
            frameHeight: 425
        });

        this.load.spritesheet('musicOnButton', musicOnSprite, {
            frameWidth: 52,
            frameHeight: 52
        });

        this.load.spritesheet('catReroll', catRerollButton, {
            frameWidth: 52,
            frameHeight: 52
        });

        this.load.spritesheet('buttonFrame', buttonFrame, {
            frameWidth: 312,
            frameHeight: 52
        });
        this.load.spritesheet('musicOffButton', musicOffSprite, {
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
        var self = this;
        var iBG = this.add.image(400,300,'innerBG');
        var oBG = this.add.image(400,300,'outerBG');
        iBG.setDepth(-1);
        iBG.setScale(1.5);
        oBG.setDepth(0);
        paletteCreator.createPalettes(self);
        let mButton= new musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });

        const rerollButton = this.add.sprite(400,110,"catReroll",0).setInteractive({ useHandCursor: true })
        //on pointer down, play music and set icon to muted button
        .on('pointerdown', () => rerollCats());
        rerollButton.on('pointerover', () => rerollButton.play({key:'rerollMotion',repeat:-1}));
        rerollButton.on('pointerout', () => rerollButton.stop().setFrame(0));

        function rerollCats(){
            closeDoors();
            openDoors();
        }
        const doorOpen = this.anims.create({
            key: 'doorOpen',
            frames: this.anims.generateFrameNumbers('door',{ start: 0, end: 8 }),
            frameRate: 9
            
        });
        const doorClose = this.anims.create({
            key: 'doorClose',
            frames: this.anims.generateFrameNumbers('doorClosing',{ start: 8, end: 0 }),
            frameRate: 9
            
        });
        var postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');
        function createRandomCat(){
            var colorIndex = Phaser.Math.Between(0, paletteCreator.catRandomizerConfig.paletteNames.length-1);
            var patternIndex = Phaser.Math.Between(0, paletteCreator.catRandomizerConfig.spriteSheet.keys.length-1);
            var newCat = self.add.sprite(0, 0, 'catanimated-' + paletteCreator.catRandomizerConfig.paletteNames[0]).setScale(6).setDepth(0);
            newCat.color = paletteCreator.catRandomizerConfig.paletteNames[colorIndex];
            newCat.pattern =paletteCreator.catRandomizerConfig.spriteSheet.keys[patternIndex];
            newCat.anims.play( newCat.pattern +'-'+ newCat.color);
            newCat.setInteractive()
            newCat.on('pointerover', function () {
                //Inner highlight shader
                console.log("over!");
                postFxPlugin.add(newCat, {
                    thickness: 3,
                    outlineColor: 0xffb4db
                });
                //Outer highlight shader
                postFxPlugin.add(newCat, {
                    thickness: 5,
                    outlineColor: 0x4e1a69
                });
            })
            newCat.on('pointerout', function () {
                // Remove the outline shader effect
                postFxPlugin.remove(newCat);
            })
            newCat.ignoreDestroy=true;
            return newCat;
        }

        function openDoors(){
            
            displays[0].last.play({key:'doorOpen',repeat:0});
            displays[1].last.anims.playAfterDelay('doorOpen', 800);
            displays[2].last.anims.playAfterDelay('doorOpen', 400);
        }
        function closeDoors(){
            displays[0].last.play({key:'doorClose',repeat:0}).on('animationstart', () => displays[0].replace(displays[0].first,createRandomCat()));
            displays[1].last.play({key:'doorClose',repeat:0}).on('animationstart', () => displays[1].replace(displays[1].first,createRandomCat()));
            displays[2].last.play({key:'doorClose',repeat:0}).on('animationstart', () => displays[2].replace(displays[2].first,createRandomCat()));
        }
        this.anims.create({
            key: 'rerollMotion',
            frames: this.anims.generateFrameNumbers('catReroll',{ start: 1, end: 2 }),
            frameRate: 2,
            repeat: -1
        });

        const catDisplayConfig  = {
            doorPositons: {                                      
                X: [113,377,640],
                Y: [385,359,385],                        
            }
        };
        var displays=[];
        for(var i=0;i<3;i++){
            let doorX = catDisplayConfig.doorPositons.X[i];
            let doorY= catDisplayConfig.doorPositons.Y[i];
            var door = this.add.sprite(0,0,'door').setDepth(4);
            var catNameBox = this.add.image(0, 100, 'ribbon').setDisplaySize(200, 35).setDepth(2);
            var catNameText = this.add.text(0, 100, 'Cat Name',{ fontFamily: 'MinecraftiaRegular', fontSize: '16px',align:'left',stroke: '#000000',strokeThickness: 4,resolution:10  })
                .setOrigin(0.5).setDepth(2);
            var catAnimated=createRandomCat();
            displays[i] = this.add.container(doorX,doorY,[catAnimated,catNameBox,catNameText,door]);
            //displays[i].setInteractive(new Phaser.Geom.Rectangle(450, 200, 200, 200), Phaser.Geom.Rectangle.Contains);
        }

        openDoors();
        const pickCatText = this.add.image(400, 50, 'buttonFrame',0).setDisplaySize(300, 52).setInteractive().setDepth(4);
            pickCatText.on('pointerover', () => pickCatText.setFrame(1))
            pickCatText.on('pointerout', () => pickCatText.setFrame(0))
        this.add.text(pickCatText.x, pickCatText.y, 'Pick a cat, or reroll.',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 4,resolution:10  })
            .setOrigin(0.5)
            .setDepth(4);
    }
    update(){
    }

}
export {pickCatScene};
