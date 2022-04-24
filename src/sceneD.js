import Phaser from 'phaser';

import { game } from './index.js';
import * as utilities from "./utilities.js";
var cat;
var closet;
var blankSprite;
var clothingTypes;



class sceneD extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneD_dressUp' });
    }
    

    preload ()
    {
    }
      
    create ()
    {

        console.log("sceneB this.game.cat: ");
        console.log(this.game.cat);
        var camera = this.cameras.main;

        var self = this;

        //sound effects
        var clothingPickup1 = this.sound.add('clothingPickup1',{ loop: false });
        var clothingRussles = new Array();
        clothingRussles[0] = this.sound.add('clothingRussle2',{ loop: false });
        clothingRussles[1] = this.sound.add('clothingRussle3',{ loop: false });
        clothingRussles[2] = this.sound.add('clothingRussle4',{ loop: false });
        clothingRussles[3] = this.sound.add('clothingRussle5',{ loop: false });

        //Old art
        var bg = this.matter.add.image(400,300,'backgroundnew');
        bg.setStatic(true);
        var postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');

        var mButton= new utilities.musicButton({scene:self,onKey:'musicOnButton',offKey:'musicOffButton' });

        mButton.on('pointerdown', function () {
            toggleSound(this.game.bgMusic)
        },self);

        function toggleSound(givenSound){
            if (givenSound.isPlaying){
                givenSound.stop();
            }
            else{
                givenSound.play();
            }
        }



        this.matter.world.setGravity(0,0);
        closet = this.matter.add.sprite(180,230,'closet');
        closet.setStatic(true);
        

        cat = setupCat();
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

        utilities.addAllClothing(this);

        //Set up placeholder transparent sprite for closet
        blankSprite = this.matter.add.sprite(600,300,'hat1');
        blankSprite.setVisible(false);
        blankSprite.setSensor(true);
        blankSprite.setInteractive(false);


        //set up sprite properties of cat
        function setupCat(){
            cat = self.add.existing(self.game.cat);
            cat.x=500;
            cat.y=350;
            cat.setDepth(0);
            cat.setVisible(true);
            cat.setData('catLayer',self.add.layer());
            cat.setScale(6.7);
            cat.boundingBox = new Phaser.Geom.Rectangle(cat.x - 50,cat.y-100,100,200);
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
                width: 4,
                height: 4,
                cellWidth: 60,
                cellHeight: 60,
                x: (closet.x-closet.displayWidth)+80,
                y: closet.y-(closet.displayHeight/2)
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
                //console.log(gameObject.scene.scene.key);
                gameObject.on('pointerover', function () {
                    if(gameObject.scene.scene.key=="sceneD_dressUp"){
                        //Inner highlight shader
                        postFxPlugin.add(gameObject, {
                            thickness: 3,
                            outlineColor: 0xffb4db
                        });

                        //Outer highlight shader
                        postFxPlugin.add(gameObject, {
                            thickness: 5,
                            outlineColor: 0x4e1a69
                        });
                    }
                })
        
                gameObject.on('pointerout', function () {
                    if(gameObject.scene.scene.key=="sceneD_dressUp"){
                        postFxPlugin.remove(gameObject);
                        
                    }
                    // Remove the outline shader effect
                    //postFxPlugin.remove(gameObject);
                })
            });
    
        }
        
        //only show layer after button is pressed
        clearLayer(shoeGroup)
        clearLayer(shirtGroup)
        clearLayer(hatGroup)
        clearLayer(pantsGroup)

        var layers = [shoeGroup,hatGroup,shirtGroup,pantsGroup];

    

        //button for switching between categories

        const hatbutton = this.add.sprite(closet.x- (closet.displayWidth/2) +60 ,closet.y- (closet.displayHeight/2) + 54,"hatSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => handleClosetButtonPress(hatGroup));
        hatbutton.on('pointerover', () => hatbutton.setTexture('hatSilhoetteOver'));
        hatbutton.on('pointerout', () => hatbutton.setTexture('hatSilhoette'));
        utilities.scaletoIconSize(hatbutton);
        
        const shirtbutton = this.add.sprite(hatbutton.x+60,hatbutton.y,"shirtSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => handleClosetButtonPress(shirtGroup));
        shirtbutton.on('pointerover', () => shirtbutton.setTexture('shirtSilhoetteOver'));
        shirtbutton.on('pointerout', () => shirtbutton.setTexture('shirtSilhoette'));
        utilities.scaletoIconSize(shirtbutton);

        const shoebutton = this.add.sprite(shirtbutton.x+60 ,hatbutton.y,"shoeSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => handleClosetButtonPress(shoeGroup));
        shoebutton.on('pointerover', () => shoebutton.setTexture('shoeSilhoetteOver'));
        shoebutton.on('pointerout', () => shoebutton.setTexture('shoeSilhoette'));
        utilities.scaletoIconSize(shoebutton);  

        const pantsbutton = this.add.sprite(shoebutton.x+60, hatbutton.y,"pantsSilhoette")
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => handleClosetButtonPress(pantsGroup));
        pantsbutton.on('pointerover', () => pantsbutton.setTexture('pantsSilhoetteOver'));
        pantsbutton.on('pointerout', () => pantsbutton.setTexture('pantsSilhoette'));
        utilities.scaletoIconSize(pantsbutton);  

        let continueButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:cat.x - 150,y:cat.y - 330,text:"Continue"});
        continueButton.on('pointerdown', function(pointer, localX, localY, event){
            camera.fadeOut(1000);  
            this.game.cat = cat;  
        },self );
        camera.on('camerafadeoutcomplete', function(){
            startNextScene();

        },self);

        function startNextScene(){
            self.scene.start('sceneE_photograph');
        }

        //displays the layer and also plays the sound
        function handleClosetButtonPress(chosenLayer){

            displayLayer(chosenLayer);
            utilities.playSoundEffect(global.buttonClickSound1)
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


        /*
        overlap check and snap. this now uses a custom bounding box that I attatched to the 
        cat in setupCat(). this seems to fix a lot of the bugs related to dragging back to closet
        and clothes snapping. you can adjust the bounding box in the setUpCat() function.
        */
        function snapToCat(sprite, pointer) {
            if(Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), cat.boundingBox)){
                sprite.getData('group').replace(sprite,blankSprite );
                cat.getData('catLayer').add(sprite);
                
                // function to make sure that same article of clothing can't be placed on a cat twice
                function handleClothingPlacement(clothingPosition) {

                    // multiple clothes of same type cant be on cat
                    if (clothingPosition.currentClothing != null && clothingPosition.currentClothing != sprite) { 
                        returnSpritetoCloset(clothingPosition.currentClothing);
                    } 

                    //play clothing russle sound
                    utilities.playSoundEffect(Phaser.Utils.Array.GetRandom(clothingRussles));

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
                /*
                set the cat's clothing at this position to null to avoid crashing the game
                in the polaroid scene, if the sprite was on the cat
                */
                switch (sprite.clothingType){
                    case clothingTypes.hat:
                        if (cat.hatPosition.currentClothing === sprite){
                            cat.hatPosition.currentClothing = null;
                        }
                        break;
                    case clothingTypes.shoe:
                        if (cat.shoePosition.currentClothing === sprite){
                            cat.shoePosition.currentClothing = null;
                        }
                        break;
                    case clothingTypes.shirt:
                        if (cat.shirtPosition.currentClothing === sprite){
                            cat.shirtPosition.currentClothing = null;
                        }
                        break;   
                    case clothingTypes.pants:
                        if (cat.pantsPosition.currentClothing === sprite){
                            cat.pantsPosition.currentClothing = null;
                        }
                        break;                                                 
                }
                returnSpritetoCloset(sprite);
                
            }
        }

        function returnSpritetoCloset(sprite){



            
            sprite.getData('group').addAt(sprite, sprite.getData('index'));
                utilities.scaletoIconSize(sprite);
                sprite.x=sprite.getData('origin').x;
                sprite.y=sprite.getData('origin').y;
                sprite.ignoreDestroy = false;
                displayLayer(sprite.getData('group'));
        }
        

    }
    update(){
        
    }

    
    
}



export { sceneD };