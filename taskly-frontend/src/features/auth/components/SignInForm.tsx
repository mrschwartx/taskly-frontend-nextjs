import { Button, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { TextField } from '@/shared/components'
import { useSignIn } from '../hooks/useSignIn'
import type { SignInValues } from '../types'

export function SignInForm() {
  const { mutate, isPending } = useSignIn()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInValues>({ defaultValues: { email: '', password: '' } })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))}>
      <Stack gap="4">
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
          Sign In
        </Button>
      </Stack>
    </form>
  )
}
