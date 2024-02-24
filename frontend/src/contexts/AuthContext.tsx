import { ReactNode, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { NotificationContext } from "./NotificationContext";
import { api } from "../lib/axios";
import { AUTH_STORE_KEY } from "../constans";

type signInData = {
  email: string;
  password: string;
}

type signUpData = {
  email: string;
  username: string;
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
  tokenType: string;
  user: UserType
}

type AuthContextType = {
  authUser: AuthUserType;
  signIn: (data: signInData) => Promise<boolean>;
  signUp: (data: signUpData) => Promise<boolean>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const setNotification = useContextSelector(NotificationContext, (context) => {
    return context.setNotification
  })

  const [authUser, setAuthUser] = useState<AuthUserType>({} as AuthUserType)

  useEffect(() => {
    if (authUser.accessToken) {
      const authUserJSON = JSON.stringify(authUser)
      localStorage.setItem(AUTH_STORE_KEY, authUserJSON)
    }
  }, [authUser])

  function showNotification(success: boolean, message: string) {
    const notificationType = success ? 'success' : 'error'
    setNotification({ message: message, type: notificationType })
  }

  async function signIn(formData: signInData): Promise<boolean> {
    const { data } = await api.post("/auth/signin", formData)
    const { success, message } = data;

    if (success) {
      const { accessToken, tokenType, user } = data

      setAuthUser({
        accessToken,
        tokenType,
        user
      })
    }

    showNotification(success, message)
    return success
  }

  async function signUp(formData: signUpData): Promise<boolean> {
    const { data } = await api.post("/auth/signup", formData)
    const { success, message } = data;
    showNotification(success, message)
    return success
  }

  return (
    <AuthContext.Provider
      value={{ authUser, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
