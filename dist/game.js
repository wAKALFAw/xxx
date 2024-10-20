'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

let DefaultUI = class DefaultUI extends UIScript {
    constructor() {
        super(...arguments);
        this.anim1 = null;
        /**
        * 每一帧调用
        * 通过canUpdate可以开启关闭调用
        * dt 两帧调用的时间差，毫秒
        */
        //protected onUpdate(dt :number) {
        //}
        /**
         * 设置显示时触发
         */
        //protected onShow(...params:any[]) {
        //}
        /**
         * 设置不显示时触发
         */
        //protected onHide() {
        //}
        /**
         * 当这个UI界面是可以接收事件的时候
         * 手指或则鼠标触发一次Touch时触发
         * 返回事件是否处理了
         * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
         * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
         */
        //protected onTouchStarted(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        //	return EventReply.unHandled; //EventReply.handled
        //}
        /**
         * 手指或则鼠标再UI界面上移动时
         */
        //protected onTouchMoved(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        //	return EventReply.unHandled; //EventReply.handled
        //}
        /**
         * 手指或则鼠标离开UI界面时
         */
        //protected OnTouchEnded(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        //	return EventReply.unHandled; //EventReply.handled
        //}
        /**
         * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
         * 可以触发一次拖拽事件的开始生成
         * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
         */
        //protected onDragDetected(InGemotry :Geometry,InPointerEvent:PointerEvent):DragDropOperation {
        //	return this.newDragDrop(null);
        //}
        /**
         * 拖拽操作生成事件触发后经过这个UI时触发
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        //protected onDragOver(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
        //	return true;
        //}
        /**
         * 拖拽操作生成事件触发后在这个UI释放完成时
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        //protected onDrop(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
        //	return true;
        //}
        /**
         * 拖拽操作生成事件触发后进入这个UI时触发
         */
        //protected onDragEnter(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation) {
        //}
        /**
         * 拖拽操作生成事件触发后离开这个UI时触发
         */
        //protected onDragLeave(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
        //}
        /**
         * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
         */
        //protected onDragCancelled(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
        //}
    }
    /** 仅在游戏时间对非模板实例调用一次 */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        //找到对应的跳跃按钮
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump');
        const attackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack');
        //点击跳跃按钮,异步获取人物后执行跳跃
        jumpBtn.onPressed.add(() => {
            if (this.character) {
                this.character.changeState(CharacterStateType.Jumping);
            }
            else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this.character = player.character;
                    //角色执行跳跃功能
                    this.character.changeState(CharacterStateType.Jumping);
                });
            }
        });
        //点击攻击按钮,异步获取人物后执行攻击动作
        attackBtn.onPressed.add(() => {
            Player.asyncGetLocalPlayer().then((player) => {
                this.character = player.character;
                AssetUtil.asyncDownloadAsset("61245").then((res) => {
                    if (res) {
                        if (!this.anim1) {
                            this.anim1 = player.character.loadAnimation("61245");
                            this.anim1.slot = AnimSlot.Upper;
                        }
                        //角色执行攻击动作
                        if (this.anim1.isPlaying) {
                            return;
                        }
                        else {
                            this.anim1.play();
                        }
                    }
                });
            });
        });
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
};
DefaultUI = __decorate([
    UIBind('')
], DefaultUI);
var DefaultUI$1 = DefaultUI;

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI$1
});

var Config;
(function (Config) {
    //!玩家需要存储的信息
    class Data {
    }
    Config.Data = Data;
})(Config || (Config = {}));

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Config () { return Config; }
});

class PlayerClient extends ModuleC {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
}

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerClient: PlayerClient
});

class PlayerSaveData extends Subdata {
    /**返回玩家攻击力 */
    get akt() {
        return 0;
    }
    /**返回玩家防御力 */
    get def() {
        return 0;
    }
    /**返回玩家暴击率 */
    get crit() {
        return 0;
    }
    /**返回玩家暴击伤害 */
    get crit_damage() {
        return 0;
    }
    /**返回玩家穿透 */
    get penetrate() {
        return 0;
    }
}
__decorate([
    Decorator.persistence()
], PlayerSaveData.prototype, "_PlayerData", void 0);

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerSaveData: PlayerSaveData
});

class PlayerServer extends ModuleS {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
}

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerServer: PlayerServer
});

//!我上传测试一下
//逆光奔跑测试上传

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

const MWModuleMap = { 
     'E793F4E748068B7014AF149815249190': foreign1,
     '62B1847E4C33C8B531351499D6FDA255': foreign2,
     'FB1956404C60BD6CABA668B734A020BD': foreign3,
     '42AD676044AF0C14E62A58941B6C0A63': foreign4,
     '66050E384819432B4ADD4A9408E4E944': foreign5,
     '8426152A485C880AD1EB7295E44D00AA': foreign6,
};
const MWFileMapping = new WeakMap([[foreign1 || {}, "JavaScripts/DefaultUI"],
[foreign2 || {}, "JavaScripts/Player/Config"],
[foreign3 || {}, "JavaScripts/Player/PlayerClient"],
[foreign4 || {}, "JavaScripts/Player/PlayerSaveData"],
[foreign5 || {}, "JavaScripts/Player/PlayerServer"],
[foreign6 || {}, "JavaScripts/TestScript"]]);

exports.MWFileMapping = MWFileMapping;
exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
