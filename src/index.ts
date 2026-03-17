

export {AuthManager} from './lib/helpers/authManager'
export {Config} from './lib/helpers/config'
export {apiFetch} from './lib/helpers/fatch'
export {handleCallback} from './lib/helpers/handleCallback'
export {login, logout} from './lib/helpers/login'
export {refreshToken} from './lib/helpers/refresh'

export {AuthContext} from './lib/react/AuthContext'
export {AuthProvider} from './lib/react/AuthProvider'
export {CallbackPage} from './lib/react/CallBackPage'
export {PrivilegeGate} from './lib/react/PrivilegeGate'
export {ProtectGate} from './lib/react/ProtectGate'
export {useAuth, usePrivilege} from './lib/react/auth.hook'