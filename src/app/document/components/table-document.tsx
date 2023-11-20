/* eslint-disable @typescript-eslint/no-explicit-any */
import './css-table-document.css'
import { AiOutlineSearch, AiOutlineFileSearch } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { datos } from './data-document'
import React, { useState } from 'react'
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
  InputLeftElement,
  Button,
  ButtonGroup,
  Box,
} from '@chakra-ui/react'

function handleButtonClick(): void {
  alert('Se hizo clic en el botón')
}

function TableDocument() {
  const perPage = 4 // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(0)

  const pageCount = Math.ceil(datos.length / perPage)

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected)
  }

  const offset = currentPage * perPage

  /* Se filtran los datos que se obtienen en el input. */
  const [filter, setFilter] = useState('')
  const documentoFiltrado = datos.filter(
    (dato) =>
      dato.usuario.toLowerCase().includes(filter.toLowerCase()) ||
      dato.idDocumento.toString().toLowerCase().includes(filter.toLowerCase())
  )

  /* Se distribuyen los datos en las paginas calculadas. */
  const currentData = documentoFiltrado.slice(offset, offset + perPage)

  const handleInputChange = (e: any): void => {
    setFilter(e.target.value)
  }

  return (
    <Box>
      <Box sx={{ marginTop: '0', marginBottom: '20px' }}>
        <InputGroup backgroundColor={'white'}>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch style={{ fontSize: '20px' }} />
          </InputLeftElement>
          <Input type="bus" placeholder="Buscar" value={filter} onChange={handleInputChange} />
        </InputGroup>
      </Box>

      <Box>
        <TableContainer bg="white" className="table-container">
          <Box sx={{ height: '405px' }}>
            <Table variant="simple" size="lg" className="fixed-table">
              <Thead>
                <Tr>
                  <Th>Id documento</Th>
                  <Th>Usuario</Th>
                  <Th>Estado</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentData.map((documento, index) => (
                  <Tr key={index}>
                    <Td>{documento.idDocumento}</Td>
                    <Td>{documento.usuario}</Td>
                    <Td>{documento.estado}</Td>
                    <Td>
                      <ButtonGroup variant="unstyled" spacing="6">
                        <Button leftIcon={<AiOutlineFileSearch size={'25px'} onClick={handleButtonClick} />} />
                        <Button leftIcon={<BiComment size={'25px'} onClick={handleButtonClick} />} />
                      </ButtonGroup>
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
  )
}
export default TableDocument
