
import Phaser, { Game } from 'phaser';

import { BegginingScene } from './SceneA';
import { MyGame } from './SceneB';
import { EndingScene } from './SceneC';


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
        }
    },
    audio: {
        disableWebAudio: true
    },
    
    scene: [BegginingScene,MyGame,EndingScene]
};

const game = new Phaser.Game(config);
export {game};

