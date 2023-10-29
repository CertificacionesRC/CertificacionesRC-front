import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <Flex justify="left" mt={4}>
      <Box mx={1}>
        <Button
          size= "sm"
          bg = "#EEF0F4"
          color="#B8B9C6"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          
        >
          <FaChevronLeft />
        </Button>
      </Box>
      {Array.from({ length: totalPages }, (_, index) => (
        <Box key={index} mx={1}>
          <Button
            size= "sm"
            onClick={() => onPageChange(index + 1)}
            bg={currentPage === index + 1 ? '#001f3f' : 'transparent'} // Ajusta el color de fondo aquí
            color={currentPage === index + 1 ? '#ffffff' : '#A4A7B7'} 
          >
            {index + 1}
          </Button>
        </Box>
      ))}
      <Box mx={1}>
        <Button
          size= "sm"
          bg = "#EEF0F4"
          color="#B8B9C6"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </Button>
      </Box>
    </Flex>
  );
}

export default Pagination;