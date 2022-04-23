
import Phaser, { Game } from 'phaser';

import { sceneGallery } from './galleryScene.js';
import { sceneA } from './sceneA';
import { sceneD } from './sceneD';
import { sceneE } from './sceneE';
import { sceneB } from './sceneB';
import { sceneC } from './sceneC';



const config = {
    type: Phaser.AUTO,
    parent: 'mygame',
    pixelArt:true,
    width: 800,
    height: 600,
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'matter',
        matter: {
            debug: false
        },
    },
    audio: {
        disableWebAudio: true
    },
    
    //scene: [BegginingScene,MyGame,EndingScene]
    scene:[sceneA,sceneB,sceneC,sceneD,sceneE,sceneGallery]
};

const game = new Phaser.Game(config);
export {game};

