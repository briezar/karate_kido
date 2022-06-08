
import { _decorator, Component, Node, Vec2, director, find, ProgressBar, game, Label, sys, Prefab, resources, instantiate, RigidBody2D, randomRange, RigidBody, Color, EPSILON, EventTouch } from 'cc';
import { FloatingNumber } from './FloatingNumber';
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

    @property({ type: PlayerMovement }) public playerMovement: PlayerMovement;
    @property({ type: Prefab }) public gameplay: Prefab;

    timerBar: ProgressBar;
    multiplierBar: ProgressBar;
    multiplierLabel: Label;

    multiplier: number = 1;
    multiplierTimeScale: number = 1;
    multiplierProgress: number = 0;

    timer: number;
    timerTimeScale: number = 1;
    maxTime: number = 6;
    difficultyScale: number = 1;

    scoreLabel: Label;

    touchInput: Vec2;
    isLost: boolean = false;
    isPaused: boolean = false;
    score: number = 0;

    pool_floatingScore: FloatingNumber[] = [];
    confirmResetBestScoreNode: Node;

    onLoad() {

        GameController.Instance = this;

        resources.load("FloatingNumber", Prefab, (err, prefab) => {
            for (var i = 0; i < 20; i++) {
                this.pool_floatingScore.push(instantiate(prefab).getComponent(FloatingNumber));
                let node = this.pool_floatingScore[i].node;
                node.active = false;
                node.setParent(this.node.parent);
            }
        });

        this.scoreLabel = this.node.parent.getChildByName("Score").getComponent(Label);
        if (sys.localStorage.getItem('bestScore') == null) {
            sys.localStorage.setItem('bestScore', '0');
        }
        window.sessionStorage.setItem('score', '0');
        this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + parseInt(sys.localStorage.getItem('bestScore'));

        this.confirmResetBestScoreNode = this.node.parent.getChildByName("ConfimResetBestScore");
        this.timerBar = this.node.parent.getChildByName("Timer").getComponent(ProgressBar);
        this.multiplierBar = this.node.parent.getChildByName("Multiplier").getComponent(ProgressBar);
        this.multiplierLabel = this.multiplierBar.getComponentInChildren(Label);
        this.timer = this.maxTime;

        this.node.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.touchInput = event.getUILocation();

            if (this.isLost || this.isPaused) return;

            if (this.touchInput.x < 1080 / 2) {
                this.playerMovement.chopLeft();
            }
            else {
                this.playerMovement.chopRight();
            }
        }, this);

        this.isPaused = true;

        this.node.parent.setSiblingIndex(3);

    }

    update(deltaTime: number) {
        if (this.isPaused) return;

        this.timerBar.progress = Math.max(0.3, 0.3 + (this.timer / this.maxTime) * 0.7);
        this.multiplierBar.progress = Math.max(0.3, 0.3 + this.multiplierProgress * 0.7);

        this.multiplierLabel.string = this.multiplier.toFixed(1) + "x";

        if (this.timer <= 0 && !this.isLost) {
            this.playerMovement.knockAway();
            this.lose();
        }
        else {
            this.timer -= deltaTime * this.timerTimeScale * this.difficultyScale;

            if (this.multiplierProgress > 0) {
                this.multiplierProgress -= deltaTime * 0.3 * this.multiplier * this.multiplierTimeScale;
            }
            else {
                if (this.multiplier >= 1.1) {
                    this.multiplierProgress = 1;
                    this.multiplier -= 0.1;
                }
            }
        }
    }


    lose() {
        this.isLost = true;
        if (this.score > parseInt(sys.localStorage.getItem('bestScore'))) {
            this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + this.score;
            sys.localStorage.setItem('bestScore', this.score.toString());
        }

        this.scheduleOnce(() => {
            this.node.parent.destroy();
            instantiate(this.gameplay).setParent(this.node.parent.parent);
        }, 2);
    }

    addScore(score: number) {
        let actualScore = Math.round(score * this.multiplier);
        this.score += actualScore;
        let bestScore = parseInt(sys.localStorage.getItem('bestScore'));
        this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + (this.score > bestScore ? this.score : bestScore);

        let floatingScore = this.findActiveFloatingScore();
        let label = floatingScore.label;
        let rigidBody2D = floatingScore.rigidBody;

        label.string = "+" + actualScore.toFixed();
        label.fontSize = 50 + score * 3;
        if (score < 15) {
            label.color = Color.WHITE;
        }
        else if (score < 20) {
            label.color = Color.CYAN;
        }
        else {
            label.color = Color.YELLOW;
        }
        rigidBody2D.applyForceToCenter(new Vec2(randomRange(-1, 1) * 500, randomRange(2000, 2500)), true);
    }

    findActiveFloatingScore(): FloatingNumber {
        for (var i = 0; i < this.pool_floatingScore.length; i++) {
            if (!this.pool_floatingScore[i].node.active) { this.pool_floatingScore[i].node.active = true; return this.pool_floatingScore[i]; }
        }
    }

    resetBestScore() {
        sys.localStorage.setItem('bestScore', '0');
        this.scoreLabel.string = "Score: " + this.score + "\nBest Score: 0";
    }

    confirmResetBestScore() {
        this.confirmResetBestScoreNode.active = !this.confirmResetBestScoreNode.active;
        this.isPaused = this.confirmResetBestScoreNode.active;
    }

    increaseMultiplier(add: number) {
        this.multiplierProgress += add;
        if (this.multiplierProgress >= 1) {
            this.multiplierProgress = 0.01;
            this.multiplier += 0.1;
            this.setAndRevertMultiplierTimeScale(0, 0.4);
        };
    }

    setAndRevertMultiplierTimeScale(timeScale: number, duration: number) {
        this.multiplierTimeScale = timeScale;
        this.scheduleOnce(() => {
            this.multiplierTimeScale = 1;
        }, duration);
    }

    setDifficultyScale(diff: number) {
        this.difficultyScale = diff;
    }

    addTimerTime(time: number) {
        this.timer += time;
        if (this.timer > this.maxTime) this.timer = this.maxTime;

    }

    setTimerTimeScale(timeScale: number, duration: number) {
        console.log("Set time scale = " + timeScale + " for " + duration + " seconds");
        this.unschedule(this.resetTimerTimeScale);
        this.timerTimeScale = timeScale;
        this.scheduleOnce(this.resetTimerTimeScale, duration);
    }

    resetTimerTimeScale() {
        this.timerTimeScale = 1;
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
