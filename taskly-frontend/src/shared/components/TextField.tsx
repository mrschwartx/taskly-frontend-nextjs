import { Field, Input } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

type TextFieldProps = ComponentProps<typeof Input> & {
  error?: string
}

export function TextField({ error, ...inputProps }: TextFieldProps) {
  return (
    <Field.Root invalid={Boolean(error)}>
      <Input {...inputProps} />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  )
}
