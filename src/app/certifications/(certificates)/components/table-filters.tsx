'use client'

import { Button, Flex } from '@chakra-ui/react'
import { CERTIFICATES_STATES_LIST, CERTIFICATE_STATE_MOCKS } from '@/utils/constants'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { HTMLProps, useRef } from 'react'
import SelectInput from '@/components/common/select-input'
import TextInput from '@/components/common/text-input'
import dayjs from 'dayjs'

interface Props {
  showInputDates?: boolean
  showInputState?: boolean
  startDate?: string
  endDate?: string
  state?: string
}

function TableFilters({ state, endDate, startDate, showInputDates, showInputState }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const startRef = useRef<HTMLProps<HTMLInputElement>>(null)
  const endRef = useRef<HTMLProps<HTMLInputElement>>(null)
  const selectRef = useRef<HTMLProps<HTMLSelectElement>>(null)

  const handleToggle = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const createQueryString = (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    }

    const query = createQueryString(name, value)
    router.push(pathname + '?' + query, {
      scroll: false,
    })
  }

  return (
    <Flex alignItems="end" gap="4">
      {showInputDates && (
        <>
          <TextInput
            label="Fecha inicio"
            onChange={(event) => handleToggle('startDate', event.target.value, searchParams)}
            type="date"
            defaultValue={startDate}
            ref={startRef}
          />
          <TextInput
            label="Fecha fin"
            onChange={(event) => handleToggle('endDate', event.target.value, searchParams)}
            type="date"
            defaultValue={endDate}
            ref={endRef}
          />
        </>
      )}
      {showInputState && (
        <>
          <SelectInput
            width="200px"
            label="Estado"
            onChange={(event) => handleToggle('state', event.target.value, searchParams)}
            defaultValue={state}
            ref={selectRef}
          >
            {CERTIFICATES_STATES_LIST.map((state, index) => (
              <option value={state.value} key={index}>
                {state.name}
              </option>
            ))}
          </SelectInput>
        </>
      )}
      <Button
        width="full"
        onClick={() => {
          if (selectRef.current) {
            selectRef.current.value = CERTIFICATE_STATE_MOCKS.PorAprobar.value
          }

          if (startRef.current && endRef.current) {
            startRef.current.value = ''
            endRef.current.value = dayjs(new Date(Date.now())).format('YYYY-MM-DD')
          }

          router.push(pathname)
        }}
      >
        Limpiar filtros
      </Button>
    </Flex>
  )
}

export default TableFilters
