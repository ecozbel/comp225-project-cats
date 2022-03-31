import Phaser, { Game } from 'phaser';
import logoImg from './assets/logo.png';
import itemFrame from './assets/itemFrame.png';
import animatedLogo from './assets/logoAnimated.png';
import catPalette from './assets/cat-palette2.png';
import catAnimation from './assets/catanimated.png';

var catAnimated;
var atlasKey;
var logo;
var nameText;

class BegginingScene extends Phaser.Scene
{
    constructor ()
    {   
        super();
        Phaser.Scene.call(this, { key: 'sceneA' });
    }
    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('itemFrame',itemFrame);
        this.load.spritesheet('animatedlogo', animatedLogo, { frameWidth: 800, frameHeight: 800 });
        this.load.image('cat-palette', catPalette);
        // this.load.audio('backgroundMusic', ['assets/audio/music.mp3']);
        this.load.spritesheet('catanimated', catAnimation, {
            frameWidth: 64,
            frameHeight: 64
        });
    }
    create ()
    {
        // backgroundMusic = this.add.audio('backgroundMusic');

        const catRandomizerConfig  = {
            paletteKey: 'cat-palette',                         // Palette file we're referencing.
            paletteNames: ['tabby', 'dark', 'light', 'purple','rainbow','arctic',
        'vaporwave', 'blackfur','black/white','brown','wbb','siamese','garfield'],   // Names for each palette to build out the names for the atlas.
            spriteSheet: {                                      // Spritesheet we're manipulating.
                key: 'catanimated',
                frameWidth: 64,                                 
                frameHeight: 64
            },
            animations: [                                       // Animation data.
                {key: 'catanimated', frameRate: 1, startFrame: 0, endFrame: 1}
            ]
        };
        var self = this;
        createPalettes(catRandomizerConfig,self);
        //var self = this;
        catAnimated = this.add.sprite(600, 400, 'catanimated-' + catRandomizerConfig.paletteNames[0]).setScale(6);
        catAnimated.color = catRandomizerConfig.paletteNames[0];
        catAnimated.anims.play('catanimated-' + catAnimated.color);
        var self = this;
        logo = this.add.sprite(250,150,'animatedlogo').setDisplaySize(300, 300);
        const windBlow = this.anims.create({
            key: 'windblowing',
            frames: this.anims.generateFrameNumbers('animatedlogo',{ start: 0, end: 2 }),
            frameRate: 8
        });


        logo.play({key:'windblowing',repeat:-1});

        const { width, height } = this.scale
        // Play button
        const confirmCatButton = this.add.image(logo.x, logo.y +logo.displayHeight/1.75 , 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            //call function to pass on cat and prompt selection to next scene here
            .on('pointerdown', function(pointer, localX, localY, event){
                this.scene.start('sceneB')
                this.game.cat = catAnimated;

                // obj.scene.sys.updateList.remove(pawn);
                // obj.scene.sys.displayList.remove(pawn);
                // obj.scene = scene;
                // scene.sys.updateList.add(obj);
                // scene.sys.displayList.add(obj);
            
            
            },self );

        
        this.add.text(confirmCatButton.x, confirmCatButton.y, 'Confirm',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2,align:'left'  })
            .setOrigin(0.5)


        // Settings button
        const settingsButton = this.add.image(confirmCatButton.x, confirmCatButton.y + confirmCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => console.log("Settings?"));
            
        this.add.text(settingsButton.x, settingsButton.y, 'Settings',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)

        // Randomize Cat button
        const randomCatButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', function(pointer, localX, localY, event){
                var index = catRandomizerConfig.paletteNames.indexOf(catAnimated.color);
                index++;
                if (index >= catRandomizerConfig.paletteNames.length) {
                    index = 0;
                }
            catAnimated.color = catRandomizerConfig.paletteNames[index];
            catAnimated.anims.play('catanimated-' + catAnimated.color);
            }, self);

        this.add.text(randomCatButton.x, randomCatButton.y, 'Randomize Cat', { fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)
        const titleArray = ['Mr.', 'Ms.', 'Mrs.', 'Sir', 'Dame','','',''];
        const adjArray = ['Fluffy', 'Cuddly', 'Blue', 'Tabby', 'Silly',];
        const nounArray = ['Whiskers','Kitty', 'Cat', 'Socks', 'Patches', 'Spot',]    ;        
        const suffixArray = ['Jr.','Sr.', 'IV', 'II', 'PhD', '', '', '']    ;
        //gets random item from an array
        function getRandomItem(arr) {
            var item = Phaser.Utils.Array.GetRandom(arr);
            return item;
        }

        function getRandomFullName(){
            var fullName = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
            nameText.setText(fullName);
            return fullName;
        }
        //var fullName = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
        // Randomize Name button
        const randomNameButton = this.add.image(randomCatButton.x, randomCatButton.y + randomCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => console.log(getRandomFullName()));//Call function to randomize prompt here

        this.add.text(randomNameButton.x, randomNameButton.y, 'Randomize Name',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)

        // Randomize Prompt button
        const randomPrompt = this.add.image(randomNameButton.x, randomNameButton.y + randomNameButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => console.log("Random prompt"));//Call function to randomize prompt here

        this.add.text(randomPrompt.x, randomPrompt.y, 'Randomize Prompt',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',align:'left',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)


        //Initial Name of cat to be displayed
        var initialName = getRandomItem(titleArray) + " " + getRandomItem(adjArray) + getRandomItem(nounArray) + " " + getRandomItem(suffixArray);
        //Background eleement of name display
        const catNameBar = this.add.image(catAnimated.x, catAnimated.y - catAnimated.displayHeight/1.5, 'itemFrame')
            .setDisplaySize(400, 50)
        //Displayed text
        nameText = this.add.text(catNameBar.x, catNameBar.y,initialName,{ fontFamily: 'MinecraftiaRegular', fontSize: '16px',align:'left',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)
        }
    }
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

function createPalettes(catRandomizerConfig,game)
{
    // Create color lookup from palette image.
    var colorLookup = {};
    var x, y;
    var pixel, palette;
    console.log(game);
    var paletteWidth = game.textures.get(catRandomizerConfig.paletteKey).getSourceImage().width;

    // Go through each pixel in the palette image and add it to the color lookup.
    for (y = 0; y < catRandomizerConfig.paletteNames.length; y++) {
        palette = catRandomizerConfig.paletteNames[y];
        colorLookup[palette] = [];

        for (x = 0; x < paletteWidth; x++) {
            pixel = game.textures.getPixel(x, y, catRandomizerConfig.paletteKey);
            colorLookup[palette].push(pixel);
        }
    }

    // Create sheets and animations from base sheet.
    var sheet = game.textures.get(catRandomizerConfig.spriteSheet.key).getSourceImage();
    var anim, animKey;
    var canvasTexture, canvas, context, imageData, pixelArray;

    // Iterate over each palette.
    for (y = 0; y < catRandomizerConfig.paletteNames.length; y++) {
        palette = catRandomizerConfig.paletteNames[y];
        atlasKey = catRandomizerConfig.spriteSheet.key + '-' + palette;

        // Create a canvas to draw new image data onto.
        canvasTexture = game.textures.createCanvas(catRandomizerConfig.spriteSheet.key + '-temp', sheet.width, sheet.height);
        canvas = canvasTexture.getSourceImage();
        context = canvas.getContext('2d');

        // Copy the sheet.
        context.drawImage(sheet, 0, 0);

        // Get image data from the new sheet.
        imageData = context.getImageData(0, 0, sheet.width, sheet.height);
        pixelArray = imageData.data;

        // Iterate through every pixel in the image.
        for (var p = 0; p < pixelArray.length / 4; p++) {
            var index = 4 * p;

            var r = pixelArray[index];
            var g = pixelArray[++index];
            var b = pixelArray[++index];
            var alpha = pixelArray[++index];

            // If this is a transparent pixel, ignore, move on.
            if (alpha === 0) {
                continue;
            }

            // Iterate through the colors in the palette.
            for (var c = 0; c < paletteWidth; c++) {
                var oldColor = colorLookup[catRandomizerConfig.paletteNames[0]][c];
                var newColor = colorLookup[palette][c];
                // If the color matches, replace the color.
                if (r === oldColor.r && g === oldColor.g && b === oldColor.b && alpha === 255) {
                    pixelArray[--index] = newColor.b;
                    pixelArray[--index] = newColor.g;
                    pixelArray[--index] = newColor.r;
                }
            }
        }

        // Put our modified pixel data back into the context.
        context.putImageData(imageData, 0, 0);

        // Add the canvas as a sprite sheet to the game.
        game.textures.addSpriteSheet(atlasKey, canvasTexture.getSourceImage(), {
            frameWidth: catRandomizerConfig.spriteSheet.frameWidth,
            frameHeight: catRandomizerConfig.spriteSheet.frameHeight,
        });

        // Iterate over each animation.
        for (var a = 0; a < catRandomizerConfig.animations.length; a++) {
            anim = catRandomizerConfig.animations[a];
            animKey = atlasKey;
            //console.log(animKey)

            // Add the animation to the game.
            game.anims.create({
                key: animKey,
                frames: game.anims.generateFrameNumbers(atlasKey, {start: anim.startFrame, end: anim.endFrame}),
                frameRate: anim.frameRate,
                repeat: anim.repeat === undefined ? -1 : anim.repeat
            });
        }

        // Destroy temp texture.
        game.textures.get(catRandomizerConfig.spriteSheet.key + '-temp').destroy();
    }

    // Destroy textures that are not longer needed.
    // NOTE: This doesn't remove the textures from TextureManager.list.
    //       However, it does destroy source image data.
    game.textures.get(catRandomizerConfig.spriteSheet.key).destroy();
    game.textures.get(catRandomizerConfig.paletteKey).destroy();
}
export const chosenCat = catAnimated;
console.log(chosenCat);
export { BegginingScene };

