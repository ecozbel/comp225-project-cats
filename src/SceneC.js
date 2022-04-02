import Phaser from "phaser";
import { game } from './index.js';
import polaroidImg from './assets/polaroid.png';

var cat;
var polaroid;
var frame;

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
    }

    create ()
    {
        cat = this.add.existing(this.game.cat);
        frame = this.add.sprite(0,0,'polaroid');

        cat.setVisible(false);
        frame.setVisible(false);

        //this.cameras.main.fadeFrom(100,0,0,0);

        var photoInfo = this.add.text("Click for photo!")

        this.cameras.main.setBackgroundColor('0x4287f5');
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
        cat.depth=1;
        cat.x=_x;
        cat.y=_y;
        cat.setScale(3.5);
        //console
        console.log("ending scene cat: " + this.game.cat);
        console.log(this.game.cat);

    }

    setUpPolaroid(){
        var rect = this.add.rectangle(0,0,312,280,0x4287f5);//the background of the polaroid
        rect.depth=0;
        frame.setVisible(true);
        frame.setScale(13);
        frame.depth=2;
        console.log(frame);
        polaroid = this.add.container(400,-1000,[frame,rect]);

    }

    setUpTween(cat,polaroid,gameScene){
        //Tween that makes the photo slide from top
        gameScene.catSlideOver = gameScene.tweens.add({
            targets: cat,
            x: 400,
            y: 280,
            duration: 1000,
            yoyo: false,
            delay: 10
        });
        gameScene.polaroidSlideOver = gameScene.tweens.add({
            targets: polaroid,
            x: 400,
            y: 280,
            duration: 1000,
            yoyo: false,
            delay: 10
        });
        console.log("built tweens");
        //console.log(gameScene.slideOver);
    }



}


export { EndingScene };