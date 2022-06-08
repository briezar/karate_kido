
import { _decorator, Component, Node, game, SpriteFrame, Sprite, UIOpacity, resources, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BackgroundCanvas
 * DateTime = Thu Mar 31 2022 23:31:55 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = BackgroundCanvas.ts
 * FileBasenameNoExtension = BackgroundCanvas
 * URL = db://assets/Scripts/BackgroundCanvas.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('BackgroundCanvas')
export class BackgroundCanvas extends Component {

    @property({ type: SpriteFrame }) backgrounds: SpriteFrame[] = [];
    @property({ type: SpriteFrame }) clouds: SpriteFrame[] = [];

    cloudSpFrames: SpriteFrame[][] = [];

    bgIndex: number = 0;
    swapBgTime: number = 6;

    cloudSprites: Sprite[] = [];
    cloudsUIOpacity: UIOpacity[] = [];
    cloudSwapSprites: Sprite[] = [];
    cloudsSwapUIOpacity: UIOpacity[] = [];

    backgroundSprite: Sprite;
    bgSwapSprite: Sprite;
    bgSwapSpriteUIOpacity: UIOpacity;

    onLoad() {
        this.backgroundSprite = this.node.getChildByName("Background").getComponent(Sprite);
        this.bgSwapSprite = this.backgroundSprite.node.getChildByName("Swap").getComponent(Sprite);
        this.cloudSprites.push(this.backgroundSprite.node.getChildByName("CloudNear").getComponent(Sprite));
        this.cloudSprites.push(this.backgroundSprite.node.getChildByName("CloudMid").getComponent(Sprite));
        this.cloudSprites.push(this.backgroundSprite.node.getChildByName("CloudFar").getComponent(Sprite));

        //for (var i = 0; i < this.cloudSprites.length; i++) {
        //    this.cloudsUIOpacity.push(this.cloudSprites[i].getComponent(UIOpacity));
        //}
        for (var i = 0; i < this.cloudSprites.length; i++) {
            this.cloudSwapSprites.push(this.cloudSprites[i].getComponentInChildren(Sprite));
            this.cloudsSwapUIOpacity.push(this.cloudSwapSprites[i].getComponent(UIOpacity));
        }

        this.bgSwapSpriteUIOpacity = this.bgSwapSprite.getComponent(UIOpacity);

        this.bgSwapSpriteUIOpacity.opacity = 0;
        this.bgSwapSprite.spriteFrame = this.backgrounds[this.getNextBgIndex()];
        this.bgIndex = this.getNextBgIndex();

        for (var i = 0; i < 6; i++) {
            this.cloudSpFrames.push([]);
            for (var j = 0; j < 3; j++) {
                this.cloudSpFrames[i].push(this.clouds.shift());
            }
        }

    }

    update(deltaTime: number) {
        console.log(this.backgroundSprite.spriteFrame.name + "\n" + this.cloudSprites[0].spriteFrame.name);
        for (var i = 0; i < this.cloudSprites.length; i++) {
            this.cloudsSwapUIOpacity[i].opacity += deltaTime * (255 / this.swapBgTime);
            if (this.cloudSprites[i].node.worldPosition.x < -300) {
                this.cloudSprites[i].node.setWorldPosition(1600, this.cloudSprites[i].node.worldPosition.y, 0);
            }
        }

        //this.moveClouds(deltaTime);

        this.bgSwapSpriteUIOpacity.opacity += deltaTime * (255 / this.swapBgTime);
        if (this.bgSwapSpriteUIOpacity.opacity >= 255) {
            this.backgroundSprite.spriteFrame = this.bgSwapSprite.spriteFrame;
            this.bgSwapSpriteUIOpacity.opacity = 0;
            this.bgSwapSprite.spriteFrame = this.backgrounds[this.getNextBgIndex()];

            for (var i = 0; i < this.cloudSprites.length; i++) {
                this.cloudSprites[i].spriteFrame = this.cloudSwapSprites[i].spriteFrame;
                this.cloudsSwapUIOpacity[i].opacity = 0;
                this.cloudSwapSprites[i].spriteFrame = this.cloudSpFrames[this.getNextBgIndex()][i];
            }

            this.bgIndex = this.getNextBgIndex();
        }
    }

    moveClouds(deltaTime: number) {
        for (var i = 0; i < this.cloudSprites.length; i++) {
            let cloud = this.cloudSprites[i];
            let cloudUIOpacity = this.cloudsUIOpacity[i];

            if (this.bgSwapSpriteUIOpacity.opacity >= 100 && cloudUIOpacity.opacity > 0) {
                cloudUIOpacity.opacity -= deltaTime * (255 / this.swapBgTime) * 4;
            }
            else {
                cloudUIOpacity.opacity -= deltaTime * (255 / this.swapBgTime) * 4;
            }

            if (cloudUIOpacity.opacity <= 0) {
                cloud.spriteFrame = this.cloudSpFrames[this.bgIndex][i];
                cloudUIOpacity.opacity = 5;
            }

            if (cloud.node.worldPosition.x < -300) {
                cloud.node.setWorldPosition(1600, cloud.node.worldPosition.y, 0);
            }
        }
    }

    getNextBgIndex(): number {
        let index = this.bgIndex + 1;
        return index % this.backgrounds.length;
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
