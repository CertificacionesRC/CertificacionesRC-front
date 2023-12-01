import { AiOutlineFileSearch } from 'react-icons/ai'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Card, Stack, Flex, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { ROUTES } from '@/utils/routes'
import { api } from '@/services/api'

async function CertificateHistory() {
  const datos = (await api.getALLRC({ state: 'prueba' })) ?? []
  return (
    <Stack spacing={4}>
      <Flex gap="4">
        <Input bg="white" placeholder="Buscar" />
      </Flex>
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
              {datos.map((certificado, index) => (
                <Tr key={index}>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.id}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.programaAcademico?.name}
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
