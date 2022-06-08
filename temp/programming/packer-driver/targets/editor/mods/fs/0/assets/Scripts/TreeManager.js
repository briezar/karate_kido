System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Prefab, instantiate, Vec3, UITransform, tween, SpriteFrame, GameController, SoundManager, TreeBlock, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp, _crd, ccclass, property, TreeManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameController(extras) {
    _reporterNs.report("GameController", "./GameController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerMovement(extras) {
    _reporterNs.report("PlayerMovement", "./PlayerMovement", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTreeBlock(extras) {
    _reporterNs.report("TreeBlock", "./TreeBlock", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
      tween = _cc.tween;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      GameController = _unresolved_2.GameController;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      TreeBlock = _unresolved_4.TreeBlock;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "db978UlVTlNEJqWablBN1sC", "TreeManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);
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

      _export("TreeManager", TreeManager = (_dec = ccclass('TreeManager'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: SpriteFrame
      }), _dec4 = property({
        type: SpriteFrame
      }), _dec5 = property({
        type: SpriteFrame
      }), _dec6 = property({
        type: SpriteFrame
      }), _dec7 = property({
        type: SpriteFrame
      }), _dec8 = property({
        type: SpriteFrame
      }), _dec9 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = class TreeManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "treeBlockPrefab", _descriptor, this);

          _initializerDefineProperty(this, "hitStates2x", _descriptor2, this);

          _initializerDefineProperty(this, "hitStates3x", _descriptor3, this);

          _initializerDefineProperty(this, "hitStates4x", _descriptor4, this);

          _initializerDefineProperty(this, "stick2x", _descriptor5, this);

          _initializerDefineProperty(this, "stick3x", _descriptor6, this);

          _initializerDefineProperty(this, "stick4x", _descriptor7, this);

          _initializerDefineProperty(this, "lantern", _descriptor8, this);

          _defineProperty(this, "playerMovement", void 0);

          _defineProperty(this, "treeArray", []);

          _defineProperty(this, "treeHeight", void 0);

          _defineProperty(this, "dropSpeed", 1000);

          _defineProperty(this, "lastPosition", -1);

          _defineProperty(this, "timeSinceLastChop", 0);

          _defineProperty(this, "treeCounter", 0);

          _defineProperty(this, "noStickCounter", 0);

          _defineProperty(this, "isLastBlockNot1x", false);
        }

        onLoad() {
          this.populateStartingTrees();
        }

        update(deltaTime) {
          //Move to position when chop fast
          if (this.treeArray[0].node.position.y > this.treeHeight) {
            this.treeArray[0].node.setPosition(0, this.treeHeight, 0);
          } //Move first block


          if (this.treeArray[0].node.position.y > 0.01) {
            this.treeArray[0].node.setPosition(0, this.treeArray[0].node.position.y - this.dropSpeed * deltaTime, 0);
          } else if (this.treeArray[0].node.position.y < 0.01) {
            this.treeArray[0].node.setPosition(0, 0, 0);
          } //Next block sticks to previous block


          for (var i = 1; i < this.treeArray.length; i++) {
            this.treeArray[i].node.setPosition(0, this.treeArray[i - 1].node.position.y + this.treeHeight, 0);
          }

          this.timeSinceLastChop += deltaTime;
        }

        chopTree() {
          if (this.playerMovement.node.scale.x == this.treeArray[0].getStickSide()) {
            this.playerMovement.knockAway();
            (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
              error: Error()
            }), GameController) : GameController).Instance.lose();
            return;
          }

          (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.increaseMultiplier(0.15);
          let score = 10;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).Instance.playWoodChopSound();
          (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.addTimerTime(0.5 / (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.difficultyScale);
          let position = this.playerMovement.node.scale.x;

          if (position != this.lastPosition) {
            score += 2;

            if (this.timeSinceLastChop < 0.5) {
              score += 3;
            }
          }

          if (this.timeSinceLastChop < 0.2) score += 5;
          (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.addScore(score);
          this.checkForBuff(this.treeArray[1]);

          if (!this.treeArray[0].isChopped()) {
            return;
          }

          var choppedTree = this.treeArray.shift();
          tween(choppedTree.node).by(0.5, {
            position: new Vec3(this.playerMovement.node.scale.x * -300, 0)
          }, {
            onUpdate: () => {
              choppedTree.uiOpacity.opacity -= 10;
            },
            easing: 'quartOut'
          }).call(() => {
            choppedTree.reset();
          }).start();
          this.checkForBuff(this.treeArray[1]);
          this.lastPosition = this.playerMovement.node.scale.x;
          this.timeSinceLastChop = 0;

          if (this.playerMovement.node.scale.x == this.treeArray[0].getStickSide()) {
            this.playerMovement.knockDown();
            (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
              error: Error()
            }), GameController) : GameController).Instance.lose();
          }
        }

        checkForBuff(treeBlock) {
          if (this.playerMovement.node.scale.x != treeBlock.getStickSide()) {
            return;
          }

          switch (treeBlock.buffType) {
            case 0:
              break;

            case 1:
              treeBlock.playBuffAnimation();
              (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
                error: Error()
              }), GameController) : GameController).Instance.addTimerTime(3);
              console.log("Add time: 3");
              break;

            case 2:
              treeBlock.playBuffAnimation();
              (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
                error: Error()
              }), GameController) : GameController).Instance.setTimerTimeScale(0.5, 3);
              break;

            default:
          }
        }

        populateStartingTrees() {
          this.treeArray[0] = this.node.children[0].getComponent(_crd && TreeBlock === void 0 ? (_reportPossibleCrUseOfTreeBlock({
            error: Error()
          }), TreeBlock) : TreeBlock);
          this.treeArray[0].treeManager = this;
          this.treeHeight = this.treeArray[0].getComponent(UITransform).height;
          this.treeArray.push(instantiate(this.treeBlockPrefab).getComponent(_crd && TreeBlock === void 0 ? (_reportPossibleCrUseOfTreeBlock({
            error: Error()
          }), TreeBlock) : TreeBlock));
          this.treeArray[1].treeManager = this;
          this.treeArray[1].node.setParent(this.node);
          this.treeArray[1].node.setPosition(0, this.treeHeight * this.treeArray.length, 0);

          for (var i = 2; i < 20; i++) {
            this.treeArray.push(instantiate(this.treeBlockPrefab).getComponent(_crd && TreeBlock === void 0 ? (_reportPossibleCrUseOfTreeBlock({
              error: Error()
            }), TreeBlock) : TreeBlock));
            this.treeArray[i].treeManager = this;
            this.treeArray[i].node.setParent(this.node);
            this.setupNextTree();
          }
        }

        setupNextTree() {
          var tree = this.treeArray[this.treeArray.length - 1];

          if (this.treeArray[this.treeArray.length - 2].getStickSide() != 0) {
            //if tree below has stick
            tree.setup();
          } else {
            tree.setup(1, 'random');
          }

          tree.node.setPosition(0, this.treeHeight * this.treeArray.length, 0);
        }

        setupScaleWithTreeCounter() {
          this.treeCounter++;
          (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.setDifficultyScale(Math.min(1.7, 1 + this.treeCounter / 100));
          var tree = this.treeArray[this.treeArray.length - 1];
          tree.node.setPosition(0, this.treeHeight * this.treeArray.length, 0);
          let random = Math.random();

          if (random < 0.90 || this.isLastBlockNot1x) {
            this.setup1x();
            this.isLastBlockNot1x = false;
          } else if (random < 0.95) {
            this.setup2x();
          } else if (random < 0.98) {
            this.setup3x();
          } else {
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

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "treeBlockPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "hitStates2x", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hitStates3x", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "hitStates4x", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stick2x", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "stick3x", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "stick4x", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lantern", [_dec9], {
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
//# sourceMappingURL=TreeManager.js.map