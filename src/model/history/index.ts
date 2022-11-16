import { GenData } from '@/type/doc';
import { history } from './history';

interface HistoryState {

    /**
     * 读取中
     */
    historyLoading: boolean,
    /**
     * 历史数据
     */
    historyData: GenData[],
    /**
     * 总数
     */
    historyTotal: number,
    /**
     * 保存历史
     */
    saveHistory: (payload: GenData) => void,
    /**
     * 查询历史
     */
    queryHistory: (payload: any) => void,
    /**
     * 清空
     */
    clearHistory: () => void
}

export type { HistoryState };
export { history };