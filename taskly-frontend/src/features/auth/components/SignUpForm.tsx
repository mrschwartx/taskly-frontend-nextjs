import { Button, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { TextField } from '@/shared/components'
import { useSignUp } from '../hooks/useSignUp'
import type { SignUpValues } from '../types'

export function SignUpForm() {
  const { mutate, isPending } = useSignUp()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpValues>({ defaultValues: { username: '', email: '', password: '' } })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))}>
      <Stack gap="4">
        <TextField
          id="username"
          type="text"
          aria-label="Username"
          placeholder="Your username"
          error={errors.username?.message}
          {...register('username', { required: 'Username is required' })}
        />
        <TextField
          id="email"
          type="email"
          aria-label="Email"
          placeholder="Your email"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <TextField
          id="password"
          type="password"
          aria-label="Password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        <Button type="submit" loading={isPending} colorPalette="brand" textTransform="uppercase">
          Sign Up
        </Button>
      </Stack>
    </form>
  )
}
