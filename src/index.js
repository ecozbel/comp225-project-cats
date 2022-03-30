
import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import catimg from './assets/cat.png';
import hat1img from './assets/clothing/hat1.png';
import hat2img from './assets/clothing/hat2.png';
import shoe1img from './assets/clothing/shoe1.png';
import shoe2img from './assets/clothing/shoe2.png';
import shoe3img from './assets/clothing/shoe3.png';
import closetimg from './assets/closet.png';
import greenshirt from './assets/clothing/greentshirt.png';
import flowertop from './assets/clothing/flowertop.png';
import shirt1img from './assets/clothing/shirt1.png';
import backgroundImg from './assets/background.png';
import firefighterhat from './assets/clothing/firefighterhat.png';
import firefighterboots from './assets/clothing/firefighterboots.png';
import firefightercoat from './assets/clothing/firefightercoat.png';
import hatSilhoetteimg from './assets/icons/hatIcon.png';
import shirtSilhoetteimg from './assets/icons/shirtIcon.png';
import shoeSilhoetteimg from './assets/icons/shoesIcon.png';
import pantsSilhoetteimg from './assets/icons/pantsIcon.png';

var cat;
var closet;
var hat;
var hat2;
var shirt;
var shirt2;
var shoe;
var shoe2;
var shoe3;
var blankSprite;
var clothingTypes;
var layers;
var shirt;
var shoe;
var logo;
var pants;



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


class MyGame extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneB' });
    }
    

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('cat',catimg);
        this.load.image('hat1',hat1img);
        this.load.image('hat2',hat2img);
        this.load.image('shoe1',shoe1img);
        this.load.image('shoe2',shoe2img);
        this.load.image('shoe3',shoe3img);
        this.load.image('closet',closetimg);
        this.load.image('background', backgroundImg);
        this.load.image('shirt1', shirt1img);
        this.load.image('hatSilhoette', hatSilhoetteimg);
        this.load.image('shirtSilhoette', shirtSilhoetteimg);
        this.load.image('shoeSilhoette', shoeSilhoetteimg);
        this.load.image('pantsSilhoette', pantsSilhoetteimg);
        this.load.json('prompts','src/assets/prompts.json');
        this.load.image('shirt2', firefightercoat);
    }
      
    create ()
    {
        let promptJsonFile = this.cache.json.get('prompts');

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
        hat2 = this.matter.add.sprite(600,300,'hat2');

        //test assets for shoes
        shoe = this.matter.add.sprite(600,300,'shoe1');
        shoe2 = this.matter.add.sprite(600,300,'shoe2');
        shoe3 = this.matter.add.sprite(600,300,'shoe3');
        //test assets for shirts
        shirt = this.matter.add.sprite(0,0,'shirt1');
        shirt2 = this.matter.add.sprite(0,0,'shirt2');
        //test assets for pants
        pants = this.matter.add.sprite(0,0,'shirt2');



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
        scaletoIconSize(shoe2);
        shoe2.setInteractive();
        shoe2.setSensor(true);
        scaletoIconSize(shoe3);
        shoe3.setInteractive();
        shoe3.setSensor(true);

        //set up sprite properties of test shirt object
        scaletoIconSize(shirt);
        shirt.setInteractive();
        shirt.setSensor(true);
        scaletoIconSize(shirt2);
        shirt2.setInteractive();
        shirt2.setSensor(true);

        //pants
        scaletoIconSize(pants);
        pants.setInteractive();
        pants.setSensor();

        //specify typing of test hat & test shoe 
        shirt.clothingType = clothingTypes.shirt;
        shirt2.clothingType = clothingTypes.shirt;
        shoe.clothingType = clothingTypes.shoe;
        shoe2.clothingType = clothingTypes.shoe;
        shoe3.clothingType = clothingTypes.shoe;
        hat2.clothingType = clothingTypes.hat;
        hat.clothingType = clothingTypes.hat;
        pants.clothingType = clothingTypes.pants;
        //set Spritees to be draggable

        
        //Creates a layer acting as a closet category. Layer is like a type of array, but meant to store graphics objects.
        var hatGroup = this.add.layer();
        var shoeGroup = this.add.layer();
        var shirtGroup = this.add.layer();
        var pantsGroup = this.add.layer();

        //Adds items into layers/closet
        hatGroup.add(hat);
        hatGroup.add(hat2);
        shoeGroup.add(shoe);
        shoeGroup.add(shoe2);
        shoeGroup.add(shoe3);
        shirtGroup.add(shirt);
        shirtGroup.add(shirt2);
        pantsGroup.add(pants);

        gridAlignLayer(hatGroup);
        gridAlignLayer(shirtGroup);
        gridAlignLayer(shoeGroup);
        gridAlignLayer(pantsGroup);      

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
        assignSpriteData(pantsGroup,"pants");       

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
        clearLayer(pantsGroup)

        var layers = [shoeGroup,hatGroup,shirtGroup,pantsGroup];

    

        //button for switching between categories

        const hatbutton = this.add.sprite(90,100,"hatSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(hatGroup));
        scaletoIconSize(hatbutton);
 
        const shirtbutton = this.add.sprite(90 + game.config.width*0.08,100,"shirtSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(shirtGroup));
        scaletoIconSize(shirtbutton);

        const shoebutton = this.add.sprite(90 + game.config.width*0.24,100,"shoeSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(shoeGroup));
        scaletoIconSize(shoebutton);  

        const pantsbutton = this.add.sprite(90 + game.config.width*0.16,100,"pantsSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(pantsGroup));
        scaletoIconSize(pantsbutton);  

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
                y : cat.y-cat.displayHeight/2.4,
                currentClothing : null,
            }
    
            cat.shoePosition = { 
                x : cat.x,
                y : cat.y+cat.displayHeight/2.65,
                currentClothing : null,
            }
            
            cat.shirtPosition = { //these values arent quite right. need test images i think before they can be set right.
                x : cat.x,
                y : cat.y+cat.displayHeight/12,
                currentClothing : null,
            }
    
            cat.pantsPosition = { //these values arent quite right. need test images i think before they can be set right.
                x : cat.x,
                y : 300 + 100,
                currentClothing : null,
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

                // function to make sure that same article of clothing can't be placed on a cat twice
                function handleClothingPlacement(clothingPosition) {

                    // multiple clothes of same type cant be on cat
                    if (clothingPosition.currentClothing != null && clothingPosition.currentClothing != sprite) { 
                        returnSpritetoCloset(clothingPosition.currentClothing);
                    } 
                    //set the position of the sprite 
                    sprite.x = clothingPosition.x;
                    sprite.y = clothingPosition.y;
                    //set the clothPositions current clothing to be what was just dropped on it
                    clothingPosition.currentClothing = sprite;

                }

                //switch statement to handle multiple types of clothes
                switch (sprite.clothingType){
                    case clothingTypes.hat:
                        handleClothingPlacement(cat.hatPosition);    
                        break;
                    case clothingTypes.shoe:
                        handleClothingPlacement(cat.shoePosition); 
                        break;
                    case clothingTypes.shirt:
                        handleClothingPlacement(cat.shirtPosition); 
                        break;   
                    case clothingTypes.pants:
                        handleClothingPlacement(cat.pantsPosition); 
                        break;                                                 
                }


            }
            //Sprite shrinks and returns to closet if it is not dropped on cat.
            else{
                returnSpritetoCloset(sprite);
            }
        }

        function returnSpritetoCloset(sprite){
            sprite.getData('group').addAt(sprite, sprite.getData('index'));
                scaletoIconSize(sprite);
                sprite.x=sprite.getData('origin').x;
                sprite.y=sprite.getData('origin').y;
        }
        //gets random item from an array
        function getRandomItem(arr) {
            // get random index value
            const randomIndex = Math.floor(Math.random() * arr.length);
            const item = arr[randomIndex];
                return item;
}
        const titleArray = ['Mr.', 'Ms.', 'Mrs.', 'Sir', 'Dame','','',''];
        const adjArray = ['Fluffy', 'Cuddly', 'Blue', 'Tabby', 'Silly',];
        const nounArray = ['Whiskers','Kitty', 'Cat', 'Socks', 'Patches', 'Spot',]
        const suffixArray = ['Jr.','Sr.', 'IV', 'II', 'PhD', '', '', '']

        var fullName = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
        console.log(fullName);

        // working on how to put new names in prompts, looping through inner array doesn't work yet - Ifraah
        // for (var i = 0; i < promptJsonFile.prompt.length; i++ ) {
        //     for (var j = 0; j < Object.keys(promptJsonFile.prompt[i]).length; j++ ) {
        //         promptJsonFile.prompt = Object.keys(promptJsonFile.prompt[i]).replace("{{full_name", fullName);
        //     }

        // }

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
//comment


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
    scene: [BegginingScene,MyGame]
};

const game = new Phaser.Game(config);