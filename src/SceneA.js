import Phaser, { Game } from 'phaser';
import * as imports from "./importHelperA.js"
import * as paletteCreator from './paletteCreator';

var catAnimated;
var atlasKey;
var logo;
var nameText;
var animatedBackground;
class BegginingScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneA' });
    }
    preload ()
    {
        this.load.json('prompts','src/assets/prompts.json');
        this.load.image('logo', imports.logoImg);
        this.load.image('itemFrame',imports.itemFrame);
        this.load.image('menuBackground',imports.menuBackground);
        this.load.spritesheet('animatedlogo', imports.animatedLogo, { frameWidth: 800, frameHeight: 800 });
        this.load.spritesheet('animatedDoor', imports.menuSpriteSheet, { frameWidth: 800, frameHeight: 600 });
        this.load.image('cat-palette', imports.catPalette);
        // this.load.audio('backgroundMusic', ['assets/audio/music.mp3']);
        this.load.spritesheet('catanimated', imports.catAnimation, {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.audio("music",[imports.musicmp3,imports.musicogg ])
    }
    create ()
    {
        let jsonFile = this.cache.json.get('prompts');


        //MUSIC 
        var backgroundMusic = this.sound.add('music',{ loop: false });

        function toggleSound(givenSound){
            if (givenSound.isPlaying){
                givenSound.stop();
            }
            else{
                givenSound.play();
            }
        }

        this.matter.world.setGravity(0,0);
        var self = this;

        var innerBackground = this.matter.add.image(300,300,'menuBackground');
        innerBackground.setStatic(true)
        .setScale(1.5);




        animatedBackground = this.add.sprite(400,300,'animatedDoor');
        //console.log(animatedBackground);
        //animatedBackground.setVisible(true);
        animatedBackground.setDepth(2);
        //bg.setStatic(true);





        paletteCreator.createPalettes(self);
        //var self = this;
        catAnimated = this.add.sprite(600, 400, 'catanimated-' + paletteCreator.catRandomizerConfig.paletteNames[0]).setScale(6);
        catAnimated.color = paletteCreator.catRandomizerConfig.paletteNames[0];
        catAnimated.anims.play('catanimated-' + catAnimated.color);
        catAnimated.ignoreDestroy=true;
        var self = this;
        logo = this.add.sprite(250,150,'animatedlogo').setDisplaySize(300, 300)
        .setDepth(4);
        const windBlow = this.anims.create({
            key: 'windblowing',
            frames: this.anims.generateFrameNumbers('animatedlogo',{ start: 0, end: 2 }),
            frameRate: 8
        });

        const doorOpen = this.anims.create({
            key: 'doorOpen',
            frames: this.anims.generateFrameNumbers('animatedDoor',{ start: 0, end: 8 }),
            frameRate: 9
        });
        console.log(doorOpen);

        logo.play({key:'windblowing',repeat:-1});
        animatedBackground.play({key:'doorOpen',repeat:0});

        



        const { width, height } = this.scale
        // Play button
        const confirmCatButton = this.add.image(logo.x, logo.y +logo.displayHeight/1.75 , 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            //call function to pass on cat and prompt selection to next scene here
            .on('pointerdown', function(pointer, localX, localY, event){
                this.scene.start('sceneB')
                this.game.cat = catAnimated;
                this.game.cat.generatedPrompt = generatedPrompt;
                this.game.cat.name = fullName;
                // obj.scene.sys.updateList.remove(pawn);
                // obj.scene.sys.displayList.remove(pawn);
                // obj.scene = scene;
                // scene.sys.updateList.add(obj);
                // scene.sys.displayList.add(obj);
            
            
            },self );

        
        this.add.text(confirmCatButton.x, confirmCatButton.y, 'Confirm',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2,align:'left'  })
            .setOrigin(0.5)
            .setDepth(4);


        // Settings button
        const settingsButton = this.add.image(confirmCatButton.x, confirmCatButton.y + confirmCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => toggleSound(backgroundMusic));
            
        this.add.text(settingsButton.x, settingsButton.y, 'Music on/off',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)
            .setDepth(4);

        // Randomize Cat button
        const randomCatButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', function(pointer, localX, localY, event){
                var index = paletteCreator.catRandomizerConfig.paletteNames.indexOf(catAnimated.color);
                index++;
                if (index >= paletteCreator.catRandomizerConfig.paletteNames.length) {
                    index = 0;
                }
            catAnimated.color = paletteCreator.catRandomizerConfig.paletteNames[index];
            catAnimated.anims.play('catanimated-' + catAnimated.color);
            animatedBackground.play({key:'doorOpen',repeat:0});

            // animatedBackground.play({key:'doorOpen',repeat:0});
            }, self);

        this.add.text(randomCatButton.x, randomCatButton.y, 'Randomize Cat', { fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)
            .setDepth(4);

        const titleArray = ['Mr.', 'Ms.', 'Mrs.', 'Sir', 'Dame','','',''];
        const adjArray = ['Fluffy', 'Cuddly', 'Blue', 'Tabby', 'Silly',];
        const nounArray = ['Whiskers','Kitty', 'Cat', 'Socks', 'Patches', 'Spot',];        
        const suffixArray = ['Jr.','Sr.', 'IV', 'II', 'PhD', '', '', ''];
        //gets random item from an array
        function getRandomItem(arr) {
            var item = Phaser.Utils.Array.GetRandom(arr);
            return item;
        }

        var fullName;
        var generatedPrompt;
        
        // Randomize Name button
        const randomNameButton = this.add.image(randomCatButton.x, randomCatButton.y + randomCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                getRandomFullName();
                console.log(fullName, getPromptWithCatName(generatedPrompt));
            });

        this.add.text(randomNameButton.x, randomNameButton.y, 'Randomize Name',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)
            .setDepth(4)

        // Randomize Prompt button
        const randomPrompt = this.add.image(randomNameButton.x, randomNameButton.y + randomNameButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                getRandomPrompt();
                console.log(fullName, getPromptWithCatName(generatedPrompt));
            });//Call function to randomize prompt here

        this.add.text(randomPrompt.x, randomPrompt.y, 'Randomize Prompt',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)
            .setDepth(4)


        //Initial Name of cat to be displayed
        var initialName = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
        //Background eleement of name display
        const catNameBar = this.add.image(catAnimated.x, catAnimated.y - catAnimated.displayHeight/1.5, 'itemFrame')
            .setDisplaySize(400, 50)
            .setDepth(4);
            

        //Displayed text
        nameText = this.add.text(catNameBar.x, catNameBar.y,initialName,{ fontFamily: 'MinecraftiaRegular', fontSize: '16px',align:'left',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)
            .setDepth(4);
    
        function getRandomFullName(){
            fullName = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
            nameText.setText(fullName);
            return fullName;
        }
       
        function getPromptWithCatName(prompt) {
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", fullName),
                introduction: prompt.introduction.replaceAll("{{full_name}}", fullName),
                outcome: prompt.outcome.replaceAll("{{full_name}}", fullName)
            };
        }
        

        const randomNumber = (min, max) => { 
            //Use below if final number doesn't need to be whole number
            //return Math.random() * (max - min) + min;
            return Math.floor(Math.random() * (max - min) + min);
        }

        function getRandomPrompt() {
            var promptIndex = randomNumber(0, jsonFile.prompt.length);
            generatedPrompt = jsonFile.prompt[promptIndex]; // stores a generated random prompt into a variable we can use later
            return generatedPrompt;
        }

        getRandomFullName();
        getRandomPrompt();
    }
}
    


export const chosenCat = catAnimated;
console.log(chosenCat);
export { BegginingScene };

