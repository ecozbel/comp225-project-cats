
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
}

//Scales given sprite to specified size
function scaleToPolaroidSize(sprite){
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


//add a single piece of clothing to the scene.
function createClothing(spriteString,clothingType,scene){
    var clothing = scene.matter.add.sprite(600,300,spriteString);
    utilities.scaletoIconSize(clothing);
    clothing.setInteractive();
    clothing.setSensor(true);
    clothing.on('pointerdown', () => utilities.playSoundEffect(clothingPickup1));
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

function addAllClothing(scene){
    createClothing("hat1",clothingTypes.hat,scene);
    createClothing("hat2",clothingTypes.hat,scene);
    createClothing("hat3",clothingTypes.hat,scene);
    createClothing("hat4",clothingTypes.hat,scene);
    createClothing("hat5",clothingTypes.hat,scene);
    createClothing("hat6",clothingTypes.hat,scene);
    createClothing("hat7",clothingTypes.hat,scene);
    createClothing("hat8",clothingTypes.hat,scene);
    createClothing("hat9",clothingTypes.hat,scene);
    createClothing("hat10",clothingTypes.hat,scene);
    createClothing("hat11",clothingTypes.hat,scene);
    createClothing("hat12",clothingTypes.hat,scene);
    createClothing("hat13",clothingTypes.hat,scene);
    createClothing("hat14",clothingTypes.hat,scene);
    createClothing("hat15",clothingTypes.hat,scene);
    createClothing("hat16",clothingTypes.hat,scene);
    createClothing("shoe1",clothingTypes.shoe,scene);
    createClothing("shoe2",clothingTypes.shoe,scene);
    createClothing("shoe3",clothingTypes.shoe,scene);
    createClothing("shoe4",clothingTypes.shoe,scene);
    createClothing("shoe5",clothingTypes.shoe,scene);
    createClothing("shoe6",clothingTypes.shoe,scene);
    createClothing("shoe7",clothingTypes.shoe,scene);
    createClothing("shoe8",clothingTypes.shoe,scene);
    createClothing("shoe9",clothingTypes.shoe,scene);
    createClothing("shoe10",clothingTypes.shoe,scene);
    createClothing("shoe11",clothingTypes.shoe,scene);
    createClothing("shoe12",clothingTypes.shoe,scene);
    createClothing("shoe13",clothingTypes.shoe,scene);
    createClothing("shoe14",clothingTypes.shoe,scene);
    createClothing("shoe15",clothingTypes.shoe,scene);
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
    createClothing("shirt14",clothingTypes.shirt,scene);
    createClothing("shirt15",clothingTypes.shirt,scene);
    createClothing("shirt16",clothingTypes.shirt,scene);
    createClothing("pants1",clothingTypes.pants,scene);
    createClothing("pants2",clothingTypes.pants,scene);
    createClothing("pants3",clothingTypes.pants,scene);
    createClothing("pants4",clothingTypes.pants,scene);
    createClothing("pants5",clothingTypes.pants,scene);
    createClothing("pants6",clothingTypes.pants,scene);
    createClothing("pants7",clothingTypes.pants,scene);
    createClothing("pants8",clothingTypes.pants,scene);
    createClothing("pants9",clothingTypes.pants,scene);
    createClothing("pants10",clothingTypes.pants,scene);
    createClothing("pants11",clothingTypes.pants,scene);
    createClothing("pants12",clothingTypes.pants,scene);
    createClothing("pants13",clothingTypes.pants,scene);
    createClothing("pants14",clothingTypes.pants,scene);
    createClothing("pants15",clothingTypes.pants,scene);
    createClothing("pants16",clothingTypes.pants,scene);
}


export{normalizeScale,normalizeClothing,scaletoIconSize,createClothingSnapPoints,scaleToGivenSize,scaleToPolaroidSize,playSoundEffect,musicButton,genericButton,createClothing,addAllClothing}