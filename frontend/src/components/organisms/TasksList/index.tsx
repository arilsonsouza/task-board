import { useContextSelector } from "use-context-selector"
import { TaskType, TasksContext } from "../../../contexts/TasksContext"
import { TaskCard } from "../../molecules/TaskCard"

export function TasksList() {
  const { tasks } = useContextSelector(TasksContext, (context) => {
    return {
      tasks: context.tasks
    }
  })

  function updateTask(task: TaskType) {
    console.log("updateTask", task)
  }

  return (
    <>

      <div className="drawer drawer-end">
        <input id="tasks-board-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex flex-col gap-4">
            {tasks.map((task) => {
              return (
                <label
                  key={task.id}
                  onClick={() => updateTask(task)}
                  htmlFor="tasks-board-drawer"
                  className="drawer-button">
                  <TaskCard task={task} />
                </label>
              )
            })}
          </div>
        </div>
        <div className="drawer-side">
          <ul className="menu p-4 w-2/4 min-h-full bg-base-200 text-base-content">
            <label htmlFor="tasks-board-drawer" aria-label="close sidebar" className="drawer-overlay">close</label>
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
