import { Select } from '@chakra-ui/react'
import { useState } from 'react'

const stateOptions = [
  { name: 'Habilitado', value: true },
  { name: 'Inhabilitado', value: false },
]

export default function StateComponent({ value }: { value: boolean }) {
  const [state, setState] = useState(value)

  const handleStateChange = (event: any) => {
    const selectedValue = event.target.value
    const selectedState = stateOptions.find((option) => option.name === selectedValue)
    setState(selectedState.value)
  }

  return (
    <Select value={state ? 'Habilitado' : 'Inhabilitado'} onChange={handleStateChange}>
      {stateOptions.map((option, i) => (
        <option key={i} value={option.name}>
          {option.name}
        </option>
      ))}
    </Select>
  )
}
