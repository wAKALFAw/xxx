//!UI管理类
export class UIManager {
    private static _instance: UIManager
    public static get instance() {
        if (!UIManager._instance) UIManager._instance = new UIManager()
        return UIManager._instance
    }
}