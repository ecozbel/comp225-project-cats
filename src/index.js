
import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import catimg from './assets/cat.png';
import hat1img from './assets/clothing/hat1.png';
import hat2img from './assets/clothing/hat2.png';
import shoe1img from './assets/clothing/shoe1.png';
import shoe2img from './assets/clothing/shoe2.png';
import shoe3img from './assets/clothing/shoe3.png';
import closetimg from './assets/closet.png';
import greenshirt from './assets/clothing/greentshirt.png';
import flowertop from './assets/clothing/flowertop.png';
import shirt1img from './assets/clothing/shirt1.png';
import backgroundImg from './assets/background.png';
import firefighterhat from './assets/clothing/firefighterhat.png';
import firefighterboots from './assets/clothing/firefighterboots.png';
import firefightercoat from './assets/clothing/firefightercoat.png';
import hatSilhoetteimg from './assets/icons/hatIcon.png';
import shirtSilhoetteimg from './assets/icons/shirtIcon.png';
import shoeSilhoetteimg from './assets/icons/shoesIcon.png';
import pantsSilhoetteimg from './assets/icons/pantsIcon.png';
import itemFrame from './assets/itemFrame.png';
import animatedLogo from './assets/logoAnimated.png';
import { BegginingScene } from './SceneA';
import { MyGame } from './SceneB';

var cat;
var closet;
var hat;
var hat2;
var shirt;
var shirt2;
var shoe;
var shoe2;
var shoe3;
var blankSprite;
var clothingTypes;
var layers;
var shirt;
var shoe;
var logo;
var pants;




const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
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
    scene: [BegginingScene,MyGame]
};

const game = new Phaser.Game(config);

//gets random item from an array
function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}
const titleArray = ['Mr.', 'Ms.', 'Mrs.', 'Sir', 'Dame','','',''];
const adjArray = ['Fluffy', 'Cuddly', 'Blue', 'Tabby', 'Silly',];
const nounArray = ['Whiskers','Kitty', 'Cat', 'Socks', 'Patches', 'Spot',]
const suffixArray = ['Jr.','Sr.', 'IV', 'II', 'PhD', '', '', '']

var name = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
console.log(name);