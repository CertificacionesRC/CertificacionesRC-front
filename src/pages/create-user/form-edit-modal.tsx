// EditFormModal.jsx

import React from 'react';
import { useModal } from './basic-modal';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';

interface EditFormModalProps {
  userData: {
    codigo: number;
    usuario: string;
    nombre: string;
    correo: string;
    estado: string;
    rol: string;
  };
}

export default function EditFormModal({ userData }: EditFormModalProps) {
  console.log('userData in EditFormModal:', userData);
  const [BasicModal, openModal, closeModal] = useModal();
  const FormModalComponent = () => (
    <BasicModal
      okFunction={() => {}}
      okButtonText="Editar"
      title="Editar Usuario"
    >
      <FormControl>
        <Stack mb={5} spacing={2}>
          <FormLabel>Código *</FormLabel>
          <Input placeholder="Codigo" value={userData.codigo} />
        </Stack>
        <Stack mb={5} spacing={2}>
          <FormLabel>Usuario *</FormLabel>
          <Input placeholder="Usuario" value={userData.usuario} />
        </Stack>
        <Stack mb={5} spacing={2}>
          <FormLabel>Nombre *</FormLabel>
          <Input placeholder="Nombre" value={userData.nombre} />
        </Stack>
        <Stack mb={5} spacing={2}>
          <FormLabel>Correo *</FormLabel>
          <Input placeholder="Correo" value={userData.correo} />
        </Stack>
        <Stack mb={5} spacing={2}>
          <FormLabel>Estado *</FormLabel>
          <Select value={userData.estado}>
            <option value="Habilitado">Habilitado</option>
            <option value="Inhabilitado">Inhabilitado</option>
          </Select>
        </Stack>
        <Stack mb={5} spacing={2}>
          <FormLabel>Rol *</FormLabel>
          <Select value={userData.rol}>
            <option value="Seleccionar">Seleccionar</option>
            <option value= "Administrador">Administrador</option>
            <option value= "Coordinador">Coordinador</option>
          </Select>
        </Stack>
      </FormControl>
    </BasicModal>
  );

  return [FormModalComponent, openModal, closeModal] as const;
}