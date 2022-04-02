import Phaser from "phaser";
import { game } from './index.js';
import polaroidImg from './assets/polaroid.png';
import scenery1 from './assets/background3.png';

var cat;
var polaroid;
var frame;
var bg;

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
    }

    create ()
    {
        cat = this.add.existing(this.game.cat);
        frame = this.add.sprite(0,0,'polaroid');
        bg = this.add.sprite(0,0,'scenery1');

        cat.setVisible(false);
        frame.setVisible(false);
        bg.setVisible(false);



        var photoInfo = this.add.text(100,100,"Click for photo!")

        this.cameras.main.setBackgroundColor('000000');
        var self = this;


        //"Takes photo" when clicked on screen
        this.input.on('pointerdown', function () {
 
            this.cameras.main.flash(1000);
            //ADD camera flash sound here
            this.setUpPolaroid();
            this.setUpCat(400,-1000);
            this.setUpTween(cat,polaroid,self);
            gameReady=true;

        }, this);

        this.events.once('slidePolaroid', function (){

            console.log("Sliding polaroid");
        },this);


        //Listener for when camera flash effect is done
        this.cameras.main.on('cameraflashcomplete', function () {
            //Maybe could add camera sound here too

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
        cat.setVisible(true);
        cat.setDepth(3);
        cat.x=_x;
        cat.y=_y;
        cat.setScale(3.5);
        //console
        console.log("ending scene cat: " + this.game.cat);
        console.log(this.game.cat);

    }

    setUpPolaroid(){

        bg.setVisible(true);
        bg.setScale(0.6);
        bg.setDepth(-1);

        frame.setVisible(true);
        frame.setScale(20);
        
        frame.setDepth(1);
        polaroid = this.add.container(400,-1000,[ bg,frame]);


    }

    setUpTween(cat,polaroid,gameScene){
        //Tween that makes the photo slide from top
        gameScene.catSlideOver = gameScene.tweens.add({
            targets: cat,
            x: 400,
            y: 280,
            duration: 2000,
            yoyo: false,
            delay: 10
        });
        gameScene.polaroidSlideOver = gameScene.tweens.add({
            targets: polaroid,
            x: 400,
            y: 280,
            duration: 2000,
            yoyo: false,
            delay: 10
        });
        console.log("built tweens");
        //console.log(gameScene.slideOver);
    }



}


export { EndingScene };