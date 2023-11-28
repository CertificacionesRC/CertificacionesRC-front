/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineFileSearch } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { datos } from './data-document'
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
  Flex,
  Icon,
  Stack,
  IconButton,
} from '@chakra-ui/react'

function TableDocument() {
  return (
    <Stack spacing={4}>
      <Flex gap="4">
        <Input bg="white" placeholder="Buscar" />
      </Flex>
      <Card variant="outline">
        <TableContainer minH="60vh">
          <Table>
            <Thead>
              <Tr>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Id documento
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Usuario
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Estado
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {datos.map((documento, index) => (
                <Tr key={index}>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {documento.idDocumento}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {documento.usuario}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {documento.estado}
                  </Td>
                  <Td textAlign="center" color="primary">
                    <Flex gap="10px" justifyContent="center" color="primary">
                      <IconButton
                        title="buscar documento"
                        aria-label="buscar documento"
                        bg="white"
                        fontSize="2xl"
                        color="primary"
                        icon={<Icon color="primary" as={AiOutlineFileSearch} />}
                      />
                      <IconButton
                        title="comentar documento"
                        aria-label="comentar documento"
                        bg="white"
                        fontSize="2xl"
                        icon={<BiComment />}
                      />
                    </Flex>
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
export default TableDocument
