import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import catimg from './assets/cat.png';
import hatimg from './assets/hat.png';
class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('cat',catimg);
        this.load.image('hat',hatimg);
        this.load.json('catshape', 'assets/cat-shape2.json');
    }
      
    create ()
    {
        var catshape = this.cache.json.get('catshape');
        // this.arcade.world.setBounds(0, 0, game.config.width, game.config.hei
        // this.arcade.world.setGravity(0,0);
        var cat = this.physics.add.sprite(400,300,'cat',null, { shape: catshape});
        var hat = this.physics.add.sprite(100,300,'hat');
        cat.setScale(0.6);
        hat.setScale(0.6);
        hat.setInteractive();
        this.input.setDraggable(hat);
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

    
        });
         while(checkOverlap(hat,cat))
        {
            hat.setPosition(cat.getCenter);
            console.log("Collision!");
        }
        function checkOverlap(spriteA, spriteB) {
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();
            console.log(boundsA);
            console.log(boundsB);
            return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
            }
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    pixelArt:true,
    width: 800,
    height: 600,
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
