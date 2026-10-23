import { useCallback, useEffect, useState } from "react"
import { AuthManager } from "../helpers/authManager"
import { login, logout } from "../helpers/login"
import { AuthContext } from "./AuthContext"
import { apiFetch } from "../helpers/fatch"
import { AuthData, MeData } from "../types"

type IAuthProvider = {
    authManager: AuthManager,
    children: React.ReactNode
}

export const AuthProvider = ({children, authManager}:IAuthProvider) => {

    const [user, setUser] = useState<AuthData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadMe = useCallback(async () => {
        try {
            const token = await authManager.getValidToken();
            if (!token) {
                setUser(null);
                return;
            }

            const resp = await apiFetch(authManager, `${authManager.config.authServer}/me`);
            if (resp.status === 401) {
                authManager.setToken(null);
                setUser(null);
                return;
            }
            if (!resp.ok) {
                throw new Error(`Failed to load current user: ${resp.status}`);
            }

            const data: MeData = await resp.json();
            setUser({
                role: data.role.role_name,
                userId: data.user_id,
                userName: data.user_name,
                privileges: data.role.privileges.map(i => i.privilege.trim())
            });
        } catch (error) {
            console.error("Failed to load current user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [authManager])

    useEffect(() => {
        void Promise.resolve().then(loadMe);
    }, [loadMe]);

    const loginHandler = useCallback(() => {
        login(authManager)
    }, [authManager])

    const logoutHandler = useCallback(()=>{
        logout(authManager)
        setUser(null)
    }, [authManager])

    return(
        <AuthContext.Provider value={{loadMe, loading, user, login: loginHandler, authManager, logout: logoutHandler}}>
        {children}
        </AuthContext.Provider>
    )
}