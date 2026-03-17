import { useContext, useEffect } from "react"
import { handleCallback } from "../helpers/handleCallback"
import { AuthContext } from "./AuthContext"


export const CallbackPage = () => {

    const {authManager, loadMe} = useContext(AuthContext)

    useEffect(()=>{
        if(!authManager)return

        handleCallback(authManager)
        loadMe()
    },[handleCallback, authManager, loadMe])

    return(
        <div>

        </div>
    )
}