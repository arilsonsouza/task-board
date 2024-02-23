import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";

export type Notification = {
  message: string;
  type: 'default' | 'info' | 'success' | 'warning' | 'error'
}

type NotifcationContextType = {
  notification: Notification,
  setNotification: (notification: Notification) => void
}

type NotificationProviderProps = {
  children: ReactNode
}

export const NotificationContext = createContext({} as NotifcationContextType)

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = useState<Notification>({} as Notification)

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
