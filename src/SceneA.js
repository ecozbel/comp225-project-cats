import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class BegginingScene extends Phaser.Scene
{
    constructor ()
    {   
        super('main-menu');
        Phaser.Scene.call(this, { key: 'sceneA' });
    }
    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('itemFrame', 'assets/itemFrame.png')
    }
    create ()
    {
        logo = this.add.sprite(400,300,'logo');
        //const startButton = this.add.text(400,300,"Start Screen! Click Anywhere");
        //console.log(startButton.text);
        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);

        const { width, height } = this.scale
        // Play button
        const confirmCatButton = this.add.image(width * 0.5, height * 0.6, 'itemFrame')
            .setDisplaySize(150, 50)
        
        this.add.text(confirmCatButton.x, confirmCatButton.y, 'Confirm')
            .setOrigin(0.5)

        // Settings button
        const settingsButton = this.add.image(confirmCatButton.x, confirmCatButton.y + confirmCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(150, 50)

        this.add.text(settingsButton.x, settingsButton.y, 'Settings')
            .setOrigin(0.5)

        // Randomize Cat button
        const randomCatButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(150, 50)

        this.add.text(randomCatButton.x, randomCatButton.y, 'Randomize Cat')
            .setOrigin(0.5)
        // Randomize Prompt button
        const randomPrompt = this.add.image(randomCatButton.x, randomCatButton.y + randomCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(150, 50)

        this.add.text(creditsButton.x, creditsButton.y, 'Randomize Cat')
            .setOrigin(0.5)
        }
    }

