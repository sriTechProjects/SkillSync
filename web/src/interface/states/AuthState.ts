import type { User } from "../user";

export interface AuthState{
    user: User | null;
    token: string |null;
    status: 'idle' | 'loading' | 'failed' | 'succeeded';
    error: string |null;
}