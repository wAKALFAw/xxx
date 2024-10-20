import { Config } from "./Config"
import { PlayerClient } from "./PlayerClient"

export class PlayerSaveData extends Subdata {
    @Decorator.persistence()
    private _PlayerData: Config.Data

    /** [客户端] 向服务端同步数据 */
    private sync2Server(methodName: string, sync2Client: boolean, ...param: any[]) {
        if (SystemUtil.isClient()) {
            ModuleService.getModule(PlayerClient)["server"].net_sync(methodName, sync2Client, ...param)
        }
    }

    /**返回玩家攻击力 */
    public get akt() {
        return 0
    }

    /**返回玩家防御力 */
    public get def() {
        return 0
    }

    /**返回玩家暴击率 */
    public get crit() {
        return 0
    }

    /**返回玩家暴击伤害 */
    public get crit_damage() {
        return 0
    }

    /**返回玩家穿透 */
    public get penetrate() {
        return 0
    }

    /**金币变动 正数增加 负数减少 */
    public changecoin(num: number) {
        if (!num) num = 0
        // if (SystemUtil.isClient()) {
        //     if (num > 0) {
        //         UIManager.instance.defaultUI.addPrompt(num, "coin")
        //     }
        // }
        let temp = Math.ceil(this._PlayerData.coin + num)
        if (temp <= 0) {
            temp = 0
        }
        if (num != 0) {
            this._PlayerData.coin = temp
            this.sync2Server("changecoin", true, num)
        }
    }

    /**玩家受伤 C端*/
    public hurt(damage: number, skillname: string) {

    }

}