import { AUTH_TOKEN_KEY } from '../const';
import {Token} from '../types/token.ts';

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';

export const saveToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_KEY, token);

export const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);
