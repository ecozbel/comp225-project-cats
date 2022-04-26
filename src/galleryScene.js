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
        
    }
    create(){
        var self = this;
        // var cat,hat,shoes,pants,shirt;

        //Get the polaroid count from local data manager (necessary to know how many polaroids to construct)
        var polaroidCount = localStorage.getItem('polaroidCount');
        var photoKey = "photo"+polaroidCount;

        var iBG = this.add.image(400,300,'galleryBG');
        iBG.setDepth(-1);
        var tempBG = this.add.rectangle(0, 0, 300, 300, 0x000000);
        tempBG.setVisible(false);
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
                    shirtKey = localStorage.getItem('shirt'+i);
                    pantsKey = localStorage.getItem('pants'+i);
                    shoesKey = localStorage.getItem('shoes'+i);
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
                    card.name = localStorage.getItem('catName'+i)
                    polaroids.push(card)

                }

            }
        }
        if (polaroids.length !=0 && polaroidCount!=null){
            //Carousel (webGL only): a display for polaroids
            var carousel = this.add.rexPerspectiveCarousel({
                x: 400, y: 280,
                z:1,
                faces: polaroids,
                faceWidth: 400,
            })         
        }
        else{
            for(let i=0;i<10;i++){
                let emptyCard = self.add.rexPerspectiveCard({
                    front: { key: 'polaroidBack' },
                    back: { key: 'polaroidBack'},
                    flip: false
                })
                emptyCard.setScale(0.5);
                polaroids.push(emptyCard)
            }
                //Carousel (webGL only): a display for polaroids
            var carousel = this.add.rexPerspectiveCarousel({
                x: 400, y: 280,
                z:1,
                faces: polaroids,
                faceWidth: 400,
            })

        }
        //Invisible rectangle to act as hit area
        var r1 = this.add.graphics();
        r1.setInteractive(polaroids[carousel.face].getBounds(), Phaser.Geom.Rectangle.Contains);
        r1.on('pointerover', () => polaroids[carousel.face].setScale(1))
        r1.on('pointerout', () => polaroids[carousel.face].setScale(0.5))

        function addClothing(key,clothing,currentScene){
            if(key != 'empty'&&key !=null){
                clothing = currentScene.add.sprite(0,0,key).setScale(0.3)
                clothing.setVisible(false);
                return clothing;
            }
            if(key == 'empty'|| key==null){
                clothing = null;
                return clothing;
            }
        }
        function addPolaroid(key,givenHat,givenShirt,givenPants,givenShoes,bg) {
            let polaroid = self.add.renderTexture(800, 600, 800, 600);
            polaroid.setVisible(false);
            polaroid.setOrigin(0.5)

           //draw black square (frame background)
           var r2 = self.add.rectangle(0, 0, 300, 300, 0x000000);
           r2.setVisible(false);
           r2.setDepth(-1);
           //draw the background and frame elements
           polaroid.draw(r2, 400,300 );
           polaroid.draw(bg, 400,300 );
           polaroid.draw(frame, 400,300 );

            // draw the cat
            polaroid.draw(cat, 400,297 );
     
            // draw the clothes
            if(givenShoes!=null){
                polaroid.draw(givenShoes, 406, 372);
            }
            if(givenPants!=null){
                polaroid.draw(givenPants, 407, 352);
            }
            if(givenShirt!=null){
                polaroid.draw(givenShirt, 403, 310);
            }
            if(givenHat!=null){
                polaroid.draw(givenHat, 405, 217);
            }
            //Save as texture
            polaroid.saveTexture(key);

        }
        function getPromptWithName(prompt,name) {
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", name),
                introduction: prompt.introduction.replaceAll("{{full_name}}", name),
                outcome: prompt.outcome.replaceAll("{{full_name}}", name)
            };
        }
        //Put the clothes into the scene
        function setUpClothes(currentScene){
    
            if (hatKey != null) {
                hat = currentScene.add.sprite(0,10,hatKey);
            }
            if (shoeKey != null) {
                shoe = currentScene.add.sprite(0,20,shoeKey);
            }
            if (shirtKey != null) {
                shirt = currentScene.add.sprite(0,-9,shirtKey);
            }
            if (pantsKey != null) {
                pants = currentScene.add.sprite(0,0,pantsKey);
            }
        }
        //Button to back out to menu
        var backButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:80,y:50,text:"Back"});
        backButton.setDisplaySize(100,54);
        backButton.on('pointerdown', function(pointer, localX, localY, event){
            startPreviousScene();   
        },self );
        function startPreviousScene(){
            self.scene.start('sceneA_mainMenu');
        }
        //Button to go left on carousel
        const leftButton = this.add.image(80, 300, 'leftButton',0).setInteractive().setDepth(4);
        leftButton.on('pointerover', () => leftButton.setFrame(1))
        leftButton.on('pointerout', () => leftButton.setFrame(0))
        leftButton.on('pointerdown', function(pointer, localX, localY, event){
            carousel.roll.toLeft(300);  
            console.log(carousel.face); 
            let catName = polaroids[carousel.face].name
            if (catName !=null){
                infoText.setText('Cat name: ' +catName);
            }
            else{
                infoText.setText('Cat name: TBD - Play to create memories!');
            }
        },self );
        //Button to go right on carousel
        const rightButton = this.add.image(720, 300, 'rightButton',0).setInteractive().setDepth(4);
        rightButton.on('pointerover', () => rightButton.setFrame(1))
        rightButton.on('pointerout', () => rightButton.setFrame(0))
        rightButton.on('pointerdown', function(pointer, localX, localY, event){
            carousel.roll.toRight(300); 
            console.log(carousel.face);
            let catName = polaroids[carousel.face].name
            if (catName !=""){
                infoText.setText('Cat name: ' +catName);
            }  
            else{
                infoText.setText('Cat name: TBD - Play to create memories!');
            }
        },self );
        //Name to display at render
        var firstName = polaroids[carousel.face].name
        if (firstName !=""){
            var infoText = this.add.text(250, 450, 'Cat name: ' + firstName).setDepth(-1);
        }  
        else{
            var infoText = this.add.text(250, 450, 'Cat name: TBD - Play to create memories!').setDepth(-1);
        }        
        //Button to download current displayed polaroid as png
        var downloadButton = new utilities.genericButton({scene:self,key:'buttonFrame',x:250,y:550,text:"Download"}).setDepth(-1);
        downloadButton.on('pointerdown',function(){
            if(polaroids[carousel.face].name !=""){
                this.game.photoIndex = carousel.face+1;
                this.scene.start("downloadPhoto")
            }
            else{
                console.log("no photo there!")
            }
        },self );
           
    }
    update()
    {
    }

}
export {sceneGallery};
