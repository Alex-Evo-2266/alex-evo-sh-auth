import type { AuthManager } from "./authManager";

type TokenResponse = {
    access: string
    user_id: string
}

export async function handleCallback(
    authManager: AuthManager
): Promise<void> {

    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");

    if (!code) {
        throw new Error("Missing OAuth code");
    }

    const savedState = sessionStorage.getItem("oauth_state");

    if (!state || state !== savedState) {
        throw new Error("Invalid OAuth state");
    }

    const verifier = sessionStorage.getItem("pkce_verifier");

    if (!verifier) {
        throw new Error("Missing PKCE verifier");
    }

    const response = await fetch(
        `${authManager.config.authServer}/token`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: authManager.config.clientId,
                code,
                code_verifier: verifier,
            }),
        }
    );

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `Token exchange failed: ${response.status} ${text}`
        );
    }

    const tokens: TokenResponse = await response.json();
    if (typeof tokens.access !== "string" || !tokens.access) {
        throw new Error("Token response did not contain an access token");
    }

    authManager.setToken(tokens.access);

    sessionStorage.removeItem("oauth_state");
    sessionStorage.removeItem("pkce_verifier");
}