import { PlayerClient } from "./PlayerClient";
import { PlayerSaveData } from "./PlayerSaveData";

export class PlayerServer extends ModuleS<PlayerClient, PlayerSaveData> {
    
    public net_sync(methodName: string, sync2Client: boolean, ...param: any[]) {
        const playerdata = DataCenterS.getData(this.currentPlayer, PlayerSaveData)
        playerdata[methodName](...param)
        playerdata.save(sync2Client)
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

}