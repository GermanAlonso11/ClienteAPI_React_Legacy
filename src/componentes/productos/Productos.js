import React, {Fragment, useEffect, useState} from 'react';
//Importar react router dom
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

function Productos() {

  //productos = state, guardarproductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  //UseEffect para consultar la API
  useEffect(() => {
    const consultarAPI = async () => {
      const respuesta = await clienteAxios.get('/productos');
      const data = await respuesta.data;
      guardarProductos(data);
    }
    consultarAPI();
  }, [productos]);

  //Usar spinner de carga
  if (!productos.length) {
    return <Spinner />;
  }

  return (
      <Fragment>
      <h2>Productos</h2>

      <Link to="/productos/nuevo" classNameName="btn btn-verde nvo-cliente"> 
        <i classNameName="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

    <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>

      </Fragment>

    
      
  );
}

export default Productos;