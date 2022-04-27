
import Phaser, { Game } from 'phaser';

import { sceneGallery } from './galleryScene.js';
import { loadingScene } from './loadingScene.js';
import {photoDownloader} from './photoDownloader.js';
import { IntroScene} from './IntroScene';
import { DressUpScene } from './DressUpScene';
import { PolaroidScene } from './PolaroidScene';
import { PickCatScene } from './PickCatScene';
import { PromptDisplayScene } from './PromptDisplayScene';



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
    
    scene:[loadingScene,IntroScene,PickCatScene,PromptDisplayScene,DressUpScene,PolaroidScene,sceneGallery,photoDownloader]
};

const game = new Phaser.Game(config);
export {game};

