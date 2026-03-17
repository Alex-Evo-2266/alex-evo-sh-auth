import { useContext } from "react";
import { AuthContext } from "./AuthContext";



export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx || !ctx.authManager) throw new Error("AuthContext not found");

    return ctx
};


export const usePrivilege = (privilege: string) => {
    const { user } = useAuth();
    return !!user?.privileges?.includes(privilege);
}