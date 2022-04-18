import Phaser from 'phaser';

import { game } from './index.js';
import * as imports from "./importHelperB.js";
import * as utilities from "./utilities.js";
var cat;
var closet;
var blankSprite;
var clothingTypes;


class MyGame extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneB' });
    }
    

    preload ()
    {
        //this.load.image('logo', imports.logoImg);
        //this.load.image('cat',imports.catimg);
        this.load.image('closet',imports.closetimg);
        this.load.image('background', imports.backgroundTest);
        this.load.image('background2', imports.backgroundImg2);
        this.load.image('hatSilhoette', imports.hatSilhoetteimg);
        this.load.image('shirtSilhoette', imports.shirtSilhoetteimg);
        this.load.image('shoeSilhoette', imports.shoeSilhoetteimg);
        this.load.image('pantsSilhoette', imports.pantsSilhoetteimg);

        this.load.image('hatSilhoetteOver', imports.hatSilhoetteOverimg);
        this.load.image('shirtSilhoetteOver', imports.shirtSilhoetteOverimg);
        this.load.image('shoeSilhoetteOver', imports.shoeSilhoetteOverimg);
        this.load.image('pantsSilhoetteOver', imports.pantsSilhoettOverimg);
        // console.log('---------> preloading')
        // this.load.json('prompts','src/assets/prompts.json');
        loadClothing(this);

        //helper function to organize better
        function loadClothing(scene){
            scene.load.image('hat1',imports.hat1img);
            scene.load.image('hat2',imports.hat2img);
            scene.load.image('shoe1',imports.shoe1img);
            scene.load.image('shoe2',imports.shoe2img);
            scene.load.image('shoe3',imports.shoe3img);
            scene.load.image('shirt1', imports.shirt1img);
            scene.load.image('shirt2', imports.firefightercoat);
            scene.load.image('shirt3', imports.shirt3img);
            scene.load.image('shirt4', imports.shirt4img);
            scene.load.image('shirt5', imports.shirt5img);
            scene.load.image('shirt6', imports.shirt6img);
            scene.load.image('shirt7', imports.shirt7img);
            scene.load.image('shirt8', imports.shirt8img);
            scene.load.image('shirt9', imports.shirt9img);
            scene.load.image('shirt10', imports.shirt10img);
            scene.load.image('shirt11', imports.shirt11img);
            scene.load.image('shirt12', imports.shirt12img);
            scene.load.image('shirt13', imports.shirt13img);
            scene.load.image('pants1', imports.pants1);
            scene.load.image('pants2', imports.pants2);
            scene.load.image('pants3', imports.pants3);
            scene.load.image('pants4', imports.pants4);
            scene.load.image('pants5', imports.pants5);
            scene.load.image('pants6', imports.pants6);
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
        
        //Use this background for testing placement
        //var bg = this.matter.add.image(350,250,'background');

        //Old art
        var bg = this.matter.add.image(400,300,'background2');
        bg.setStatic(true);




        this.matter.world.setGravity(0,0);
        closet = this.matter.add.sprite(150,200,'closet');
        closet.setStatic(true);
        utilities.normalizeScale(closet);
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
            createClothing("shirt3",clothingTypes.shirt,scene);
            createClothing("shirt4",clothingTypes.shirt,scene);
            createClothing("shirt5",clothingTypes.shirt,scene);
            createClothing("shirt6",clothingTypes.shirt,scene);
            createClothing("shirt7",clothingTypes.shirt,scene);
            createClothing("shirt8",clothingTypes.shirt,scene);
            createClothing("shirt9",clothingTypes.shirt,scene);
            createClothing("shirt10",clothingTypes.shirt,scene);
            createClothing("shirt11",clothingTypes.shirt,scene);
            createClothing("shirt12",clothingTypes.shirt,scene);
            createClothing("shirt13",clothingTypes.shirt,scene);
            createClothing("pants1",clothingTypes.pants,scene);
            createClothing("pants2",clothingTypes.pants,scene);
            createClothing("pants3",clothingTypes.pants,scene);
            createClothing("pants4",clothingTypes.pants,scene);
            createClothing("pants5",clothingTypes.pants,scene);
            createClothing("pants6",clothingTypes.pants,scene);
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

        utilities.createClothingSnapPoints(cat);


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
            utilities.scaletoIconSize(clothing);
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
        hatbutton.on('pointerover', () => hatbutton.setTexture('hatSilhoetteOver'));
        hatbutton.on('pointerout', () => hatbutton.setTexture('hatSilhoette'));
        utilities.scaletoIconSize(hatbutton);
 
        const shirtbutton = this.add.sprite(90 + game.config.width*0.08,100,"shirtSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(shirtGroup));
        shirtbutton.on('pointerover', () => shirtbutton.setTexture('shirtSilhoetteOver'));
        shirtbutton.on('pointerout', () => shirtbutton.setTexture('shirtSilhoette'));
        utilities.scaletoIconSize(shirtbutton);

        const shoebutton = this.add.sprite(90 + game.config.width*0.24,100,"shoeSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(shoeGroup));
        shoebutton.on('pointerover', () => shoebutton.setTexture('shoeSilhoetteOver'));
        shoebutton.on('pointerout', () => shoebutton.setTexture('shoeSilhoette'));
        utilities.scaletoIconSize(shoebutton);  

        const pantsbutton = this.add.sprite(90 + game.config.width*0.16,100,"pantsSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => displayLayer(pantsGroup));
        pantsbutton.on('pointerover', () => pantsbutton.setTexture('pantsSilhoetteOver'));
        pantsbutton.on('pointerout', () => pantsbutton.setTexture('pantsSilhoette'));
        utilities.scaletoIconSize(pantsbutton);  

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
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            utilities.normalizeClothing(gameObject);
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
                utilities.scaletoIconSize(sprite);
                sprite.x=sprite.getData('origin').x;
                sprite.y=sprite.getData('origin').y;
                sprite.ignoreDestroy = false;
        }
        

    }
    update(){
        
    }

    
    
}



export { MyGame };