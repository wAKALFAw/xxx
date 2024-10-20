import { PlayerSaveData } from "./PlayerSaveData";
import { PlayerServer } from "./PlayerServer";

export class PlayerClient extends ModuleC<PlayerServer, PlayerSaveData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

}

