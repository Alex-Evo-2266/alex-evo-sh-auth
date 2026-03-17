import { useCallback, useEffect, useMemo, useState } from "react"
import { AuthManager } from "../helpers/authManager"
import { login, logout } from "../helpers/login"
import { AuthContext } from "./AuthContext"
import type { AuthData, MeData } from "../../types"
import { apiFetch } from "../helpers/fatch"
import type { Config } from "../helpers/config"

type IAuthProvider = {
    authConfig: Config,
    children: React.ReactNode
}

export const AuthProvider = ({children, authConfig}:IAuthProvider) => {

    const [user, setUser] = useState<AuthData | null>(null);
    const [loading, setLoading] = useState(true);
    const authManager = useMemo(() => new AuthManager(authConfig),[authConfig])

    const loadMe = useCallback(async () => {
        setLoading(true);

        const access = localStorage.getItem(authManager.config.baseKey + "_access");

        if (!access) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
        const resp = await apiFetch(authManager, `${authManager.config.authServer}/me`, {
            headers: {
                Authorization: `Bearer ${access}`
            }
        });

        if (!resp.ok) throw new Error("not found");

        const data: MeData = await resp.json();

        setUser({
            role: data.role.role_name,
            userId: data.user_id,
            userName: data.user_name,
            privileges: data.role.privileges.map(i => i.privilege.trim())
        });

        } catch {
            setUser(null);
        }

        setLoading(false);
    },[])

    useEffect(() => {
        loadMe();
    }, [loadMe]);

    const loginHandler = useCallback(() => {
        login(authManager)
    },[login, authManager])

    const logoutHandler = useCallback(()=>{
        logout(authManager)
        setUser(null)
    },[logout, authManager])

    return(
        <AuthContext.Provider value={{loadMe, loading, user, login: loginHandler, authManager, logout: logoutHandler}}>
        {children}
        </AuthContext.Provider>
    )
}