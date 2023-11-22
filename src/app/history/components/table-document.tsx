
import './css-table-document.css'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { datos } from './data-document'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputGroup,
  Input,
  InputLeftElement,
  Card,
  Stack,
  Flex,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export default function TableDocument() {
  return (
    <Stack spacing={4}>
      <Flex gap="4">
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} />
          </InputLeftElement>
          <Input bg="white" placeholder="Buscar" />
        </InputGroup>
      </Flex>
      <Card>
        <TableContainer minH="60vh">
          <Table>
            <Thead>
              <Tr>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Fecha
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Nombre del documento
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Remitente
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
                    {documento.date}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {documento.documentName}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {documento.sender}
                  </Td>
                  <Td textAlign="center">
                    <IconButton
                      title="busca historial"
                      aria-label="buscar historial"
                      bg="white"
                      fontSize="2xl"
                      color="primary"
                      icon={<Icon as={AiOutlineFileSearch} />}
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
