
import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, KeyCode, Vec3, resources, Asset, SpriteFrame, Sprite, Scheduler, RigidBody2D, Vec2, UITransform, random, randomRange, ERigidBody2DType, sys } from 'cc';
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
    @property({ type: TreeManager })
    public treeManager: TreeManager;

    distanceFromTree: number;
    axeLevel: number = 0;
    spriteDirectory: string[][] =
        [
            ["lumberjackSilver_0/spriteFrame", "lumberjackSilver_1/spriteFrame"],
            ["lumberjackGold_0/spriteFrame", "lumberjackGold_1/spriteFrame"]
        ];

    //Player is on the left when scale.x = -1;
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
            this.axeLevel++;
        }

        resources.load(this.spriteDirectory[this.axeLevel][0], SpriteFrame, (err, spriteFrame) => {
            this.spriteArray.push(spriteFrame);
            this.sprite.spriteFrame = spriteFrame;

        });

        resources.load(this.spriteDirectory[this.axeLevel][1], SpriteFrame, (err, spriteFrame) => {
            this.spriteArray.push(spriteFrame);
        });
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
        this.node.setPosition(this.distanceFromTree, this.node.position.y, 0);
        this.treeManager.chopTree();
        this.playChopAnimation();
    }

    chopLeft() {
        this.node.setScale(-1, 1, 1);
        this.node.setPosition(-this.distanceFromTree, this.node.position.y, 0);
        this.treeManager.chopTree();
        this.playChopAnimation();
    }


    knockDown() {
        this.scheduleOnce(() => {
            this.rigidBody2D.linearVelocity = new Vec2(0, -20);
            SoundManager.Instance.playSound(SoundManager.Instance.bonkSound);
        }, 0.1);
    }

    knockAway() {
        SoundManager.Instance.playSound(SoundManager.Instance.punchSound);
        this.rigidBody2D.angularVelocity = this.node.scale.x * 60;
        this.rigidBody2D.linearVelocity = new Vec2(this.node.scale.x * 40, randomRange(15, 20));

    }

    playChopAnimation() {
        this.unschedule(this.stopChopAnimation);
        this.sprite.spriteFrame = this.spriteArray[0];
        this.scheduleOnce(() => {
            this.sprite.spriteFrame = this.spriteArray[1];
        }, 0.05);

        this.scheduleOnce(this.stopChopAnimation, 0.2);
    }

    stopChopAnimation() {
        this.sprite.spriteFrame = this.spriteArray[0];
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
