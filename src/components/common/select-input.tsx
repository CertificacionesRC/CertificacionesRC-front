import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

type ElementProps = React.HTMLProps<HTMLSelectElement>

interface Props extends SelectProps {
  containerProps?: object
  errorMessage?: string
  isInvalid?: boolean
  label?: string
}

const SelectInput = forwardRef<ElementProps, Props>(function Component(props, ref) {
  const { label, errorMessage, isInvalid, containerProps, ...restProps } = props

  return (
    <FormControl isInvalid={isInvalid} {...containerProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select {...restProps} ref={ref} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
})

export default SelectInput
