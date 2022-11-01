import { GetState, SetState } from '..';

const reading = ((set: SetState, get: GetState) => ({

    reading: false,

    setReading: (payload: boolean) => {
        set({ reading: payload });
    }
}));

export { reading };