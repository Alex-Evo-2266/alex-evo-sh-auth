
export interface Privilege {
    id: string
    privilege: string
}

export interface Role {
    id: string
    role_name: string
    privileges: Privilege[]
}

export type MeData = {
    user_id: string,
    user_name: string,
    role: Role
}

export type AuthData = {
  userId: string;
  userName: string
  role: string;
  privileges: string[];
}