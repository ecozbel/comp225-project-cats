//mport * as imports from "./importHelperD.js"
//import {leftButton} from './importHelperA';
import * as utilities from "./utilities.js";
import Phaser, { Game } from 'phaser';
var hatKey;
var shirtKey;
var shoesKey;
var pantsKey;
var cat,hat,shoes,pants,shirt;


class sceneGallery extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'scene_Gallery' });
        
        
    }
    preload ()
    {

        // this.load.image('polaroid', imports.polaroidImg);
        // this.load.image('scenery1',imports.scenery1);

        // this.load.image('hat2',imports.hat1img);
        // this.load.image('shirt2',imports.shirt1img);
        // this.load.image('shoe2',imports.shoe1img);
        // this.load.image('pants2',imports.pants1);

        this.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
        

    }
    create(){
        var self = this;
        // var cat,hat,shoes,pants,shirt;

        //Get the polaroid count from local data manager (necessary to know how many polaroids to construct)
        var polaroidCount = localStorage.getItem('polaroidCount');
        var photoKey = "photo"+polaroidCount;
        //constructPolaroids();
        // if(polaroidCount!=null){
        //     var intCount = parseInt(polaroidCount)
        //     for(var i=0;i<polaroidCount-1;i++){
        //         addPolaroid(photoKey)
        //     }
        var iBG = this.add.image(400,300,'galleryBG');
        iBG.setDepth(-1);
        //iBG.setScale(1.5);
        
        var tempBG = this.add.rectangle(0, 0, 300, 300, 0x000000);
        tempBG.setVisible(false);
        //var catKey = "catanimated3-lime";
        //console.log(localStorage.getItem('cat7'));
        var frame = this.add.sprite(0,0,'polaroid');
        frame.setScale(12);
        frame.setVisible(false);
        var polaroids = [];
        if(polaroidCount!=null){
            
            for(var i=1;i<11;i++){
                var catKey = localStorage.getItem('cat'+i)
                if(catKey != null){
                    cat = self.add.sprite(0,0,catKey).setScale(3)
                    cat.setVisible(false);

                    hatKey = localStorage.getItem('hat'+i);
                    //console.log(hatKey);
                    // if(hatKey != 'empty'&&hatKey !=null){
                    //     hat = self.add.sprite(0,0,hatKey).setScale(0.3)
                    //     hat.setVisible(false);
                    // }

                    shirtKey = localStorage.getItem('shirt'+i);
                    //console.log(hatKey);
                    // if(shirtKey != 'empty'&&shirtKey !=null){
                    //     shirt = self.add.sprite(0,0,shirtKey).setScale(0.3)
                    //     shirt.setVisible(false);
                    // }
                    pantsKey = localStorage.getItem('pants'+i);
                    //console.log(hatKey);
                    // if(pantsKey != 'empty'&&pantsKey !=null){
                    //     pants = self.add.sprite(0,0,pantsKey).setScale(0.3)
                    //     pants.setVisible(false);
                    // }
                    shoesKey = localStorage.getItem('shoes'+i);
                    //console.log(hatKey);
                    // if(shoesKey != 'empty'&&shoesKey !=null){
                    //     shoes = self.add.sprite(0,0,shoesKey).setScale(0.3)
                    //     shoes.setVisible(false);
                    // }
                    //console.log(hatKey)
                    var chosenHat = addClothing(hatKey,hat,self)
                    var chosenShirt = addClothing(shirtKey,shirt,self)
                    var chosenPants= addClothing(pantsKey,pants,self)
                    var chosenShoes = addClothing(shoesKey,shoes,self)
                    var bgKey = localStorage.getItem('polaroidBG'+i);

                    var bg = self.add.sprite(0,0,bgKey).setScale(0.4)
                    bg.setVisible(false);

                    addPolaroid('photo'+i,chosenHat,chosenShirt,chosenPants,chosenShoes,bg);

                    let card = self.add.rexPerspectiveCard({
                        front: { key: 'photo'+i },
                        back: { key: 'polaroidBack'},
                        flip: false
                    })
                    card.setScale(0.5);
                    //polaroids.push(card)
                    card.name = localStorage.getItem('catName'+i)
                    polaroids.push(card)
                }
                else{
                    let card = self.add.rexPerspectiveCard({
                        front: { key: 'itemFrame' },
                        back: { key: 'polaroidBack'},
                        flip: false
                    })
                    card.setScale(0.5);
                    //polaroids.push(card)
                    card.name = localStorage.getItem('catName'+i)
                    //polaroids.push(card)
                    // card.setInteractive(true);
                    // card.on('pointerover', () => card.setScale(0.8))
                    // card.on('pointerout', () => card.setScale(0.5))
                    polaroids.push(card)

                }

            }
            var carousel = this.add.rexPerspectiveCarousel({
                x: 400, y: 280,
    
                faces: polaroids,
                faceSpace: 50,
                faceWidth: 400,
                backWidth: 300
            })

            //var invisRect = this.add.rectangle(400,280,400,400)
            var r1 = this.add.graphics();
            r1.setInteractive(polaroids[carousel.face].getBounds(), Phaser.Geom.Rectangle.Contains);
            //invisRect.setVisible(false);
            r1.on('pointerover', () => polaroids[carousel.face].setScale(1))
            r1.on('pointerout', () => polaroids[carousel.face].setScale(0.5))
    
            this.input.on('pointermove', function (pointer) {
    
                if (!pointer.isDown) {
                    return;
                }
    
                //carousel.rotationY += pointer.velocity.x * (1 / 800);
                // carousel.roll.toNext(300);
                // console.log(carousel.face);
            });
            
        }
        

        function addClothing(key,clothing,currentScene){
            // console.log(clothing)
            if(key != 'empty'&&key !=null){
                clothing = currentScene.add.sprite(0,0,key).setScale(0.3)
                clothing.setVisible(false);
                return clothing;
                //console.log(clothing)
                //return(clothing)
            }
            if(key == 'empty'|| key==null){
                clothing = null;
                return clothing;
                //clothing.setVisible(false);
            }
        }


        
        //Move functions to create polaroid here, set i<polaroidCount 
        // for (var i = 0; i < 3; i++) {
        //     polaroids.push(constructPolaroid())
        // }
        //addPolaroid();
        function addPolaroid(key,givenHat,givenShirt,givenPants,givenShoes,bg) {
            let polaroid = self.add.renderTexture(800, 600, 800, 600);
            
            polaroid.setVisible(false);
            polaroid.setOrigin(0.5)
            //drawPolaroid(polaroid,key);


            


           //draw black square
           var r2 = self.add.rectangle(0, 0, 300, 300, 0x000000);
           r2.setVisible(false);
           r2.setDepth(-1);
            //r2.setStrokeStyle(4, 0x000000);
           
           polaroid.draw(r2, 400,300 );
           polaroid.draw(bg, 400,300 );
           polaroid.draw(frame, 400,300 );

           //draw the background
     
            // draw the cat
            polaroid.draw(cat, 400,300 );
     
            // draw the clothes
            
            if(givenShoes!=null){
                polaroid.draw(givenShoes, 406, 375);
            }
            if(givenPants!=null){
                polaroid.draw(givenPants, 407, 355);
            }
            if(givenShirt!=null){
                polaroid.draw(givenShirt, 403, 312);
            }
            if(givenHat!=null){
                polaroid.draw(givenHat, 405, 215);
            }
            //polaroid.draw(hat, 400, 130);
            //console.log(self.shirt)
            //console.log(hat)
            polaroid.saveTexture(key);

        }
        
        function drawPolaroid(polaroid,key){
 
           //draw the polaroid frame
           polaroid.draw(tempBG, 400,300 );


           //draw black square
           polaroid.draw(frame, 400,300 );

           //draw the background
     
            // draw the cat
            polaroid.draw(cat, 400,300 );
     
            // draw the clothes
            
            if(self.shoes!=null){
                polaroid.draw(shoes, 406, 375);
            }
            if(self.pants!=null){
                polaroid.draw(pants, 407, 355);
            }
            if(self.shirt!=null){
                polaroid.draw(shirt, 403, 312);
            }
            if(self.hat!=null){
                polaroid.draw(hat, 405, 215);
            }
            //polaroid.draw(hat, 400, 130);
            console.log(shirt)
            //console.log(hat)
            polaroid.saveTexture(key);
            
        }


        function getPromptWithName(prompt,name) {
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", name),
                introduction: prompt.introduction.replaceAll("{{full_name}}", name),
                outcome: prompt.outcome.replaceAll("{{full_name}}", name)
            };
        }

        function setUpClothes(currentScene){
    
            if (hatKey != null) {
                hat = currentScene.add.sprite(0,0,hatKey);
            }
            if (shoeKey != null) {
                shoe = currentScene.add.sprite(0,20,shoeKey);
            }
            if (shirtKey != null) {
                shirt = currentScene.add.sprite(0,-10,shirtKey);
            }
            if (pantsKey != null) {
                pants = currentScene.add.sprite(0,0,pantsKey);
            }
        }
        // console.log(carousel.face);

        var backButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:80,y:50,text:"Back"});
        backButton.setDisplaySize(100,54);
        backButton.on('pointerdown', function(pointer, localX, localY, event){
            startPreviousScene();   
        },self );
        function startPreviousScene(){
            self.scene.start('sceneA_mainMenu');
        }
        const leftButton = this.add.image(80, 300, 'leftButton',0).setInteractive().setDepth(4);
        leftButton.on('pointerover', () => leftButton.setFrame(1))
        leftButton.on('pointerout', () => leftButton.setFrame(0))
        leftButton.on('pointerdown', function(pointer, localX, localY, event){
            carousel.roll.toLeft(300);  
            console.log(carousel.face); 
            let catName = polaroids[carousel.face].name
            infoText.setText('Cat name: ' +catName);
        },self );
        

        const rightButton = this.add.image(720, 300, 'rightButton',0).setInteractive().setDepth(4);
        rightButton.on('pointerover', () => rightButton.setFrame(1))
        rightButton.on('pointerout', () => rightButton.setFrame(0))
        rightButton.on('pointerdown', function(pointer, localX, localY, event){
            carousel.roll.toRight(300); 
            console.log(carousel.face);
            let catName = polaroids[carousel.face].name
            infoText.setText('Cat name: ' +catName);
        },self );

        var firstName = polaroids[carousel.face].name
        const infoText = this.add.text(250, 450, 'Cat name: ' + firstName).setDepth(-1);
        
        
    
           
    }
    update(){
        
    }

}
export {sceneGallery};
