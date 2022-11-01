export interface FormValue {

    docNo: string,
    client: string,
    checkTime: string,
    caseName: string,
    others: string,
    sign1: string,
    sign2: string,
    evidences: Evidence[]
}

/**
 * 委托物品
 */
export interface Evidence {
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
    eviTotal: string
}