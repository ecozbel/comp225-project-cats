import Phaser from 'phaser';
export default class genericButton extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key,config.text,config.displayHeight,config.displayWidth);
        this.setInteractive({ useHandCursor: true })
        if(config.displayHeight!=null && config.displayWidth!=null){
            this.setDisplaySize(config.displayWidth,config.displayHeight)
        }
        config.scene.add.existing(this);
        this.on('pointerover', () => this.setFrame(1));
        this.on('pointerout', () => this.setFrame(0));
        this.currentText = config.scene.add.text(config.x, config.y, config.text,{ fontFamily: 'MinecraftiaRegular', fontSize: '18px',stroke: '#000000',strokeThickness: 4,resolution:10  })
        .setOrigin(0.5)
        .setDepth(4);
    }
}



