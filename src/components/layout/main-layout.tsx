import { Grid, GridItem } from '@chakra-ui/react'
import { MainAsideMenu, MainHeader } from '@/components/layout'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <Grid
      h="100vh"
      overflow="hidden"
      gridTemplateColumns="250px 1fr"
      gridTemplateRows="70px 1fr"
      templateAreas={`
        "aside header"
        "aside main"
      `}
    >
      <GridItem as="aside" area="aside" bg="white" borderRight="2px" borderColor="gray.100">
        <MainAsideMenu />
      </GridItem>
      <GridItem as="header" bg="white" area="header" borderBottom="2px" borderColor="gray.100" display="flex">
        <MainHeader />
      </GridItem>
      <GridItem as="main" bg="gray.50" overflowY="auto" area="main">
        {children}
      </GridItem>
    </Grid>
  )
}

export default MainLayout
