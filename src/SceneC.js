import Phaser from "phaser";
import { game } from './index.js';
import polaroidImg from './assets/polaroid.png';


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
        this.setUpPolaroid();
        this.setUpCat(400,280);
        

    }

    setUpCat(_x,_y){

        var cat = this.add.existing(this.game.cat);
        cat.x=_x;
        cat.y=_y;
        cat.setScale(3.5);
        //console
        console.log("ending scene cat: " + this.game.cat);
        console.log(this.game.cat);

    }

    setUpPolaroid(){
        this.add.rectangle(400,300,350,350,0x4287f5);//the background of the polaroid
        var polaroid = this.add.sprite(400,300,'polaroid');
        polaroid.setScale(13);



    }


}


export { EndingScene };