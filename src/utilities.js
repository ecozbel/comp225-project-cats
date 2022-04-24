
import { game } from './index.js';
import musicButton from './musicButton.js'
import genericButton from './genericButton.js';
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

//Scales given sprite to specified size
function scaleToGivenSize(sprite,size){
    sprite.displayWidth=size; 
    sprite.displayHeight=size; 
    //sprite.scaleY=sprite.scaleX;
}

//Scales given sprite to specified size
function scaleToPolaroidSize(sprite){
    // sprite.displayWidth=game.config.width*0.146; 
    // sprite.scaleY=sprite.scaleX;
    sprite.setScale(0.38);
}

function createClothingSnapPoints(cat){
    cat.hatPosition = { 
        x : cat.x+5,
        y : cat.y-cat.displayHeight/2.4,
        z : 4,
        currentClothing : null,
    }
    cat.shoePosition = { 
        x : cat.x+cat.displayWidth*0.0233,
        y : cat.y+cat.displayHeight/2.55,
        z : 1,
        currentClothing : null,
    }
    cat.shirtPosition = { 
        x : cat.x+7,
        y : cat.y+cat.displayHeight/11.7,
        z : 3,
        currentClothing : null,
    }
    cat.pantsPosition = {
        x : cat.x + 15,
        y : cat.y+cat.displayHeight/3.39,
        z : 2,
        currentClothing : null,
    }
}

//only plays sound effect if sound effects are enabled.
function playSoundEffect(soundEffect){
    if (global.soundEffectsOn == true){
        soundEffect.play();
    }
}



export{normalizeScale,normalizeClothing,scaletoIconSize,createClothingSnapPoints,scaleToGivenSize,scaleToPolaroidSize,playSoundEffect,musicButton,genericButton}