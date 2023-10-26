
import { Card, CardHeader, CardBody, Button,Table,Select} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'; 



function ViewTableUsers() {
   
    const stateOptions = ['Habilitado', 'Inhabilitado'];
    const users = [
        { id: 104619011256, name: 'Jorge Herley Luligo',usuario:'jluligo19', email: 'jluligo@example.com' },
        { id: 104619014589, name: 'Julia Sofia Garcia',usuario: 'jsgarcia19', email: 'jsgarcia@example.com' },
        
    ];

    return (
        <Card textAlign="center">
            <CardHeader>
                <h2>Tabla de Usuarios</h2>
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
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.usuario}</td>
                                <td>{user.email}</td>
                                <td><Select>
                                        {stateOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Select>
                                    
                                </td>
                                <td> 
                                <Button leftIcon={<FaEdit />} colorScheme="blue" size="sm">
                                        Editar
                                    </Button>
                                        
                                       </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
  }
  export default ViewTableUsers
  