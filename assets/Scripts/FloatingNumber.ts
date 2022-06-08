
import { _decorator, Component, Node, Label, UIOpacity, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FloatingNumber
 * DateTime = Tue Apr 05 2022 15:27:05 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = FloatingNumber.ts
 * FileBasenameNoExtension = FloatingNumber
 * URL = db://assets/Scripts/FloatingNumber.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('FloatingNumber')
export class FloatingNumber extends Component {
    rigidBody: RigidBody2D;
    uiOpacity: UIOpacity;
    label: Label;
    showDuration: number = 0;

    onLoad() {
        this.rigidBody = this.getComponent(RigidBody2D);
        this.uiOpacity = this.getComponent(UIOpacity);
        this.label = this.getComponent(Label);
    }

    update(deltaTime: number) {
        this.showDuration += deltaTime;
        if (this.showDuration > 0.5) {
            this.uiOpacity.opacity -= deltaTime * 255 * 2;
        }

        if (this.uiOpacity.opacity <= 0) {
            this.node.active = false;
        }
    }

    onDisable() {
        this.node.setPosition(0, -400, 0);
        this.rigidBody.linearVelocity = Vec2.ZERO;
        this.uiOpacity.opacity = 255;
        this.showDuration = 0;
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
