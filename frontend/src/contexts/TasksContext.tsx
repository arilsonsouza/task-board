import { ReactNode, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { NotificationContext } from "./NotificationContext";
import { api } from "../lib/axios";
import { ApiResponse } from "../@types/apiResponse";

export type TaskType = {
  id: number;
  userId: number,
  title: string;
  description: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  icon: string
}

type GetTasksData = ApiResponse & {
  tasks: TaskType[]
}

type GetTasksApiResponseType = {
  data: GetTasksData
}


type TasksContextType = {
  tasks: TaskType[];
  task: TaskType;
  isEditing: boolean
}

type TasksProviderProps = {
  children: ReactNode
}

export const TasksContext = createContext({} as TasksContextType)

export function TasksProvider({ children }: TasksProviderProps) {
  const setNotification = useContextSelector(NotificationContext, (context) => {
    return context.setNotification
  })
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [task, setTask] = useState<TaskType>({} as TaskType)
  const [isEditing, setIsEditing] = useState(false)

  function showNotification(success: boolean, message: string) {
    const notificationType = success ? 'success' : 'error'
    setNotification({ message: message, type: notificationType })
  }

  async function getTasks() {
    const { data: { success, message, tasks } }: GetTasksApiResponseType = await api.get("/tasks")

    if (!success) {
      showNotification(success, message)
    } else {
      setTasks(tasks)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])



  return (
    <TasksContext.Provider
      value={{ tasks, task, isEditing }}
    >
      {children}
    </TasksContext.Provider>
  )
}
