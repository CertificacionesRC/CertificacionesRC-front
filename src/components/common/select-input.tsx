import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

type ElementProps = React.HTMLProps<HTMLSelectElement>

interface Props extends SelectProps {
  containerProps?: object
  errorMessage?: string
  isRequired?: boolean
  isInvalid?: boolean
  label?: string
}

const SelectInput = forwardRef<ElementProps, Props>(function Component(props, ref) {
  const { label, errorMessage, isInvalid, isRequired, containerProps, ...restProps } = props

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} {...containerProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select bg="surface" {...restProps} ref={ref} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
})

export default SelectInput
