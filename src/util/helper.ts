import moment from 'moment';
import { v4 } from 'uuid';

const helper = {
    /**
     * 转为Moment对象
     * @param dateString 格式化字串
     */
    parseDate(dateString: string = 'YYYY-MM-DD HH:mm:ss') {
        return moment(dateString)
    },
    /**
     * 返回现在时间的字串形式
     * @param format 格式化字串
     */
    now(format = 'YYYY-MM-DD') {
        return moment().format(format);
    },
    /**
     * 是否是null或undefined
     */
    isNullOrUndefined(value: any) {
        return value === undefined || value === null;
    },
    /**
     * 新id
     */
    nextId(length: number = 16) {
        return v4().replace(/-/g, '').substring(length);
    }
};

export { helper };