'use client'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Card, IconButton, Box, useToast } from '@chakra-ui/react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { CERTIFICATE_STATE_MOCKS } from '@/utils/constants'
import { IQualifiedRegistration } from '@/utils/models'
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi'
import { MdMessage } from 'react-icons/md'
import dayjs from 'dayjs'
import { api } from '@/services/api'
import { revalidate } from '@/utils/actions'
import ModalComments from './modal-comments'
import { useState } from 'react'

interface Props {
  certificates: IQualifiedRegistration[]
}

type IPropsComments = {
  certificate: IQualifiedRegistration | null
  observation: string
  state: boolean
}

const header = ['Codigo', 'Autor', 'Fecha creación', 'Estado', 'Colaboradores', 'Acciones']

function CertificatesTable({ certificates }: Props) {
  const toast = useToast()
  const [propsComments, setpropsComent] = useState<IPropsComments>({ state: false, observation: '', certificate: null })

  const changeComments = ({ comment, certificate }: { comment: string; certificate: IQualifiedRegistration }) => {
    setpropsComent({ state: true, observation: comment, certificate: certificate })
  }

  const onClose = () => {
    setpropsComent({ state: false, observation: '', certificate: null })
  }

  const changeSate = ({
    certificate,
    content,
    state,
  }: {
    certificate: IQualifiedRegistration | null
    content: string
    state: string
  }) => {
    return api
      .updateStatetRC({ register: certificate, observation: content, state })
      .then(async (message) => {
        await revalidate('/documents')
        toast({
          status: 'success',
          title: message,
        })
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: error,
        })
      })
  }
  return (
    <>
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
                  <Td>
                    {certificate?.createDate ? dayjs(certificate.createDate).format('DD/MM/YYYY') : 'Desconocido'}
                  </Td>
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
                  <Td display="flex" gap={'10px'}>
                    <IconButton
                      aria-label="Revisar documento"
                      as="a"
                      download
                      fontSize="xl"
                      href={`http://localhost:8081/api/registrocalificado/getDocumento?IdRegistroCalificado=${certificate.id}`}
                      icon={<AiOutlineFileSearch />}
                      title="Revisar documento"
                    />
                    <IconButton
                      aria-label="Aprobar documento"
                      fontSize="xl"
                      icon={<BiSolidLike />}
                      title="Aprobar documento"
                      onClick={() =>
                        changeSate({
                          certificate: certificate,
                          content: certificate.observation?.contenido ?? '',
                          state: 'Aprobado',
                        })
                      }
                    />
                    <IconButton
                      aria-label="Rechazar documento"
                      fontSize="xl"
                      icon={<BiSolidDislike />}
                      title="Rechazar documento"
                      onClick={() =>
                        changeSate({
                          certificate: certificate,
                          content: certificate.observation?.contenido ?? '',
                          state: 'Rechazado',
                        })
                      }
                    />
                    <IconButton
                      aria-label="Comentarios"
                      fontSize="xl"
                      icon={<MdMessage />}
                      title="Comentarios"
                      onClick={() =>
                        changeComments({ comment: certificate.observation?.contenido ?? '', certificate: certificate })
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      <ModalComments
        isOpen={propsComments.state}
        onClose={onClose}
        observation={propsComments.observation}
        certificado={propsComments.certificate}
        changeState={changeSate}
      />
    </>
  )
}
export default CertificatesTable
