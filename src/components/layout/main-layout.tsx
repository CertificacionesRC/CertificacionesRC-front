import { MainAsideMenu, MainHeader } from '@/components/layout'
import { Grid } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <Grid overflow="hidden" h="100vh" gridTemplateColumns="auto 1fr">
      <MainAsideMenu />
      <Grid bg="gray.100" gridTemplateRows="auto 1fr" as="main" overflowY="auto">
        <MainHeader />
        {children}
      </Grid>
    </Grid>
  )
}

export default MainLayout
