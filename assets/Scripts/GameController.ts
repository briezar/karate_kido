
import { _decorator, Component, Node, Vec2, director, find, ProgressBar, game, Label, sys, Prefab, resources, instantiate, RigidBody2D, randomRange, RigidBody, Color } from 'cc';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameController
 * DateTime = Mon Feb 14 2022 15:51:20 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = GameController.ts
 * FileBasenameNoExtension = GameController
 * URL = db://assets/GameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('GameController')
export class GameController extends Component {

    public static Instance: GameController = null;

    @property({ type: PlayerMovement })
    public playerMovement: PlayerMovement;

    timerBar: ProgressBar;
    timer: number;
    maxTime: number = 6;

    scoreLabel: Label;
    floatingNumber: Prefab;

    touchInput: Vec2;
    isLost: boolean = false;
    isPaused: boolean = false;
    score: number = 0;

    pool_floatingScore: Node[] = [];

    onLoad() {

        GameController.Instance = this;

        resources.load("FloatingNumber", Prefab, (err, prefab) => {
            this.floatingNumber = prefab;
            for (var i = 0; i < 20; i++) {
                this.pool_floatingScore.push(instantiate(this.floatingNumber));
                this.pool_floatingScore[i].active = false;
                this.pool_floatingScore[i].setParent(this.node.parent);
            }
        });

        this.scoreLabel = find("Canvas/Score").getComponent(Label);
        if (sys.localStorage.getItem('bestScore') == null) {
            sys.localStorage.setItem('bestScore', '0');
        }
        window.sessionStorage.setItem('score', '0');
        this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + parseInt(sys.localStorage.getItem('bestScore'));

        this.timerBar = find("Canvas/Timer").getComponent(ProgressBar);
        this.timer = this.maxTime;

        this.node.on(Node.EventType.TOUCH_START, (event: any) => {
            this.touchInput = event.getUILocation();

            if (this.isLost || this.isPaused) return;

            if (this.touchInput.x < 1080 / 2) {
                this.playerMovement.chopLeft();
            }
            else {
                this.playerMovement.chopRight();
            }
        }, this);

        if (window.sessionStorage.getItem('showInstruction') == null) {
            window.sessionStorage.setItem('showInstruction', 'showed');
            this.isPaused = true;
            this.timerBar.node.active = false;
            let node = find("Canvas/Instruction");
            node.active = true;

            this.scheduleOnce(() => {
                node.active = false;
                this.timerBar.node.active = true;
                this.isPaused = false;
            }, 2);
        }
    }

    lose() {
        this.isLost = true;
        if (this.score > parseInt(sys.localStorage.getItem('bestScore'))) {
            this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + this.score;
            sys.localStorage.setItem('bestScore', this.score.toString());
        }

        this.scheduleOnce(() => {
            director.loadScene("scene");

        }, 2);
    }

    addScore(score: number) {
        this.score += score;
        let bestScore = parseInt(sys.localStorage.getItem('bestScore'));
        this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + (this.score > bestScore ? this.score : bestScore);

        let floatingScore = this.findActiveFloatingScore();
        let label = floatingScore.getComponent(Label);
        let rigidBody2D = floatingScore.getComponent(RigidBody2D);

        floatingScore.setPosition(0, -400, 0);
        label.string = "+" + score;
        label.fontSize = 50 + score * 3;
        //label.color = Color.RED;
        rigidBody2D.applyForceToCenter(new Vec2(randomRange(-1, 1) * 500, randomRange(1000, 1500)), true);
        this.scheduleOnce(() => {
            floatingScore.active = false;
            rigidBody2D.linearVelocity = Vec2.ZERO;
        }, 1);
    }

    findActiveFloatingScore(): Node {
        for (var i = 0; i < this.pool_floatingScore.length; i++) {
            if (!this.pool_floatingScore[i].active) { this.pool_floatingScore[i].active = true; return this.pool_floatingScore[i]; }
        }
    }

    resetBestScore() {
        sys.localStorage.setItem('bestScore', '0');
        this.scoreLabel.string = "Score: " + this.score + "\nBest Score: 0";
    }

    update(deltaTime: number) {
        if (this.isPaused) return;

        this.timerBar.progress = this.timer / this.maxTime;

        if (this.timer <= 0 && !this.isLost) {
            this.playerMovement.knockAway();
            this.lose();
        }
        else {
            this.timer -= deltaTime;
        }
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
