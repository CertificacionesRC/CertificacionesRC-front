import { Grid, GridItem } from '@chakra-ui/react'
import { MainAsideMenu, MainHeader } from '@/components/layout'
import { IAuthority } from '@/utils/models'
import { IBreadcum } from './main-header'

interface Props {
  children: React.ReactNode
  authorities: IAuthority[]
  breadcums: IBreadcum[]
}

function MainLayout({ children, authorities, breadcums }: Props) {
  return (
    <Grid
      h="100vh"
      overflow="hidden"
      gridTemplateColumns="260px 1fr"
      gridTemplateRows="60px 1fr"
      templateAreas={`
        "aside header"
        "aside main"
      `}
    >
      <GridItem as="header" bg="white" area="header" borderBottom="2px" borderColor="gray.100" display="flex">
        <MainHeader breadcums={breadcums} />
      </GridItem>
      <GridItem as="aside" area="aside" bg="white" borderRight="2px" borderColor="gray.100">
        <MainAsideMenu authorities={authorities} />
      </GridItem>
      <GridItem as="main" bg="gray.100" overflow="auto" area="main" padding="8">
        {children}
      </GridItem>
    </Grid>
  )
}

export default MainLayout
