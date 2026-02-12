// AuthContext.ts
import { createContext } from "react";
import type { AuthState } from "./types";

export interface AuthContextValue extends AuthState {
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
