import { Button, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { User } from '@/features/auth'
import { TextField } from '@/shared/components'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import type { ProfileFormValues } from '../types'
import { getAvatarUrl } from '../utils/avatar'
import { AvatarUploader } from './AvatarUploader'

type ProfileFormProps = {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { mutate, isPending } = useUpdateProfile()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
    },
  })

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileSelect = (file: File) => {
    setAvatarFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const onSubmit = (values: ProfileFormValues) => {
    mutate(
      { userId: user._id, values, avatarFile },
      {
        onSuccess: () => {
          reset({ username: values.username, email: values.email, password: '' })
          setAvatarFile(null)
          setPreviewUrl(null)
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4">
        <AvatarUploader imageUrl={previewUrl ?? getAvatarUrl(user.avatar)} onFileSelect={handleFileSelect} />
        <TextField
          id="username"
          type="text"
          aria-label="Username"
          placeholder="username"
          error={errors.username?.message}
          {...register('username', { required: 'Username is required' })}
        />
        <TextField
          id="email"
          type="email"
          aria-label="Email"
          placeholder="email"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <TextField id="password" type="password" aria-label="New password" placeholder="New password" {...register('password')} />
        <Button type="submit" loading={isPending} colorPalette="brand" textTransform="uppercase">
          Update Profile
        </Button>
      </Stack>
    </form>
  )
}
