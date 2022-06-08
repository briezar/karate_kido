
import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, KeyCode, Vec3, resources, Asset, SpriteFrame, Sprite, Scheduler, RigidBody2D, Vec2, UITransform, random, randomRange, ERigidBody2DType, sys, debug, randomRangeInt } from 'cc';
import { GameController } from './GameController';
import { SoundManager } from './SoundManager';
import { TreeManager } from './TreeManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerMovement
 * DateTime = Thu Feb 10 2022 22:37:08 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = PlayerMovement.ts
 * FileBasenameNoExtension = PlayerMovement
 * URL = db://assets/PlayerMovement.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property({ type: TreeManager }) public treeManager: TreeManager;

    distanceFromTree: number;
    beltLevel: number = 0;
    spriteDirectory: string[][] =
        [
            ["char-1/spriteFrame", "char-hit/spriteFrame", "char-kick/spriteFrame"],
            ["char-1/spriteFrame", "char-hit/spriteFrame", "char-kick/spriteFrame"]
        ];

    //Player is on the left when scale.x = -1;
    @property({ type: SpriteFrame }) public idleAnimSpFr: SpriteFrame[] = [];
    idleAnimFrame: number = 0;
    @property({ type: SpriteFrame }) public deathAnimSpFr: SpriteFrame[] = [];
    spriteArray: SpriteFrame[] = [];
    sprite: Sprite;
    rigidBody2D: RigidBody2D;

    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        this.sprite = this.getComponent(Sprite);
        this.rigidBody2D = this.getComponent(RigidBody2D);

        this.distanceFromTree = Math.abs(this.node.position.x);
        this.treeManager.playerMovement = this;
        if (parseInt(sys.localStorage.getItem('bestScore')) > 1000) {
            this.beltLevel++;
        }

        resources.load(this.spriteDirectory[this.beltLevel][0], SpriteFrame, (err, spriteFrame) => {
            this.spriteArray.push(spriteFrame);
            this.sprite.spriteFrame = spriteFrame;

        });

        resources.load(this.spriteDirectory[this.beltLevel][1], SpriteFrame, (err, spriteFrame) => {
            this.spriteArray.push(spriteFrame);
        });

        resources.load(this.spriteDirectory[this.beltLevel][2], SpriteFrame, (err, spriteFrame) => {
            this.spriteArray.push(spriteFrame);
        });

        this.schedule(this.playIdleAnimation, 0.4, Infinity);
    }

    onKeyDown(event: EventKeyboard) {
        if (GameController.Instance.isLost || GameController.Instance.isPaused) return;

        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                this.chopLeft();
                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_D:
                this.chopRight();
                break;
        }
    }

    chopRight() {
        this.node.setScale(1, 1, 1);
        this.node.setPosition(this.distanceFromTree, this.node.position.y);
        this.playChopAnimation();
        this.treeManager.chopTree();
    }

    chopLeft() {
        this.node.setScale(-1, 1, 1);
        this.node.setPosition(-this.distanceFromTree, this.node.position.y);
        this.playChopAnimation();
        this.treeManager.chopTree();
    }


    knockDown() {
        this.unschedule(this.stopChopAnimation);
        this.scheduleOnce(() => {
            SoundManager.Instance.playSound(SoundManager.Instance.bonkSound);
        }, 0.1);
        this.schedule(() => {
            let deathSprite = this.deathAnimSpFr.shift();
            this.sprite.spriteFrame = deathSprite;
        }, 0.15, 2, 0.1);
    }

    knockAway() {
        SoundManager.Instance.playSound(SoundManager.Instance.punchSound);
        this.rigidBody2D.angularVelocity = this.node.scale.x * -10;
        this.rigidBody2D.linearVelocity = new Vec2(this.node.scale.x * 70, randomRange(15, 20));

    }

    playChopAnimation() {
        this.unschedule(this.stopChopAnimation);
        this.sprite.spriteFrame = this.spriteArray[0];
        this.scheduleOnce(() => {
            this.sprite.spriteFrame = this.spriteArray[randomRangeInt(1, this.spriteArray.length)];
        }, 0.05);

        this.scheduleOnce(this.stopChopAnimation, 0.2);
    }

    stopChopAnimation() {
        this.sprite.spriteFrame = this.spriteArray[0];
    }

    playIdleAnimation() {
        let index = Math.min(this.idleAnimSpFr.length - 1, this.idleAnimFrame);
        this.sprite.spriteFrame = this.idleAnimSpFr[index];
        this.idleAnimFrame++;
        this.idleAnimFrame %= 4;
    }

    unschedulePlayIdleAnim() {
        this.unschedule(this.playIdleAnimation);
    }
    //update (deltaTime: number) {

    //}
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
