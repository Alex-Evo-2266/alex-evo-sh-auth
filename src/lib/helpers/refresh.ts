import type { Config } from "./config";

export async function refreshToken(authConfig: Config) {

    const response = await fetch(`${authConfig.authServer}/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grant_type: "refresh_token",
            client_id: authConfig.clientId
        })
    });

    if(response.status === 401){
        localStorage.removeItem(authConfig.baseKey + "_access")
        return null
    }

    if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status} ${await response.text()}`);
    }

    const tokens: { access?: unknown } = await response.json();

    if (typeof tokens.access !== "string" || !tokens.access) {
        throw new Error("Token refresh response did not contain an access token");
    }

    localStorage.setItem(authConfig.baseKey + "_access", tokens.access);
    return tokens.access;
}