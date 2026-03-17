import type { Config } from "./config";

export async function refreshToken(authConfig: Config) {


    const response = await fetch(`${authConfig.authServer}/refresh`, {
        method: "POST",
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

    const tokens = await response.json();

    localStorage.setItem(authConfig.baseKey + "_access", tokens.access);

    return tokens.access;
}