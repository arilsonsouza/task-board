
import { TasksProvider } from "../../contexts/TasksContext"
import { TasksList } from "../../components/organisms/TasksList"

export function Tasks() {
  return (
    <>
      <TasksProvider>
        <TasksList />
      </TasksProvider>
    </>
  )
}
