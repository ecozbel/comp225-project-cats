import Phaser from 'phaser';
import logoImg from './assets/logo.png';

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
    }
    create ()
    {
        logo = this.add.sprite(400,200,'animatedlogo').setDisplaySize(300, 300);
        //var windBlow = logo.animations.add('windblowing');

        const windBlow = this.anims.create({
            key: 'windblowing',
            frames: this.anims.generateFrameNumbers('animatedlogo',{ start: 0, end: 2 }),
            frameRate: 8
        });


        logo.play({key:'windblowing',repeat:-1});

        const { width, height } = this.scale
        // Play button
        const confirmCatButton = this.add.image(width * 0.5, height * 0.6, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            //call function to pass on cat and prompt selection to next scene here
            .on('pointerdown', () => this.scene.start('sceneB'));
        
        this.add.text(confirmCatButton.x, confirmCatButton.y, 'Confirm',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)


        // Settings button
        const settingsButton = this.add.image(confirmCatButton.x, confirmCatButton.y + confirmCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => console.log("Settings?"));
            
        this.add.text(settingsButton.x, settingsButton.y, 'Settings',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)

        // Randomize Cat button
        const randomCatButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => console.log("Random cat")); //call function to randomize cat here

        this.add.text(randomCatButton.x, randomCatButton.y, 'Randomize Cat', { fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2  })
            .setOrigin(0.5)

        // Randomize Prompt button
        const randomPrompt = this.add.image(randomCatButton.x, randomCatButton.y + randomCatButton.displayHeight + 10, 'itemFrame')
            .setDisplaySize(300, 50)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => console.log("Random prompt"));//Call function to randomize prompt here

        this.add.text(randomPrompt.x, randomPrompt.y, 'Randomize Prompt',{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 2 })
            .setOrigin(0.5)
        }
    }

export { BegginingScene };