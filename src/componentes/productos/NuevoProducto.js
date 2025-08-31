import e from 'cors';
import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';


function NuevoProducto() {
  const navigate = useNavigate();

  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: ''
  });

  //archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  //Leer los datos del formulario
  const leerInformacionProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  //Coloca la imagen en el state
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  };

  const agregarProducto = async e => {
    e.preventDefault();

    // Crear un objeto FormData
    const formData = new FormData();

    //Agregar los campos al FormData
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    try {
      await clienteAxios.post('/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha agregado correctamente'
      });

      //Redireccionar
      navigate('/productos');

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de red',
        text: 'Hubo un problema al agregar el producto'
      });
    }
  };

  return (
    <div>
      <Fragment>
        <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" 
                    name="precio" min="0.00" 
                    step="0.01" placeholder="Precio" 
                    onChange={leerInformacionProducto}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  
                    name="imagen" 
                    onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Producto"/>
                </div>
            </form>
      </Fragment>
    </div>
  );
}

export default NuevoProducto;
