System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Prefab, instantiate, RigidBody2D, Vec2, UITransform, GameController, SoundManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _crd, ccclass, property, TreeManager;

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

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      RigidBody2D = _cc.RigidBody2D;
      Vec2 = _cc.Vec2;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      GameController = _unresolved_2.GameController;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
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
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = class TreeManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "treePrefab", _descriptor, this);

          _initializerDefineProperty(this, "treeWithStickPrefab", _descriptor2, this);

          _defineProperty(this, "playerMovement", void 0);

          _defineProperty(this, "treeArray", []);

          _defineProperty(this, "treeHeight", void 0);

          _defineProperty(this, "dropSpeed", 1000);
        }

        start() {
          this.populateStartingTrees();
        }

        update(deltaTime) {
          //Move to position when chop fast
          if (this.treeArray[0].position.y > this.treeHeight) {
            this.treeArray[0].setPosition(0, this.treeHeight, 0);
          } //Drop first block


          if (this.treeArray[0].position.y > 0.01) {
            this.treeArray[0].setPosition(0, this.treeArray[0].position.y - this.dropSpeed * deltaTime, 0);
          } else if (this.treeArray[0].position.y < 0.01) {
            this.treeArray[0].setPosition(0, 0, 0);
          } //Next block sticks to previous block


          for (var i = 1; i < this.treeArray.length; i++) {
            this.treeArray[i].setPosition(0, this.treeArray[i - 1].position.y + this.treeHeight, 0);
          }
        }

        chopTree() {
          if (this.playerMovement.node.scale.x == this.treeArray[0].scale.x && this.treeArray[0].name == "TreeWithStick") {
            this.playerMovement.knockAway();
            (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
              error: Error()
            }), GameController) : GameController).Instance.lose();
            return;
          }

          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).Instance.playWoodChopSound();
          (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.timer += 0.5;
          if ((_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.timer > (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.maxTime) (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.timer = (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
            error: Error()
          }), GameController) : GameController).Instance.maxTime;
          var choppedTree = this.treeArray.shift();
          choppedTree.getComponent(RigidBody2D).linearVelocity = new Vec2(this.playerMovement.node.scale.x * -100, 0);
          console.log(choppedTree.getComponent(RigidBody2D).linearVelocity);
          this.scheduleOnce(() => {
            choppedTree.destroy();
          }, 1);
          this.addRandomTree();

          if (this.playerMovement.node.scale.x == this.treeArray[0].scale.x && this.treeArray[0].name == "TreeWithStick") {
            this.playerMovement.knockDown();
            (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
              error: Error()
            }), GameController) : GameController).Instance.lose();
          }
        }

        populateStartingTrees() {
          this.treeArray[0] = this.node.getChildByName("Tree");
          this.treeHeight = this.treeArray[0].getComponent(UITransform).height;
          this.treeArray[1] = instantiate(this.treePrefab);
          this.treeArray[1].setParent(this.node);
          this.treeArray[1].setPosition(0, this.treeHeight, 0);

          for (var i = 2; i < 10; i++) {
            this.addRandomTree();
          }
        }

        addRandomTree() {
          var tree;

          if (this.treeArray[this.treeArray.length - 1].name == "TreeWithStick") {
            tree = instantiate(this.treePrefab);
          } else {
            if (Math.random() > 0.5) {
              tree = instantiate(this.treePrefab);
            } else {
              tree = instantiate(this.treeWithStickPrefab);
              if (Math.random() > 0.5) tree.setScale(-1, 1, 1); //flip
            }
          }

          tree.setParent(this.node);
          tree.setPosition(0, this.treeHeight * this.treeArray.length, 0);
          this.treeArray.push(tree);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "treePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "treeWithStickPrefab", [_dec3], {
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
//# sourceMappingURL=TreeManager.js.map