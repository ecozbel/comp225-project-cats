import Phaser from "phaser";
import { game } from './index.js';
import polaroidImg from './assets/polaroid.png';
import scenery1 from './assets/background4.png';


import cameraShutterSound from "./assets/audio/cameraShutter.mp3";
import cameraShutterSoundOGG from "./assets/audio/cameraShutter.ogg";
import polaroidPrintSound from "./assets/audio/polaroidPrinting.mp3" ;
import polaroidPrintSoundOGG from "./assets/audio/polaroidPrinting.ogg" ;


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

        console.log("cat: ");
        console.log(cat);


        endingPrompt = currentScene.add.text(0,0,'Ending prompt for Cat!',{
			fontFamily: 'Permanent Marker',
			fontSize: '30px',
			color: '#000000',
			fontStyle: 'italic',
			resolution: 1
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

        console.log("ending scene cat: " + this.game.cat);
        console.log(this.game.cat);

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
        //adjusts sprite's position relative to the container
        bg.y=bg.y-50;
        endingPrompt.y=endingPrompt.y+50;
        endingPrompt.x= frame.x-50;
        endingPrompt.y= frame.y +200;
        cat.x=cat.x-25;

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
    }



}


export { EndingScene };