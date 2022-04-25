
import Phaser from 'phaser';
// const continueButtonX = 400;
// const continueButtonnY = 50;

export default class genericButton extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key,config.text);
        this.setInteractive({ useHandCursor: true })
        config.scene.add.existing(this);
        this.on('pointerover', () => this.setFrame(1));
        this.on('pointerout', () => this.setFrame(0));
        config.scene.add.text(config.x, config.y, config.text,{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 4,resolution:10  })
        .setOrigin(0.5)
        .setDepth(4);
    }
}



