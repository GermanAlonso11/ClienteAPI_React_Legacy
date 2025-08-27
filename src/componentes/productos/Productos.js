import React, {Fragment, useEffect, useState} from 'react';
//Importar react router dom
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';

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
  }, []);

  return (
      <Fragment>
      <h2>Productos</h2>

      <Link to="/productos/nuevo" classNameName="btn btn-verde nvo-cliente"> 
        <i classNameName="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

    <ul className="listado-productos">
                <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">VueJS</p>
                        <p className="precio">$25.00 </p>
                        <img src="img/1.jpg"/>
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </a>

                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
                <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">AngularJS</p>
                        <p className="precio">$25.00 </p>
                        <img src="img/2.jpg"/>
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </a>

                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Producto
                        </button>
                    </div>
                </li>
                <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">ReactJS</p>
                        <p className="precio">$25.00 </p>
                        <img src="img/3.jpg"/>
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </a>

                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Producto
                        </button>
                    </div>
                </li>
            </ul>

      </Fragment>

    
      
  );
}

export default Productos;