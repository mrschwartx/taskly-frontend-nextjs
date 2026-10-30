'use client'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PageTitle } from '@/shared/components'
import { paths } from '@/shared/config/paths'
import { TaskForm } from '../components/TaskForm'
import { useCreateTask } from '../hooks/useCreateTask'
import { toTaskPayload } from '../utils/taskForm'

export function CreateTaskPage() {
  const router = useRouter()
  const { mutate, isPending } = useCreateTask()

  return (
    <Box p="3" maxW="4xl" mx="auto">
      <PageTitle>Create a New Task</PageTitle>
      <TaskForm
        isSubmitting={isPending}
        onSubmit={(values) =>
          mutate(toTaskPayload(values), {
            onSuccess: (task) => router.push(paths.task(task._id)),
          })
        }
      />
    </Box>
  )
}
