import { api } from '@/services/api'
import { CERTIFICATE_STATE_MOCKS } from '@/utils/constants'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { getSession } from '@/utils/actions'
import CertificatesTable from '@/app/certifications/(certificates)/components/certificates-table'
import DocumentsTable from '@/app/certifications/(certificates)/components/documents-table'
import TableFilters from '@/app/certifications/(certificates)/components/table-filters'

interface Props {
  searchParams: {
    endDate?: string
    startDate?: string
    state?: string
  }
}

async function DocumentsPage({ searchParams: { endDate, startDate, state } }: Props) {
  const session = await getSession()
  const authorities = session.user.authorities
  const isAdmin = authorities.some(({ authority }) => authority === 'ADMIN')

  if (isAdmin) {
    const stateParam = state ?? CERTIFICATE_STATE_MOCKS.PorAprobar.value

    const certificates = await api.getALLRC({
      endDate,
      startDate,
      state: stateParam,
    })

    return (
      <Stack spacing="4">
        <Flex justifyContent="space-between">
          <Text as="h1" fontWeight="semibold" fontSize="xl">
            Documentos
          </Text>
          <TableFilters showInputState state={stateParam} startDate={startDate} endDate={endDate} />
        </Flex>
        <CertificatesTable certificates={certificates} />
      </Stack>
    )
  }

  return <DocumentsTable />
}

export default DocumentsPage
