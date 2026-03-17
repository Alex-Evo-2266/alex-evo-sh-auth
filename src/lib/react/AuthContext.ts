import { createContext } from "react";
import type { AuthManager } from "../helpers/authManager";
import { AuthData } from "../types";


type IAuthContext = {
    login: () => void
    logout: () => void
    loadMe: () => void
    authManager: AuthManager | null
    user: AuthData | null
    loading: boolean
}

export const AuthContext = createContext<IAuthContext>({
    login: ()=>{},
    logout: ()=>{},
    loadMe: ()=>{},
    authManager: null,
    user: null,
    loading: false
})