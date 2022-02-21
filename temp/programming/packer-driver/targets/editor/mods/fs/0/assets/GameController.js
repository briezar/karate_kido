System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, director, find, ProgressBar, PlayerMovement, _dec, _dec2, _class, _class2, _descriptor, _class3, _temp, _crd, ccclass, property, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerMovement(extras) {
    _reporterNs.report("PlayerMovement", "./PlayerMovement", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      director = _cc.director;
      find = _cc.find;
      ProgressBar = _cc.ProgressBar;
    }, function (_unresolved_2) {
      PlayerMovement = _unresolved_2.PlayerMovement;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c8e9bxs1nFFQal0VZZInoGS", "GameController", undefined);

      ({
        ccclass,
        property
      } = _decorator);
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

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec2 = property({
        type: _crd && PlayerMovement === void 0 ? (_reportPossibleCrUseOfPlayerMovement({
          error: Error()
        }), PlayerMovement) : PlayerMovement
      }), _dec(_class = (_class2 = (_temp = _class3 = class GameController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerMovement", _descriptor, this);

          _defineProperty(this, "timerBar", void 0);

          _defineProperty(this, "timer", void 0);

          _defineProperty(this, "maxTime", 6);

          _defineProperty(this, "touchInput", void 0);

          _defineProperty(this, "isLost", false);

          _defineProperty(this, "isPaused", false);
        }

        start() {
          GameController.Instance = this;
          this.timerBar = find("Canvas/Timer").getComponent(ProgressBar);
          this.timer = this.maxTime;
          this.node.on(Node.EventType.TOUCH_START, event => {
            this.touchInput = event.getUILocation();
            if (this.isLost || this.isPaused) return;

            if (this.touchInput.x < 1080 / 2) {
              this.playerMovement.chopLeft();
            } else {
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
          this.scheduleOnce(() => {
            director.loadScene("scene");
          }, 2);
        }

        update(deltaTime) {
          if (this.isPaused) return;
          this.timerBar.progress = this.timer / this.maxTime;

          if (this.timer <= 0 && !this.isLost) {
            this.playerMovement.knockAway();
            this.lose();
          } else {
            this.timer -= deltaTime;
          }
        }

      }, _defineProperty(_class3, "Instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerMovement", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
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
//# sourceMappingURL=GameController.js.map