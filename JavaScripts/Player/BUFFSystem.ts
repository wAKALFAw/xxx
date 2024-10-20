
//!BUFF系统
export namespace BUFF {
    export enum BuffType {
        /**攻击力增加 */
        atk_up,
        /**防御增加 */
        def_up,
        /**暴击率up */
        critical_rate_up,
        /**灵韵掉落up */
        coin_up,
        /**生命值up */
        health_up,
    }

    export class BuffSystem {
        private static _instance: BuffSystem
        public static get instance() {
            if (!BuffSystem._instance) BuffSystem._instance = new BuffSystem()
            return BuffSystem._instance
        }

        private _bufflist: Map<BuffType, number>
        /**已获取buff列表 */
        public get bufflist() { return this._bufflist }


        constructor() {
            this.bufflistinit()
        }
        protected bufflistinit() {
            this._bufflist = new Map([
                [BuffType.atk_up, 0],
                [BuffType.def_up, 0],
                [BuffType.critical_rate_up, 0],
                [BuffType.coin_up, 0],
                [BuffType.health_up, 0],
            ])
        }

        /**
         * *增减buff
         * ?@num 数值 叠加 正数增加 负数减少
         * ?@time 单位秒 /s 持续时间 小于等于0为永久持续
         * ?@returns 特效id 没特效返回0 非永久特效返回null
         */
        public changebuff(type: BuffType, num: number, time: number) {
            let x = 0
            if (time > 0) {
                let temp = this._bufflist.get(type) + num
                if (temp < 0) temp = 0
                this._bufflist.set(type, temp)
                TimeUtil.delaySecond(time).then(() => {
                    let temp = this._bufflist.get(type) - num
                    if (temp < 0) temp = 0
                    this._bufflist.set(type, temp)
                })
                return x
            } else {
                let temp = this._bufflist.get(type) + num
                if (temp < 0) temp = 0
                this._bufflist.set(type, temp)
                return x
            }
        }
    }
}
