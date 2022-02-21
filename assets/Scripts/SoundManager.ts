
import { _decorator, Component, Node, AudioSource, AudioClip, randomRangeInt, game } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SoundManager
 * DateTime = Sat Feb 19 2022 16:35:17 GMT+0700 (Indochina Time)
 * Author = briezar
 * FileBasename = SoundManager.ts
 * FileBasenameNoExtension = SoundManager
 * URL = db://assets/SoundManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SoundManager')
export class SoundManager extends Component {

    public static Instance: SoundManager = null;

    audioSource: AudioSource;
    @property({ type: AudioClip })
    public woodChopSounds: AudioClip[] = [];

    @property({ type: AudioClip })
    public bonkSound: AudioClip;

    @property({ type: AudioClip })
    public punchSound: AudioClip;

    onLoad() {
        game.addPersistRootNode(this.node);

        SoundManager.Instance = this;
        this.audioSource = this.getComponent(AudioSource);
    }

    playWoodChopSound() {
        this.audioSource.playOneShot(this.woodChopSounds[randomRangeInt(0, this.woodChopSounds.length)]);
    }

    playSound(clip: AudioClip) {
        this.audioSource.playOneShot(clip);
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
