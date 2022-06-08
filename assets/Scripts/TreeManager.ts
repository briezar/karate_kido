
import { _decorator, Component, Node, Prefab, instantiate, Vec3, RigidBody2D, Vec2, game, director, UITransform, clamp, tween, easing, random, SpriteFrame } from 'cc';
import { GameController } from './GameController';
import { PlayerMovement } from './PlayerMovement';
import { SoundManager } from './SoundManager';
import { TreeBlock } from './TreeBlock';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TreeManager
 * DateTime = Thu Feb 10 2022 23:14:06 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = TreeManager.ts
 * FileBasenameNoExtension = TreeManager
 * URL = db://assets/TreeManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('TreeManager')
export class TreeManager extends Component {
    @property({ type: Prefab }) public treeBlockPrefab: Prefab;

    @property({ type: SpriteFrame }) public hitStates2x: SpriteFrame[] = [];
    @property({ type: SpriteFrame }) public hitStates3x: SpriteFrame[] = [];
    @property({ type: SpriteFrame }) public hitStates4x: SpriteFrame[] = [];

    @property({ type: SpriteFrame }) public stick2x: SpriteFrame[] = [];
    @property({ type: SpriteFrame }) public stick3x: SpriteFrame[] = [];
    @property({ type: SpriteFrame }) public stick4x: SpriteFrame[] = [];

    @property({ type: SpriteFrame }) public lantern: SpriteFrame[] = [];

    playerMovement: PlayerMovement;

    treeArray: TreeBlock[] = [];

    treeHeight: number;
    dropSpeed: number = 1000;

    lastPosition: number = -1;
    timeSinceLastChop: number = 0;

    treeCounter = 0;
    noStickCounter = 0;
    isLastBlockNot1x: boolean = false;

    onLoad() {
        this.populateStartingTrees();
    }

    update(deltaTime: number) {

        //Move to position when chop fast
        if (this.treeArray[0].node.position.y > this.treeHeight) {
            this.treeArray[0].node.setPosition(0, this.treeHeight, 0);
        }

        //Move first block
        if (this.treeArray[0].node.position.y > 0.01) {
            this.treeArray[0].node.setPosition(0, this.treeArray[0].node.position.y - this.dropSpeed * deltaTime, 0);
        }
        else if (this.treeArray[0].node.position.y < 0.01) {
            this.treeArray[0].node.setPosition(0, 0, 0);
        }

        //Next block sticks to previous block
        for (var i = 1; i < this.treeArray.length; i++) {
            this.treeArray[i].node.setPosition(0, this.treeArray[i - 1].node.position.y + this.treeHeight, 0);
        }

        this.timeSinceLastChop += deltaTime;
    }

    chopTree() {
        if (this.playerMovement.node.scale.x == this.treeArray[0].getStickSide()) {
            this.playerMovement.knockAway();
            GameController.Instance.lose();
            return;
        }

        GameController.Instance.increaseMultiplier(0.15);

        let score: number = 10;
        SoundManager.Instance.playWoodChopSound();

        GameController.Instance.addTimerTime(0.5 / GameController.Instance.difficultyScale);

        let position = this.playerMovement.node.scale.x;
        if (position != this.lastPosition) {
            score += 2;
            if (this.timeSinceLastChop < 0.5) {
                score += 3;
            }
        }
        if (this.timeSinceLastChop < 0.2) score += 5;

        GameController.Instance.addScore(score);
        this.checkForBuff(this.treeArray[1]);

        if (!this.treeArray[0].isChopped()) {
            return;
        }

        var choppedTree = this.treeArray.shift();

        tween(choppedTree.node).by(0.5, { position: new Vec3(this.playerMovement.node.scale.x * -300, 0) },
            {
                onUpdate: () => {
                    choppedTree.uiOpacity.opacity -= 10;
                },
                easing: 'quartOut'
            })
            .call(() => {
                choppedTree.reset();
            }).start();

        this.checkForBuff(this.treeArray[1]);

        this.lastPosition = this.playerMovement.node.scale.x;
        this.timeSinceLastChop = 0;

        if (this.playerMovement.node.scale.x == this.treeArray[0].getStickSide()) {
            this.playerMovement.knockDown();
            GameController.Instance.lose();
        }
    }

    checkForBuff(treeBlock: TreeBlock) {
        if (this.playerMovement.node.scale.x != treeBlock.getStickSide()) {
            return;
        }
        switch (treeBlock.buffType) {
            case 0:

                break;
            case 1:
                treeBlock.playBuffAnimation();
                GameController.Instance.addTimerTime(3);
                console.log("Add time: 3");
                break;
            case 2:
                treeBlock.playBuffAnimation();
                GameController.Instance.setTimerTimeScale(0.5, 3);
                break;
            default:
        }
    }

    populateStartingTrees() {
        this.treeArray[0] = this.node.children[0].getComponent(TreeBlock);
        this.treeArray[0].treeManager = this;
        this.treeHeight = this.treeArray[0].getComponent(UITransform).height;

        this.treeArray.push(instantiate(this.treeBlockPrefab).getComponent(TreeBlock));
        this.treeArray[1].treeManager = this;
        this.treeArray[1].node.setParent(this.node);
        this.treeArray[1].node.setPosition(0, this.treeHeight * this.treeArray.length, 0);

        for (var i = 2; i < 20; i++) {
            this.treeArray.push(instantiate(this.treeBlockPrefab).getComponent(TreeBlock));
            this.treeArray[i].treeManager = this;
            this.treeArray[i].node.setParent(this.node);
            this.setupNextTree();

        }

    }

    setupNextTree() {
        var tree = this.treeArray[this.treeArray.length - 1];
        if (this.treeArray[this.treeArray.length - 2].getStickSide() != 0) { //if tree below has stick
            tree.setup();
        }
        else {
            tree.setup(1, 'random');
        }

        tree.node.setPosition(0, this.treeHeight * this.treeArray.length, 0);
    }

    setupScaleWithTreeCounter() {
        this.treeCounter++;
        GameController.Instance.setDifficultyScale(Math.min(1.7, 1 + this.treeCounter / 100));

        var tree = this.treeArray[this.treeArray.length - 1];
        tree.node.setPosition(0, this.treeHeight * this.treeArray.length, 0);

        let random = Math.random();

        if (random < 0.90 || this.isLastBlockNot1x) {
            this.setup1x();
            this.isLastBlockNot1x = false;
        }
        else if (random < 0.95) {
            this.setup2x();
        }
        else if (random < 0.98) {
            this.setup3x();
        }
        else {
            this.setup4x();
        }

    }

    setup4x() {
        let tree = this.treeArray[this.treeArray.length - 1];
        tree.setup(4, 'random', this.hitStates4x, this.stick4x, 'random', this.lantern);
        this.isLastBlockNot1x = true;
    }

    setup3x() {
        let tree = this.treeArray[this.treeArray.length - 1];
        tree.setup(3, 'random', this.hitStates3x, this.stick3x, 'random', this.lantern);
        this.isLastBlockNot1x = true;
    }

    setup2x() {
        let tree = this.treeArray[this.treeArray.length - 1];
        tree.setup(2, 'random', this.hitStates2x, this.stick2x, 'random', this.lantern);
        this.isLastBlockNot1x = true;
    }

    setup1x() {
        let tree = this.treeArray[this.treeArray.length - 1];
        tree.setup(1, 'random', [], [], 'random', this.lantern);
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
