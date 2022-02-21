
import { _decorator, Component, Node, Prefab, instantiate, Vec3, RigidBody2D, Vec2, game, director, UITransform, clamp } from 'cc';
import { GameController } from './GameController';
import { PlayerMovement } from './PlayerMovement';
import { SoundManager } from './SoundManager';
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
enum TreeType { Tree, TreeWithStick }

@ccclass('TreeManager')
export class TreeManager extends Component {
    @property({ type: Prefab })
    public treePrefab: Prefab;

    @property({ type: Prefab })
    public treeWithStickPrefab: Prefab;

    playerMovement: PlayerMovement;

    treeArray: Node[] = [];

    treeHeight: number;
    dropSpeed: number = 1000;

    pool_Tree: Node[] = [];
    pool_TreeWithStick: Node[] = [];

    lastPosition: number = -1;
    timeSinceLastChop: number = 0;

    onLoad() {
        this.populateStartingTrees();
    }

    update(deltaTime: number) {

        //Move to position when chop fast
        if (this.treeArray[0].position.y > this.treeHeight) {
            this.treeArray[0].setPosition(0, this.treeHeight, 0);
        }

        //Move first block
        if (this.treeArray[0].position.y > 0.01) {
            this.treeArray[0].setPosition(0, this.treeArray[0].position.y - this.dropSpeed * deltaTime, 0);
        }
        else if (this.treeArray[0].position.y < 0.01) {
            this.treeArray[0].setPosition(0, 0, 0);
        }

        //Next block sticks to previous block
        for (var i = 1; i < this.treeArray.length; i++) {
            this.treeArray[i].setPosition(0, this.treeArray[i - 1].position.y + this.treeHeight, 0);
        }

        this.timeSinceLastChop += deltaTime;
    }

    chopTree() {
        if (this.playerMovement.node.scale.x == this.treeArray[0].scale.x && this.treeArray[0].name == "TreeWithStick") {
            this.playerMovement.knockAway();
            GameController.Instance.lose();
            return;
        }
        let score: number = 10;
        SoundManager.Instance.playWoodChopSound();

        GameController.Instance.timer += 0.5;
        if (GameController.Instance.timer > GameController.Instance.maxTime) GameController.Instance.timer = GameController.Instance.maxTime;

        let position = this.playerMovement.node.scale.x;
        if (position != this.lastPosition) {
            score += 2;
            if (this.timeSinceLastChop < 0.5) {
                score += 3;
            }
        }
        if (this.timeSinceLastChop < 0.2) score += 5;

        GameController.Instance.addScore(score);

        var choppedTree = this.treeArray.shift();
        choppedTree.getComponent(RigidBody2D).linearVelocity = new Vec2(this.playerMovement.node.scale.x * -100, 0);
        this.scheduleOnce(() => {
            choppedTree.getComponent(RigidBody2D).linearVelocity = Vec2.ZERO;
            choppedTree.active = false;
        }, 1);
        this.addRandomTree();
        this.lastPosition = this.playerMovement.node.scale.x;
        this.timeSinceLastChop = 0;

        if (this.playerMovement.node.scale.x == this.treeArray[0].scale.x && this.treeArray[0].name == "TreeWithStick") {
            this.playerMovement.knockDown();
            GameController.Instance.lose();
        }
    }

    populateStartingTrees() {
        for (var i = 0; i < 20; i++) {
            this.pool_Tree.push(instantiate(this.treePrefab));
            this.pool_Tree[i].active = false;
            this.pool_Tree[i].setParent(this.node);

            this.pool_TreeWithStick.push(instantiate(this.treeWithStickPrefab));
            this.pool_TreeWithStick[i].active = false;
            this.pool_TreeWithStick[i].setParent(this.node);
        }

        this.treeArray[0] = this.node.getChildByName("Tree");
        this.treeHeight = this.treeArray[0].getComponent(UITransform).height;

        this.treeArray[1] = this.findActiveTree(TreeType.Tree);
        this.treeArray[1].setPosition(0, this.treeHeight * this.treeArray.length, 0);

        for (var i = 2; i < 10; i++) {
            this.addRandomTree();
        }

    }

    addRandomTree() {
        var tree;
        if (this.treeArray[this.treeArray.length - 1].name == "TreeWithStick") {
            tree = this.findActiveTree(TreeType.Tree);
        }
        else {
            if (Math.random() > 0.5) {
                tree = this.findActiveTree(TreeType.Tree);
            }
            else {
                tree = this.findActiveTree(TreeType.TreeWithStick);

                if (Math.random() > 0.5) tree.setScale(-1, 1, 1); //flip
                else tree.setScale(1, 1, 1);
            }
        }
        tree.setPosition(0, this.treeHeight * this.treeArray.length, 0);
        this.treeArray.push(tree);
    }

    findActiveTree(treeType: TreeType): Node {
        if (treeType == TreeType.Tree) {
            for (var i = 0; i < this.pool_Tree.length; i++) {
                if (!this.pool_Tree[i].active) { this.pool_Tree[i].active = true; return this.pool_Tree[i];}
            }
            for (var j = 0; j < this.pool_TreeWithStick.length; j++) {
                if (!this.pool_TreeWithStick[j].active) { this.pool_TreeWithStick[i].active = true; return this.pool_TreeWithStick[j]; }
            }
        }

        else if (treeType == TreeType.TreeWithStick) {
            for (var i = 0; i < this.pool_TreeWithStick.length; i++) {
                if (!this.pool_TreeWithStick[i].active) { this.pool_TreeWithStick[i].active = true; return this.pool_TreeWithStick[i]; }
            }
            for (var j = 0; j < this.pool_Tree.length; j++) {
                if (!this.pool_Tree[j].active) { this.pool_Tree[i].active = true; return this.pool_Tree[j]; }
            }
        }

        return null;
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
