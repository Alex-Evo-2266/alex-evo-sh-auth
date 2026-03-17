import type { AuthManager } from "./authManager";
import { apiFetch } from "./fatch";
import { base64url, randomString, sha256 } from "./PKCE";

export async function login(authManager: AuthManager) {

    const verifier = randomString(64);
    const challenge = base64url(await sha256(verifier));

    sessionStorage.setItem("pkce_verifier", verifier);

    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);

    const params = new URLSearchParams({
        response_type: "code",
        client_id: authManager.config.clientId,
        redirect_uri: authManager.config.redirectUri,
        code_challenge: challenge,
        code_challenge_method: "S256",
        state: state
    });

    window.location.href = `${authManager.config.authServer}/authorize?${params}`;
}

export async function logout(authManager: AuthManager) {

    try{
        await apiFetch(authManager, `${authManager.config.authServer}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            client_id: authManager.config.clientId
        })
        });
        localStorage.removeItem(authManager.config.baseKey + "_access")

        await login(authManager)
    }
    catch(e){
        console.error(e)
    }
    
}

