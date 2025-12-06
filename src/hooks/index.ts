import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {TAppDispatch, TState} from '../types/baseState.ts';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
