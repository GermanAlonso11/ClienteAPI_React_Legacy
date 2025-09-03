import React from 'react';
//Importar link de react-router-dom
import { Link } from 'react-router-dom';
//Importar sweetalert2
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Cliente({cliente}) {

    //Extraer los valores
    const {_id, nombre, apellido, empresa, email, telefono} = cliente;

    //Eliminar cliente con mensajes de confirmación de sweetalert2 y axios
    const eliminarCliente = id => {
        //Preguntar al usuario si está seguro de eliminar el cliente
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Llamar a la API para eliminar el cliente
                clienteAxios.delete(`/clientes/${id}`)
                    .then(res => {
                        //Si se elimina correctamente, mostrar mensaje de éxito
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                        )
                    })
                    .catch(error => {
                        console.error("Error al eliminar el cliente:", error);
                    });
            }
        })
    }


    return (
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombre} {apellido}</p>
                        <p className="empresa">{empresa}</p>
                        <p>{email}</p>
                        <p>{telefono}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>

                        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-azul">
                            <i className="fas fa-plus"></i>
                            Nuevo Pedido
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar"
                            onClick={() => eliminarCliente(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    )
}

export default Cliente;