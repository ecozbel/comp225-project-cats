import Phaser, { Game } from 'phaser';
import { doorOpenSound } from './importHelperB';

//import * as imports from "./importHelperB.js"
import * as paletteCreator from './paletteCreator';
import * as utilities from "./utilities.js";
class sceneB extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneB_pickCat' });
    }
    preload ()
    {
        
        // this.load.image('innerBG',imports.innerBG)
        // this.load.plugin('rexoutlinepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js', true);      //this.load.plugin('rexglowfilter2pipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilter2pipelineplugin.min.js', true);
        // this.load.image('outerBG',imports.outerBG)
        // this.load.image('ribbon',imports.ribbonFrame)
        // this.load.spritesheet('door', imports.door, {
        //     frameWidth: 300,
        //     frameHeight: 425
        // });
        // this.load.spritesheet('doorClosing', imports.doorClosing, {
        //     frameWidth: 300,
        //     frameHeight: 425
        // });


        // this.load.spritesheet('catReroll', imports.catRerollButton, {
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
        var self = this;
        var iBG = this.add.image(400,300,'innerBG');
        var oBG = this.add.image(400,300,'outerBG');
        var camera = this.cameras.main;
        iBG.setDepth(-1);
        iBG.setScale(1.5);
        oBG.setDepth(0);
        //paletteCreator.createPalettes(self);

        //MUSIC 

        var mButton= new utilities.musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });
        mButton.on('pointerdown', function () {
            toggleSound(this.game.bgMusic)
        },self);

        function toggleSound(givenSound){
            if (givenSound.isPlaying){
                givenSound.stop();
            }
            else{
                givenSound.play();
            }
        }

        var backButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:80,y:50,text:"Back"});
        backButton.setDisplaySize(100,54);
        backButton.on('pointerdown', function(pointer, localX, localY, event){
            startPreviousScene();   
        },self );
        function startPreviousScene(){
            self.scene.start('sceneA_mainMenu');
        }


        const titleArray = ['Mr.', 'Ms.', 'Mrs.', 'Sir', 'Dame','','',''];
        const adjArray = ['Fluffy', 'Cuddly', 'Blue', 'Tabby', 'Silly',];
        const nounArray = ['Whiskers','Kitty', 'Cat', 'Socks', 'Patches', 'Spot',];        
        const suffixArray = ['Jr.','Sr.', 'IV', 'II', 'PhD', '', '', ''];
        const chanceArray = ['concatenated name','standalone name'];
        const standaloneNameArray = ['Meowchael','Pawline', 'Jessicat', 'Purrudence', 'Jennifur', 'Clawdia'];

        const rerollButton = this.add.sprite(400,110,"catReroll",0).setInteractive({ useHandCursor: true })
        //on pointer down, play music and set icon to muted button
        .on('pointerdown', () => rerollCats(this));
        rerollButton.on('pointerover', () => rerollButton.play({key:'rerollMotion',repeat:-1}));
        rerollButton.on('pointerout', () => rerollButton.stop().setFrame(0));

        function rerollCats(scene){
            playOpenDoorsSound(scene);
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

            newCat.on('pointerdown', function () {
                // Remove the outline shader effect
                postFxPlugin.remove(newCat);
                
                self.game.cat = newCat;
                self.game.cat.name = newCat.name;
                camera.fadeOut(1000); 
                //self.scene.start('showPromptScene');
            })
            newCat.ignoreDestroy=true;
            return newCat;
        }

        camera.on('camerafadeoutcomplete', function(){
            startNextScene();

        },self);

        function startNextScene(){
            self.scene.start('sceneC_showPrompt');
        }


        function getRandomItem(arr) {
            var item = Phaser.Utils.Array.GetRandom(arr);
            return item;
        }

        function playOpenDoorsSound(scene){
            if (global.soundEffectsOn == true){
                scene.sound.play("doorOpenSound1",{volume:0.35})
                scene.sound.play("doorOpenSound2",{delay:1,volume:0.35})
                scene.sound.play("doorOpenSound3",{volume:0.35})
            }
        }

        function openDoors(){
            displays[0].last.play({key:'doorOpen',repeat:0});
            displays[1].last.anims.playAfterDelay('doorOpen', 800);
            displays[2].last.anims.playAfterDelay('doorOpen', 400);
        }
        function closeDoors(){
            displays[0].last.play({key:'doorClose',repeat:0}).on('animationstart', () => updateDisplay(displays[0]));
            displays[1].last.play({key:'doorClose',repeat:0}).on('animationstart', () => updateDisplay(displays[1]));
            displays[2].last.play({key:'doorClose',repeat:0}).on('animationstart', () => updateDisplay(displays[2]));
        }

        function updateDisplay(display){
            display.replace(display.first,createRandomCat())
            var chance = getRandomItem(chanceArray)
            if (chance = 'concatenated name'){
                display.first.name = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
    
            }
            if (chance = 'standalone name'){
                display.first.name = getRandomItem(standaloneNameArray);
    
            }
            display.getAt(2).setText( display.first.name);
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
            var catAnimated=createRandomCat();
            catAnimated.name = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
            var catNameBox = this.add.image(0, 100, 'ribbon').setDisplaySize(200, 35).setDepth(2);
            var catNameText = this.add.text(0, 100, catAnimated.name,{ fontFamily: 'MinecraftiaRegular', fontSize: '12px',align:'left',stroke: '#000000',strokeThickness: 2,resolution:1  })
                .setOrigin(0.5).setDepth(2);
            
            displays[i] = this.add.container(doorX,doorY,[catAnimated,catNameBox,catNameText,door]);
        }

        openDoors();
        playOpenDoorsSound(this);
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
export {sceneB};
