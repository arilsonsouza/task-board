import { Bounce, ToastContainer, toast } from "react-toastify";
import { NotificationContext } from "../../../contexts/NotificationContext";
import { useContextSelector } from "use-context-selector";
import 'react-toastify/dist/ReactToastify.min.css';

import { NotificationMessage } from "../../atoms/NotificationMessage";

export function Notification() {
  const notification = useContextSelector(NotificationContext, (context) => {
    return context.notification
  })

  const { message, type } = notification
  if (message && message !== "") {
    console.log(type, message)
    toast(<NotificationMessage message={message} />, { type: type });
  }

  return (
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
  )
}
