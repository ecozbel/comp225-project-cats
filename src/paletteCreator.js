export const catRandomizerConfig  = {
    paletteKey: 'cat-palette',                         // Palette file we're referencing.
    paletteNames: ['tabby', 'dark', 'light', 'purple','rainbow','arctic', 'vaporwave', 'blackfur','black/white',
    'spottybrown','wbb','siamese','garfield','tiger','brown'],   // Names for each palette to build out the names for the atlas.
    spriteSheet: {                                      // Spritesheet we're manipulating.
        key: 'catanimated',
        frameWidth: 64,                                 
        frameHeight: 64
    },
    animations: [                                       // Animation data.
        {key: 'catanimated', frameRate: 1, startFrame: 0, endFrame: 1}
    ]
};
    

export function createPalettes(game)
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
    var anim, animKey,atlasKey;
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

        //  // working on how to put new names in prompts, looping through inner array doesn't work yet - Ifraah
        
    }

    // Destroy textures that are not longer needed.
    // NOTE: This doesn't remove the textures from TextureManager.list.
    //       However, it does destroy source image data.
    game.textures.get(catRandomizerConfig.spriteSheet.key).destroy();
    game.textures.get(catRandomizerConfig.paletteKey).destroy();
}
    