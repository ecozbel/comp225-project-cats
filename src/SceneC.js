import Phaser from "phaser";
import { game } from './index.js';
import polaroidImg from './assets/polaroid.png';
import scenery1 from './assets/background4.png';


import cameraShutterSound from "./assets/audio/cameraShutter.mp3";
import cameraShutterSoundOGG from "./assets/audio/cameraShutter.ogg";
import polaroidPrintSound from "./assets/audio/polaroidPrinting.mp3" ;
import polaroidPrintSoundOGG from "./assets/audio/polaroidPrinting.ogg" ;
import itemFrame from './assets/itemFrame.png';


var cat;
var polaroid;
var frame;
var bg;
var endingPrompt;
var pictureCreated;

var gameReady=false;
class EndingScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneC' });
    }

    preload ()
    {
        this.load.image('polaroid', polaroidImg);
        this.load.image('scenery1',scenery1);
        this.load.audio("printSound",[polaroidPrintSound,polaroidPrintSoundOGG ])
        this.load.audio("shutterSound",[cameraShutterSound,cameraShutterSoundOGG])
        this.load.image('itemFrame',itemFrame);
    }

    create ()
    {
        pictureCreated = false;
        // cat = this.add.existing(this.game.cat);
        // cat.x=0;
        // cat.y=0;
        // frame = this.add.sprite(0,0,'polaroid');
        // bg = this.add.sprite(0,0,'scenery1');

        // cat.setVisible(false);
        // frame.setVisible(false);
        // bg.setVisible(false);
        

        var self = this;
        this.initialSpriteSetup(self);

        var printSound = this.sound.add('printSound',{ loop: false });

        var shutterSound = this.sound.add('shutterSound',{ loop: false });




        var photoInfo = this.add.text(100,100,"Click for photo!")

        this.cameras.main.setBackgroundColor('000000');
        //var self = this;







        //"Takes photo" when clicked on screen
        this.input.on('pointerdown', function () {
            if (pictureCreated == false){
                pictureCreated = true;
                shutterSound.play();
                this.cameras.main.flash(1000);
                //ADD camera flash sound here
                this.setUpPolaroid();
                //this.setUpCat(400,-1000);
                this.setUpTween(cat,polaroid,self);
                gameReady=true;

            }


        }, this);

        this.events.once('slidePolaroid', function (){

            console.log("Sliding polaroid");
        },this);


        //Listener for when camera flash effect is done
        this.cameras.main.on('cameraflashcomplete', function () {
            //Maybe could add camera sound here too
            printSound.play();
            //Maybe polaroid sliding out of camera sound effect


        });


    }
    update(){
        if (gameReady){
            this.events.emit('slidePolaroid');
            gameReady = false;
        }
    }


    setUpCat(_x,_y){

        //cat = this.add.existing(this.game.cat);
        // cat.setVisible(true);
        // cat.setDepth(3);
        // cat.x=_x;
        // cat.y=_y;
        // cat.setScale(3.5);
        // //console
        // console.log("ending scene cat: " + this.game.cat);
        // console.log(this.game.cat);

    }

    initialSpriteSetup(currentScene){
        cat = currentScene.add.existing(currentScene.game.cat);
        cat.x=0;
        cat.y=0;
        frame = currentScene.add.sprite(0,0,'polaroid');
        bg = currentScene.add.sprite(0,0,'scenery1',);

        if (cat.hatPosition.currentClothing != null) {
            currentScene.add.existing(cat.hatPosition.currentClothing);
            cat.hatPosition.currentClothing.setVisible(false);
        }
        if (cat.shoePosition.currentClothing != null) {
            currentScene.add.existing(cat.shoePosition.currentClothing);
            cat.shoePosition.currentClothing.setVisible(false);
        }
        if (cat.pantsPosition.currentClothing != null) {
            currentScene.add.existing(cat.pantsPosition.currentClothing);
            cat.pantsPosition.currentClothing.setVisible(false);
        }
        if (cat.shirtPosition.currentClothing != null) {
            currentScene.add.existing(cat.shirtPosition.currentClothing);
            cat.shirtPosition.currentClothing.setVisible(false);
        }



        console.log("cat: ");
        console.log(cat);

        

        function getPromptWithName(prompt,name) {
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", name),
                introduction: prompt.introduction.replaceAll("{{full_name}}", name),
                outcome: prompt.outcome.replaceAll("{{full_name}}", name)
            };
        }

        var newPrompt = getPromptWithName(this.game.cat.generatedPrompt,this.game.cat.name);
        
        endingPrompt = currentScene.add.text(0,0,newPrompt.outcome,{
			fontFamily: 'Permanent Marker',
			fontSize: '18px',
			color: '#000000',
			fontStyle: 'italic',
			resolution: 1,
            wordWrap : {width : 500, useAdvancedWrap : true},
		});

        cat.setVisible(false);
        frame.setVisible(false);
        bg.setVisible(false);
        endingPrompt.setVisible(false);

    }

    setUpPolaroid(){
        cat.setVisible(true);
        cat.setDepth(3);
        cat.setScale(3.5);




        bg.setVisible(true);
        bg.setScale(0.6);
        bg.setDepth(-1);

        frame.setVisible(true);
        frame.setScale(20);
        frame.setDepth(1);


        endingPrompt.setVisible(true);
        endingPrompt.set
        //add all contents of polaroid into container
        polaroid = this.add.container(400,-1000,[ bg,frame,cat,endingPrompt]);

        if (cat.shoePosition.currentClothing != null) {
            cat.shoePosition.currentClothing.setVisible(true);
            polaroid.add(cat.shoePosition.currentClothing);
            cat.shoePosition.currentClothing.x = cat.x - 18;
            cat.shoePosition.currentClothing.y = cat.y+cat.displayHeight/2.65;
            cat.shoePosition.currentClothing.setScale(0.4);
            cat.shoePosition.currentClothing.setDepth(1);
        }   
        if (cat.pantsPosition.currentClothing != null) {
            cat.pantsPosition.currentClothing.setVisible(true);
            polaroid.add(cat.pantsPosition.currentClothing);
            cat.pantsPosition.currentClothing.x = cat.x - 18;
            cat.pantsPosition.currentClothing.y = cat.y+cat.displayHeight/3.39;
            cat.pantsPosition.currentClothing.setScale(0.4);
            cat.pantsPosition.currentClothing.setDepth(2);
        } 
        if (cat.shirtPosition.currentClothing != null) {
            cat.shirtPosition.currentClothing.setVisible(true);
            polaroid.add(cat.shirtPosition.currentClothing);
            cat.shirtPosition.currentClothing.x = cat.x - 18;
            cat.shirtPosition.currentClothing.y = cat.y+cat.displayHeight/12;
            cat.shirtPosition.currentClothing.setScale(0.4);
            cat.shirtPosition.currentClothing.setDepth(3);
        }
        if (cat.hatPosition.currentClothing != null) {
            cat.hatPosition.currentClothing.setVisible(true);
            polaroid.add(cat.hatPosition.currentClothing);
            cat.hatPosition.currentClothing.x = cat.x - 18;
            cat.hatPosition.currentClothing.y = cat.y-cat.displayHeight/2.4;
            cat.hatPosition.currentClothing.setScale(0.4);
            cat.hatPosition.currentClothing.setDepth(4);
        }

        // if (cat.hatPosition.currentClothing != null) {
        //     polaroid.add(cat.hatPosition.currentClothing);
        // }

        //adjusts sprite's position relative to the container
        bg.y=bg.y-50;
        endingPrompt.y=endingPrompt.y+50;
        endingPrompt.x= frame.x-240;
        endingPrompt.y= frame.y +165;
        cat.x=cat.x-25;
        //cat.hatPosition.currentClothing.x = cat.x;
    }

    setUpTween(cat,polaroid,gameScene){
        //Tween that makes the photo slide from top
        // gameScene.catSlideOver = gameScene.tweens.add({
        //     targets: cat,
        //     x: 400,
        //     y: 280,
        //     duration: 2000,
        //     yoyo: false,
        //     delay: 10
        // });
        gameScene.polaroidSlideOver = gameScene.tweens.add({
            targets: polaroid,
            x: 400,
            y: 280,
            duration: 3900,
            yoyo: false,
            delay: 0
        });
        console.log("built tweens");

        //console.log(gameScene.slideOver);
        const restartButton = this.add.image(polaroid.x, polaroid.y +polaroid.displayHeight/1.75 , 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            //call function to pass on cat and prompt selection to next scene here
            .on('pointerdown', function(pointer, localX, localY, event){
                this.scene.start('scene')
          
            },self );

        
            this.add.text(restartButton.x, restartButton.y, 'Restart',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2,align:'left'  })
                .setOrigin(0.5)
                .setDepth(4);
    }




}


export { EndingScene };