import { ReactNode, useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { createContext } from "use-context-selector";

export type Notification = {
  message: string;
  type: 'default' | 'info' | 'success' | 'warning' | 'error'
}

type NotifcationContextType = {
  setNotification: (notification: Notification) => void
}

type NotificationProviderProps = {
  children: ReactNode
}

export const NotificationContext = createContext({} as NotifcationContextType)

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = useState<Notification>({} as Notification)

  useEffect(() => {
    const { message, type } = notification
    if (message && message !== "") {
      toast(message, { type: type });
    }

  }, [notification])

  return (
    <NotificationContext.Provider
      value={{ setNotification }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </NotificationContext.Provider>
  )
}
