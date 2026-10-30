'use client'

import { Box, Button, Flex, Link, Stack, Text, useDisclosure } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useSession, useSignOut } from '@/features/auth'
import { DeleteConfirmation, PageTitle } from '@/shared/components'
import { paths } from '@/shared/config/paths'
import { ProfileForm } from '../components/ProfileForm'
import { useDeleteAccount } from '../hooks/useDeleteAccount'

export function ProfilePage() {
  const { user } = useSession()
  const { open, onOpen, onClose } = useDisclosure()
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount()
  const { mutate: signOut } = useSignOut()

  if (!user) {
    return null
  }

  return (
    <Box p="3" maxW="lg" mx="auto">
      <DeleteConfirmation
        alertTitle="Delete Account"
        isOpen={open}
        isPending={isDeleting}
        onClose={onClose}
        onConfirm={() => deleteAccount(user._id)}
      />
      <PageTitle>Your Profile</PageTitle>
      <ProfileForm user={user} />
      <Stack gap="4" mt="5">
        <Button asChild colorPalette="brand" variant="outline" textTransform="uppercase" fontWeight="semibold">
          <NextLink href={paths.createTask}>Create New Task</NextLink>
        </Button>
        <Flex justify="space-between">
          <Button variant="plain" color="fg.error" p="0" h="auto" minW="0" fontWeight="normal" onClick={onOpen}>
            Delete Account
          </Button>
          <Button variant="plain" color="fg.error" p="0" h="auto" minW="0" fontWeight="normal" onClick={() => signOut()}>
            Sign Out
          </Button>
        </Flex>
        <Text textAlign="center">
          <Link asChild color="brand.fg" _hover={{ textDecoration: 'none' }}>
            <NextLink href={paths.tasks}>Show Tasks</NextLink>
          </Link>
        </Text>
      </Stack>
    </Box>
  )
}
