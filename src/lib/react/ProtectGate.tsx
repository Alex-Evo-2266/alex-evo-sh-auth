import { Outlet } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAuth } from "./auth.hook";

type ProtectGateProps = {
    loadingPage?: ReactNode
}

export function ProtectGate({loadingPage}:ProtectGateProps): ReactNode {

    const {authManager, login, loading} = useAuth()
    const token = authManager?.getToken() ?? null

    useEffect(() => {
        if (authManager && !loading && !token) {
            login()
        }
    }, [authManager, loading, login, token]);

    if (loading || !token) {
        return loadingPage ?? <div>Loading...</div>
    }

    return <Outlet />;
}
