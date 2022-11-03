import moment from 'moment';
import { v4 } from 'uuid';

const helper = {

    now(format = 'YYYY-MM-DD') {
        return moment().format(format);
    },
    isNullOrUndefined(value: any) {
        return value === undefined || value === null;
    },
    nextId() {
        return v4().replace(/-/g, '');
    }
};

export { helper };