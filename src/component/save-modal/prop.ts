export interface SaveModalProp {

    /**
     * 是否显示
     */
    open: boolean,
    /**
     * 保存Click
     */
    onSave: (checkedKeys: string[], saveTo: string) => void,
    /**
     * 取消Click
     */
    onCancel: () => void
}
