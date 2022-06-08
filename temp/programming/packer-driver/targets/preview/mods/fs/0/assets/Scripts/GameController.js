System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Vec2, ProgressBar, Label, sys, Prefab, resources, instantiate, randomRange, Color, FloatingNumber, PlayerMovement, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _temp, _crd, ccclass, property, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfFloatingNumber(extras) {
    _reporterNs.report("FloatingNumber", "./FloatingNumber", _context.meta, extras);
  }

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
      Vec2 = _cc.Vec2;
      ProgressBar = _cc.ProgressBar;
      Label = _cc.Label;
      sys = _cc.sys;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      instantiate = _cc.instantiate;
      randomRange = _cc.randomRange;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      FloatingNumber = _unresolved_2.FloatingNumber;
    }, function (_unresolved_3) {
      PlayerMovement = _unresolved_3.PlayerMovement;
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
      }), _dec3 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = _class3 = class GameController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playerMovement", _descriptor, this);

          _initializerDefineProperty(this, "gameplay", _descriptor2, this);

          _defineProperty(this, "timerBar", void 0);

          _defineProperty(this, "multiplierBar", void 0);

          _defineProperty(this, "multiplierLabel", void 0);

          _defineProperty(this, "multiplier", 1);

          _defineProperty(this, "multiplierTimeScale", 1);

          _defineProperty(this, "multiplierProgress", 0);

          _defineProperty(this, "timer", void 0);

          _defineProperty(this, "timerTimeScale", 1);

          _defineProperty(this, "maxTime", 6);

          _defineProperty(this, "difficultyScale", 1);

          _defineProperty(this, "scoreLabel", void 0);

          _defineProperty(this, "touchInput", void 0);

          _defineProperty(this, "isLost", false);

          _defineProperty(this, "isPaused", false);

          _defineProperty(this, "score", 0);

          _defineProperty(this, "pool_floatingScore", []);

          _defineProperty(this, "confirmResetBestScoreNode", void 0);
        }

        onLoad() {
          GameController.Instance = this;
          resources.load("FloatingNumber", Prefab, (err, prefab) => {
            for (var i = 0; i < 20; i++) {
              this.pool_floatingScore.push(instantiate(prefab).getComponent(_crd && FloatingNumber === void 0 ? (_reportPossibleCrUseOfFloatingNumber({
                error: Error()
              }), FloatingNumber) : FloatingNumber));
              var node = this.pool_floatingScore[i].node;
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
          this.node.on(Node.EventType.TOUCH_START, event => {
            this.touchInput = event.getUILocation();
            if (this.isLost || this.isPaused) return;

            if (this.touchInput.x < 1080 / 2) {
              this.playerMovement.chopLeft();
            } else {
              this.playerMovement.chopRight();
            }
          }, this);
          this.isPaused = true;
          this.node.parent.setSiblingIndex(3);
        }

        update(deltaTime) {
          if (this.isPaused) return;
          this.timerBar.progress = Math.max(0.3, 0.3 + this.timer / this.maxTime * 0.7);
          this.multiplierBar.progress = Math.max(0.3, 0.3 + this.multiplierProgress * 0.7);
          this.multiplierLabel.string = this.multiplier.toFixed(1) + "x";

          if (this.timer <= 0 && !this.isLost) {
            this.playerMovement.knockAway();
            this.lose();
          } else {
            this.timer -= deltaTime * this.timerTimeScale * this.difficultyScale;

            if (this.multiplierProgress > 0) {
              this.multiplierProgress -= deltaTime * 0.3 * this.multiplier * this.multiplierTimeScale;
            } else {
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

        addScore(score) {
          var actualScore = Math.round(score * this.multiplier);
          this.score += actualScore;
          var bestScore = parseInt(sys.localStorage.getItem('bestScore'));
          this.scoreLabel.string = "Score: " + this.score + "\nBest Score: " + (this.score > bestScore ? this.score : bestScore);
          var floatingScore = this.findActiveFloatingScore();
          var label = floatingScore.label;
          var rigidBody2D = floatingScore.rigidBody;
          label.string = "+" + actualScore.toFixed();
          label.fontSize = 50 + score * 3;

          if (score < 15) {
            label.color = Color.WHITE;
          } else if (score < 20) {
            label.color = Color.CYAN;
          } else {
            label.color = Color.YELLOW;
          }

          rigidBody2D.applyForceToCenter(new Vec2(randomRange(-1, 1) * 500, randomRange(2000, 2500)), true);
        }

        findActiveFloatingScore() {
          for (var i = 0; i < this.pool_floatingScore.length; i++) {
            if (!this.pool_floatingScore[i].node.active) {
              this.pool_floatingScore[i].node.active = true;
              return this.pool_floatingScore[i];
            }
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

        increaseMultiplier(add) {
          this.multiplierProgress += add;

          if (this.multiplierProgress >= 1) {
            this.multiplierProgress = 0.01;
            this.multiplier += 0.1;
            this.setAndRevertMultiplierTimeScale(0, 0.4);
          }

          ;
        }

        setAndRevertMultiplierTimeScale(timeScale, duration) {
          this.multiplierTimeScale = timeScale;
          this.scheduleOnce(() => {
            this.multiplierTimeScale = 1;
          }, duration);
        }

        setDifficultyScale(diff) {
          this.difficultyScale = diff;
        }

        addTimerTime(time) {
          this.timer += time;
          if (this.timer > this.maxTime) this.timer = this.maxTime;
        }

        setTimerTimeScale(timeScale, duration) {
          console.log("Set time scale = " + timeScale + " for " + duration + " seconds");
          this.unschedule(this.resetTimerTimeScale);
          this.timerTimeScale = timeScale;
          this.scheduleOnce(this.resetTimerTimeScale, duration);
        }

        resetTimerTimeScale() {
          this.timerTimeScale = 1;
        }

      }, _defineProperty(_class3, "Instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerMovement", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameplay", [_dec3], {
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