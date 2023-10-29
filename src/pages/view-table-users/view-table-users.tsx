"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button,Table,Select,Input} from '@chakra-ui/react'
import { FaEdit ,FaPlus } from 'react-icons/fa'; 
import FormModal from '@/pages/create-user/form-crate-model';
import FormEditModal from '../create-user/form-edit-modal';
import Pagination from '../pagination/pagination';


function ViewTableUsers(this: any) {


    const users = [
        { codigo: 104619011256, nombre: 'Jorge Herley Luligo',usuario:'jluligo19', correo: 'jluligo@example.com',estado: 'Habilitado', rol: 'Administrador'},
        { codigo: 104619014589, nombre: 'Julia Sofia Garcia ',usuario: 'jsgarc19', correo: 'jsgaria@example.com',estado: 'Habilitado', rol: 'Administrador'},
        
    ];

    
  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [FormModalEditComponent, openEditModal, closeEditModal] = FormEditModal({ userData: selectedUser });

    const [FormModalComponent, openModal, closeModal] = FormModal()

    const stateOptions = ['Habilitado', 'Inhabilitado'];

  // Número total de páginas (en este caso, supongo que hay 10 usuarios por página)
  const itemsPerPage = 10;
  //const totalPages = Math.ceil(users.length / itemsPerPage);
  const totalPages = 5;

  // Lógica para obtener los usuarios en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersInCurrentPage = users.slice(startIndex, endIndex);
  

    return (
        
        <div>
        <h1 style={{ marginBottom: '20px' }}><b>Usuarios</b></h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Input placeholder='Buscar' />
            <Button leftIcon={< FaPlus />} bg="#001f3f" color="#ffffff" size="md" marginLeft="5"  onClick={openModal}></Button>
            <FormModalComponent />
            
        </div >
            
        <Card textAlign="center">
        
         
            <CardHeader>
                <h2></h2>
            </CardHeader>

            <CardBody>
                <Table variant="striped" colorScheme="teal">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Correo Electrónico</th>
                            <th>Estado</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.codigo}>
                                <td>{user.codigo}</td>
                                <td>{user.nombre}</td>
                                <td>{user.usuario}</td>
                                <td>{user.correo}</td>
                                <td><Select>
                                        {stateOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Select>
                                    
                                </td>
                                <td> 
                                <Button rightIcon={<FaEdit fontSize="1.6em" />} 
                                bg="#ffffff" 
                                color="#001f3f" 
                                size="md" 
                                >
                                  
                                </Button>    
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        {/* Componente Pagination */}
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
  }
  export default ViewTableUsers
  