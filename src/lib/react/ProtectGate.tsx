import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./auth.hook";

type ProtectGateProps = {
    loadingPage?: React.ReactNode
}

export function ProtectGate({loadingPage}:ProtectGateProps) {

    const {authManager, login, user} = useAuth()
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        if(!authManager)return
        const token = authManager.getToken()

        if (!token) {
            login()
        } else {
            setLoading(false);
        }
    }, [authManager, user]);

    if(!authManager)
    {
        return <p>invalud config</p>
    }

    if (loading) {
        return loadingPage ?? <div>Loading...</div>
    }

    return <Outlet />;
}
