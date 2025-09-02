import React, {useState, useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarProducto() {
  //Obtener el id del producto
  const {id} = useParams();

  //producto = state y funcion para actualizar
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });

  //Consultar la api para traer el producto a editar
  const consultarApi = async () => {
    const { data } = await clienteAxios.get(`/productos/${id}`);
    guardarProducto(data);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  return (
    <h2>Editar Producto {id}</h2>
  );
}

export default EditarProducto;