import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import catimg from './assets/cat.png';
import hatimg from './assets/hat.png';
import catHitbox from './assets/cat-shape2.json';
var cat;
var hat;
var clothingType;
var blankSprite;
var clothingTypes;

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
        hat = this.matter.add.sprite(600,300,'hat');

        blankSprite = this.matter.add.sprite(600,300,'hat');
        blankSprite.setVisible(false);
        blankSprite.setSensor(true);
        blankSprite.setInteractive(false);

        cat.setData('catLayer',this.add.layer());

        //var layers = Phaser.Utils.Array();
        

        //placeholder for shoes
        var shoe = this.matter.add.sprite(600,300,'hat');
        shoe.tint = Math.random() * 0xffffff;



        createClothingSnapPoints(cat);
        //did this because I dont think javascript has enums
        clothingTypes = {

            hat : 0,
            shoe : 1,

        }

        cat.setStatic(true);
        cat.setSensor(true);
        cat.setScale(0.6);
        hat.setScale(0.2);
        hat.setInteractive();
        hat.setSensor(true);

        shoe.setScale(0.2);
        shoe.setInteractive();
        shoe.setSensor(true);

        shoe.clothingType = clothingTypes.shoe;
        hat.clothingType = clothingTypes.hat;
        
        this.input.setDraggable(hat);
        this.input.setDraggable(shoe);

        //Creates a layer acting as a closet category. Layer is like a type of array, but meant to store graphics objects.
        var hatGroup = this.add.layer();
        //Adds hat to closet
        hatGroup.add(hat);

        var shoeGroup = this.add.layer();
        shoeGroup.add(shoe);

        //Organizes items in layer in a grid. For testing purposes, hasn't been encapsulated yet.
        Phaser.Actions.GridAlign(hatGroup.getChildren(), {
                    width: 3,
                    height: 10,
                    cellWidth: 50,
                    cellHeight: 50,
                    x: 50,
                    y: 50
                });

        Phaser.Actions.GridAlign(shoeGroup.getChildren(), {
                    width: 3,
                    height: 10,
                    cellWidth: 50,
                    cellHeight: 50,
                    x: 50,
                    y: 50
                });


        //Goes through each sprite in the hat group and saves their origin position and index
        //Also saves what group they belong to
        //Needed for snapping back/un-equipping
        hatGroup.each(function(gameObject) {
            gameObject.setData('origin', gameObject.getCenter());
            gameObject.setData('type', "hat");
            gameObject.setData('group', hatGroup);
            gameObject.setData('index', hatGroup.getIndex(gameObject));
        });

        shoeGroup.each(function(gameObject) {
            gameObject.setData('origin', gameObject.getCenter());
            gameObject.setData('type', "shoe");
            gameObject.setData('group', shoeGroup);
            gameObject.setData('index', shoeGroup.getIndex(gameObject));
        });

        //only show hats first until toggle is pressed
        shoeGroup.setVisible(false);
        var layers = [shoeGroup,hatGroup];

    

        //Test button for switching between categories
        const togglebutton = this.add.text(40, 100, 'Toggle!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => toggleVisible(layers));

        //
        var self = this;

        //temporary function to emulate switching categories
        //When toggleButton is pressed,
        //swaps between two layers by making one invisible
        function toggleVisible(layers){
            for(const layer  of layers){
                if(layer.visible==true){
                    layer.setVisible(false);
                    layer.each(function(gameObject) {
                        if(gameObject != null){
                           gameObject.disableInteractive();
                            self.input.setDraggable(gameObject,false);
                        }
                    });
                }
                else{
                    layer.setVisible(true);
                    togglebutton.setText("Displaying: "+ layer.first.getData('type') + "group. Press to toggle.")
                    layer.each(function(gameObject) {
                        if(gameObject != null){
                            gameObject.setInteractive();
                            self.input.setDraggable(gameObject,true);
                        }
                    });
                }
            }
            return;
        }


        //different clothes snap to different places on cat. only shoe and hat right now
        function createClothingSnapPoints(cat){

            cat.hatPosition = { 
                x : 400,
                y : 300 - 170,
            }
    
            cat.shoePosition = { 
                x : 400,
                y : 300 + 170,
            }
        }


    }


    update(){
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.addToDispla
            gameObject.setScale(0.6);
            gameObject.x = dragX;
            gameObject.y = dragY;
            //snapToCat(gameObject,pointer);
        });

        this.input.on('dragend', (pointer, gameObject, dragX, dragY) => {
            snapToCat(gameObject,pointer);
        });

        //overlap check and snap
        function snapToCat(sprite, pointer) {
            if(Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), cat.getBounds())){
                sprite.getData('group').replace(sprite,blankSprite );
                cat.getData('catLayer').add(sprite);

                //switch statement to handle multiple types of clothes
                switch (sprite.clothingType){
                    case clothingTypes.hat:
                        sprite.x = cat.hatPosition.x;
                        sprite.y = cat.hatPosition.y;
                        break;
                    case clothingTypes.shoe:
                        sprite.x = cat.shoePosition.x;
                        sprite.y = cat.shoePosition.y;
                        break;
                }


            }
            //Sprite shrinks and returns to closet if it is not dropped on cat.
            else{
                sprite.getData('group').addAt(sprite, sprite.getData('index'));
                sprite.setScale(0.2);
                sprite.x=sprite.getData('origin').x;
                sprite.y=sprite.getData('origin').y;
                
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
            debug: false
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
