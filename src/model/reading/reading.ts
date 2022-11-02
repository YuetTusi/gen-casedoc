import { ReadingState } from '.';
import { GetState, SetState } from '..';

const reading = ((set: SetState, get: GetState): ReadingState => ({

    reading: false,

    setReading: (payload: boolean) => {
        set({ reading: payload });
    }
}));

export { reading };