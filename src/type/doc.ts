import { Moment } from "moment"

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

export interface GenData {

    /**
     * 案件名称
     */
    caseName: string,
    /**
     * 案件编号
     */
    caseNo: string,
    /**
     * 接收时间
     */
    receiveTime: Moment,
    /**
     * 检查时间
     */
    checkTime: Moment
    /**
     * 委托人
     */
    deleMan: string,
    /**
     * 委托单位
     */
    deleUnit: string,
    /**
     * 承办人
     */
    undertaker: string,
    /**
     * 初查人
     */
    preMan: string,
    /**
     * 委托经手人
     */
    deleHandMan: string,
    /**
     * 联系人/电话
     */
    userAndTel: string,
    /**
     * 联系电话
     */
    tel: string,
    /**
     * 委托物品（证物）
     */
    evidences: Evidence[],
    /**
     * 收费项目
     */
    costItems: CostItem[]
}

/**
 * 委托物品
 */
export interface Evidence {
    /**
     * 索引
     */
    eviIndex: number,
    /**
     * 名称
     */
    eviName: string,
    /**
     * 数量
     */
    eviCount: string,
    /**
     * 描述
     */
    eviDesc: string,
    /**
     * 容量
     */
    eviCapacity: string,
    /**
     * 总计
     */
    eviTotal: string,
    /**
     * 种类
     */
    eviCategory: string,
    /**
     * 性状
     */
    eviChar: string,
    /**
     * 保存状态
     */
    eviState: string,
}

/**
 * 收费项目
 */
export interface CostItem {
    /**
     * 项目名称
     */
    costName: string,
    /**
     * 费用
     */
    price: string
}