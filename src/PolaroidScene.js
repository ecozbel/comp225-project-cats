import Phaser from "phaser";
//import * as imports from "./importHelperE.js"
import * as utilities from "./utilities.js";
//import * as utilities from "./utilities.js";


var cat;
var polaroid;
var frame;
var bg;
var endingPrompt;
var pictureCreated;

var gameReady=false;
class PolaroidScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'PolaroidScene' });
    }

    preload ()
    {

    }

    create ()
    {
        pictureCreated = false;

        var self = this;
        this.initialSpriteSetup(self);

        var printSound = this.sound.add('printSound',{ loop: false });

        var shutterSound = this.sound.add('shutterSound',{ loop: false });




        var photoInfo = this.add.text(100,100,"Click for photo!")

        this.cameras.main.setBackgroundColor('000000');

        //"Takes photo" when clicked on screen
        this.input.on('pointerdown', function () {
            if (pictureCreated == false){
                pictureCreated = true;
                shutterSound.play();
                this.cameras.main.flash(1000);
                creategalleryButton()
                //ADD camera flash sound here
                this.setUpPolaroid();
                //this.setUpCat(400,-1000);
                this.setUpTween(cat,polaroid,self);
                gameReady=true;
                console.log(cat.texture);
                

                let shoe = cat.shoePosition.currentClothing;
                let hat = cat.hatPosition.currentClothing;
                let shirt = cat.shirtPosition.currentClothing;
                let pants = cat.pantsPosition.currentClothing;

            
                var polaroidCount = localStorage.getItem('polaroidCount');
                console.log(polaroidCount);

                if(polaroidCount == null){
                    localStorage.setItem('polaroidCount',"1")
                    let index = 1;
                    localStorage.setItem('cat'+index,cat.texture.key);
                    localStorage.setItem('catName'+index,cat.name);
                    localStorage.setItem('polaroidBG'+index,cat.name,polaroid.first.texture.key);
                    saveClothing("hat"+index,hat);
                    saveClothing("shirt"+index,shirt);
                    saveClothing("pants"+index,pants);
                    saveClothing("shoes"+index,shoe);

                }
                else{
                    let index = parseInt(polaroidCount)
                    if (index>10){
                        index = 1;
                    }
                    let newCount = index+1;
                    localStorage.setItem('polaroidCount',newCount)
                    localStorage.setItem('cat'+index,cat.texture.key);
                    localStorage.setItem('catName'+index,cat.name);
                    localStorage.setItem('polaroidBG'+index,polaroid.first.texture.key);
                    saveClothing("hat"+index,hat);
                    saveClothing("shirt"+index,shirt);
                    saveClothing("pants"+index,pants);
                    saveClothing("shoes"+index,shoe);
                    

                }

            }


        }, this);

        this.events.once('slidePolaroid', function (){

            console.log("Sliding polaroid");
        },this);


        //Listener for when camera flash effect is done
        this.cameras.main.on('cameraflashcomplete', function () {
            //Maybe could add camera sound here too
            printSound.play();
            //Maybe polaroid sliding out of camera sound effect


        });

        function saveClothing(saveKey,clothing){

            if(clothing!=null){
                localStorage.setItem(saveKey,clothing.texture.key);
            }
            else{
                localStorage.setItem(saveKey,"empty");
            }

        }
        function creategalleryButton(){
            var galleryButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:400,y:580,text:"Go to gallery"});
            galleryButton.on('pointerdown', function(pointer, localX, localY, event){
                self.scene.start('scene_Gallery');
            },self );
        }
    

    }
    update(){
        if (gameReady){
            this.events.emit('slidePolaroid');
            gameReady = false;
        }
    }

    initialSpriteSetup(currentScene){
        cat = currentScene.add.existing(currentScene.game.cat);
        cat.x=0;
        cat.y=0;
        frame = currentScene.add.sprite(0,0,'polaroid');
        bg = currentScene.add.sprite(0,0,'scenery1',);

        if (cat.hatPosition.currentClothing != null && cat.hatPosition.currentClothing.active==true) {
            console.log(cat.hatPosition.currentClothing);
            currentScene.add.existing(cat.hatPosition.currentClothing);
            cat.hatPosition.currentClothing.setVisible(false);
        }
        if (cat.shoePosition.currentClothing != null&& cat.shoePosition.currentClothing.active==true) {
            console.log(cat.shoePosition.currentClothing);
            currentScene.add.existing(cat.shoePosition.currentClothing);
            cat.shoePosition.currentClothing.setVisible(false);
        }
        if (cat.pantsPosition.currentClothing != null&& cat.pantsPosition.currentClothing.active==true) {
            console.log(cat.pantsPosition.currentClothing);
            currentScene.add.existing(cat.pantsPosition.currentClothing);
            cat.pantsPosition.currentClothing.setVisible(false);
        }
        if (cat.shirtPosition.currentClothing != null&& cat.shirtPosition.currentClothing.active==true) {
            console.log(cat.shirtPosition.currentClothing);
            currentScene.add.existing(cat.shirtPosition.currentClothing);
            cat.shirtPosition.currentClothing.setVisible(false);
        }
        else{
            console.log("Sprite undefined")
        }



        console.log("cat: ");
        console.log(cat);

        

        function getPromptWithName(prompt,name) {
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", name),
                introduction: prompt.introduction.replaceAll("{{full_name}}", name),
                outcome: prompt.outcome.replaceAll("{{full_name}}", name)
            };
        }

        var newPrompt = getPromptWithName(this.game.cat.generatedPrompt,this.game.cat.name);
        
        console.log("after prompt generated")//for debugging

        endingPrompt = currentScene.add.text(0,0,newPrompt.outcome,{
			fontFamily: 'Permanent Marker',
			fontSize: '18px',
			color: '#000000',
			fontStyle: 'italic',
			resolution: 1,
            wordWrap : {width : 500, useAdvancedWrap : true},
		});

        cat.setVisible(false);
        frame.setVisible(false);
        bg.setVisible(false);
        endingPrompt.setVisible(false);

    }

    setUpPolaroid(){
        cat.setVisible(true);
        cat.setDepth(3);
        cat.setScale(3.5);

        bg.setVisible(true);
        bg.setScale(0.6);
        bg.setDepth(-1);

        frame.setVisible(true);
        frame.setScale(20);
        frame.setDepth(1);

        endingPrompt.setVisible(true);
        endingPrompt.set
        //add all contents of polaroid into container
        polaroid = this.add.container(400,-1000,[ bg,frame,cat,endingPrompt]);

        console.log("before handleClothingItemPolaroidSLide:");//debugging
        if (cat.shoePosition.currentClothing != null) {
            
            handleClothingItemPolaroidSlide(cat.shoePosition.currentClothing,-21.5,cat.displayHeight/2.61,1,cat);
        }   
        if (cat.pantsPosition.currentClothing != null) {
            handleClothingItemPolaroidSlide(cat.pantsPosition.currentClothing,-20,cat.displayHeight/3.39,2,cat);
        } 
        if (cat.shirtPosition.currentClothing != null) {
            handleClothingItemPolaroidSlide(cat.shirtPosition.currentClothing,-20,cat.displayHeight/12,3,cat);
        }
        if (cat.hatPosition.currentClothing != null) {
            handleClothingItemPolaroidSlide(cat.hatPosition.currentClothing,-20,-cat.displayHeight/2.4,4,cat);
        }


        console.log("cat boundingBox:");//debugging
        console.log(cat.boundingBox);
        //adjusts sprite's position relative to the container
        bg.y=bg.y-50;
        endingPrompt.y=endingPrompt.y+50;
        endingPrompt.x= frame.x-240;
        endingPrompt.y= frame.y +165;
        cat.x=cat.x-25;


        //helper function to reduce code duplication
        function handleClothingItemPolaroidSlide(clothing,xOffset,yOffset,depth,cat){
            if (clothing != null) {
                
                utilities.scaleToPolaroidSize(clothing);
                clothing.setVisible(true);
                polaroid.add(clothing);
                clothing.x =  cat.x+xOffset;
                clothing.y = cat.y+yOffset;
                clothing.setDepth(depth);//it is function that's causing the crash. don't know why.
            }
        }

    }
    

    setUpTween(cat,polaroid,gameScene){
        gameScene.polaroidSlideOver = gameScene.tweens.add({
            targets: polaroid,
            x: 400,
            y: 280,
            duration: 3900,
            yoyo: false,
            delay: 0
        });
        console.log("built tweens");

        const restartButton = this.add.image(polaroid.x, polaroid.y +polaroid.displayHeight/1.75 , 'itemFrame')
            .setDisplaySize(300, 50)
            .setDepth(4)
            .setInteractive({ useHandCursor: true })
            //call function to pass on cat and prompt selection to next scene here
            .on('pointerdown', function(pointer, localX, localY, event){
                this.scene.start('scene')
          
            },self );

        
            this.add.text(restartButton.x, restartButton.y, 'Restart',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2,align:'left'  })
                .setOrigin(0.5)
                .setDepth(4);
    }
    




}


export { PolaroidScene };