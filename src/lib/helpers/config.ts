
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
