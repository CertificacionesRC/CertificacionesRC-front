import { AiOutlineFileSearch } from 'react-icons/ai'
import { datos } from './data-certificate'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Card, Stack, Flex, IconButton } from '@chakra-ui/react'

function CertificateHistory() {
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
                    {certificado.codigo}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.programa}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {certificado.año}
                  </Td>
                  <Td textAlign="center" fontSize="sm">
                    <IconButton
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
