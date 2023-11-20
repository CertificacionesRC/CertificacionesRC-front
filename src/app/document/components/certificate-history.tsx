/* eslint-disable @typescript-eslint/no-explicit-any */
import './css-table-document.css'
import { AiOutlineSearch, AiOutlineFileSearch } from 'react-icons/ai'
import React, { useState} from 'react'
import { datos } from './data-certificate'
import ReactPaginate from 'react-paginate'
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
  Button,
  Box,
  InputRightElement,
} from '@chakra-ui/react'


function handleButtonClick(): void {
  alert('Se hizo clic en el botón')
}

function CertificateHistory() {

  const totalDataCount = datos.length;
  const perPage = 4 // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(0)

  const pageCount = Math.ceil(datos.length / perPage)

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected)
  }

  const offset = currentPage * perPage

  /* Se filtran los datos que se obtienen en el input. */
  const [filter, setFilter] = useState('')
  const certificadoFiltrado = datos.filter(
    (dato) =>
      dato.codigo.toString().toLowerCase().includes(filter.toLowerCase())
  )

  /* Se distribuyen los datos en las paginas calculadas. */
  const currentData = certificadoFiltrado.slice(offset, offset + perPage);

  const handleInputChange = (e: any): void => {
    setFilter(e.target.value)
  }

 

    return(

        <Box sx={{display:'grid'}}>

            <Box sx={{height:'60px', display:'flex'}}>
                <h1 style={{marginLeft:'10px', fontSize:'25px', fontWeight: 'bold'}}>Historial de certificados</h1>
                <InputGroup backgroundColor={'white'} width="282px" marginLeft={'485px'} height='40px' borderRadius={'10px'}>
                <Input type="bus" placeholder="Buscar por programa"  value={filter} onChange={handleInputChange}/>
                <InputRightElement pointerEvents="none" backgroundColor={'#003C6F'}>
                    <AiOutlineSearch style={{ fontSize: '20px', color:'white' }} />
                </InputRightElement>
                </InputGroup>
            </Box>

            <Box sx={{ marginTop: '0px' }}>
              <TableContainer bg="white" className="table-container">
                <Box sx={{ height: '405px' }}>
                  <Table variant="simple" size="lg" className="fixed-table">
                    <Thead>
                      <Tr>
                        <Th width="194px">Codigo</Th>
                        <Th width="500px">Programa</Th>
                        <Th width="134px">Año</Th>
                        <Th width="109px">Acciones</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {currentData.map((certificado, index) => (
                        <Tr key={index}>
                          <Td>{certificado.codigo}</Td>
                          <Td>{certificado.programa}</Td>
                          <Td>{certificado.año}</Td>
                          <Td>
                          <Button variant="ghost" leftIcon={<AiOutlineFileSearch size={'25px'} onClick={handleButtonClick}/>} />   
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    height: '40px',
                    width:'400px',
                    marginLeft:'15px',
                    marginBottom: '10px',
                    alignItems: 'flex-start',
                  }}
                >
                  <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'<'}
                    nextLabel={'>'}
                  />

                  <h2 style={{marginLeft: '700px'}}>Viendo {currentPage + 1} - {pageCount} de {totalDataCount}</h2>

                </Box>
              </TableContainer>
            </Box>

        </Box>
    );

} export default CertificateHistory;