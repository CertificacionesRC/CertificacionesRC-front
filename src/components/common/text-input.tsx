import { FormControl, FormErrorMessage, FormLabel, InputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Input } from '@chakra-ui/react'

type ElementProps = React.HTMLProps<HTMLInputElement>

interface Props extends InputProps {
  errorMessage?: string
  isRequired?: boolean
  isInvalid?: boolean
  label?: string
}

const TextInput = forwardRef<ElementProps, Props>(function Component(props, ref) {
  const { label, errorMessage, isInvalid, isRequired, ...restProps } = props

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...restProps} ref={ref} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
})

export default TextInput
