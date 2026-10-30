'use client'

import { Box, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { PageTitle } from '@/shared/components'
import { paths } from '@/shared/config/paths'
import { SignInForm } from '../components/SignInForm'

export function SignInPage() {
  return (
    <Box p="3" maxW="lg" mx="auto">
      <PageTitle>Enter Your Credentials</PageTitle>
      <SignInForm />
      <Flex gap="2" mt="5">
        <Text>Don&apos;t have an account?</Text>
        <Link asChild color="brand.fg">
          <NextLink href={paths.signUp}>Sign up</NextLink>
        </Link>
      </Flex>
    </Box>
  )
}
