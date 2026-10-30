'use client'

import { Box, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { PageTitle } from '@/shared/components'
import { paths } from '@/shared/config/paths'
import { SignUpForm } from '../components/SignUpForm'

export function SignUpPage() {
  return (
    <Box p="3" maxW="lg" mx="auto">
      <PageTitle>Create an Account</PageTitle>
      <SignUpForm />
      <Flex gap="2" mt="5">
        <Text>Have an account?</Text>
        <Link asChild color="brand.fg">
          <NextLink href={paths.signIn}>Sign in</NextLink>
        </Link>
      </Flex>
    </Box>
  )
}
