System.register("chunks:///_virtual/FloatingNumber.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(i){"use strict";var t,o,e,n,r,s,a,c,u,h;return{setters:[function(i){t=i.inheritsLoose,o=i.defineProperty,e=i.assertThisInitialized},function(i){n=i.cclegacy,r=i._decorator,s=i.RigidBody2D,a=i.UIOpacity,c=i.Label,u=i.Vec2,h=i.Component}],execute:function(){var p;n._RF.push({},"0d0fewUXHxOQ52ge27J+3OT","FloatingNumber",void 0);var l=r.ccclass;r.property,i("FloatingNumber",l("FloatingNumber")(p=function(i){function n(){for(var t,n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return t=i.call.apply(i,[this].concat(r))||this,o(e(t),"rigidBody",void 0),o(e(t),"uiOpacity",void 0),o(e(t),"label",void 0),o(e(t),"showDuration",0),t}t(n,i);var r=n.prototype;return r.onLoad=function(){this.rigidBody=this.getComponent(s),this.uiOpacity=this.getComponent(a),this.label=this.getComponent(c)},r.update=function(i){this.showDuration+=i,this.showDuration>.5&&(this.uiOpacity.opacity-=255*i*2),this.uiOpacity.opacity<=0&&(this.node.active=!1)},r.onDisable=function(){this.node.setPosition(0,-400,0),this.rigidBody.linearVelocity=u.ZERO,this.uiOpacity.opacity=255,this.showDuration=0},n}(h))||p);n._RF.pop()}}}));

System.register("chunks:///_virtual/PlayerMovement.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./GameController.ts","./SoundManager.ts","./TreeManager.ts"],(function(e){"use strict";var t,i,n,r,s,o,a,h,c,p,l,u,d,m,y,f,A,g,F,v,S,b;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,n=e.initializerDefineProperty,r=e.assertThisInitialized,s=e.defineProperty},function(e){o=e.cclegacy,a=e._decorator,h=e.SpriteFrame,c=e.systemEvent,p=e.SystemEventType,l=e.Sprite,u=e.RigidBody2D,d=e.sys,m=e.resources,y=e.KeyCode,f=e.Vec2,A=e.randomRange,g=e.randomRangeInt,F=e.Component},function(e){v=e.GameController},function(e){S=e.SoundManager},function(e){b=e.TreeManager}],execute:function(){var D,M,I,C,k,L,R,T,P;o._RF.push({},"41141iF1EBM241YAmD8Eq9A","PlayerMovement",void 0);var w=a.ccclass,_=a.property;e("PlayerMovement",(D=w("PlayerMovement"),M=_({type:b}),I=_({type:h}),C=_({type:h}),D((R=t((L=function(e){function t(){for(var t,i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return t=e.call.apply(e,[this].concat(o))||this,n(r(t),"treeManager",R,r(t)),s(r(t),"distanceFromTree",void 0),s(r(t),"beltLevel",0),s(r(t),"spriteDirectory",[["char-1/spriteFrame","char-hit/spriteFrame","char-kick/spriteFrame"],["char-1/spriteFrame","char-hit/spriteFrame","char-kick/spriteFrame"]]),n(r(t),"idleAnimSpFr",T,r(t)),s(r(t),"idleAnimFrame",0),n(r(t),"deathAnimSpFr",P,r(t)),s(r(t),"spriteArray",[]),s(r(t),"sprite",void 0),s(r(t),"rigidBody2D",void 0),t}i(t,e);var o=t.prototype;return o.onLoad=function(){var e=this;c.on(p.KEY_DOWN,this.onKeyDown,this),this.sprite=this.getComponent(l),this.rigidBody2D=this.getComponent(u),this.distanceFromTree=Math.abs(this.node.position.x),this.treeManager.playerMovement=this,parseInt(d.localStorage.getItem("bestScore"))>1e3&&this.beltLevel++,m.load(this.spriteDirectory[this.beltLevel][0],h,(function(t,i){e.spriteArray.push(i),e.sprite.spriteFrame=i})),m.load(this.spriteDirectory[this.beltLevel][1],h,(function(t,i){e.spriteArray.push(i)})),m.load(this.spriteDirectory[this.beltLevel][2],h,(function(t,i){e.spriteArray.push(i)})),this.schedule(this.playIdleAnimation,.4,1/0)},o.onKeyDown=function(e){if(!v.Instance.isLost&&!v.Instance.isPaused)switch(e.keyCode){case y.ARROW_LEFT:case y.KEY_A:this.chopLeft();break;case y.ARROW_RIGHT:case y.KEY_D:this.chopRight()}},o.chopRight=function(){this.node.setScale(1,1,1),this.node.setPosition(this.distanceFromTree,this.node.position.y),this.playChopAnimation(),this.treeManager.chopTree()},o.chopLeft=function(){this.node.setScale(-1,1,1),this.node.setPosition(-this.distanceFromTree,this.node.position.y),this.playChopAnimation(),this.treeManager.chopTree()},o.knockDown=function(){var e=this;this.unschedule(this.stopChopAnimation),this.scheduleOnce((function(){S.Instance.playSound(S.Instance.bonkSound)}),.1),this.schedule((function(){var t=e.deathAnimSpFr.shift();e.sprite.spriteFrame=t}),.15,2,.1)},o.knockAway=function(){S.Instance.playSound(S.Instance.punchSound),this.rigidBody2D.angularVelocity=-10*this.node.scale.x,this.rigidBody2D.linearVelocity=new f(70*this.node.scale.x,A(15,20))},o.playChopAnimation=function(){var e=this;this.unschedule(this.stopChopAnimation),this.sprite.spriteFrame=this.spriteArray[0],this.scheduleOnce((function(){e.sprite.spriteFrame=e.spriteArray[g(1,e.spriteArray.length)]}),.05),this.scheduleOnce(this.stopChopAnimation,.2)},o.stopChopAnimation=function(){this.sprite.spriteFrame=this.spriteArray[0]},o.playIdleAnimation=function(){var e=Math.min(this.idleAnimSpFr.length-1,this.idleAnimFrame);this.sprite.spriteFrame=this.idleAnimSpFr[e],this.idleAnimFrame++,this.idleAnimFrame%=4},o.unschedulePlayIdleAnim=function(){this.unschedule(this.playIdleAnimation)},t}(F)).prototype,"treeManager",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),T=t(L.prototype,"idleAnimSpFr",[I],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),P=t(L.prototype,"deathAnimSpFr",[C],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),k=L))||k));o._RF.pop()}}}));

System.register("chunks:///_virtual/SoundManager.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(o){"use strict";var n,e,t,r,i,u,a,c,l,p,d;return{setters:[function(o){n=o.defineProperty,e=o.applyDecoratedDescriptor,t=o.inheritsLoose,r=o.assertThisInitialized,i=o.initializerDefineProperty},function(o){u=o.cclegacy,a=o._decorator,c=o.AudioClip,l=o.AudioSource,p=o.randomRangeInt,d=o.Component}],execute:function(){var s,h,S,y,f,g,b,v,w,C,m;u._RF.push({},"7cad0g3tA5Ltq0k3+lr5PAE","SoundManager",void 0);var z=a.ccclass,A=a.property;o("SoundManager",(s=z("SoundManager"),h=A({type:c}),S=A({type:c}),y=A({type:c}),s((m=C=function(o){function e(){for(var e,t=arguments.length,u=new Array(t),a=0;a<t;a++)u[a]=arguments[a];return e=o.call.apply(o,[this].concat(u))||this,n(r(e),"audioSource",void 0),i(r(e),"woodChopSounds",b,r(e)),i(r(e),"bonkSound",v,r(e)),i(r(e),"punchSound",w,r(e)),e}t(e,o);var u=e.prototype;return u.onLoad=function(){e.Instance=this,this.audioSource=this.getComponent(l)},u.playWoodChopSound=function(){this.audioSource.playOneShot(this.woodChopSounds[p(0,this.woodChopSounds.length)])},u.playSound=function(o){this.audioSource.playOneShot(o)},e}(d),n(C,"Instance",null),b=e((g=m).prototype,"woodChopSounds",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),v=e(g.prototype,"bonkSound",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),w=e(g.prototype,"punchSound",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),f=g))||f));u._RF.pop()}}}));

System.register("chunks:///_virtual/GameController.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./FloatingNumber.ts","./PlayerMovement.ts"],(function(e){"use strict";var t,i,r,o,s,l,n,a,c,m,h,u,p,d,g,S,f,v,y,T;return{setters:[function(e){t=e.defineProperty,i=e.applyDecoratedDescriptor,r=e.inheritsLoose,o=e.initializerDefineProperty,s=e.assertThisInitialized},function(e){l=e.cclegacy,n=e._decorator,a=e.Prefab,c=e.resources,m=e.instantiate,h=e.Label,u=e.sys,p=e.ProgressBar,d=e.Node,g=e.Color,S=e.Vec2,f=e.randomRange,v=e.Component},function(e){y=e.FloatingNumber},function(e){T=e.PlayerMovement}],execute:function(){var b,B,I,P,L,C,M,x,N;l._RF.push({},"c8e9bxs1nFFQal0VZZInoGS","GameController",void 0);var R=n.ccclass,_=n.property;e("GameController",(b=R("GameController"),B=_({type:T}),I=_({type:a}),b((N=x=function(e){function i(){for(var i,r=arguments.length,l=new Array(r),n=0;n<r;n++)l[n]=arguments[n];return i=e.call.apply(e,[this].concat(l))||this,o(s(i),"playerMovement",C,s(i)),o(s(i),"gameplay",M,s(i)),t(s(i),"timerBar",void 0),t(s(i),"multiplierBar",void 0),t(s(i),"multiplierLabel",void 0),t(s(i),"multiplier",1),t(s(i),"multiplierTimeScale",1),t(s(i),"multiplierProgress",0),t(s(i),"timer",void 0),t(s(i),"timerTimeScale",1),t(s(i),"maxTime",6),t(s(i),"difficultyScale",1),t(s(i),"scoreLabel",void 0),t(s(i),"touchInput",void 0),t(s(i),"isLost",!1),t(s(i),"isPaused",!1),t(s(i),"score",0),t(s(i),"pool_floatingScore",[]),t(s(i),"confirmResetBestScoreNode",void 0),i}r(i,e);var l=i.prototype;return l.onLoad=function(){var e=this;i.Instance=this,c.load("FloatingNumber",a,(function(t,i){for(var r=0;r<20;r++){e.pool_floatingScore.push(m(i).getComponent(y));var o=e.pool_floatingScore[r].node;o.active=!1,o.setParent(e.node.parent)}})),this.scoreLabel=this.node.parent.getChildByName("Score").getComponent(h),null==u.localStorage.getItem("bestScore")&&u.localStorage.setItem("bestScore","0"),window.sessionStorage.setItem("score","0"),this.scoreLabel.string="Score: "+this.score+"\nBest Score: "+parseInt(u.localStorage.getItem("bestScore")),this.confirmResetBestScoreNode=this.node.parent.getChildByName("ConfimResetBestScore"),this.timerBar=this.node.parent.getChildByName("Timer").getComponent(p),this.multiplierBar=this.node.parent.getChildByName("Multiplier").getComponent(p),this.multiplierLabel=this.multiplierBar.getComponentInChildren(h),this.timer=this.maxTime,this.node.on(d.EventType.TOUCH_START,(function(t){e.touchInput=t.getUILocation(),e.isLost||e.isPaused||(e.touchInput.x<540?e.playerMovement.chopLeft():e.playerMovement.chopRight())}),this),this.isPaused=!0,this.node.parent.setSiblingIndex(3)},l.update=function(e){this.isPaused||(this.timerBar.progress=Math.max(.3,.3+this.timer/this.maxTime*.7),this.multiplierBar.progress=Math.max(.3,.3+.7*this.multiplierProgress),this.multiplierLabel.string=this.multiplier.toFixed(1)+"x",this.timer<=0&&!this.isLost?(this.playerMovement.knockAway(),this.lose()):(this.timer-=e*this.timerTimeScale*this.difficultyScale,this.multiplierProgress>0?this.multiplierProgress-=.3*e*this.multiplier*this.multiplierTimeScale:this.multiplier>=1.1&&(this.multiplierProgress=1,this.multiplier-=.1)))},l.lose=function(){var e=this;this.isLost=!0,this.score>parseInt(u.localStorage.getItem("bestScore"))&&(this.scoreLabel.string="Score: "+this.score+"\nBest Score: "+this.score,u.localStorage.setItem("bestScore",this.score.toString())),this.scheduleOnce((function(){e.node.parent.destroy(),m(e.gameplay).setParent(e.node.parent.parent)}),2)},l.addScore=function(e){var t=Math.round(e*this.multiplier);this.score+=t;var i=parseInt(u.localStorage.getItem("bestScore"));this.scoreLabel.string="Score: "+this.score+"\nBest Score: "+(this.score>i?this.score:i);var r=this.findActiveFloatingScore(),o=r.label,s=r.rigidBody;o.string="+"+t.toFixed(),o.fontSize=50+3*e,o.color=e<15?g.WHITE:e<20?g.CYAN:g.YELLOW,s.applyForceToCenter(new S(500*f(-1,1),f(2e3,2500)),!0)},l.findActiveFloatingScore=function(){for(var e=0;e<this.pool_floatingScore.length;e++)if(!this.pool_floatingScore[e].node.active)return this.pool_floatingScore[e].node.active=!0,this.pool_floatingScore[e]},l.resetBestScore=function(){u.localStorage.setItem("bestScore","0"),this.scoreLabel.string="Score: "+this.score+"\nBest Score: 0"},l.confirmResetBestScore=function(){this.confirmResetBestScoreNode.active=!this.confirmResetBestScoreNode.active,this.isPaused=this.confirmResetBestScoreNode.active},l.increaseMultiplier=function(e){this.multiplierProgress+=e,this.multiplierProgress>=1&&(this.multiplierProgress=.01,this.multiplier+=.1,this.setAndRevertMultiplierTimeScale(0,.4))},l.setAndRevertMultiplierTimeScale=function(e,t){var i=this;this.multiplierTimeScale=e,this.scheduleOnce((function(){i.multiplierTimeScale=1}),t)},l.setDifficultyScale=function(e){this.difficultyScale=e},l.addTimerTime=function(e){this.timer+=e,this.timer>this.maxTime&&(this.timer=this.maxTime)},l.setTimerTimeScale=function(e,t){console.log("Set time scale = "+e+" for "+t+" seconds"),this.unschedule(this.resetTimerTimeScale),this.timerTimeScale=e,this.scheduleOnce(this.resetTimerTimeScale,t)},l.resetTimerTimeScale=function(){this.timerTimeScale=1},i}(v),t(x,"Instance",null),C=i((L=N).prototype,"playerMovement",[B],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),M=i(L.prototype,"gameplay",[I],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),P=L))||P));l._RF.pop()}}}));

System.register("chunks:///_virtual/TreeManager.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./GameController.ts","./SoundManager.ts","./TreeBlock.ts"],(function(e){"use strict";var t,r,i,n,s,a,o,h,c,l,p,u,y,d,f,g,m;return{setters:[function(e){t=e.applyDecoratedDescriptor,r=e.inheritsLoose,i=e.initializerDefineProperty,n=e.assertThisInitialized,s=e.defineProperty},function(e){a=e.cclegacy,o=e._decorator,h=e.Prefab,c=e.SpriteFrame,l=e.tween,p=e.Vec3,u=e.UITransform,y=e.instantiate,d=e.Component},function(e){f=e.GameController},function(e){g=e.SoundManager},function(e){m=e.TreeBlock}],execute:function(){var A,x,S,b,k,v,M,T,C,P,B,w,L,I,z,N,H,F,D;a._RF.push({},"db978UlVTlNEJqWablBN1sC","TreeManager",void 0);var _=o.ccclass,U=o.property;e("TreeManager",(A=_("TreeManager"),x=U({type:h}),S=U({type:c}),b=U({type:c}),k=U({type:c}),v=U({type:c}),M=U({type:c}),T=U({type:c}),C=U({type:c}),A((w=t((B=function(e){function t(){for(var t,r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return t=e.call.apply(e,[this].concat(a))||this,i(n(t),"treeBlockPrefab",w,n(t)),i(n(t),"hitStates2x",L,n(t)),i(n(t),"hitStates3x",I,n(t)),i(n(t),"hitStates4x",z,n(t)),i(n(t),"stick2x",N,n(t)),i(n(t),"stick3x",H,n(t)),i(n(t),"stick4x",F,n(t)),i(n(t),"lantern",D,n(t)),s(n(t),"playerMovement",void 0),s(n(t),"treeArray",[]),s(n(t),"treeHeight",void 0),s(n(t),"dropSpeed",1e3),s(n(t),"lastPosition",-1),s(n(t),"timeSinceLastChop",0),s(n(t),"treeCounter",0),s(n(t),"noStickCounter",0),s(n(t),"isLastBlockNot1x",!1),t}r(t,e);var a=t.prototype;return a.onLoad=function(){this.populateStartingTrees()},a.update=function(e){this.treeArray[0].node.position.y>this.treeHeight&&this.treeArray[0].node.setPosition(0,this.treeHeight,0),this.treeArray[0].node.position.y>.01?this.treeArray[0].node.setPosition(0,this.treeArray[0].node.position.y-this.dropSpeed*e,0):this.treeArray[0].node.position.y<.01&&this.treeArray[0].node.setPosition(0,0,0);for(var t=1;t<this.treeArray.length;t++)this.treeArray[t].node.setPosition(0,this.treeArray[t-1].node.position.y+this.treeHeight,0);this.timeSinceLastChop+=e},a.chopTree=function(){if(this.playerMovement.node.scale.x==this.treeArray[0].getStickSide())return this.playerMovement.knockAway(),void f.Instance.lose();f.Instance.increaseMultiplier(.15);var e=10;if(g.Instance.playWoodChopSound(),f.Instance.addTimerTime(.5/f.Instance.difficultyScale),this.playerMovement.node.scale.x!=this.lastPosition&&(e+=2,this.timeSinceLastChop<.5&&(e+=3)),this.timeSinceLastChop<.2&&(e+=5),f.Instance.addScore(e),this.checkForBuff(this.treeArray[1]),this.treeArray[0].isChopped()){var t=this.treeArray.shift();l(t.node).by(.5,{position:new p(-300*this.playerMovement.node.scale.x,0)},{onUpdate:function(){t.uiOpacity.opacity-=10},easing:"quartOut"}).call((function(){t.reset()})).start(),this.checkForBuff(this.treeArray[1]),this.lastPosition=this.playerMovement.node.scale.x,this.timeSinceLastChop=0,this.playerMovement.node.scale.x==this.treeArray[0].getStickSide()&&(this.playerMovement.knockDown(),f.Instance.lose())}},a.checkForBuff=function(e){if(this.playerMovement.node.scale.x==e.getStickSide())switch(e.buffType){case 0:break;case 1:e.playBuffAnimation(),f.Instance.addTimerTime(3),console.log("Add time: 3");break;case 2:e.playBuffAnimation(),f.Instance.setTimerTimeScale(.5,3)}},a.populateStartingTrees=function(){this.treeArray[0]=this.node.children[0].getComponent(m),this.treeArray[0].treeManager=this,this.treeHeight=this.treeArray[0].getComponent(u).height,this.treeArray.push(y(this.treeBlockPrefab).getComponent(m)),this.treeArray[1].treeManager=this,this.treeArray[1].node.setParent(this.node),this.treeArray[1].node.setPosition(0,this.treeHeight*this.treeArray.length,0);for(var e=2;e<20;e++)this.treeArray.push(y(this.treeBlockPrefab).getComponent(m)),this.treeArray[e].treeManager=this,this.treeArray[e].node.setParent(this.node),this.setupNextTree()},a.setupNextTree=function(){var e=this.treeArray[this.treeArray.length-1];0!=this.treeArray[this.treeArray.length-2].getStickSide()?e.setup():e.setup(1,"random"),e.node.setPosition(0,this.treeHeight*this.treeArray.length,0)},a.setupScaleWithTreeCounter=function(){this.treeCounter++,f.Instance.setDifficultyScale(Math.min(1.7,1+this.treeCounter/100)),this.treeArray[this.treeArray.length-1].node.setPosition(0,this.treeHeight*this.treeArray.length,0);var e=Math.random();e<.9||this.isLastBlockNot1x?(this.setup1x(),this.isLastBlockNot1x=!1):e<.95?this.setup2x():e<.98?this.setup3x():this.setup4x()},a.setup4x=function(){this.treeArray[this.treeArray.length-1].setup(4,"random",this.hitStates4x,this.stick4x,"random",this.lantern),this.isLastBlockNot1x=!0},a.setup3x=function(){this.treeArray[this.treeArray.length-1].setup(3,"random",this.hitStates3x,this.stick3x,"random",this.lantern),this.isLastBlockNot1x=!0},a.setup2x=function(){this.treeArray[this.treeArray.length-1].setup(2,"random",this.hitStates2x,this.stick2x,"random",this.lantern),this.isLastBlockNot1x=!0},a.setup1x=function(){this.treeArray[this.treeArray.length-1].setup(1,"random",[],[],"random",this.lantern)},t}(d)).prototype,"treeBlockPrefab",[x],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),L=t(B.prototype,"hitStates2x",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),I=t(B.prototype,"hitStates3x",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),z=t(B.prototype,"hitStates4x",[k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),N=t(B.prototype,"stick2x",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),H=t(B.prototype,"stick3x",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),F=t(B.prototype,"stick4x",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),D=t(B.prototype,"lantern",[C],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),P=B))||P));a._RF.pop()}}}));

System.register("chunks:///_virtual/BackgroundCanvas.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var i,e,o,r,s,p,a,n,c,d,u;return{setters:[function(t){i=t.applyDecoratedDescriptor,e=t.inheritsLoose,o=t.initializerDefineProperty,r=t.assertThisInitialized,s=t.defineProperty},function(t){p=t.cclegacy,a=t._decorator,n=t.SpriteFrame,c=t.Sprite,d=t.UIOpacity,u=t.Component}],execute:function(){var h,l,g,S,y,m,b;p._RF.push({},"eeca7MwwvRFj5oZIE6WSsIC","BackgroundCanvas",void 0);var w=a.ccclass,I=a.property;t("BackgroundCanvas",(h=w("BackgroundCanvas"),l=I({type:n}),g=I({type:n}),h((m=i((y=function(t){function i(){for(var i,e=arguments.length,p=new Array(e),a=0;a<e;a++)p[a]=arguments[a];return i=t.call.apply(t,[this].concat(p))||this,o(r(i),"backgrounds",m,r(i)),o(r(i),"clouds",b,r(i)),s(r(i),"cloudSpFrames",[]),s(r(i),"bgIndex",0),s(r(i),"swapBgTime",6),s(r(i),"cloudSprites",[]),s(r(i),"cloudsUIOpacity",[]),s(r(i),"cloudSwapSprites",[]),s(r(i),"cloudsSwapUIOpacity",[]),s(r(i),"backgroundSprite",void 0),s(r(i),"bgSwapSprite",void 0),s(r(i),"bgSwapSpriteUIOpacity",void 0),i}e(i,t);var p=i.prototype;return p.onLoad=function(){this.backgroundSprite=this.node.getChildByName("Background").getComponent(c),this.bgSwapSprite=this.backgroundSprite.node.getChildByName("Swap").getComponent(c),this.cloudSprites.push(this.backgroundSprite.node.getChildByName("CloudNear").getComponent(c)),this.cloudSprites.push(this.backgroundSprite.node.getChildByName("CloudMid").getComponent(c)),this.cloudSprites.push(this.backgroundSprite.node.getChildByName("CloudFar").getComponent(c));for(var t=0;t<this.cloudSprites.length;t++)this.cloudSwapSprites.push(this.cloudSprites[t].getComponentInChildren(c)),this.cloudsSwapUIOpacity.push(this.cloudSwapSprites[t].getComponent(d));this.bgSwapSpriteUIOpacity=this.bgSwapSprite.getComponent(d),this.bgSwapSpriteUIOpacity.opacity=0,this.bgSwapSprite.spriteFrame=this.backgrounds[this.getNextBgIndex()],this.bgIndex=this.getNextBgIndex();for(t=0;t<6;t++){this.cloudSpFrames.push([]);for(var i=0;i<3;i++)this.cloudSpFrames[t].push(this.clouds.shift())}},p.update=function(t){console.log(this.backgroundSprite.spriteFrame.name+"\n"+this.cloudSprites[0].spriteFrame.name);for(var i=0;i<this.cloudSprites.length;i++)this.cloudsSwapUIOpacity[i].opacity+=t*(255/this.swapBgTime),this.cloudSprites[i].node.worldPosition.x<-300&&this.cloudSprites[i].node.setWorldPosition(1600,this.cloudSprites[i].node.worldPosition.y,0);if(this.bgSwapSpriteUIOpacity.opacity+=t*(255/this.swapBgTime),this.bgSwapSpriteUIOpacity.opacity>=255){this.backgroundSprite.spriteFrame=this.bgSwapSprite.spriteFrame,this.bgSwapSpriteUIOpacity.opacity=0,this.bgSwapSprite.spriteFrame=this.backgrounds[this.getNextBgIndex()];for(i=0;i<this.cloudSprites.length;i++)this.cloudSprites[i].spriteFrame=this.cloudSwapSprites[i].spriteFrame,this.cloudsSwapUIOpacity[i].opacity=0,this.cloudSwapSprites[i].spriteFrame=this.cloudSpFrames[this.getNextBgIndex()][i];this.bgIndex=this.getNextBgIndex()}},p.moveClouds=function(t){for(var i=0;i<this.cloudSprites.length;i++){var e=this.cloudSprites[i],o=this.cloudsUIOpacity[i];this.bgSwapSpriteUIOpacity.opacity>=100&&o.opacity,o.opacity-=t*(255/this.swapBgTime)*4,o.opacity<=0&&(e.spriteFrame=this.cloudSpFrames[this.bgIndex][i],o.opacity=5),e.node.worldPosition.x<-300&&e.node.setWorldPosition(1600,e.node.worldPosition.y,0)}},p.getNextBgIndex=function(){return(this.bgIndex+1)%this.backgrounds.length},i}(u)).prototype,"backgrounds",[l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),b=i(y.prototype,"clouds",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),S=y))||S));p._RF.pop()}}}));

System.register("chunks:///_virtual/TreeBlock.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var e,i,s,r,a,n,h,c,o,p,f,u;return{setters:[function(t){e=t.inheritsLoose,i=t.defineProperty,s=t.assertThisInitialized},function(t){r=t.cclegacy,a=t._decorator,n=t.UITransform,h=t.Sprite,c=t.UIOpacity,o=t.randomRangeInt,p=t.tween,f=t.Vec3,u=t.Component}],execute:function(){var l;r._RF.push({},"f641e5jMQ1NgJnk8QMElZEm","TreeBlock",void 0);var d,S=a.ccclass;a.property;!function(t){t[t.None=0]="None",t[t.AddTime=1]="AddTime",t[t.SlowTime=2]="SlowTime"}(d||(d={}));t("TreeBlock",S("TreeBlock")(l=function(t){function r(){for(var e,r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return e=t.call.apply(t,[this].concat(a))||this,i(s(e),"treeManager",void 0),i(s(e),"stickLeft",void 0),i(s(e),"stickLeftUIT",void 0),i(s(e),"stickLeftDefaultSpriteFrame",void 0),i(s(e),"stickRight",void 0),i(s(e),"stickRightUIT",void 0),i(s(e),"stickRightDefaultSpriteFrame",void 0),i(s(e),"ice",void 0),i(s(e),"lantern",void 0),i(s(e),"lanternUIOpacity",void 0),i(s(e),"currentHp",1),i(s(e),"maxHp",1),i(s(e),"buffType",void 0),i(s(e),"stickLeftSprite",void 0),i(s(e),"stickRightSprite",void 0),i(s(e),"hitStateSprite",void 0),i(s(e),"buffSprite",void 0),i(s(e),"uiOpacity",void 0),i(s(e),"hitSpriteFrames",[]),e}e(r,t);var a=r.prototype;return a.onLoad=function(){this.stickLeft=this.node.getChildByName("StickLeft"),this.stickLeftUIT=this.stickLeft.getComponent(n),this.stickLeftSprite=this.stickLeft.getComponent(h),this.stickLeftDefaultSpriteFrame=this.stickLeftSprite.spriteFrame,this.stickRight=this.node.getChildByName("StickRight"),this.stickRightUIT=this.stickRight.getComponent(n),this.stickRightSprite=this.stickRight.getComponent(h),this.stickRightDefaultSpriteFrame=this.stickRightSprite.spriteFrame,this.ice=this.node.getChildByName("Ice"),this.lantern=this.node.getChildByName("Lantern"),this.lanternUIOpacity=this.lantern.getComponent(c),this.hitStateSprite=this.node.getChildByName("HitState").getComponent(h),this.buffSprite=this.node.getChildByName("Lantern").getComponent(h),this.uiOpacity=this.getComponent(c)},a.getStickSide=function(){return this.stickLeft.activeInHierarchy?-1:this.stickRight.activeInHierarchy?1:0},a.setup=function(t,e,i,s,r,a){switch(void 0===t&&(t=1),void 0===i&&(i=[]),void 0===s&&(s=[]),this.currentHp=t,this.maxHp=t,this.treeManager.treeCounter>15&&Math.random()<.05&&(this.ice.active=!0),e){case"left":this.setupStickAndBuff(-1,s[0],r,a);break;case"right":this.setupStickAndBuff(1,s[1],r,a);break;case"random":if(0!=this.treeManager.treeArray[this.treeManager.treeArray.length-2].getStickSide())this.setupStickAndBuff(0);else{var n=Math.random();n<.5&&this.treeManager.noStickCounter<4?this.treeManager.noStickCounter++:n<.75?this.setupStickAndBuff(-1,s[0],r,a):this.setupStickAndBuff(1,s[1],r,a)}}i!=[]&&(this.hitSpriteFrames=i,this.hitStateSprite.spriteFrame=i[0])},a.setupStickAndBuff=function(t,e,i,s){void 0===e&&(e=null),void 0===i&&(i=null),void 0===s&&(s=null),this.treeManager.noStickCounter=0;var r=[250,320][o(0,2)];switch(t){case 0:break;case-1:this.stickLeft.active=!0,this.stickLeftUIT.width=r,null!=e&&(this.stickLeftSprite.spriteFrame=e);break;case 1:this.stickRight.active=!0,this.stickRightUIT.width=r,null!=e&&(this.stickRightSprite.spriteFrame=e)}if(null!=i){switch(this.lantern.active=!0,i){case"random":var a=Math.random();a<.9?(this.buffType=d.None,this.lantern.active=!1):a<.95?(this.buffType=d.SlowTime,this.buffSprite.node.setScale(t,1)):(this.buffType=d.AddTime,this.buffSprite.node.setScale(t,1));break;case"slowTime":this.buffType=d.SlowTime,this.buffSprite.node.setScale(t,1);break;case"addTime":this.buffType=d.AddTime,this.buffSprite.node.setScale(t,1)}this.buffSprite.spriteFrame=s[this.buffType-1]}},a.isChopped=function(){return this.ice.activeInHierarchy?this.ice.active=!1:this.currentHp--,this.hitSpriteFrames!=[]&&this.currentHp>0&&(this.hitStateSprite.spriteFrame=this.hitSpriteFrames[this.maxHp-this.currentHp]),0==this.currentHp},a.reset=function(){this.uiOpacity.opacity=255,this.stickLeft.active=!1,this.stickRight.active=!1,this.currentHp=1,this.maxHp=1,this.hitSpriteFrames=[],this.stickLeftSprite.spriteFrame=this.stickLeftDefaultSpriteFrame,this.stickRightSprite.spriteFrame=this.stickRightDefaultSpriteFrame,this.hitStateSprite.spriteFrame=null,this.ice.active=!1,this.lantern.active=!1,this.treeManager.treeArray.push(this),this.treeManager.setupScaleWithTreeCounter()},a.playBuffAnimation=function(){var t=this,e=this.lantern.scale;p(this.lantern).by(.5,{scale:new f(e.x,e.y)},{onUpdate:function(){t.lanternUIOpacity.opacity-=10},easing:"quartOut"}).call((function(){t.lantern.active=!1,t.lantern.setScale(e),t.lanternUIOpacity.opacity=255})).start()},r}(u))||l);r._RF.pop()}}}));

System.register("chunks:///_virtual/TapToPlay.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./GameController.ts"],(function(e){"use strict";var n,t,o,s,c,a,i,r;return{setters:[function(e){n=e.inheritsLoose},function(e){t=e.cclegacy,o=e._decorator,s=e.systemEvent,c=e.SystemEventType,a=e.Node,i=e.Component},function(e){r=e.GameController}],execute:function(){var u;t._RF.push({},"fa71edAJCpKGLD6xrS08VHW","TapToPlay",void 0);var l=o.ccclass;o.property,e("TapToPlay",l("TapToPlay")(u=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var o=t.prototype;return o.onLoad=function(){var e=this;s.on(c.KEY_DOWN,(function(){e.scheduleOnce(e.play,.1)}),this),this.node.children[0].on(a.EventType.TOUCH_START,(function(){e.scheduleOnce(e.play,.1)}))},o.update=function(){r.Instance.isPaused||(r.Instance.isPaused=!0)},o.play=function(){var e=this;r.Instance.timerBar.node.active=!0,r.Instance.isPaused=!1,r.Instance.playerMovement.unschedulePlayIdleAnim(),this.node.children[0].off(a.EventType.TOUCH_START,(function(){e.scheduleOnce(e.play,.1)})),s.off(c.KEY_DOWN,(function(){e.scheduleOnce(e.play,.1)}),this),this.node.destroy()},t}(i))||u);t._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./FloatingNumber.ts","./GameController.ts","./SoundManager.ts","./TreeBlock.ts","./TreeManager.ts","./PlayerMovement.ts","./BackgroundCanvas.ts","./TapToPlay.ts"],(function(){"use strict";return{setters:[null,null,null,null,null,null,null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});