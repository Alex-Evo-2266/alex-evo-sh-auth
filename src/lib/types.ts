// types.ts

export interface Privilege {
    is:string
    privilege: string
}

export interface Role {
    id: string;
    role_name: string;
    privileges: Privilege[];
}

export interface UserMeData {

  user_id: string,
  user_name: string,
  role: Role
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserMeData | null;
}
