import { v4 } from 'uuid';

const helper = {

    isNullOrUndefined(value: any) {
        return value === undefined || value === null;
    },
    nextId() {
        return v4().replace(/-/g, '');
    }
};

export { helper };