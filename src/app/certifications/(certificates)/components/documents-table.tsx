import { Table, Thead, Tbody, Tr, Th, TableContainer, Card, TableCaption } from '@chakra-ui/react'

const header = ['Fecha', 'Nombre del documento', 'Remitente', 'Acciones']

function DocumentsTable() {
  return (
    <Card overflow="hidden">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {header.map((head, index) => (
                <Th key={index}>{head}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody></Tbody>
          <TableCaption>No se encontraron documentos</TableCaption>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DocumentsTable
