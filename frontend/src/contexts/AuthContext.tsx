import { ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { NotificationContext } from "./NotificationContext";
import { api } from "../lib/axios";

type loginData = {
  email: string;
  password: string;
}

export type UserType = {
  id: number;
  username: string;
  email: string;
  roles: string[]
}

export type AuthUserType = {
  accessToken: string;
  tokenType: string,
  user: UserType
}

type AuthContextType = {
  authUser: AuthUserType,
  login: (data: loginData) => Promise<boolean>
}

type NotificationProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: NotificationProviderProps) {
  const setNotification = useContextSelector(NotificationContext, (context) => {
    return context.setNotification
  })

  const [authUser, setAuthUser] = useState<AuthUserType>({} as AuthUserType)

  async function login(formData: loginData): Promise<boolean> {
    const { data } = await api.post("/auth/signin", formData)
    const { success, message } = data;

    const notificationType = success ? 'success' : 'error'
    if (success) {
      const { accessToken, tokenType, user } = data

      setAuthUser({
        accessToken,
        tokenType,
        user
      })
    }
    setNotification({ message: message, type: notificationType })

    return success
  }

  return (
    <AuthContext.Provider
      value={{ authUser, login }}
    >
      {children}
    </AuthContext.Provider>
  )
}
