/**
 * 数据库文档名
 */
export enum Doc {
    /**
     * 设置表
     */
    Setting = 'Setting',
}

/**
 * 设置表
 */
export interface SettingDoc {

    /**
     * 档案编号
     */
    fileNo: string,
    /**
     * 公司名
     */
    company: string,
    /**
     * 组织编号
     */
    orgNo: string
}
