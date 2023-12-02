'use client'
import { AiOutlineFileSearch } from 'react-icons/ai'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Card,
  Stack,
  Flex,
  IconButton,
  Button,
  Select,
  Text,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ROUTES } from '@/utils/routes'
import { api } from '@/services/api'
import useSWR from 'swr'
import { useState } from 'react'

const optionsState = [
  { value: 'PorAprobar', text: 'Por aprobar' },
  { value: 'EnRevision', text: 'En revisión' },
  { value: 'Rechazado', text: 'Rechazado' },
  { value: 'Aprobado', text: 'Aprobado' },
]

function CertificateHistory() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [state, setState] = useState('')
  const cleanFilter = () => {
    setStartDate('')
    setEndDate('')
    setState('')
    mutate()
  }

  const { data, error, mutate } = useSWR({ url: 'items' }, () => {
    return api.getALLRC({ state, endDate, startDate })
  })
  if (error) return <span>Error</span>
  if (!data) return <span>Cargando...</span>

  return (
    <Stack spacing={4}>
      <Box display="grid" gridTemplateColumns=" 1fr 1fr">
        <Text fontWeight="semibold" fontSize="2xl" color="textColor">
          Historial de certificados
        </Text>
        <Flex alignItems="end">
          <Input
            bg="white"
            placeholder="Fecha inicio"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            bg="white"
            placeholder="Fecha fin"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Select bg="white" placeholder="Estado" onChange={(e) => setState(e.target.value)} value={state}>
            {optionsState.map((optionState, i) => (
              <option value={optionState.value} key={i}>
                {optionState.text}
              </option>
            ))}
          </Select>
          <Button onClick={() => mutate()}>Filtrar</Button>
          <Button onClick={() => cleanFilter()}>Limpiar filtror</Button>
        </Flex>
      </Box>
      <Card>
        <TableContainer minH="60vh">
          <Table>
            <Thead>
              <Tr>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Codigo
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Programa
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Año
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((certificado, index) => (
                <Tr key={index}>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.id}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.programaAcademico?.nombre}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.fecha_creacion}
                  </Td>
                  <Td textAlign="center" fontSize="sm">
                    <IconButton
                      as={Link}
                      href={ROUTES.DOCUMENT_PDF('sample.pdf')}
                      title="buscar documento"
                      aria-label="buscar documento"
                      bg="white"
                      color="primary"
                      fontSize="2xl"
                      icon={<AiOutlineFileSearch />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  )
}
export default CertificateHistory
