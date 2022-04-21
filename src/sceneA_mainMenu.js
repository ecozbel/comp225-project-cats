import Phaser, { Game } from 'phaser';

import mainMenuBG from './assets/backgrounds/mainMenuBackground.png';
import animatedLogo from './assets/menuAssets/logoAnimated.png';
import buttonFrame from './assets/icons/buttonFrameLarge.png'
import genericButton from './genericButton';

class mainMenuScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'mainMenuScene' });
        
    }
    preload ()
    {
        this.load.spritesheet('animatedlogo', animatedLogo, { frameWidth: 800, frameHeight: 800 });
        this.load.image('mainMenuBG',mainMenuBG);
        this.load.spritesheet('buttonFrame', buttonFrame, {
            frameWidth: 312,
            frameHeight: 52
        });

    }
    create(){

        var background = this.add.image(400,300,'mainMenuBG')
        var logo = this.add.sprite(250,160,'animatedlogo').setDisplaySize(400, 400)
        .setDepth(4);
        const windBlow = this.anims.create({
            key: 'windblowing',
            frames: this.anims.generateFrameNumbers('animatedlogo',{ start: 0, end: 2 }),
            frameRate: 8
        });
        logo.play({key:'windblowing',repeat:-1});
        var camera = this.cameras.main;
        var self = this;
        let continueButton= new genericButton({scene:self,key:'buttonFrame',x:250,y:400,text:"Start Game"});
        continueButton.on('pointerdown', function(pointer, localX, localY, event){
            camera.fadeOut(1000);    
        },self );
        camera.on('camerafadeoutcomplete', function(){
            startNextScene();

        },self);
        function startNextScene(){
            self.scene.start('pickCatScene');
        }

        let aboutButton= new genericButton({scene:self,key:'buttonFrame',x:continueButton.x,y:continueButton.y+81,text:"About"});

           
    }
    update(){
    }

}
export {mainMenuScene};
