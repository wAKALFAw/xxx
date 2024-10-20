//!玩家硬直系统（包含异常状态）
export namespace Stun {
    export enum Type {
        击飞,//?Airborne
        眩晕,//?Stunned
        冻结,
        灼烧,
        流血,
        减速,
        沉默,
        禁疗,
        变形,
        缚地,//?(禁止位移)
    }
    /**父类 */
    export class Base {
        /**硬直|异常类型 */
        protected _type: Type
        /**倒计时 */
        protected _timeout: number
        /**剩余时长 */
        protected _last: number
        /**作用对象的playerid */
        protected _playerid: number
        /**结束触发 */
        public onComplete = (callback?: () => void) => { if (callback) callback() }
        /**开始触发 */
        public onStart = (callback?: () => void) => { if (callback) callback() }
        /**中止 */
        public stop = (): void => { }
        /**开始 */
        public play = (): Type => { return this._type }
        constructor(type: Type) {
            this._type = type
            this._timeout = null
            this._last = 0
            this._playerid = null
        }
    }

    /**击飞 */
    export class Airborne extends Base {
        /**初始化
         * @param playerid 受硬直玩家的playerid
         * @param time 硬直持续时间
         */
        constructor(playerid: number, time: number) {
            super(Type.击飞)
            this._playerid = time
            this._last = time
        }
        play = () => {
            const player = Player.getPlayer(this._playerid)
            if (player) {
                if (player.character) {
                    this.onStart()

                }
            }


            return this._type
        }
    }

    // export class StunSystem {
    //     private static _instance: StunSystem
    //     public static get instance() {
    //         if (!StunSystem._instance) StunSystem._instance = new StunSystem()
    //         return StunSystem._instance
    //     }

    // }
}
