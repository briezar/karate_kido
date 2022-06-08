
import { _decorator, Component, Node, systemEvent, SystemEventType } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TapToPlay
 * DateTime = Thu Mar 31 2022 16:51:14 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = TapToPlay.ts
 * FileBasenameNoExtension = TapToPlay
 * URL = db://assets/Scripts/TapToPlay.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('TapToPlay')
export class TapToPlay extends Component {
    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, () => {
            this.scheduleOnce(this.play, 0.1);
        }, this);

        this.node.children[0].on(Node.EventType.TOUCH_START, () => {
            this.scheduleOnce(this.play, 0.1);
        });
    }

    update() {
        if (!GameController.Instance.isPaused) {
            GameController.Instance.isPaused = true;
        }
    }

    play() {
        GameController.Instance.timerBar.node.active = true;
        GameController.Instance.isPaused = false;
        GameController.Instance.playerMovement.unschedulePlayIdleAnim();
        this.node.children[0].off(Node.EventType.TOUCH_START, () => {
            this.scheduleOnce(this.play, 0.1);
        });

        systemEvent.off(SystemEventType.KEY_DOWN, () => {
            this.scheduleOnce(this.play, 0.1);
        }, this);
        this.node.destroy();

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
