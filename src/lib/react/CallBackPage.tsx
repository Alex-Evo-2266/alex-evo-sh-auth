import { useContext, useEffect, useRef } from "react";
import { handleCallback } from "../helpers/handleCallback";
import { AuthContext } from "./AuthContext";

export const CallbackPage = () => {
    const { authManager, loadMe } = useContext(AuthContext);

    const processedRef = useRef(false);

    useEffect(() => {
        if (!authManager || processedRef.current) {
            return;
        }

        processedRef.current = true;

        const authenticate = async () => {
            try {
                await handleCallback(authManager);
                await loadMe();

                window.location.replace(
                    authManager.config.homePage
                );
            } catch (error) {
                console.error("Authentication callback failed:", error);

                window.location.replace(
                    authManager.config.homePage
                );
            }
        };

        authenticate();
    }, [authManager, loadMe]);

    return <div>Авторизация...</div>;
};