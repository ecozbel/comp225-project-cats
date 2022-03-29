import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class BegginingScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneA' });
    }
    preload ()
    {
        this.load.image('logo', logoImg);
    }
    create ()
    {
        logo = this.add.sprite(400,300,'logo');
        //const startButton = this.add.text(400,300,"Start Screen! Click Anywhere");
        //console.log(startButton.text);
        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);
    }

}
