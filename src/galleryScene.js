import * as imports from "./importHelperD.js"


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
        

    }
    create(){
        var self = this;

        //Get the polaroid count from local data manager (necessary to know how many polaroids to construct)
        var polaroidCount = localStorage.getItem('polaroidCount');
        var photoKey = "photo"+polaroidCount;
        //constructPolaroids();
        // if(polaroidCount!=null){
        //     var intCount = parseInt(polaroidCount)
        //     for(var i=0;i<polaroidCount-1;i++){
        //         addPolaroid(photoKey)
        //     }
        
        
        //var catKey = "catanimated3-lime";
        //console.log(localStorage.getItem('cat7'));
        var frame = this.add.sprite(0,0,'polaroid');
        frame.setScale(12);
        frame.setVisible(false);
        if(polaroidCount!=null){

            for(var i=1;i<polaroidCount+1;i++){
                var catKey = localStorage.getItem('cat'+i)
                cat = self.add.sprite(0,0,catKey).setScale(3)
                cat.setVisible(false);

                hatKey = localStorage.getItem('hat'+i);
                //console.log(hatKey);
                if(hatKey != 'empty'&&hatKey !=null){
                    hat = self.add.sprite(0,0,hatKey).setScale(0.3)
                    hat.setVisible(false);
                }

                shirtKey = localStorage.getItem('shirt'+i);
                //console.log(hatKey);
                if(shirtKey != 'empty'&&shirtKey !=null){
                    shirt = self.add.sprite(0,0,shirtKey).setScale(0.3)
                    shirt.setVisible(false);
                }
                pantsKey = localStorage.getItem('pants'+i);
                //console.log(hatKey);
                if(pantsKey != 'empty'&&pantsKey !=null){
                    pants = self.add.sprite(0,0,pantsKey).setScale(0.3)
                    pants.setVisible(false);
                }
                shoesKey = localStorage.getItem('shoes'+i);
                //console.log(hatKey);
                if(shoesKey != 'empty'&&shoesKey !=null){
                    shoes = self.add.sprite(0,0,shoesKey).setScale(0.3)
                    shoes.setVisible(false);
                }
                addPolaroid('photo'+i);
            }



        }
        


        var polaroids = [];
        //Move functions to create polaroid here, set i<polaroidCount 
        // for (var i = 0; i < 3; i++) {
        //     polaroids.push(constructPolaroid())
        // }
        //addPolaroid();
        function addPolaroid(key) {
            let polaroid = self.add.renderTexture(800, 600, 800, 600);
            
            polaroid.setVisible(false);
            polaroid.setOrigin(0.5)
            drawPolaroid(polaroid,key);

        }
        
        function drawPolaroid(polaroid,key){
 
           //draw the polaroid frame
            

           //draw black square
           polaroid.draw(frame, 400,300 );

           //draw the background
     
            // draw the cat
            polaroid.draw(cat, 400,300 );
     
            // draw the clothes
            
            if(shoes!=null){
                polaroid.draw(shoes, 406, 375);
            }
            if(pants!=null){
                polaroid.draw(pants, 407, 355);
            }
            if(shirt!=null){
                polaroid.draw(shirt, 403, 312);
            }
            if(hat!=null){
                polaroid.draw(hat, 405, 215);
            }
            //polaroid.draw(hat, 400, 130);
            //console.log(polaroid)
            //console.log(hat)
            polaroid.saveTexture(key);
            // draw the graphics inside the platform
            //polaroid.draw(self.borderGraphics);
        }
        var photo = this.add.sprite(400,300,'photo'+polaroidCount);
        photo.setVisible(true);

        var photo2 = this.add.sprite(150,300,'photo2');
        photo2.setVisible(true);
        // var carousel = this.add.rexPerspectiveCarousel({
        //     x: 400, y: 300,

        //     faces: polaroids,
        //     faceSpace: 60
        // })

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

        var backButton= new imports.genericButton({scene:self,key:'buttonFrame',x:80,y:50,text:"Back"});
        backButton.setDisplaySize(100,54);
        backButton.on('pointerdown', function(pointer, localX, localY, event){
            startPreviousScene();   
        },self );
        function startPreviousScene(){
            self.scene.start('sceneA_mainMenu');
        }

    
           
    }
    update(){
    }

}
export {sceneGallery};
