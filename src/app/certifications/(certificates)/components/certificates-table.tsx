import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Card, IconButton, Box } from '@chakra-ui/react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { CERTIFICATE_STATE_MOCKS } from '@/utils/constants'
import { IQualifiedRegistration } from '@/utils/models'
import { ROUTES } from '@/utils/routes'
import dayjs from 'dayjs'
import Link from 'next/link'

interface Props {
  certificates: IQualifiedRegistration[]
}

const header = ['Codigo', 'Autor', 'Fecha creación', 'Estado', 'Colaboradores', 'Acciones']

function CertificatesTable({ certificates }: Props) {
  return (
    <Card>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {header.map((head, index) => (
                <Th key={index}>{head}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {certificates.map((certificate) => (
              <Tr key={certificate.id}>
                <Td>{certificate.id}</Td>
                <Td>{certificate?.author ?? 'Desconocido'}</Td>
                <Td>{certificate?.createDate ? dayjs(certificate.createDate).format('DD/MM/YYYY') : 'Desconocido'}</Td>
                <Td>{certificate?.status ? CERTIFICATE_STATE_MOCKS[certificate.status].name : 'Desconocido'}</Td>
                <Td minWidth="300px" overflow="auto">
                  {certificate?.collaborators ? (
                    <details>
                      <Box as="summary" userSelect="none" cursor="pointer" mb="2">
                        Ver colaboradores
                      </Box>
                      {certificate.collaborators.map((collaborator, index) => (
                        <p key={index}>{collaborator}</p>
                      ))}
                    </details>
                  ) : (
                    'Desconocico'
                  )}
                </Td>
                <Td>
                  <IconButton
                    aria-label="Revisar documento"
                    as={Link}
                    fontSize="2xl"
                    href={ROUTES.DOCUMENT_PDF('sample.pdf')}
                    icon={<AiOutlineFileSearch />}
                    title="Revisar documento"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  )
}
export default CertificatesTable
