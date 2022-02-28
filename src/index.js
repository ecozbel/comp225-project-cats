import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import catimg from './assets/cat.png';
import hatimg from './assets/hat.png';
import catHitbox from './assets/cat-shape2.json';
var cat;
var hat;

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
        this.load.json('catshape', catHitbox);
    }
      
    create ()
    {
        var catshape = this.cache.json.get('catshape');
        // this.arcade.world.setBounds(0, 0, game.config.width, game.config.hei
        this.matter.world.setGravity(0,0);
        cat = this.matter.add.sprite(400,300,'cat',null, { shape: catshape});
        hat = this.matter.add.sprite(100,300,'hat');
        cat.setStatic(true);
        cat.setSensor(true);
        cat.setScale(0.6);
        hat.setScale(0.6);
        hat.setInteractive();
        this.input.setDraggable(hat);
        var rectangle = this.matter.add.rectangle(cat.getBounds());

    
    }
    update(){
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            onDragStop(gameObject,pointer);
        });
        //overlap check and snap
        function onDragStop(sprite, pointer) {
            if(Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), cat.getBounds())){
                //console.log( cat.getBounds());
                sprite.x = cat.x;
                sprite.y = cat.y-170;
            }
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
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
