System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, systemEvent, SystemEventType, KeyCode, resources, SpriteFrame, Sprite, RigidBody2D, Vec2, randomRange, sys, randomRangeInt, GameController, SoundManager, TreeManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _crd, ccclass, property, PlayerMovement;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameController(extras) {
    _reporterNs.report("GameController", "./GameController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTreeManager(extras) {
    _reporterNs.report("TreeManager", "./TreeManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      systemEvent = _cc.systemEvent;
      SystemEventType = _cc.SystemEventType;
      KeyCode = _cc.KeyCode;
      resources = _cc.resources;
      SpriteFrame = _cc.SpriteFrame;
      Sprite = _cc.Sprite;
      RigidBody2D = _cc.RigidBody2D;
      Vec2 = _cc.Vec2;
      randomRange = _cc.randomRange;
      sys = _cc.sys;
      randomRangeInt = _cc.randomRangeInt;
    }, function (_unresolved_2) {
      GameController = _unresolved_2.GameController;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      TreeManager = _unresolved_4.TreeManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "41141iF1EBM241YAmD8Eq9A", "PlayerMovement", undefined);

      ({
        ccclass,
        property
      } = _decorator);
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

      _export("PlayerMovement", PlayerMovement = (_dec = ccclass('PlayerMovement'), _dec2 = property({
        type: _crd && TreeManager === void 0 ? (_reportPossibleCrUseOfTreeManager({
          error: Error()
        }), TreeManager) : TreeManager
      }), _dec3 = property({
        type: SpriteFrame
      }), _dec4 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = class PlayerMovement extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "treeManager", _descriptor, this);

          _defineProperty(this, "distanceFromTree", void 0);

          _defineProperty(this, "beltLevel", 0);

          _defineProperty(this, "spriteDirectory", [["char-1/spriteFrame", "char-hit/spriteFrame", "char-kick/spriteFrame"], ["char-1/spriteFrame", "char-hit/spriteFrame", "char-kick/spriteFrame"]]);

          _initializerDefineProperty(this, "idleAnimSpFr", _descriptor2, this);

          _defineProperty(this, "idleAnimFrame", 0);

          _initializerDefineProperty(this, "deathAnimSpFr", _descriptor3, this);

          _defineProperty(this, "spriteArray", []);

          _defineProperty(this, "sprite", void 0);

          _defineProperty(this, "rigidBody2D", void 0);
        }

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

        onKeyDown(event) {
          if ((_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.isLost || (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.isPaused) return;

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
            (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).Instance.playSound((_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).Instance.bonkSound);
          }, 0.1);
          this.schedule(() => {
            let deathSprite = this.deathAnimSpFr.shift();
            this.sprite.spriteFrame = deathSprite;
          }, 0.15, 2, 0.1);
        }

        knockAway() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).Instance.playSound((_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).Instance.punchSound);
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
        } //update (deltaTime: number) {
        //}


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "treeManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "idleAnimSpFr", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "deathAnimSpFr", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=PlayerMovement.js.map