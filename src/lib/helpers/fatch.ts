import type {AuthManager} from "./authManager"

export async function apiFetch(
    authManager: AuthManager,
    url: string,
    options: RequestInit = {},
    errorRefresh?: ()=>void
) {
    let token = authManager.getToken()

    const doFetch = (token: string | null) => {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: token ? `Bearer ${token}` : ""
            }
        });
    };

    let response = await doFetch(token);

    if (response.status !== 401) {
        return response;
    }

    authManager.setToken(null)
    token = await authManager.getValidToken()

    if (!token) {
        errorRefresh?.()
        return response;
    }

    return doFetch(token);
}