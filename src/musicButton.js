
import Phaser from 'phaser';
const musicButtonX = 750;
const musicButtonY = 50;
export default class musicButton extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, musicButtonX, musicButtonY, config.onKey);
        this.setInteractive({ useHandCursor: true }).setScale(0.5)
        config.scene.add.existing(this);
        this.on('pointerdown', () => toggleMusicButton(this));
        this.on('pointerover', () => this.setFrame(1).setScale(1));
        this.on('pointerout', () => this.setFrame(0).setScale(0.5));

        function toggleMusicButton(button){
            if (button.texture.key=="musicOnButton"){
                //mute music here
                button.setTexture("musicOffButton")
            }
            else{
                //play music
                button.setTexture("musicOnButton")
            }
        }
    }
}



