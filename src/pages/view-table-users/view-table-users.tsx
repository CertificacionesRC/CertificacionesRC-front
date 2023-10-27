"use client"
import { Card, CardHeader, CardBody, Button,Table,Select,Input} from '@chakra-ui/react'
import { FaEdit, FaUserPlus } from 'react-icons/fa'; 
import FormModal from '@/pages/create-user/form-crate-model';
import FormEditModal from '../create-user/fom-edit-modal';


function ViewTableUsers(this: any) {


    const users = [
        { codigo: 104619011256, nombre: 'Jorge Herley Luligo',usuario:'jluligo19', correo: 'jluligo@example.com'},
        { codigo: 104619014589, nombre: 'Julia Sofia Garcia',usuario: 'jsgarcia19', correo: 'jsgarcia@example.com' },
        
    ];

    const [FormModalComponent, openModal, closeModal] = FormModal()
    const [FormModalEditComponent, openEditModal, closeEditModal] = FormEditModal()
    const stateOptions = ['Habilitado', 'Inhabilitado'];



    return (
        
        <div>
        <h1 style={{ marginBottom: '20px' }}><b>Usuarios</b></h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Input placeholder='Buscar' />
            <Button leftIcon={< FaUserPlus />} colorScheme="blue" size="md" marginLeft="5" onClick={openModal}></Button>
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
                                <Button rightIcon={<FaEdit />} colorScheme="blue" size="md" onClick={openEditModal}>
                                    <FormModalEditComponent />
                                </Button>
                                        
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        </div>
    );
  }
  export default ViewTableUsers
  
  