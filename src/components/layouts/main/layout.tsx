import { Grid, GridItem } from '@chakra-ui/react'
import { IAuthority } from '@/utils/models'
import MainAsideMenu from '@/components/layouts/main/aside'
import MainHeader, { IBreadcum } from '@/components/layouts/main/header'

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
      <GridItem as="header" bg="surface" area="header" borderBottom="2px" borderColor="gray.100" display="flex">
        <MainHeader breadcums={breadcums} />
      </GridItem>
      <GridItem as="aside" area="aside" bg="surface" borderRight="2px" borderColor="gray.100">
        <MainAsideMenu authorities={authorities} />
      </GridItem>
      <GridItem as="main" bg="bg" overflow="auto" area="main" padding="8">
        {children}
      </GridItem>
    </Grid>
  )
}

export default MainLayout
