import { FormControl, FormErrorMessage, FormLabel, InputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Input } from '@chakra-ui/react'

type ElementProps = React.HTMLProps<HTMLInputElement>

interface Props extends InputProps {
  errorMessage?: string
  isInvalid?: boolean
  label?: string
}

const TextInput = forwardRef<ElementProps, Props>(function Component(props, ref) {
  const { label, errorMessage, isInvalid, ...restProps } = props

  return (
    <FormControl isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...restProps} ref={ref} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
})

export default TextInput
