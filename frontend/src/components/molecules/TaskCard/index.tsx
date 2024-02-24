import { TaskType } from "../../../contexts/TasksContext"
import { Icon } from "../../atoms/Icon"
import { TaskCardWrapper } from "./styles"

import inProgressIcon from '../../../assets/images/Time_atack_duotone.svg'
import completedIcon from '../../../assets/images/Done_round_duotone.svg'
import canceledIcon from '../../../assets/images/close_ring_duotone.svg'

type TaskCardProps = {
  task: TaskType
}

type TaskStatusOption = {
  status: "in_progress" | "completed" | "canceled"
  variant: "info" | "success" | "error";
  icon: string
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
      variant: "info",
      icon: inProgressIcon
    },
    "COMPLETED": {
      status: "completed",
      variant: "success",
      icon: completedIcon
    },
    "CANCELED": {
      status: "canceled",
      variant: "error",
      icon: canceledIcon
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
      <Icon variant={taskStatus.variant}>
        <img src={taskStatus.icon} alt={title} />
      </Icon>
    </TaskCardWrapper>
  )
}
