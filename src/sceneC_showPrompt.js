import Phaser from 'phaser';
import * as imports from "./importHelperA.js"

import promptBg from './assets/promptBoard.png'
import innerBG from './assets/backgrounds/catChoose_inner_background.png'
import buttonFrame from './assets/icons/buttonFrameLarge.png'
import genericButton from './genericButton';

class showPromptScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'showPromptScene' });
        
    }
    preload ()
    {
        this.load.json('prompts','src/assets/prompts.json');
        this.load.image('promptBoard',promptBg);
        this.load.image('innerBG',innerBG);
        this.load.spritesheet('buttonFrame', buttonFrame, {
            frameWidth: 312,
            frameHeight: 52
        });

    }
    create(){
        let jsonFile = this.cache.json.get('prompts');
        var cat = this.add.existing(this.game.cat);
        cat.x=600;
        cat.y=350;
        cat.setDepth(0);
        cat.setVisible(true);
        var fullName = cat.name;
        var iBG = this.add.image(400,300,'innerBG');
        iBG.setDepth(-1);
        iBG.setScale(1.5);
        var self = this;

        let continueButton= new genericButton({scene:self,key:'buttonFrame',x:400,y:50,text:"Continue."});
        continueButton.on('pointerdown', function(pointer, localX, localY, event){
            this.scene.start('sceneB')    
        },self );


        function getPromptWithCatName(prompt) {
            // make applySubstitutions helper function that takes a string
            return {
                objective: prompt.objective.replaceAll("{{full_name}}", fullName),
                introduction: prompt.introduction.replaceAll("{{full_name}}", fullName),
                outcome: prompt.outcome.replaceAll("{{full_name}}", fullName)
            };
        }

        //var generatedPrompt;
        const randomNumber = (min, max) => { 
            //Use below if final number doesn't need to be whole number
            //return Math.random() * (max - min) + min;
            return Math.floor(Math.random() * (max - min) + min);
        }
        var generatedPrompt;
        function getRandomPrompt() {
            var promptIndex = randomNumber(0, jsonFile.prompt.length);
            generatedPrompt = jsonFile.prompt[promptIndex]; // stores a generated random prompt into a variable we can use later
            return generatedPrompt;
        }

        // getRandomFullName();
        getRandomPrompt();

        var promptBar = this.add.image(280, 300, 'promptBoard')
            .setDepth(4)
            .setDisplaySize(404,404);
        
       
        var promptText = this.add.text(promptBar.x,promptBar.y-52,getPromptWithCatName(generatedPrompt).introduction,{
			fontFamily: 'Courier New',
			fontSize: '22px',
			color: '#000000',
			resolution: 1,
            wordWrap : {width : 370, padding:9, useAdvancedWrap : true},
		})
        .setOrigin(0.5)
        .setDepth(4);        
    }
    update(){
    }

}
export {showPromptScene};
