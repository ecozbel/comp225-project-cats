import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import catimg from './assets/cat.png';
import hatimg from './assets/hat1.png';
import shoe1img from './assets/shoe1.png';
import closetimg from './assets/closet.png';
import greenshirt from './assets/greentshirt.png';
import flowertop from './assets/flowertop.png';
import shirt1img from './assets/shirt1.png';
import backgroundImg from './assets/background.png';
import firefighterhat from './assets/firefighterhat.png';
import firefighterboots from './assets/firefighterboots.png';
import firefightercoat from './assets/firefightercoat.png';

var cat;
var closet;
var hat;
var hat2;
var shirt;
var shirt2;
var shoe;
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
        this.load.image('hat1',hatimg);
        this.load.image('shoe1',shoe1img);
        this.load.image('closet',closetimg);
        this.load.image('background', backgroundImg);
        this.load.image('shirt1', shirt1img);
        this.load.image('shirt2', firefightercoat);
    }
      
    create ()
    {
        var self = this;
        
        var bg = this.matter.add.image(350,250,'background');
        bg.setStatic(true);

        this.matter.world.setGravity(0,0);
        closet = this.matter.add.sprite(150,200,'closet');
        closet.setStatic(true);
        normalizeScale(closet);
        cat = setupCat();

        //test assets for hats
        hat = this.matter.add.sprite(600,300,'hat1');
        hat2 = this.matter.add.sprite(600,300,'hat1');
        hat2.setTint(Math.random() * 0xffffff);
        //test assets for shoes
        shoe = this.matter.add.sprite(600,300,'shoe1');
        //test assets for shirts
        shirt = this.matter.add.sprite(0,0,'shirt1');
        shirt2 = this.matter.add.sprite(0,0,'shirt2');




        //Set up placeholder transparent sprite for closet
        blankSprite = this.matter.add.sprite(600,300,'hat1');
        blankSprite.setVisible(false);
        blankSprite.setSensor(true);
        blankSprite.setInteractive(false);


        //set up sprite properties of cat
        function setupCat(){
            cat = self.matter.add.sprite(500,350,'cat',null);
            //add a layer into the cat, it contains clothes that are equipped on the cat
            cat.setData('catLayer',self.add.layer());
            //Cat sprite properties
            cat.setStatic(true);
            cat.setSensor(true);
            normalizeScale(cat);
            return cat;
        }

        createClothingSnapPoints(cat);
        //did this because I dont think javascript has enums
        clothingTypes = {

            hat : 0,
            shoe : 1,
            shirt : 2,
            pants : 3,

        }

        //set up sprite properties of test hat object
        scaletoIconSize(hat);
        hat.setInteractive();
        hat.setSensor(true);
        scaletoIconSize(hat2);
        hat2.setInteractive();
        hat2.setSensor(true);

        //set up sprite properties of test shoe object
        scaletoIconSize(shoe);
        shoe.setInteractive();
        shoe.setSensor(true);

        //set up sprite properties of test shirt object
        scaletoIconSize(shirt);
        shirt.setInteractive();
        shirt.setSensor(true);
        scaletoIconSize(shirt2);
        shirt2.setInteractive();
        shirt2.setSensor(true);

        //specify typing og test hat & test shoe 
        shirt.clothingType = clothingTypes.shirt;
        shirt2.clothingType = clothingTypes.shirt;
        shoe.clothingType = clothingTypes.shoe;
        hat2.clothingType = clothingTypes.hat;
        hat.clothingType = clothingTypes.hat;
        //set Spritees to be draggable
        

        
        //Creates a layer acting as a closet category. Layer is like a type of array, but meant to store graphics objects.
        var hatGroup = this.add.layer();
        var shoeGroup = this.add.layer();
        var shirtGroup = this.add.layer();
        //Adds items into layers/closet
        hatGroup.add(hat);
        hatGroup.add(hat2);
        shoeGroup.add(shoe);
        shirtGroup.add(shirt);
        shirtGroup.add(shirt2);
        
        gridAlignLayer(hatGroup);
        gridAlignLayer(shirtGroup);
        gridAlignLayer(shoeGroup);

        //Visually arranges items in layer in a grid formation. 
        function gridAlignLayer(objectLayer){
            Phaser.Actions.GridAlign(objectLayer.getChildren(), {
                width: 3,
                height: 10,
                cellWidth: 50,
                cellHeight: 50,
                x: closet.x-closet.displayWidth+objectLayer.first.displayWidth,
                y: closet.y-closet.displayHeight+objectLayer.first.displayHeight
            });
        }


        assignSpriteData(hatGroup,"hat");
        assignSpriteData(shoeGroup,"shoe");
        assignSpriteData(shirtGroup,"shirt");
        

        //Goes through each sprite in the object layer  and saves their origin position and index
        //Also saves what group they belong to
        //Needed for snapping back/un-equipping
        function assignSpriteData(objectLayer,type){
            objectLayer.each(function(gameObject) {
                gameObject.setData('origin', gameObject.getCenter());
                gameObject.setData('type', type);
                gameObject.setData('group', objectLayer);
                gameObject.setData('index', objectLayer.getIndex(gameObject));
            });
    
        }
        
        //only show layer after button is pressed
        clearLayer(shoeGroup)
        clearLayer(shirtGroup)
        clearLayer(hatGroup)
    

        var layers = [shoeGroup,hatGroup,shirtGroup];

    

        //Test button for switching between categories
        const hatbutton = this.add.text(40, 100, 'hats!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => displayLayer(hatGroup));
        const shirtbutton = this.add.text(140, 100, 'shirts!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => displayLayer(shirtGroup));
        const shoebutton = this.add.text(240, 100, 'shoes!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => displayLayer(shoeGroup));
        //


        //Display chosen layer
        function displayLayer(chosenLayer){
            for(const layer  of layers){
                if(layer.visible==true){
                    clearLayer(layer);
                }
            }
            chosenLayer.visible=true;
            chosenLayer.each(function(gameObject) {
                if(gameObject != null){
                    gameObject.setInteractive();
                    self.input.setDraggable(gameObject,true);
                }
            });
        }
        
        //clears layer from canvas
        function clearLayer(layer){
            layer.setVisible(false);
                    layer.each(function(gameObject) {
                        if(gameObject != null){
                            gameObject.disableInteractive();
                            self.input.setDraggable(gameObject,false);
                        }
                    });
        }

        //console.log(cat.displayHeight);

        //different clothes snap to different places on cat. only shoe and hat right now
        function createClothingSnapPoints(cat){
        
            cat.hatPosition = { 
                x : cat.x,
                y : cat.y-cat.displayHeight/2,
            }
    
            cat.shoePosition = { 
                x : cat.x,
                y : cat.y+cat.displayHeight/2.65,
            }
            
            cat.shirtPosition = { //these values arent quite right. need test images i think before they can be set right.
                x : cat.x,
                y : cat.y+cat.displayHeight/12,
            }
    
            cat.pantsPosition = { //these values arent quite right. need test images i think before they can be set right.
                x : cat.x,
                y : 300 + 100,
            }

        }

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            normalizeClothing(gameObject);
            gameObject.x = dragX;
            gameObject.y = dragY;
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
                    case clothingTypes.shirt:
                        sprite.x = cat.shirtPosition.x;
                        sprite.y = cat.shirtPosition.y;
                        break;   
                    case clothingTypes.pants:
                        sprite.x = cat.pantsPosition.x;
                        sprite.y = cat.pantsPosition.y;
                        break;                                                 
                }


            }
            //Sprite shrinks and returns to closet if it is not dropped on cat.
            else{
                sprite.getData('group').addAt(sprite, sprite.getData('index'));
                scaletoIconSize(sprite);
                sprite.x=sprite.getData('origin').x;
                sprite.y=sprite.getData('origin').y;
                
            }
        }


    }


    update(){
        
    }
    
}
//Utilities
//Scales given sprite to normal size
function normalizeScale(sprite){
    sprite.displayWidth=game.config.width*0.3; 
    sprite.scaleY=sprite.scaleX;
}
//Scales given sprite to clothing size
function normalizeClothing(sprite){
    sprite.displayWidth=game.config.width*0.28; 
    sprite.scaleY=sprite.scaleX;
}
//Scales given sprite to icon size
function scaletoIconSize(sprite){
    sprite.displayWidth=game.config.width*0.08; 
    sprite.scaleY=sprite.scaleX;
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
