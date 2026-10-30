'use client'

import { Box, Button, Card, Flex, Link, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { BsChevronLeft } from 'react-icons/bs'
import NextLink from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { getErrorMessage } from '@/shared/api'
import { DeleteConfirmation, PageTitle } from '@/shared/components'
import { paths } from '@/shared/config/paths'
import { QueryError } from '../components/QueryError'
import { SingleTaskSkeleton } from '../components/SingleTaskSkeleton'
import { StatusBadge } from '../components/TaskBadges'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTask } from '../hooks/useTask'

export function TaskDetailPage() {
  const { taskId = '' } = useParams<{ taskId?: string }>()
  const router = useRouter()
  const { open, onOpen, onClose } = useDisclosure()
  const { data: task, isPending, isError, error, refetch } = useTask(taskId)
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(taskId)

  if (isPending) {
    return <SingleTaskSkeleton />
  }

  if (isError) {
    return <QueryError message={getErrorMessage(error)} onRetry={() => void refetch()} />
  }

  return (
    <Box p="3" maxW="lg" mx="auto">
      <Link asChild color="brand.fg" display="flex" alignItems="center" _hover={{ textDecoration: 'none' }}>
        <NextLink href={paths.tasks}>
          <BsChevronLeft /> All Tasks
        </NextLink>
      </Link>
      <PageTitle>{task.name}</PageTitle>
      <Stack direction="row" alignItems="center">
        <StatusBadge status={task.status} size="lg" />
        <Text>{new Date(task.due).toLocaleDateString()}</Text>
      </Stack>
      <Card.Root mt="4" variant="outline">
        <Card.Body>
          <Text>{task.description}</Text>
        </Card.Body>
      </Card.Root>
      <Flex justify="space-between" mt="5">
        <Button variant="plain" color="fg.error" p="0" h="auto" minW="0" fontWeight="normal" onClick={onOpen}>
          Delete Task
        </Button>
        <Link asChild color="brand.fg" _hover={{ textDecoration: 'none' }}>
          <NextLink href={paths.updateTask(task._id)}>Edit Task</NextLink>
        </Link>
      </Flex>
      <DeleteConfirmation
        alertTitle="Delete Task"
        isOpen={open}
        isPending={isDeleting}
        onClose={onClose}
        onConfirm={() => deleteTask(undefined, { onSuccess: () => router.push(paths.tasks) })}
      />
    </Box>
  )
}
