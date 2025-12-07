import {store} from '../store';

export type TAppDispatch = typeof store.dispatch;
export type TState = ReturnType<typeof store.getState>;
