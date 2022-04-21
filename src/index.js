
import Phaser, { Game } from 'phaser';

import { BegginingScene } from './SceneA';
import { MyGame } from './SceneB';
import { EndingScene } from './SceneC';
import { pickCatScene } from './sceneB_choosecat';
import { showPromptScene } from './sceneC_showPrompt';
import { mainMenuScene } from './sceneA_mainMenu';


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
    scene:[mainMenuScene,pickCatScene,showPromptScene,MyGame,EndingScene]
};

const game = new Phaser.Game(config);
export {game};

