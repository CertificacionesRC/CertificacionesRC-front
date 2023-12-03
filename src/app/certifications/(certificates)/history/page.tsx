import { api } from '@/services/api'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { getSession } from '@/utils/actions'
import CertificatesTable from '@/app/certifications/(certificates)/components/certificates-table'
import dayjs from 'dayjs'
import DocumentsTable from '@/app/certifications/(certificates)/components/documents-table'
import TableFilters from '@/app/certifications/(certificates)/components/table-filters'

interface Props {
  searchParams: {
    endDate?: string
    startDate?: string
    state?: string
  }
}

async function HistoryPage({ searchParams: { endDate, startDate, state } }: Props) {
  const session = await getSession()
  const authorities = session.user.authorities
  const isAdmin = authorities.some(({ authority }) => authority === 'ADMIN')

  if (isAdmin) {
    const endDateParam = endDate ?? dayjs(new Date(Date.now())).format('YYYY-MM-DD')

    const certificates = await api.getALLRC({
      endDate: endDateParam,
      startDate,
      state,
    })

    return (
      <Stack spacing="4">
        <Flex>
          <Text flex="1" as="h1" fontWeight="semibold" fontSize="xl">
            Historial de certificados
          </Text>
          <TableFilters showInputDates state={state} startDate={startDate} endDate={endDateParam} />
        </Flex>
        <CertificatesTable certificates={certificates} />
      </Stack>
    )
  }

  return <DocumentsTable />
}

export default HistoryPage
