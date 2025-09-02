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

  // Función para leer los datos del formulario y actualizar el state del producto
  const leerInformacionProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  // Función para colocar la imagen seleccionada en el state
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  };

  //Extraer los valores del state
  const { nombre, precio, imagen } = producto;

  if(!nombre || !precio || !imagen) {
    return (
      <Fragment>
        <Spinner />

      </Fragment>
    );
  }

  //Edita el producto
  const editarProducto = async e => {
    e.preventDefault();

    // Crear un FormData
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('imagen', imagen);

    try {
      await clienteAxios.put(`/productos/${id}`, formData);
      Swal.fire(
        'Correcto',
        'El producto se editó correctamente',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un error al editar el producto',
        'error'
      );
    }
  };

  return (
    <Fragment>
            <h2>Editar Producto</h2>
    
                <form onSubmit={editarProducto}>
                    <legend>Edita todos los campos</legend>
    
                    <div className="campo">
                        <label>Nombre:</label>
                        <input type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}
                        />
                    </div>
    
                    <div className="campo">
                        <label>Precio:</label>
                        <input type="number" 
                        name="precio" min="0.00" 
                        step="0.01" placeholder="Precio" 
                        onChange={leerInformacionProducto}
                        defaultValue={precio}
                        />
                    </div>
                
                    <div className="campo">
                        <label>Imagen:</label>
                        {imagen ? <img src={imagen} alt="Imagen Producto" /> : null}
                        <input type="file"  
                        name="imagen" 
                        onChange={leerArchivo}

                        />
                    </div>
    
                    <div className="enviar">
                            <input type="submit" 
                            className="btn btn-azul" 
                            value="Editar Producto"/>
                    </div>
                </form>
          </Fragment>
  );
}

export default EditarProducto;