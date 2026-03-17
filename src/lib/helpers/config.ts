import { API_AUTH, BASE_KEY_STORAGE } from "../consts"

export class Config{
    authServer: string
    clientId: string
    redirectUri: string
    homePage: string
    baseKey: string

    constructor(authServer: string, clientId: string, redirectUri: string, homePage: string, baseKey:string){
        this.authServer = authServer
        this.clientId = clientId
        this.redirectUri = redirectUri
        this.homePage = homePage
        this.baseKey = baseKey
    }
}

export const authConfig = new Config(API_AUTH, "2c72d754085341f88f9d5d0a3e7f28f9", window.location.origin + "/auth-service/callback", "/auth-service/users", BASE_KEY_STORAGE)