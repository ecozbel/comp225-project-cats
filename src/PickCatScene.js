import Phaser, { Game } from 'phaser';
import * as paletteCreator from './paletteCreator';
import * as utilities from "./utilities.js";
class PickCatScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'PickCatScene' });
    }
    preload ()
    {
    }
    create(){
        var self = this;
        //Scene backgrounds
        var iBG = this.add.image(400,300,'innerBG');
        var oBG = this.add.image(400,300,'outerBG');
        var camera = this.cameras.main;
        iBG.setDepth(-1);
        iBG.setScale(1.5);
        oBG.setDepth(0);
        //MUSIC 
        var mButton= new utilities.musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });
        mButton.on('pointerdown', function () {
            toggleSound(this.game.bgMusic)
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
        //Button to back out to main menu
        var backButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:80,y:50,text:"Back"});
        backButton.setDisplaySize(100,54);
        backButton.on('pointerdown', function(pointer, localX, localY, event){
            startPreviousScene();   
        },self );
        function startPreviousScene(){
            self.scene.start('IntroScene');
        }
        //Components to build Cat Name 
        const titleArray = ['Mr.', 'Ms.', 'Mrs.', 'Sir', 'Dame','','',''];
        const adjArray = ['Fluffy', 'Cuddly', 'Blue', 'Tabby', 'Silly',];
        const nounArray = ['Whiskers','Kitty', 'Cat', 'Socks', 'Patches', 'Spot',];        
        const suffixArray = ['Jr.','Sr.', 'IV', 'II', 'PhD', '', '', ''];
        const standaloneNameArray = ['Meowchael','Pawline', 'Jessicat', 'Purrudence', 'Jennifur', 'Clawdia',
        'Pawl','Purrcy','Whiskers','Luna','Garfield','Catarina','Clawrence','Leo','Simba','Bella','Milo'];
        //Button that rerolls cats on screen
        const rerollButton = this.add.sprite(400,110,"catReroll",0).setInteractive({ useHandCursor: true })
        .on('pointerdown', () => rerollCats(this));
        rerollButton.on('pointerover', () => rerollButton.play({key:'rerollMotion',repeat:-1}));
        rerollButton.on('pointerout', () => rerollButton.stop().setFrame(0));
        //Open and close the doors, cats will be rerolled within closeDoors() function.
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
        //Creates a random cat
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
            })
            newCat.ignoreDestroy=true;
            return newCat;
        }
        camera.on('camerafadeoutcomplete', function(){
            startNextScene();

        },self);
        function startNextScene(){
            self.scene.start('PromptDisplayScene');
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
        //Updates name of cat
        function updateDisplay(display){
            display.replace(display.first,createRandomCat())
            var value = Phaser.Math.Between(0, 10);
            if (value > 5){
                display.first.name = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
            }
            if (value <= 5){
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
        //Build the animated door and cats
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
        //Initial functions to run
        openDoors();
        playOpenDoorsSound(this);
        //Text box for info
        const pickCatText = this.add.image(400, 50, 'buttonFrame',0).setDisplaySize(300, 52).setInteractive().setDepth(4);
            pickCatText.on('pointerover', () => pickCatText.setFrame(1))
            pickCatText.on('pointerout', () => pickCatText.setFrame(0))
        this.add.text(pickCatText.x, pickCatText.y, 'Pick a cat, or reroll.',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 4,resolution:10  })
            .setOrigin(0.5)
            .setDepth(4);
    }
    update()
    {
    }
}
export {PickCatScene};
