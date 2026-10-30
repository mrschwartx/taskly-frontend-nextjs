import { Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <Heading as="h1" fontSize="3xl" fontWeight="semibold" textAlign="center" my="7">
      {children}
    </Heading>
  )
}
