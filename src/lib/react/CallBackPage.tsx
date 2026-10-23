import { useContext, useEffect, useRef, useState } from "react";
import { handleCallback } from "../helpers/handleCallback";
import { AuthContext } from "./AuthContext";

export const CallbackPage = () => {
    const { authManager, login } = useContext(AuthContext);

    const processedRef = useRef(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authManager || processedRef.current) {
            return;
        }

        processedRef.current = true;

        const authenticate = async () => {
            try {
                await handleCallback(authManager);
                window.location.replace(authManager.config.homePage);
            } catch (error) {
                console.error("Authentication callback failed:", error);
                setError("Не удалось завершить вход. Попробуйте снова.");
            }
        };

        authenticate();
    }, [authManager]);

    if (error) {
        return (
            <div role="alert">
                <p>Не удалось завершить вход: {error}</p>
                <button type="button" onClick={login}>Повторить вход</button>
            </div>
        );
    }

    return <div>Авторизация...</div>;
};