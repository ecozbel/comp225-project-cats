import Phaser from "phaser";
import { game } from './index.js';


class EndingScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneC' });
    }

    preload ()
    {

    }

    create ()
    {
        console.log("ending scene cat: " + this.game.cat);
        console.log(this.game.cat);

        this.setUpCat(400,300);

    }

    setUpCat(_x,_y){

        var cat = this.add.existing(this.game.cat);
        cat.x=_x;
        cat.y=_y;


    }




}


export { EndingScene };