type NotificationProps = {
  message: string;
}

export function NotificationMessage({ message }: NotificationProps) {
  return (
    <div className="flex">
      {message}
    </div>
  )
}
