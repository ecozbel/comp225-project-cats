import * as imports from "./importHelperD.js"


var hatKey;
var shirtKey;
var shoeKey;
var pantsKey;

var cat,hat,shoe,pants,shirt;

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

        this.load.image('hat1',imports.hat1img);
        this.load.image('shirt1',imports.shirt1img);
        this.load.image('shoe1',imports.shoe1img);
        this.load.image('pants1',imports.pants1);
        

    }
    create(){
        var self = this;

        //Get the polaroid count from local data manager (necessary to know how many polaroids to construct)
        var polaroidCount = localStorage.getItem('polaroidCount');
        //constructPolaroid();

        //var catKey = "catanimated3-lime";


        if(polaroidCount!=null){
            var catKey = localStorage.getItem('cat1')
            cat = self.add.sprite(0,0,catKey).setScale(6)
            cat.setVisible(false);

            hatKey = localStorage.getItem('hat1');
            console.log(hatKey);
            if(hatKey != 'empty'&&hatKey !=null){
                hat = self.add.sprite(0,0,hatKey).setScale(0.8)
                hat.setVisible(false);
            }


        }
        // var catKey = localStorage.getItem('cat1')
        // cat = self.add.sprite(0,0,catKey).setScale(6)
        // cat.setVisible(false);

        // hatKey = "hat1";
        // hat = self.add.sprite(0,0,hatKey).setScale(0.8)
        // hat.setVisible(false);

        //setUpClothes(self);
        
        // function constructPolaroid(){
        //     //Get the chosen Cat's key from local data manager
        //     var catKey = "catanimated3-lime";


        //     this.borderGraphics = this.add.graphics();
        //     this.borderGraphics.setVisible(false);

        //     cat = self.add.sprite(0,0,catKey).setScale(4)
        //     cat.setVisible(false);

            
        //     //Get the name of the cat from local data manager
        //     var catName = 'Cat Name'
        //     //Get the related prompt's key
        //     var promptKey = "prompt1"

        //     //pull correct prompt using key
        //     var prompt = null;

        //     //getPromptWithName(prompt,catName)

        //     //Get the background type from prompt
        //     var bgKey = 'nature'

        //     //Get keys of clothes in the polaroid from local data manager
        //     //Set key as null if the spot is empty (maybe look for "empty" keyword?)
        //     hatKey = "hat1";
        //    // hat = self.add.sprite(0,0,shoeKey).setScale(10)
        //     shirtKey = "shirt1"
        //     shoeKey="shoe1"
        //     pantsKey="pants1"

        //     hat = self.add.sprite(0,0,shoeKey).setScale(10)
        //     //setUpClothes(self);
        //     //var polaroid = this.add.container(400,300,[ cat,hat,shoe,shirt,pants]);
        //     //return polaroid;
        // }


        var polaroids = [];
        //Move functions to create polaroid here, set i<polaroidCount 
        // for (var i = 0; i < 3; i++) {
        //     polaroids.push(constructPolaroid())
        // }
        addPolaroid();
        function addPolaroid() {
            let polaroid = self.add.renderTexture(800, 600, 800, 600);
            polaroid.setVisible(false);
            polaroid.setOrigin(0.5)
            drawPolaroid(polaroid);

        }
        
        function drawPolaroid(polaroid){
 
           //draw the polaroid frame
            

           //draw black square

           //draw the background
     
            // draw the cat
            polaroid.draw(cat, 400,300 );
     
            // draw the clothes
            if(hat!=null){
                polaroid.draw(hat, 400, 130);
            }
            //polaroid.draw(hat, 400, 130);
            //console.log(polaroid)
            console.log(hat)
            polaroid.saveTexture("photo1");
            // draw the graphics inside the platform
            //polaroid.draw(self.borderGraphics);
        }
        var photo = this.add.sprite(400,300,'photo1');
        photo.setVisible(true);
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
