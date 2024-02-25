
import { TasksProvider } from "../../contexts/TasksContext"
import { TasksList } from "../../components/organisms/TasksList"
import { useContextSelector } from "use-context-selector"
import { AuthContext } from "../../contexts/AuthContext"
import { useEffect } from "react"

export function Tasks() {
  const getUserProfile = useContextSelector(AuthContext, (context) => {
    return context.getUserProfile
  })

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <>
      <TasksProvider>
        <TasksList />
      </TasksProvider>
    </>
  )
}
