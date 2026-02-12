import { useAuth } from "./useAuth"

export function useHasPrivilege(privilege: string): boolean {
  const { user } = useAuth()

  if (!user) return false

  return user.role.privileges.some(
    (p) => p.privilege === privilege && p.is === "true"
  )
}
