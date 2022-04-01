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
    }
}


export { EndingScene };