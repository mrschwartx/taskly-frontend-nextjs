'use client'

import { Box, IconButton } from '@chakra-ui/react'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { useTheme } from './useTheme'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <IconButton
      variant="ghost"
      rounded="full"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
    >
      <Box as="span" display={{ base: 'inline-flex', _dark: 'none' }}>
        <BsMoonStarsFill />
      </Box>
      <Box as="span" display={{ base: 'none', _dark: 'inline-flex' }}>
        <BsSunFill />
      </Box>
    </IconButton>
  )
}
