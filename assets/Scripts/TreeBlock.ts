
import { _decorator, Component, Node, Sprite, UIOpacity, KeyCode, UITransform, randomRange, SpriteFrame, randomRangeInt, tween, Vec3 } from 'cc';
import { TreeManager } from './TreeManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TreeBlock
 * DateTime = Mon Mar 28 2022 14:40:18 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = TreeBlock.ts
 * FileBasenameNoExtension = TreeBlock
 * URL = db://assets/Scripts/TreeBlock.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
enum Buff { None, AddTime, SlowTime }
@ccclass('TreeBlock')
export class TreeBlock extends Component {
    treeManager: TreeManager;

    stickLeft: Node;
    stickLeftUIT: UITransform;
    stickLeftDefaultSpriteFrame: SpriteFrame;
    stickRight: Node;
    stickRightUIT: UITransform;
    stickRightDefaultSpriteFrame: SpriteFrame;
    ice: Node;
    lantern: Node;
    lanternUIOpacity: UIOpacity;

    currentHp: number = 1;
    maxHp: number = 1;
    buffType: Buff;

    stickLeftSprite: Sprite;
    stickRightSprite: Sprite;
    hitStateSprite: Sprite;
    buffSprite: Sprite;
    uiOpacity: UIOpacity;

    hitSpriteFrames: SpriteFrame[] = [];

    onLoad() {
        this.stickLeft = this.node.getChildByName("StickLeft");
        this.stickLeftUIT = this.stickLeft.getComponent(UITransform);
        this.stickLeftSprite = this.stickLeft.getComponent(Sprite);
        this.stickLeftDefaultSpriteFrame = this.stickLeftSprite.spriteFrame;

        this.stickRight = this.node.getChildByName("StickRight");
        this.stickRightUIT = this.stickRight.getComponent(UITransform);
        this.stickRightSprite = this.stickRight.getComponent(Sprite);
        this.stickRightDefaultSpriteFrame = this.stickRightSprite.spriteFrame;

        this.ice = this.node.getChildByName("Ice");
        this.lantern = this.node.getChildByName("Lantern");
        this.lanternUIOpacity = this.lantern.getComponent(UIOpacity);
        this.hitStateSprite = this.node.getChildByName("HitState").getComponent(Sprite);
        this.buffSprite = this.node.getChildByName("Lantern").getComponent(Sprite);
        this.uiOpacity = this.getComponent(UIOpacity);
    }

    getStickSide(): number {
        if (this.stickLeft.activeInHierarchy) {
            return -1;
        }
        if (this.stickRight.activeInHierarchy) {
            return 1;
        }
        return 0;
    }

    setup(numOfHits: number = 1, stickSide?: 'random' | 'left' | 'right', hitSpriteFrames: SpriteFrame[] = [], stickSpriteFrame: SpriteFrame[] = [], buff?: 'random' | 'addTime' | 'slowTime', buffSpriteFrame?: SpriteFrame[]) {
        this.currentHp = numOfHits;
        this.maxHp = numOfHits;
        if (this.treeManager.treeCounter > 15 && Math.random() < 0.05) this.ice.active = true;

        switch (stickSide) {
            case 'left':
                this.setupStickAndBuff(-1, stickSpriteFrame[0], buff, buffSpriteFrame);
                break;
            case 'right':
                this.setupStickAndBuff(1, stickSpriteFrame[1], buff, buffSpriteFrame);
                break;
            case 'random':
                if (this.treeManager.treeArray[this.treeManager.treeArray.length - 2].getStickSide() != 0) { //if tree below has stick
                    this.setupStickAndBuff(0);
                }
                else {
                    let random = Math.random();
                    if (random < 0.5 && this.treeManager.noStickCounter < 4) {
                        this.treeManager.noStickCounter++;
                    }
                    else if (random < 0.75) {
                        this.setupStickAndBuff(-1, stickSpriteFrame[0], buff, buffSpriteFrame);
                    }
                    else {
                        this.setupStickAndBuff(1, stickSpriteFrame[1], buff, buffSpriteFrame);
                    }
                }
                break;
            case undefined:
                break;
            default:
        }

        if (hitSpriteFrames != []) {
            this.hitSpriteFrames = hitSpriteFrames;
            this.hitStateSprite.spriteFrame = hitSpriteFrames[0];
        }
    }

    setupStickAndBuff(scale: 0 | -1 | 1, stickSpriteFrame: SpriteFrame = null, buff: 'random' | 'addTime' | 'slowTime' = null, buffSpriteFrame: SpriteFrame[] = null) {
        this.treeManager.noStickCounter = 0;
        let length = [250, 320];
        let randomLength = length[randomRangeInt(0, 2)];

        switch (scale) {
            case 0:

                break;
            case -1:
                this.stickLeft.active = true;
                this.stickLeftUIT.width = randomLength;
                if (stickSpriteFrame != null) this.stickLeftSprite.spriteFrame = stickSpriteFrame;
                break;
            case 1:
                this.stickRight.active = true;
                this.stickRightUIT.width = randomLength;
                if (stickSpriteFrame != null) this.stickRightSprite.spriteFrame = stickSpriteFrame;
                break;
            default:
        }

        if (buff == null) return;
        this.lantern.active = true;
        switch (buff) {
            case 'random':
                let random = Math.random();
                if (random < 0.9) {
                    this.buffType = Buff.None;
                    this.lantern.active = false;
                }
                else if (random < 0.95) {
                    this.buffType = Buff.SlowTime;
                    this.buffSprite.node.setScale(scale, 1); //flip
                }
                else {
                    this.buffType = Buff.AddTime;
                    this.buffSprite.node.setScale(scale, 1);
                }
                break;

            case 'slowTime':
                this.buffType = Buff.SlowTime;
                this.buffSprite.node.setScale(scale, 1); //flip
                break;
            case 'addTime':
                this.buffType = Buff.AddTime;
                this.buffSprite.node.setScale(scale, 1);
                break;
            default:
        }
        this.buffSprite.spriteFrame = buffSpriteFrame[this.buffType - 1];

    }

    isChopped(): boolean {
        if (this.ice.activeInHierarchy) {
            this.ice.active = false;
        }
        else {
            this.currentHp--;
        }
        if (this.hitSpriteFrames != [] && this.currentHp > 0) {
            this.hitStateSprite.spriteFrame = this.hitSpriteFrames[this.maxHp - this.currentHp];
        }
        return this.currentHp == 0;
    }

    reset() {
        this.uiOpacity.opacity = 255;
        this.stickLeft.active = false;
        this.stickRight.active = false;
        this.currentHp = 1;
        this.maxHp = 1;

        this.hitSpriteFrames = [];
        this.stickLeftSprite.spriteFrame = this.stickLeftDefaultSpriteFrame;
        this.stickRightSprite.spriteFrame = this.stickRightDefaultSpriteFrame;

        this.hitStateSprite.spriteFrame = null;
        this.ice.active = false;
        this.lantern.active = false;
        this.treeManager.treeArray.push(this);
        this.treeManager.setupScaleWithTreeCounter();
    }

    playBuffAnimation() {
        let originalScale = this.lantern.scale;
        tween(this.lantern).by(0.5, { scale: new Vec3(originalScale.x, originalScale.y) },
            {
                onUpdate: () => {
                    this.lanternUIOpacity.opacity -= 10;
                },
                easing: 'quartOut'
            })
            .call(() => {
                this.lantern.active = false;
                this.lantern.setScale(originalScale);
                this.lanternUIOpacity.opacity = 255;
            }).start();
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
