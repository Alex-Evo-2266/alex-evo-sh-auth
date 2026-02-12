import { useEffect, useState, useCallback } from "react"
import { AuthContext } from "./AuthContext"
import type { AuthState, UserMeData } from "./types"

export function AuthProvider({
  children,
  authUrl,
  authFrontendUrl,
  appId,
}: {
  children: React.ReactNode
  authUrl: string
  authFrontendUrl: string,
  appId?: string
}) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    isAuthenticated: false,
    user: null,
  })

  const redirectToLogin = () => {
    const next = encodeURIComponent(window.location.href)

    let url = `${authFrontendUrl}/login?next=${next}`
    if (appId) {
      url += `&app=${appId}`
    }

    window.location.href = url
  }

  const loadMe = useCallback(async () => {
    try {
      const res = await fetch(`${authUrl}/sso/me`, {
        credentials: "include",
      })

      if (!res.ok) throw new Error("unauthorized")

      const data: UserMeData = await res.json()

      setState({
        loading: false,
        isAuthenticated: true,
        user: data,
      })
    } catch {
      setState({
        loading: false,
        isAuthenticated: false,
        user: null,
      })

      redirectToLogin()
    }
  }, [authUrl])

  const logout = async () => {
    await fetch(`${authUrl}/sso/logout`, {
      credentials: "include",
    })

    redirectToLogin()
  }

  useEffect(() => {
    loadMe()
  }, [loadMe])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        refresh: loadMe,
        logout,
        login: () => Promise.resolve()
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
