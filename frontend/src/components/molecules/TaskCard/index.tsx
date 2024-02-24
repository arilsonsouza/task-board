import { TaskType } from "../../../contexts/TasksContext"
import { Icon } from "../../atoms/Icon"
import { TaskCardWrapper } from "./styles"
import { InProgressTaskIcon } from "../../atoms/InProgressTaskIcon"
import { CompletedTaskIcon } from "../../atoms/CompletedTaskIcon"
import { CanceledTaskIcon } from "../../atoms/CanceledTaskIcon"

type TaskCardProps = {
  task: TaskType
}

type TaskStatusOption = {
  status: "in_progress" | "completed" | "canceled"
  icon: JSX.Element
}

type TaskStatusOptionsProps = {
  IN_PROGRESS: TaskStatusOption
  COMPLETED: TaskStatusOption
  CANCELED: TaskStatusOption
}

export function TaskCard({ task: { title, status, icon } }: TaskCardProps) {
  const taskStatusOptions: TaskStatusOptionsProps = {
    "IN_PROGRESS": {
      status: "in_progress",
      icon: <InProgressTaskIcon />
    },
    "COMPLETED": {
      status: "completed",
      icon: <CompletedTaskIcon />
    },
    "CANCELED": {
      status: "canceled",
      icon: <CanceledTaskIcon />
    }
  }

  const taskStatus = taskStatusOptions[status]

  return (
    <TaskCardWrapper
      className="flex justify-between p-4 rounded-xl"
      variant={taskStatus.status}
    >
      <div className="flex items-center gap-4">
        <Icon>
          {icon}
        </Icon>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {taskStatus.icon}
    </TaskCardWrapper>
  )
}
