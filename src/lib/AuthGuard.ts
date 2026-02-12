import { useAuth } from "./useAuth"
import type { ReactNode } from "react"

export function AuthGuard({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return null
  if (!isAuthenticated) return null

  return children
}
