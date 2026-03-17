import type { AuthManager } from "./authManager";

type TokenResponse = {
    access: string
    user_id: string
}

export async function handleCallback(authManager: AuthManager) {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const savedState = sessionStorage.getItem("oauth_state");
    const state = params.get("state");

    if (!code) return;

    if (!state || state !== savedState) {
        throw new Error("Invalid OAuth state");
    }

    const verifier = sessionStorage.getItem("pkce_verifier");

    const response = await fetch(`${authManager.config.authServer}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: authManager.config.clientId,
            code,
            code_verifier: verifier,
        })
    });

    const tokens: TokenResponse = await response.json();

    localStorage.setItem(authManager.config.baseKey + "_access", tokens.access);

    window.history.replaceState({}, document.title, authManager.config.homePage);

    window.location.href = authManager.config.homePage;
}