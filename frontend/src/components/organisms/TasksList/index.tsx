import { useContextSelector } from "use-context-selector"

import { Icon } from "../../atoms/Icon"
import { TaskCard } from "../../molecules/TaskCard"
import { TaskForm } from "../TaskForm"
import addTaskIcon from "../../../assets/images/Add_round_duotone.svg"
import { TaskType, TasksContext } from "../../../contexts/TasksContext"
import closeDrawerButtonIcon from '../../../assets/images/close_ring_duotone-1.svg'

import { AddTaskButton, CloseDrawerButton } from "./styles"

export function TasksList() {

  const { tasks, resetTask, editTask, isLoadingTasks } = useContextSelector(TasksContext, (context) => {
    return {
      tasks: context.tasks,
      resetTask: context.resetTask,
      editTask: context.editTask,
      isLoadingTasks: context.isLoadingTasks
    }
  })

  function updateTask(task: TaskType) {
    editTask(task)
  }

  function resetSate() {
    resetTask()
  }

  return (
    <>

      <div className="drawer drawer-end">
        <input id="tasks-board-drawer" type="checkbox" className="drawer-toggle" />
        {isLoadingTasks ?
          <div className="flex justify-center mt-6">
            <span className="loading loading-spinner loading-lg  text-warning"></span>
          </div> :
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
            <AddTaskButton
              htmlFor="tasks-board-drawer"
              className="mt-4 btn btn-block flex justify-start drawer-button"
              onClick={resetSate}
            >
              <Icon variant="info">
                <img src={addTaskIcon} alt="Add task" />
              </Icon>
              <span>Add new task</span>
            </AddTaskButton>
          </div>
        }
        <div className="drawer-side">
          <div className="menu p-4 w-2/4 min-h-full text-base-content bg-white rounded-2xl">
            <div className="flex flex-col p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Task details</h2>
                <CloseDrawerButton
                  htmlFor="tasks-board-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay p-2 rounded-lg"
                  onClick={resetSate}
                >
                  <img src={closeDrawerButtonIcon} />
                </CloseDrawerButton>
              </div>
              <div className="mt-1">
                <TaskForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
