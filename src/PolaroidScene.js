import Phaser from "phaser";
import * as utilities from "./utilities.js";

var cat;
var polaroid;
var frame;
var bg;
var endingPrompt;
var pictureCreated;
var r2;

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
        //Get correct prompt and put the name of the cat
        function getPromptWithName(prompt,name) {
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", name),
                introduction: prompt.introduction.replaceAll("{{full_name}}", name),
                outcome: prompt.outcome.replaceAll("{{full_name}}", name),
                backgroundType : prompt.backgroundType,
                index : prompt.promptIndex
            };
        }
        this.newPrompt = getPromptWithName(this.game.cat.generatedPrompt,this.game.cat.name);
        console.log(this.newPrompt.backgroundType);
        //Set up for art assets in scene
        this.initialSpriteSetup(self);
        var printSound = this.sound.add('printSound',{ loop: false });
        var shutterSound = this.sound.add('shutterSound',{ loop: false });
        //Set up camera button
        var cameraButton = this.add.sprite(400,300,'cameraAnim')
        .setDepth(4)
        .setInteractive({ useHandCursor: true });
        var cameraAnim = this.anims.create({
            key: 'cameraflashing',
            frames: this.anims.generateFrameNumbers('cameraAnim',{ start: 0, end: 4 }),
            frameRate: 5
        });
        cameraButton.on('pointerover', () => cameraButton.play({key:'cameraflashing',repeat:-1}));
        cameraButton.on('pointerout', () => cameraButton.stop().setFrame(0));
        this.cameras.main.setBackgroundColor('#63d9f0');
        //"Takes photo" when clicked on camera button and produces a polaroid
        cameraButton.on('pointerdown', function () {
            cameraButton.setVisible(false);
            if (pictureCreated == false){
                pictureCreated = true;
                utilities.playSoundEffect(shutterSound);
                this.cameras.main.flash(1000);
                creategalleryButton()
                this.setUpPolaroid();
                this.setUpTween(cat,polaroid,self);
                gameReady=true;
                let shoe = cat.shoePosition.currentClothing;
                let hat = cat.hatPosition.currentClothing;
                let shirt = cat.shirtPosition.currentClothing;
                let pants = cat.pantsPosition.currentClothing;            
                var polaroidCount = localStorage.getItem('polaroidCount');
                console.log(polaroidCount);
                //Find the correct local storage index and save clothing keys
                if(polaroidCount == null){
                    localStorage.setItem('polaroidCount',"1")
                    let index = 1;
                    localStorage.setItem('cat'+index,cat.texture.key);
                    localStorage.setItem('catName'+index,cat.name);
                    localStorage.setItem('polaroidBG'+index,polaroid.getAt(1).texture.key);
                    localStorage.setItem('promptIndex'+index,self.newPrompt.index);
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
                    localStorage.setItem('polaroidBG'+index,polaroid.getAt(1).texture.key);
                    saveClothing("hat"+index,hat);
                    saveClothing("shirt"+index,shirt);
                    saveClothing("pants"+index,pants);
                    saveClothing("shoes"+index,shoe);
                }
            }
        }, this);
        //Listener for when camera flash effect is done
        this.cameras.main.on('cameraflashcomplete', function () {
            utilities.playSoundEffect(printSound);
        });
        //Save the texture key of current clothing on local storage
        function saveClothing(saveKey,clothing){
            if(clothing!=null){
                localStorage.setItem(saveKey,clothing.texture.key);
            }
            else{
                localStorage.setItem(saveKey,"empty");
            }
        }
        //Creates a button to go to the gallery scene
        function creategalleryButton(){
            var galleryButton= new utilities.genericButton({scene:self,key:'buttonFrame',x:400,y:580,text:"Go to gallery",displayWidth: 300, displayHeight:36});
            galleryButton.on('pointerdown', function(pointer, localX, localY, event){
                self.scene.start('scene_Gallery');
            },self );
            galleryButton.setDepth(5);
            galleryButton.currentText.setDepth(6);
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
        r2 = currentScene.add.rectangle(0, 0, 500, 500, 0x000000);

        //Add appropriate background connected to prompt
        if(currentScene.newPrompt.backgroundType == "town"){
            bg = currentScene.add.sprite(0,0,'scenery1',);
        }
        if(currentScene.newPrompt.backgroundType == "beach"){
            bg = currentScene.add.sprite(0,0,'scenery2',);
        }
        if(currentScene.newPrompt.backgroundType == "nature"){
            bg = currentScene.add.sprite(0,0,'scenery3',);
        }
        if(currentScene.newPrompt.backgroundType == "restaurant"){
            bg = currentScene.add.sprite(0,0,'scenery4',);
        }       
        //Check for any undefined clothing sprites
        if (cat.hatPosition.currentClothing != null && cat.hatPosition.currentClothing.active==true) {
            currentScene.add.existing(cat.hatPosition.currentClothing);
            cat.hatPosition.currentClothing.setVisible(false);
            let pipelineInstance = currentScene.plugins.get('rexoutlinepipelineplugin').get(cat.hatPosition.currentClothing)[0];
            if(pipelineInstance != null){
                currentScene.plugins.get('rexoutlinepipelineplugin').remove(cat.hatPosition.currentClothing);
            }
        }
        if (cat.shoePosition.currentClothing != null&& cat.shoePosition.currentClothing.active==true) {
            currentScene.add.existing(cat.shoePosition.currentClothing);
            cat.shoePosition.currentClothing.setVisible(false);
            let pipelineInstance = currentScene.plugins.get('rexoutlinepipelineplugin').get(cat.shoePosition.currentClothing)[0];
            if(pipelineInstance != null){
                currentScene.plugins.get('rexoutlinepipelineplugin').remove(cat.shoePosition.currentClothing);
            }
        }
        if (cat.pantsPosition.currentClothing != null&& cat.pantsPosition.currentClothing.active==true) {
            currentScene.add.existing(cat.pantsPosition.currentClothing);
            cat.pantsPosition.currentClothing.setVisible(false);
            let pipelineInstance = currentScene.plugins.get('rexoutlinepipelineplugin').get(cat.pantsPosition.currentClothing)[0];
            if(pipelineInstance != null){
                currentScene.plugins.get('rexoutlinepipelineplugin').remove(cat.pantsPosition.currentClothing);
            }
        }
        if (cat.shirtPosition.currentClothing != null&& cat.shirtPosition.currentClothing.active==true) {
            currentScene.add.existing(cat.shirtPosition.currentClothing);
            cat.shirtPosition.currentClothing.setVisible(false);
            let pipelineInstance = currentScene.plugins.get('rexoutlinepipelineplugin').get(cat.shirtPosition.currentClothing)[0];
            if(pipelineInstance != null){
                currentScene.plugins.get('rexoutlinepipelineplugin').remove(cat.shirtPosition.currentClothing);
            }
        }
        else{
            console.log("Sprite undefined")
        }
        endingPrompt = currentScene.add.text(0,0,currentScene.newPrompt.outcome,{
			fontFamily: 'Permanent Marker',
			fontSize: '18px',
			color: '#000000',
			fontStyle: 'italic',
			resolution: 1,
            wordWrap : {width : 500, useAdvancedWrap : true},
		});
        //Set all invisible until polaroid is produced on screen
        cat.setVisible(false);
        frame.setVisible(false);
        bg.setVisible(false);
        r2.setVisible(false);
        endingPrompt.setVisible(false);
    }

    setUpPolaroid(){
        //Set up cat
        cat.setVisible(true);
        cat.setDepth(3);
        cat.setScale(3.5);
        //Set up background
        bg.setVisible(true);
        bg.setScale(0.6);
        bg.setDepth(-1);
        r2.setDepth(-2);
        r2.setVisible(true);
        //Set up polaroid frame
        frame.setVisible(true);
        frame.setScale(20);
        frame.setDepth(1);
        //Set up written prompt
        endingPrompt.setVisible(true);
        //Add all contents of polaroid into container
        polaroid = this.add.container(400,-1000,[ r2,bg,frame,cat,endingPrompt]);
        //Set up animations for clothing items
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
        //Adjusts sprite's position relative to the container
        bg.y=bg.y-50;
        endingPrompt.y=endingPrompt.y+50;
        endingPrompt.x= frame.x-240;
        endingPrompt.y= frame.y +165;
        cat.x=cat.x-25;
        //Helper function to reduce code duplication
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
    }
}


export { PolaroidScene };