import type { Config } from "./config";
import { refreshToken } from "./refresh";

export class AuthManager {
    private refreshPromise: Promise<string | null> | null = null;
    config: Config

    constructor(
        config: Config,
        private onAuthFail?: () => void
    ) {
        this.config = config
    }

    getToken() {
        return localStorage.getItem(this.config.baseKey + "_access");
    }

    setToken(token: string | null) {
        if (token) {
            localStorage.setItem(this.config.baseKey + "_access", token);
        } else {
            localStorage.removeItem(this.config.baseKey + "_access");
        }
    }

    async getValidToken() {
        let token = this.getToken();

        if (token) {
            return token;
        }

        if (!this.refreshPromise) {
            this.refreshPromise = refreshToken(this.config)
                .then((newToken) => {
                    this.setToken(newToken);
                    return newToken;
                })
                .finally(() => {
                    this.refreshPromise = null;
                });
        }

        token = await this.refreshPromise;

        if (!token && this.onAuthFail) {
            this.onAuthFail();
        }

        return token;
    }
}
