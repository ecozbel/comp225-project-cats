import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import { BegginingScene } from './SceneA';
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
import backgroundImg2 from './assets/background2.png';
import firefighterhat from './assets/clothing/firefighterhat.png';
import firefighterboots from './assets/clothing/firefighterboots.png';
import firefightercoat from './assets/clothing/firefightercoat.png';
import hatSilhoetteimg from './assets/icons/hatIcon.png';
import shirtSilhoetteimg from './assets/icons/shirtIcon.png';
import shoeSilhoetteimg from './assets/icons/shoesIcon.png';
import pantsSilhoetteimg from './assets/icons/pantsIcon.png';
import itemFrame from './assets/itemFrame.png';
import animatedLogo from './assets/logoAnimated.png';
import catPalette from './assets/cat-palette.png';
import catAnimation from './assets/catanimated.png';
import { game } from './index.js';
import { chosenCat } from './SceneA';//can we delete this?
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
var atlasKey;
var catAnimated;
var allClothing;

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
        this.load.image('closet',closetimg);
        this.load.image('background', backgroundImg);
        this.load.image('background2', backgroundImg2);
        this.load.image('hatSilhoette', hatSilhoetteimg);
        this.load.image('shirtSilhoette', shirtSilhoetteimg);
        this.load.image('shoeSilhoette', shoeSilhoetteimg);
        this.load.image('pantsSilhoette', pantsSilhoetteimg);
        // console.log('---------> preloading')
        // this.load.json('prompts','src/assets/prompts.json');
        loadClothing(this);

        //helper function to organize better
        function loadClothing(scene){
            scene.load.image('hat1',hat1img);
            scene.load.image('hat2',hat2img);
            scene.load.image('shoe1',shoe1img);
            scene.load.image('shoe2',shoe2img);
            scene.load.image('shoe3',shoe3img);
            scene.load.image('shirt1', shirt1img);
            scene.load.image('shirt2', firefightercoat);
        }



    }
      
    create ()
    {
        //var catBlink = game.scenes.BegginingScene.catAnimated;

        // let jsonFile = this.cache.json.get('prompts');
        // console.log('--------->', jsonFile.prompt[0].introduction)
        console.log("sceneB this.game.cat: ");
        console.log(this.game.cat);

        var camera = this.cameras.main;

        var self = this;
        //cat.scene = this;
        //cat = this.add.existing(this.game.cat);
        
        //var bg = this.matter.add.image(350,250,'background');
        var bg = this.matter.add.image(400,300,'background2');
        bg.setStatic(true);




        this.matter.world.setGravity(0,0);
        closet = this.matter.add.sprite(150,200,'closet');
        closet.setStatic(true);
        normalizeScale(closet);
        cat = setupCat();
        //cat = this.add.existing(self.game.cat);
        console.log("sceneB cat: ");
        console.log(cat);
        console.log("sceneB closet: ");
        console.log(closet);

        //this is an object to act as an enumerator for clothing types: hat, shoe, etc.
        clothingTypes = {

            hat : 0,
            shoe : 1,
            shirt : 2,
            pants : 3,

        }

        //Creates a layer acting as a closet category. Layer is like a type of array, but meant to store graphics objects.
        var hatGroup = this.add.layer();
        var shoeGroup = this.add.layer();
        var shirtGroup = this.add.layer();
        var pantsGroup = this.add.layer();

        function addAllClothing(scene){
            createClothing("hat1",clothingTypes.hat,scene);
            createClothing("hat2",clothingTypes.hat,scene);
            createClothing("shoe1",clothingTypes.shoe,scene);
            createClothing("shoe2",clothingTypes.shoe,scene);
            createClothing("shoe3",clothingTypes.shoe,scene);
            createClothing("shirt1",clothingTypes.shirt,scene);
            createClothing("shirt2",clothingTypes.shirt,scene);
            createClothing("shirt2",clothingTypes.pants,scene);
        }

        addAllClothing(this);



        //Set up placeholder transparent sprite for closet
        blankSprite = this.matter.add.sprite(600,300,'hat1');
        blankSprite.setVisible(false);
        blankSprite.setSensor(true);
        blankSprite.setInteractive(false);


        //set up sprite properties of cat
        function setupCat(){
            //cat = self.matter.add.sprite(500,350,'cat',null);
            cat = self.add.existing(self.game.cat);
            cat.x=500;
            cat.y=350;
            cat.setDepth(0);
            cat.setVisible(true);
            cat.setData('catLayer',self.add.layer());
            //self.children.bringToTop(cat);
            //normalizeScale(cat);
            cat.setScale(6.7);
            return cat;
        }

        createClothingSnapPoints(cat);

 

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

        //add a single piece of clothing to the scene.
        function createClothing(spriteString,clothingType,scene){
            var clothing = scene.matter.add.sprite(600,300,spriteString);
            scaletoIconSize(clothing);
            clothing.setInteractive();
            clothing.setSensor(true);
            clothing.clothingType = clothingType;
            clothing.ignoreDestroy=true;
            switch (clothingType){
                case clothingTypes.hat:
                    hatGroup.add(clothing);
                    break;
                case clothingTypes.shoe:
                    shoeGroup.add(clothing);
                    break;
                case clothingTypes.shirt:
                    shirtGroup.add(clothing);
                    break;   
                case clothingTypes.pants:
                    pantsGroup.add(clothing);
                    break;                                                 
            }

            return clothing;

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

        // Ending Scene button
        const EndingButton = this.add.image(cat.x - 150, cat.y - 330 , 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            //call function to pass on cat and prompt selection to next scene here
            .on('pointerdown', function(pointer, localX, localY, event){
                camera.fadeOut(1000); 
                this.game.cat = cat;
                //camera.on('camerafadeoutcomplete', functionstartNextScene(), camera);
                //this.scene.start('sceneC')
                //
            },self );

            camera.on('camerafadeoutcomplete', function(){
                startNextScene();

            },self);
                //this.scene.start('sceneC')

            this.add.text(EndingButton.x, EndingButton.y, 'Continue',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2,align:'left'  })
            .setOrigin(0.5)
        // function startNextScene(){
        //     this.scene.start('sceneC')
        // }
        function startNextScene(){
            self.scene.start('sceneC');
        }


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
                z : 4,
                currentClothing : null,
            }
    
            cat.shoePosition = { 
                x : cat.x,
                y : cat.y+cat.displayHeight/2.65,
                z : 1,
                currentClothing : null,
            }
            
            cat.shirtPosition = { //these values arent quite right. need test images i think before they can be set right.
                x : cat.x,
                y : cat.y+cat.displayHeight/12,
                z : 3,
                currentClothing : null,
            }
    
            cat.pantsPosition = { //these values arent quite right. need test images i think before they can be set right.
                x : cat.x,
                y : 300 + 100,
                z : 2,
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
                    sprite.setDepth(clothingPosition.z);
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

export { MyGame };