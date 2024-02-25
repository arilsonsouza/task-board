import { ReactNode, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { NotificationContext } from "./NotificationContext";
import { api } from "../lib/axios";
import { AUTH_STORE_KEY } from "../constans";
import { ApiResponse } from "../@types/apiResponse";
import { getAuthCrendentialsFromLocal } from "../components/utils";
import { useNavigate } from "react-router-dom";

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

type UserProfileResponseType = ApiResponse & {
  user: UserType
}

type UserProfileApiResponseType = {
  data: UserProfileResponseType
}

export type AuthCrendential = {
  accessToken: string;
  tokenType: string;
}

type SignInResponseType = ApiResponse & {
  accessToken: string;
  tokenType: string;
}

type SignInApiResponseType = {
  data: SignInResponseType
}

type AuthContextType = {
  authCredential: AuthCrendential;
  userProfile: UserType;
  signIn: (data: signInData) => Promise<boolean>;
  signUp: (data: signUpData) => Promise<boolean>
  getUserProfile: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const setNotification = useContextSelector(NotificationContext, (context) => {
    return context.setNotification
  })

  const [authCredential, setAuthCredential] = useState<AuthCrendential>({} as AuthCrendential)
  const [userProfile, setUserProfile] = useState<UserType>({} as UserType)

  function showNotification(success: boolean, message: string) {
    const notificationType = success ? 'success' : 'error'
    setNotification({ message: message, type: notificationType })
  }

  async function signIn(formData: signInData): Promise<boolean> {
    const { data }: SignInApiResponseType = await api.post("/auth/signin", formData)
    const { success, message } = data;

    if (success) {
      const { accessToken, tokenType } = data

      setAuthCredential({
        accessToken,
        tokenType
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

  async function getUserProfile() {
    const { data }: UserProfileApiResponseType = await api.get("/users/profile")
    const { success, message, user } = data
    if (success) {
      setUserProfile(user)
    } else {
      showNotification(success, message)
      navigate('/')
    }
  }

  useEffect(() => {
    const auth = getAuthCrendentialsFromLocal()
    if (auth) {
      setAuthCredential(auth)
    }
  }, [])



  useEffect(() => {
    if (authCredential.accessToken) {
      const authCredentialJSON = JSON.stringify(authCredential)
      localStorage.setItem(AUTH_STORE_KEY, authCredentialJSON)
    }
  }, [authCredential])

  return (
    <AuthContext.Provider
      value={{ authCredential, signIn, signUp, userProfile, getUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}
