import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

import { FormField } from "../../molecules/FormField"
import { DeleteTaskButton, SaveTaskButton } from './styles'
import { FormTextField } from '../../molecules/FormTextField'
import { TasksContext } from '../../../contexts/TasksContext'
import { CanceledTaskIcon } from '../../atoms/CanceledTaskIcon'
import { CompletedTaskIcon } from '../../atoms/CompletedTaskIcon'
import { InProgressTaskIcon } from '../../atoms/InProgressTaskIcon'
import { TaskIconInputField } from '../../molecules/TaskIconInputField'
import { TaskStatusInputField } from '../../molecules/TaskStatusInputField'

import saveTaskButtonIcon from '../../../assets/images/Done_round.svg'
import deleteTaskButtonIcon from '../../../assets/images/Trash.svg'

const taskFormSchema = z.object({
  title: z.string().trim().min(1, { message: 'Task title is required' }).max(40),
  description: z.string().trim().min(1, { message: 'Task description is required' }).max(40),
  icon: z.enum(["🧑🏼‍💻", "💬", "☕", "🏋️", "📚", "⏰"]),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'CANCELED']),
})

export type TaskFormInputs = z.infer<typeof taskFormSchema>

export function TaskForm() {
  const { task, saveTask, deleteTask, isEditing, isDeleting } = useContextSelector(TasksContext, (context) => {
    return {
      task: context.task,
      saveTask: context.saveTask,
      deleteTask: context.deleteTask,
      isEditing: context.isEditing,
      isDeleting: context.isDeleting
    }
  })

  const { title, description, status, icon } = task

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, },
    watch,
    reset
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskFormSchema),
  })

  useEffect(() => {
    reset({
      title: title,
      description: description,
      status: status,
      icon: icon
    })
  }, [title, description, status, reset, icon])

  const selectedStatus = watch("status")
  const selectedIcon = watch("icon")

  function maybeReset(resetForm: boolean) {
    if (resetForm) {
      reset({
        title: "",
        description: "",
        status: "IN_PROGRESS",
        icon: "🧑🏼‍💻"
      })
    }
  }
  async function handleFormSubmit(formData: TaskFormInputs) {
    const result = await saveTask(formData)
    maybeReset(result)
  }

  async function handleDeleteTask() {
    const result = await deleteTask()
    maybeReset(result)
  }

  return (
    <form
      className="flex flex-col gap-1 mx-auto w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FormField
        label="Task name"
        type="text"
        placeholder="Task title"
        required
        defaultValue={title}
        {...register('title')}
        error={errors.title?.message}
      />

      <FormTextField
        label="Description"
        placeholder="Enter a short description"
        required
        defaultValue={description}
        {...register('description')}
        error={errors.description?.message}
      />

      <Controller
        control={control}
        name="icon"
        defaultValue={icon}
        render={({ field }) =>
          <div className="flex flex-col mt-1">
            <span className="label-text">Icon</span>
            <div className="flex gap-2">
              <TaskIconInputField
                {...field}
                value="🧑🏼‍💻"
                checked={selectedIcon == "🧑🏼‍💻"}
                icon="🧑🏼‍💻"
              />
              <TaskIconInputField
                {...field}
                value="💬"
                checked={selectedIcon == "💬"}
                icon="💬"
              />
              <TaskIconInputField
                {...field}
                value="☕"
                checked={selectedIcon == "☕"}
                icon="☕"
              />
              <TaskIconInputField
                {...field}
                value="🏋️"
                checked={selectedIcon == "🏋️"}
                icon="🏋️"
              />
              <TaskIconInputField
                {...field}
                value="📚"
                checked={selectedIcon == "📚"}
                icon="📚"
              />
              <TaskIconInputField
                {...field}
                value="⏰"
                checked={selectedIcon == "⏰"}
                icon="⏰"
              />
            </div>
          </div>
        }
      />

      <Controller
        control={control}
        name="status"
        defaultValue={status}
        render={({ field }) =>
          <div className="flex flex-col mt-1">
            <span className="label-text">Status</span>
            <div className="flex flex-wrap gap-3">
              <TaskStatusInputField
                {...field}
                value="IN_PROGRESS"
                label='In Progress'
                checked={selectedStatus == "IN_PROGRESS"}
                icon={<InProgressTaskIcon />}
              />
              <TaskStatusInputField
                {...field}
                value="COMPLETED"
                label='Completed'
                checked={selectedStatus == "COMPLETED"}
                icon={<CompletedTaskIcon />}
              />

              <TaskStatusInputField
                {...field}
                value="CANCELED"
                label="Won't do"
                checked={selectedStatus == "CANCELED"}
                icon={<CanceledTaskIcon />}
              />
            </div>
          </div>
        }
      />

      <div className="flex justify-end gap-4 mt-3">

        {isEditing &&
          <DeleteTaskButton
            onClick={handleDeleteTask}
            disabled={isDeleting}
            type='button'
            className="flex items-center gap-2 py-2 px-6 text-white rounded-3xl text-base"
          >
            <span>Delete</span>
            <img src={deleteTaskButtonIcon} alt="Delete task" />
          </DeleteTaskButton>}

        <SaveTaskButton
          type='submit'
          disabled={isSubmitting}
          className="flex items-center gap-2 py-2 px-6 text-white rounded-3xl text-base">
          <span>Save</span>
          <img src={saveTaskButtonIcon} alt="Save task" />
        </SaveTaskButton>
      </div>
    </form>
  )
}
