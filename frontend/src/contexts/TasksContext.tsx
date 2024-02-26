import { ReactNode, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { NotificationContext } from "./NotificationContext";
import { api } from "../lib/axios";
import { ApiResponse } from "../@types/apiResponse";

type TaskStatusOptions = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
type TaskIconOptions = "🧑🏼‍💻" | "💬" | "☕" | "🏋️" | "📚" | "⏰";

export type TaskType = {
  id: number | null;
  userId: number | null,
  title: string;
  description: string;
  status: TaskStatusOptions;
  icon: TaskIconOptions
}

type GetTasksData = ApiResponse & {
  tasks: TaskType[]
}

type GetTasksApiResponseType = {
  data: GetTasksData
}

type StoreTaskData = ApiResponse & {
  task: TaskType
}

type StoreTaskApiResponseType = {
  data: StoreTaskData
}

type TaskPayloadType = {
  title: string;
  description: string;
  icon: TaskIconOptions;
  status: TaskStatusOptions
}

type TasksContextType = {
  tasks: TaskType[];
  task: TaskType;
  isEditing: boolean,
  resetTask: () => void;
  editTask: (task: TaskType) => void;
  saveTask: (data: TaskPayloadType) => Promise<boolean>;
  deleteTask: () => Promise<boolean>;
  isDeleting: boolean;
  isLoadingTasks: boolean;
}

type TasksProviderProps = {
  children: ReactNode
}

const defaultTaskState: TaskType = {
  id: null,
  userId: null,
  title: "",
  description: "",
  status: "IN_PROGRESS",
  icon: "🧑🏼‍💻"
}

export const TasksContext = createContext({} as TasksContextType)

export function TasksProvider({ children }: TasksProviderProps) {
  const setNotification = useContextSelector(NotificationContext, (context) => {
    return context.setNotification
  })
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [task, setTask] = useState<TaskType>(defaultTaskState)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoadingTasks, setIsLoadingTasks] = useState(false)

  function showNotification(success: boolean, message: string) {
    const notificationType = success ? 'success' : 'error'
    setNotification({ message: message, type: notificationType })
  }

  async function getTasks() {
    setIsLoadingTasks(true)
    const { data: { success, message, tasks } }: GetTasksApiResponseType = await api.get("/tasks")
    setIsLoadingTasks(false)

    if (!success) {
      showNotification(success, message)
    } else {
      setTasks(tasks)
    }
  }

  async function saveTask(payload: TaskPayloadType) {
    if (isEditing) {
      return updateTask(payload)
    } else {
      return createTask(payload)
    }
  }

  async function createTask(payload: TaskPayloadType) {
    const { data: { success, message, task } }: StoreTaskApiResponseType = await api.post("/tasks", payload)

    if (success) {
      setTasks(state => [...state, task])
      resetTask()
    }

    showNotification(success, message)

    return success
  }

  async function updateTask(payload: TaskPayloadType) {
    const { data: { success, message, task: updatedTask } }: StoreTaskApiResponseType = await api.put(`/tasks/${task.id}`, payload)

    if (success) {
      const updatedTasks = tasks.map(currentTask => {
        if (currentTask.id === updatedTask.id) {
          return updatedTask
        }
        return currentTask
      })

      setTasks(updatedTasks)
      resetTask()
    }
    showNotification(success, message)

    return success
  }

  async function deleteTask() {
    setIsDeleting(true)
    const { data: { success, message, task: deletedTask } }: StoreTaskApiResponseType = await api.delete(`/tasks/${task.id}`,)

    setIsDeleting(false)

    if (success) {
      const updatedTasks = tasks.filter(currentTask => currentTask.id !== deletedTask.id)
      setTasks(updatedTasks)
      resetTask()
    }
    showNotification(success, message)

    return success
  }


  function resetTask() {
    setTask(() => defaultTaskState)
    setIsEditing(false)
  }

  function editTask(task: TaskType) {
    setTask(task)
    setIsEditing(true)
  }

  useEffect(() => {
    getTasks()
  }, [])



  return (
    <TasksContext.Provider
      value={{
        tasks,
        task,
        isEditing,
        resetTask,
        editTask,
        saveTask,
        deleteTask,
        isDeleting,
        isLoadingTasks
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
