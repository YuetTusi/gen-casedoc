import { reading } from './reading';

interface ReadingState {

    reading: boolean,

    setReading: (payload: boolean) => void
}

export type { ReadingState };
export { reading };